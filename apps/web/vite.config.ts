import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import solidPlugin from 'vite-plugin-solid'
import suidPlugin from '@suid/vite-plugin'
import { readFileSync } from 'fs'

import { dependencies } from './package.json'

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
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return Object.keys(dependencies).find((dependency) => {
              const strippedId = id.split('node_modules/').slice(-1)[0]
              return strippedId.includes(dependency)
            })
          } else if (id.includes('packages')) {
            if (!id.includes('dist')) {
              throw new Error(`Package with id ${id} does not contain dist`)
            }
            const packageDir = id.split('/dist')[0]
            const packageJson = JSON.parse(readFileSync(`${packageDir}/package.json`).toString())
            return packageJson.name
          }
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
