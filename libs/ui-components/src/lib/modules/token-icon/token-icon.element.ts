import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Task } from '@lit/task';
import type { Address } from 'viem';
import { repositories } from './repositories';
import { RepositoryPayload } from './repositories/repository.model';
import { ChainId } from '@one-inch-community/models';

@customElement(TokenIconElement.tagName)
export class TokenIconElement extends LitElement {
  static tagName = 'inch-token-icon'

  static override styles = css`

      :host {
          user-select: none;
          outline: none;
      }

      .stub {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-background-bg-secondary);
          border-radius: 50%;
          color: var(--color-content-content-secondary);
          position: relative;
      }
      .stub-loader {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid;
          border-bottom-color: var(--secondary);
          border-top-color: var(--secondary);
          animation: spin 1s linear infinite;
      }

      @keyframes spin {
          0% {
              transform: rotate(0deg);
          }

          100% {
              transform: rotate(360deg);
          }
      }
  
  `

  @property({ type: String }) symbol?: string
  @property({ type: String }) address?: Address
  @property({ type: Number }) chainId?: ChainId
  @property({ type: Number }) size = 24

  private readonly task = new Task(this, {
    task: ([symbol, address, chainId], { signal }) => iconLoader(signal, chainId, symbol, address),
    args: () => [this.symbol, this.address, this.chainId] as [string | undefined, Address | undefined, number | undefined]
  })

  protected override render() {
    return this.task.render({
      error: () => symbolView(this.size, this.symbol),
      pending: () => symbolView(this.size, this.symbol, true),
      initial: () => symbolView(this.size, this.symbol, true),
      complete: value => {
        value.width = this.size;
        value.height = this.size;
        value.ondragstart = () => false
        return html `${value}`;
      }
    });
  }

  protected override updated() {
    this.style.width = `${this.size}px`
    this.style.height = `${this.size}px`
  }

}

function symbolView(size: number, symbol?: string, showLoader?: boolean) {
  return html`
    <div style="width: ${size}px; height: ${size}px; font-size: ${size < 40 ? 13 : 16}px" class="stub">
      <span>${symbol?.slice(0, size < 40 ? 1 : 2) ?? ''}</span>
      ${showLoader ? html`<span class="stub-loader"></span>` : ''}
    </div>
  `;
}

function iconLoader(signal: AbortSignal, chainId?: ChainId, symbol?: string, address?: Address) {
  return recursiveLoader({ chainId, symbol, address, signal });
}

async function recursiveLoader(data: RepositoryPayload, index = 0) {
  try {
    const repositoryLoader = repositories[index];
    if (!repositoryLoader) throw new Error('token icon not fount');
    const repository = await repositoryLoader();
    return await repository(data);
  }
  catch {
    return await recursiveLoader(data, index + 1);
  }
}