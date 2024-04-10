import { html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { map as litMap } from 'lit/directives/map.js';
import { cache } from 'lit/directives/cache.js';
import { classMap } from 'lit/directives/class-map.js';
import '@lit-labs/virtualizer'
import '../token-list-item'
import '@one-inch-community/ui-components/icon'
import { tokenListStyle } from './token-list.style';
import { consume } from '@lit/context';
import { ChainId, ISelectTokenContext } from '@one-inch-community/models';
import { selectTokenContext } from '../../context';
import { combineLatest, debounceTime, defer, map, startWith } from 'rxjs';
import { observe } from '@one-inch-community/ui-components/lit';
import { scrollbarStyle } from '@one-inch-community/ui-components/theme';
import { Address } from 'viem';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ISceneContext, sceneContext } from '@one-inch-community/ui-components/scene';
import '../token-list-stub-item'


@customElement(TokenListElement.tagName)
export class TokenListElement extends LitElement {
  static tagName = 'inch-token-list' as const

  static override styles = [
    tokenListStyle,
    scrollbarStyle
  ]

  @consume({ context: selectTokenContext })
  context?: ISelectTokenContext

  @consume({ context: sceneContext })
  sceneContext?: ISceneContext

  @state() private transitionReady = false

  private view$ = defer(() => combineLatest([
    this.getTokenAddressList(),
    this.getChainId(),
    this.getConnectedWalletAddress(),
  ])).pipe(
    debounceTime(0),
    map(([ tokenAddresses, chainId, walletAddress ]) => this.getTokenListView(tokenAddresses, chainId, walletAddress ?? undefined)),
    startWith(this.getLoaderView()),
  )

  protected override render(): TemplateResult {
    if (!this.transitionReady) return this.getLoaderView()
    return html`
      <div class="list-container">
        ${observe(this.view$)}
      </div>`
  }

  protected override async firstUpdated() {
    if (this.sceneContext && this.sceneContext.animationInProgress) {
      await this.sceneContext.animationInEnd
    }
    this.transitionReady = true
  }

  private getTokenAddressList() {
    if (!this.context) throw new Error('')
    return this.context.tokenAddressList$
  }

  private getChainId() {
    if (!this.context) throw new Error('')
    return this.context.chainId$
  }

  private getConnectedWalletAddress() {
    if (!this.context) throw new Error('')
    return this.context.connectedWalletAddress$
  }

  private getLoaderView() {
    const classes = {
      'loader-view-container': true
    }
    return html`
      <div class="${classMap(classes)}">
        ${litMap<unknown>(Array.from(Array(10).keys()), () => html`<inch-token-list-stub-item></inch-token-list-stub-item>`)}
      </div>
    `
  }


  private getTokenListView(tokenAddresses: Address[], chainId: ChainId, walletAddress?: Address): TemplateResult {
    const offsetHeight = this.offsetHeight

    return html`
      ${cache(html`
        <lit-virtualizer
          scroller
          style="height: ${offsetHeight}px;"
          .items=${tokenAddresses}
          .keyFunction="${((address: Address) => [chainId, walletAddress, address].join(':')) as any}"
          .renderItem=${((address: Address) => html`<inch-token-list-item
          tokenAddress="${address}"
          walletAddress="${ifDefined(walletAddress)}"
          chainId="${chainId}"
        ></inch-token-list-item>`) as any}
        ></lit-virtualizer>
      `)}
    `
  }

  // private listenScrollOverflow() {
  //   this.reset$.next()
  //   debugger
  //   if (!this.scrollViewRef.value) {
  //     setTimeout(() => {
  //       this.listenScrollOverflow()
  //     }, 100)
  //     return
  //   }
  //   subscribe(this, fromEvent(this.scrollViewRef.value!, 'scroll').pipe(
  //     filter(() => this.scrollViewRef.value!.scrollTop < 0),
  //     tap((event) => { console.log('overflow', this.scrollViewRef.value!.scrollTop) })
  //   ), { requestUpdate: false })
  // }
}

declare global {
  interface HTMLElementTagNameMap {
    'inch-token-list': TokenListElement
  }
}