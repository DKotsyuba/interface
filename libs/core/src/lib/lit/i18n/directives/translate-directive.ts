import { AsyncDirective as LitAsyncDirective } from 'lit/async-directive.js';
import { directive } from 'lit/directive.js';
import { asapScheduler, observeOn, Subscription } from 'rxjs';
import { listenChangesByPath } from '../i18n';

class TranslateDirective extends LitAsyncDirective {

  private subscription?: Subscription;
  private lastValue?: string;
  private lastPath?: string;

  override render(path: string, context?: Record<string, unknown>): string {
    if (this.subscription && this.lastPath === path) {
      return this.lastValue ?? ''
    } else {
      this.disconnected()
    }
    this.subscription = listenChangesByPath(path, context).pipe(
      observeOn(asapScheduler)
    ).subscribe(value => {
      this.setValue(value)
      this.lastValue = value
      this.lastPath = path
    })
    return ''
  }

  override disconnected() {
    this.subscription?.unsubscribe();
  }

}

export const translate = directive(TranslateDirective);
