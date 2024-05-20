import { ChainId, IToken, ITokenRateAdapter } from '@one-inch-community/models';
import { Address, getAddress, isAddressEqual, parseAbi } from 'viem';
import { getClient } from '../../../chain';
import { BigMath } from '../../../utils';
import { BlockTimeCache, LongTimeCache } from '../../../cache';
import { CacheActivePromise } from '../../../utils/decorators';

const FactoryContractABI = parseAbi([
  'function getPair(address tokenA, address tokenB) external view returns (address pair)'
])

const PoolContractABI = parseAbi([
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)'
])

const zeroAddress: Address = '0x0000000000000000000000000000000000000000'

export class UniswapV2BaseRateAdapter implements ITokenRateAdapter {

  private readonly pools = new LongTimeCache<string, [Address, Address]>(`${this.name}_pools`, 7)
  private readonly rateCache = new BlockTimeCache<string, bigint>()

  constructor(
    public readonly name: string,
    private readonly factoryContractGetter: (chainId: ChainId) => Address,
    private readonly supportedChain: ChainId[]
  ) {
  }

  isSupportedChain(chainId: ChainId): boolean {
    return this.supportedChain.includes(chainId)
  }

  @CacheActivePromise((_, chainId: ChainId, sourceToken: IToken, destinationToken: IToken) => [chainId, sourceToken.address, destinationToken.address].join(':'))
  async getRate(chainId: ChainId, sourceToken: IToken, destinationToken: IToken): Promise<bigint | null> {
    const id = [sourceToken.address, destinationToken.address].join(':')
    try {

      const rateFromCache = this.rateCache.get(chainId, id) ?? null
      if (rateFromCache !== null) {
        return rateFromCache
      }

      const srcTokenAddress = getAddress(sourceToken.address)
      const dstTokenAddress = getAddress(destinationToken.address)
      const [pool, token0]: [Address, Address] = await this.getPool(chainId, srcTokenAddress, dstTokenAddress)
      if (pool === zeroAddress) {
        return null
      }
      const reserves = await this.getReserves(chainId, pool)
      const isRevertRate = !isAddressEqual(sourceToken.address, token0)
      const rate = BigMath.dev(
        isRevertRate ? reserves[1] : reserves[0],
        isRevertRate ? reserves[0] : reserves[1],
        sourceToken.decimals,
        destinationToken.decimals,
        destinationToken.decimals
      )

      this.rateCache.set(chainId, id, rate)

      return rate
    } catch (error) {
      console.error(`Error in UniswapV2BaseAdapter adapter name ${this.name}`, error)
      return this.rateCache.get(chainId, id)
    }
  }

  private async getPool(chainId: ChainId, srcTokenAddress: Address, dstTokenAddress: Address): Promise<[Address, Address]> {
    const id1 = [chainId, srcTokenAddress, dstTokenAddress].join(':')
    if (this.pools.has(id1)) {
      return this.pools.get(id1)!
    }
    const id2 = [chainId, dstTokenAddress, srcTokenAddress].join(':')
    if (this.pools.has(id2)) {
      return this.pools.get(id2)!
    }
    const client = getClient(chainId)
    const pool: Address = await client.readContract({
      address: getAddress(this.factoryContractGetter(chainId)),
      functionName: 'getPair',
      args: [srcTokenAddress, dstTokenAddress],
      abi: FactoryContractABI
    })
    let token0 = zeroAddress
    if (pool !== zeroAddress) {
      token0 = await client.readContract({
        address: pool,
        abi: PoolContractABI,
        functionName: 'token0'
      })
    }
    this.pools.set(id1, [pool, token0])
    this.pools.set(id2, [pool, token0])
    return [pool, token0]
  }


  private async getReserves(chainId: ChainId, pool: Address) {
    const client = getClient(chainId)
    return await client.readContract({
      address: pool,
      abi: PoolContractABI,
      functionName: 'getReserves'
    })
  }

}