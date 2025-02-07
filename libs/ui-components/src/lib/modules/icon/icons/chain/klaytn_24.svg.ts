import { svg } from 'lit';
import { IconContext } from '../icon-context';

export const klaytn24Svg = ({ width, height }: IconContext) => svg`
<svg width="${width ?? 24}" height="${height ?? 24}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_6718_21398)"/>
  <circle cx="12" cy="12" r="12" fill="url(#paint1_linear_6718_21398)"/>
  <path d="M12.4299 0.00758978L6.31471 16.1058L19.6865 2.7852C20.2496 3.25546 20.769 3.77636 21.2376 4.34092L13.5781 12.0004L21.2138 19.6884C20.7672 20.2231 20.275 20.7183 19.743 21.1681L11.9991 13.4741L4.30826 21.2127C3.72776 20.7276 3.1938 20.1886 2.71408 19.6034L9.4727 1.8948L0.019043 11.2959C0.383713 4.99619 5.60795 0 11.9991 0C12.1433 0 12.2869 0.00254407 12.4299 0.00758978Z" fill="white"/>
  <defs>
    <linearGradient id="paint0_linear_6718_21398" x1="20.6519" y1="3.89474" x2="5.17822" y2="20.3158" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF8C00"/>
      <stop offset="1" stop-color="#780000"/>
    </linearGradient>
    <linearGradient id="paint1_linear_6718_21398" x1="8.49401" y1="8.47368" x2="20.6519" y2="20.6316" gradientUnits="userSpaceOnUse">
      <stop stop-color="#D30168" stop-opacity="0"/>
      <stop offset="1" stop-color="#D30168"/>
    </linearGradient>
  </defs>
</svg>

`