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
      "src": "icons/android/android-launchericon-48-48.png",
      "sizes": "48x48",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/android/android-launchericon-72-72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/android/android-launchericon-96-96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/android/android-launchericon-144-144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/android/android-launchericon-192-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/android/android-launchericon-512-512.png",
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
