import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cardStyle } from './card.style';

@customElement(CardElement.tagName)
export class CardElement extends LitElement {
  static tagName = 'inch-card'

  static override styles = cardStyle

  protected override render() {
    return html`<slot></slot>`
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'inch-card': CardElement
  }
}