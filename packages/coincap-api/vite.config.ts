import { defineConfig } from 'vite'

import { combine, getBaseConfig, getLibraryConfig } from '@price-prediction/vite-config'

export default defineConfig(combine(
  getBaseConfig(),
  getLibraryConfig(),
  {
    build: {
      lib: {
        entry: {
          // Export mocks as a separate entry point
          mocks: 'src/mocks.ts',
          index: 'src/index.ts'
        },
        fileName: undefined
      }
    }
  }
))
