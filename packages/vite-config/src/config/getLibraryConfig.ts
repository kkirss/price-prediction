import { type UserConfig } from 'vite'
import { externalizeDeps } from 'vite-plugin-externalize-deps'
import dts from 'vite-plugin-dts'

export const getLibraryConfig = (): UserConfig => ({
  plugins: [
    dts({
      entryRoot: 'src',
      insertTypesEntry: true
    }),
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
