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
  }
})
