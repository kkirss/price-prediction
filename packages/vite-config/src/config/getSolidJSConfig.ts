import { type UserConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import suidPlugin from '@suid/vite-plugin'

export const getSolidJSConfig = (): UserConfig => ({
  plugins: [
    solidPlugin(),
    suidPlugin()
  ],
  test: {
    deps: {
      // This is to avoid solid-js being loaded twice.
      // See https://github.com/solidjs/solid-testing-library#known-issues
      inline: [/solid-js/]
    },
    environment: 'jsdom'
  }
})
