import { IToken } from '../token/token';
import { ChainId } from '../chain';

export type Rate = {
  chainId: ChainId
  isReverted: boolean;
  rate: bigint
  revertedRate: bigint
  sourceToken: IToken
  destinationToken: IToken
}