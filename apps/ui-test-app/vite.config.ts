/// <reference types='vitest' />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'node:path';

process.title = 'one-inch-community__ui-test-app_serve'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/ui-test-app',

  server: {
    port: 4400,
    host: '0.0.0.0',
    // watch: {
    //   usePolling: true,
    //   interval: 1000,
    // }
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    nxViteTsPaths(),
    {
      name: 'watch-custom-folder',
      configureServer(server) {
        const distLibs = path.resolve(path.dirname(path.dirname(__dirname)), 'dist', 'libs')
        server.watcher.add(distLibs)
        // const send = debounce(() => {
        //   server.ws.send({ type: 'full-reload' })
        //   console.log('full reload')
        // }, 1000)
        // server.watcher.on('change', (filePath) => {
        //   if (filePath.includes('dist/libs')) {
        //     send()
        //   }
        // });
      }
    }
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/apps/ui-test-app',
    reportCompressedSize: true,
    terserOptions: {
      format: {
        comments: false
      },
      compress: true
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  esbuild: { legalComments: 'none' },
});
