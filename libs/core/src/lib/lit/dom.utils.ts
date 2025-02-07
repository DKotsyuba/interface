import { CSSResult } from 'lit';

export function createAndAppendInHeaderElement<K extends keyof HTMLElementTagNameMap>(tagName: K, sideEffect?: (el: HTMLElementTagNameMap[K]) => void): HTMLElementTagNameMap[K] {
  const el = document.createElement(tagName)
  if (sideEffect && typeof sideEffect === 'function') {
    try {
      sideEffect(el)
    } catch (error) {
      console.error('call side effect error', error)
    }
  }
  document.head.appendChild(el)
  return el
}

export function createAndApplyStyle(css: CSSResult) {
  createAndAppendInHeaderElement('style', el => applyStyle(el, css))
}

export function applyStyle(target: HTMLStyleElement, css: CSSResult) {
  target.textContent = css.cssText
}

export function buildEvent<V>(type: string, value: V, event?: Event) {
  return new CustomEvent(type, { bubbles: true, composed: true, detail: { value, event } })
}

export function dispatchEvent<V>(ctx: HTMLElement, type: string, value: V, event?: Event): void {
  ctx.dispatchEvent(buildEvent(type, value, event))
}

export function setBrowserMetaColorColor(color: string) {
  const themeMetaElement = document.head.querySelector('#theme-color') as HTMLMetaElement
  if (!themeMetaElement) {
    createAndAppendInHeaderElement('meta', (meta) => {
      meta.id = 'theme-color';
      meta.name = 'theme-color';
      meta.content = color;
    })
    return
  }
  themeMetaElement.content = color
}

export function vibrate(pattern: VibratePattern = 40) {
  try {
    navigator.vibrate(pattern);
  } catch (error) {
    //
  }
}
