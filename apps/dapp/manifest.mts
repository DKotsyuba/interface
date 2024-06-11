import { ManifestOptions } from 'vite-plugin-pwa';

export const manifest = (baseHref?: string): Partial<ManifestOptions> => ({
  id: 'one_inch_dapp',
  start_url: baseHref ?? '/',
  name: '1inch dApp',
  short_name: '1inch dApp',
  description: '1inch dApp',
  background_color: '#ffffff',
  theme_color: '#ffffff',
  scope: baseHref ?? '/',
  display: 'standalone',
  display_override: [
    'minimal-ui',
    'window-controls-overlay',
    'browser',
  ],
  orientation: 'portrait-primary',
  protocol_handlers: [
    {
      protocol: 'web+oneInchDapp',
      url: '?params=%s',
    }
  ],
  icons: [
    {
      "src": "icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ],
  screenshots: [
    {
      src: 'screenshots/mobile_dark.png',
      sizes: '750x1334',
      type: 'image/png',
      form_factor: 'narrow'
    },
    {
      src: 'screenshots/mobile_light.png',
      sizes: '750x1334',
      type: 'image/png',
      form_factor: 'narrow'
    },
    {
      src: 'screenshots/desktop_dark.png',
      sizes: '1920x1080',
      type: 'image/png',
      form_factor: 'wide'
    },
    {
      src: 'screenshots/desktop_light.png',
      sizes: '1920x1080',
      type: 'image/png',
      form_factor: 'wide'
    }
  ]
})
