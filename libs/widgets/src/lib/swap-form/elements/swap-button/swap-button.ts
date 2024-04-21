import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@one-inch-community/ui-components/button'
import { consume } from '@lit/context';
import { swapContext } from '../../context';
import { ISwapContext } from '@one-inch-community/models';
import { defer, firstValueFrom, fromEvent, map } from 'rxjs';
import { getMobileMatchMedia, observe, subscribe, dispatchEvent } from '@one-inch-community/ui-components/lit';

@customElement(SwapButton.tagName)
export class SwapButton extends LitElement {
  static tagName = 'inch-swap-button' as const

  @consume({ context: swapContext, subscribe: true })
  context?: ISwapContext

  private readonly mobileMedia = getMobileMatchMedia()

  private readonly connectedWalletAddress$ = defer(() => this.getConnectedWalletAddress())

  private readonly buttonType$ = this.connectedWalletAddress$.pipe(
    map(address => address ? 'primary' : 'secondary'),
  )

  private readonly buttonText$ = this.connectedWalletAddress$.pipe(
    map(address => address ? 'Swap' : 'Connect wallet'),
  )

  protected override firstUpdated() {
    subscribe(this, [
      fromEvent(this.mobileMedia, 'change')
    ])
  }

  protected override render() {
    return html`
      <inch-button @click="${() => this.onClick()}" type="${observe(this.buttonType$, 'secondary')}" size="${this.mobileMedia.matches ? 'xl' : 'xxl'}" fullSize>
        ${observe(this.buttonText$)}
      </inch-button>
    `
  }

  private async onClick() {
    const address = await firstValueFrom(this.connectedWalletAddress$)
    if (!address) {
      dispatchEvent(this, 'connectWallet', null)
      return
    }
  }

  private getConnectedWalletAddress() {
    if (!this.context) throw new Error('')
    return this.context.connectedWalletAddress$
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'inch-swap-button': SwapButton
  }
}