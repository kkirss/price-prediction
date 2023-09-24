import { type UserConfig } from 'vite'
import { externalizeDeps } from 'vite-plugin-externalize-deps'

export const getLibraryConfig = (): UserConfig => ({
  plugins: [
    externalizeDeps({
      deps: false
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es']
    }
  }
})
