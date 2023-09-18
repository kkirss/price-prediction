import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import solidPlugin from 'vite-plugin-solid'
import suidPlugin from '@suid/vite-plugin'

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
    target: 'esnext'
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
