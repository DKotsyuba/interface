import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@one-inch-community/ui-components/button'
import '@one-inch-community/ui-components/card'
import '@one-inch-community/ui-components/icon'
import '@one-inch-community/ui-components/segmented-control'
import {
  MainColors,
  BrandColors,
  themeChangeMainColor,
  themeChangeBrandColor,
} from '@one-inch-community/ui-components/theme';

@customElement('app-root')
export class AppElement extends LitElement {

  static override styles = css`
    :host {
        display: flex;
        height: 100%;
        padding: 16px;
        gap: 8px;
        flex-direction: column;
        flex-wrap: wrap;
    }
      
      .card-inner-layer {
          display: grid;
          gap: 8px;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
          justify-items: center;
      }
      
      .theme-control-layer {
          grid-template-columns: 1fr 1fr 1fr 1fr;
      }
  `

  protected readonly data = [
    { value: 1, label: 'data1' },
    { value: 2, label: 'data2' },
    { value: 3, label: 'data3' },
  ]

  protected readonly dataAndTemplate = [
    ...this.data,
    { value: 4, template: () => html`<input placeholder="custom template" style="border: none; outline: none; background-color: transparent;">` }
  ]

  protected readonly segmentedMainColorsData = [
    { label: 'Dark', value: MainColors.dark },
    { label: 'Dark blue', value: MainColors.darkBlue },
    { label: 'Light', value: MainColors.light },
    { label: 'Light blue', value: MainColors.lightBlue },
  ]

  protected readonly segmentedBrandColorsData = [
    { label: 'Community', value: BrandColors.community },
    { label: 'Orange', value: BrandColors.orange },
    { label: 'Violet', value: BrandColors.violet },
  ]

  protected render() {
    return html`
      <inch-card>
        <inch-segmented-control 
          .items="${this.segmentedMainColorsData}"
          .select="${this.segmentedMainColorsData[2]}"
          @change="${(event: CustomEvent) => themeChangeMainColor(event.detail.value, event.detail.event)}"
        ></inch-segmented-control>
        <inch-segmented-control
          .items="${this.segmentedBrandColorsData}" 
          .select="${this.segmentedBrandColorsData[0]}"
          @change="${(event: CustomEvent) => themeChangeBrandColor(event.detail.value, event.detail.event)}"
        ></inch-segmented-control>
      </inch-card>
      
      <inch-card>
        <div class="card-inner-layer theme-control-layer">
          <inch-button @click="${(event: MouseEvent) => themeChangeMainColor(MainColors.dark, event)}"><span>Dark</span></inch-button>
          <inch-button @click="${(event: MouseEvent) => themeChangeMainColor(MainColors.darkBlue, event)}"><span>Dark Blue</span></inch-button>
          <inch-button @click="${(event: MouseEvent) => themeChangeMainColor(MainColors.light, event)}"><span>Light</span></inch-button>
          <inch-button @click="${(event: MouseEvent) => themeChangeMainColor(MainColors.lightBlue, event)}"><span>Light Blue</span></inch-button>
        </div>
      </inch-card>

      <inch-card>
        <div class="card-inner-layer">
          <inch-button @click="${(event: MouseEvent) => themeChangeBrandColor(BrandColors.community, event)}"><span>Community</span></inch-button>
          <inch-button @click="${(event: MouseEvent) => themeChangeBrandColor(BrandColors.orange, event)}"><span>Orange</span></inch-button>
          <inch-button @click="${(event: MouseEvent) => themeChangeBrandColor(BrandColors.violet, event)}"><span>Violet</span></inch-button>
        </div>
      </inch-card>
      
      <inch-card>
        <div class="card-inner-layer">
          <inch-button size="sm">
            <inch-icon icon="circle16"></inch-icon>
          </inch-button>
          <inch-button size="xl" disabled>
            <inch-icon icon="circle24"></inch-icon>
          </inch-button>
          <inch-button size="xxl">
            <inch-icon icon="circle24"></inch-icon>
          </inch-button>
          
          
          <inch-button size="sm">
            <inch-icon icon="circle16"></inch-icon>
            <span>Button</span>
          </inch-button>
          <inch-button size="xl" disabled>
            <span>Button</span>
            <inch-icon icon="circle24"></inch-icon>
          </inch-button>
          <inch-button size="xxl">
            <inch-icon icon="circle24"></inch-icon>
          </inch-button>
          
          <inch-button size="sm"><span>Button</span></inch-button>
          <inch-button size="xl"><span>Button</span></inch-button>
          <inch-button size="xxl"><span>Button</span></inch-button>

          <inch-button size="sm" type="primary-critical"><span>Button</span></inch-button>
          <inch-button size="xl" type="primary-critical"><span>Button</span></inch-button>
          <inch-button size="xxl" type="primary-critical"><span>Button</span></inch-button>

          <inch-button size="sm" type="primary-warning"><span>Button</span></inch-button>
          <inch-button size="xl" type="primary-warning"><span>Button</span></inch-button>
          <inch-button size="xxl" type="primary-warning"><span>Button</span></inch-button>

          <inch-button size="sm" type="secondary"><span>Button</span></inch-button>
          <inch-button size="xl" type="secondary"><span>Button</span></inch-button>
          <inch-button size="xxl" type="secondary"><span>Button</span></inch-button>

          <inch-button size="sm" type="secondary-critical"><span>Button</span></inch-button>
          <inch-button size="xl" type="secondary-critical"><span>Button</span></inch-button>
          <inch-button size="xxl" type="secondary-critical"><span>Button</span></inch-button>

          <inch-button size="sm" type="secondary-warning"><span>Button</span></inch-button>
          <inch-button size="xl" type="secondary-warning"><span>Button</span></inch-button>
          <inch-button size="xxl" type="secondary-warning"><span>Button</span></inch-button>

          <inch-button size="sm" type="secondary-gray"><span>Button</span></inch-button>
          <inch-button size="xl" type="secondary-gray"><span>Button</span></inch-button>
          <inch-button size="xxl" type="secondary-gray"><span>Button</span></inch-button>

          <inch-button size="sm" type="secondary-gray" disabled><span>Button</span></inch-button>
          <inch-button size="xl" type="secondary-gray" disabled><span>Button</span></inch-button>
          <inch-button size="xxl" type="secondary-gray" disabled><span>Button</span></inch-button>

          <inch-button size="sm" type="tertiary"><span>Button</span></inch-button>
          <inch-button size="xl" type="tertiary"><span>Button</span></inch-button>
          <inch-button size="xxl" type="tertiary"><span>Button</span></inch-button>

          <inch-button size="sm" type="tertiary-gray"><span>Button</span></inch-button>
          <inch-button size="xl" type="tertiary-gray"><span>Button</span></inch-button>
          <inch-button size="xxl" type="tertiary-gray"><span>Button</span></inch-button>

          <inch-button size="sm" disabled><span>Button</span></inch-button>
          <inch-button size="xl" disabled><span>Button</span></inch-button>
          <inch-button size="xxl" disabled><span>Button</span></inch-button>
        </div>
      </inch-card>
      
      <inch-card>
        <inch-segmented-control .items="${this.data}" .select="${this.data[0]}"></inch-segmented-control>
        <inch-segmented-control .items="${this.data}" .select="${this.data[1]}"></inch-segmented-control>
        <inch-segmented-control .items="${this.data}" .select="${this.data[2]}"></inch-segmented-control>
        <inch-segmented-control .items="${this.dataAndTemplate}" .select="${this.data[2]}"></inch-segmented-control>
      </inch-card>
    `
  }
}