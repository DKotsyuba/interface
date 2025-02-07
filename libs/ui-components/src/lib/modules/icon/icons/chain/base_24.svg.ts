import { svg } from 'lit';
import { IconContext } from '../icon-context';

export const base24Svg = ({ width, height }: IconContext) => svg`
<svg width="${width ?? 24}" height="${height ?? 24}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_6718_21395)">
    <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#0052FF"/>
    <path d="M11.9815 19.5C16.1338 19.5 19.5 16.1421 19.5 12C19.5 7.85785 16.1338 4.5 11.9815 4.5C8.0828 4.5 4.87723 7.46 4.5 11.25H14.6214V12.75H4.5C4.87723 16.54 8.0828 19.5 11.9815 19.5Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_6718_21395">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
`