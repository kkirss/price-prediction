import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import solidPlugin from 'vite-plugin-solid'
import suidPlugin from '@suid/vite-plugin'

import { dependencies } from './package.json'

// Source: https://sambitsahoo.com/blog/vite-code-splitting-that-works.html
const renderChunks = (deps: Record<string, string>): Record<string, string[]> =>
  Object.fromEntries(
    Object.keys(deps)
      // TODO: Split local packages into separate chunks.
      //       Splitting local packages into separate chunks will include its peer dependencies in the chunk.
      //       This will greatly increase the size of the chunk.
      //       Bundling them together avoids this issue.
      .filter((key) => !key.startsWith('@price-prediction'))
      .map((key) => [key, [key]])
  )

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    solidPlugin(),
    suidPlugin()
  ],
  server: {
    port: 3000
  },
  preview: {
    port: 3001
  },
  build: {
    target: 'esnext',
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          ...renderChunks(dependencies)
        }
      }
    }
  },
  resolve: {
    conditions: ['development']
  },
  test: {
    deps: {
      // This is to avoid solid-js being loaded twice.
      // See https://github.com/solidjs/solid-testing-library#known-issues
      inline: [/solid-js/]
    },
    environment: 'jsdom',
    setupFiles: ['setupVitest.ts']
  }
})
