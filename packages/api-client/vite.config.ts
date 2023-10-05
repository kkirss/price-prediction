import { defineConfig } from 'vite'

import { combine, getBaseConfig, getLibraryConfig, getSolidJSConfig } from '@price-prediction/vite-config'

export default defineConfig(combine(
  getBaseConfig(),
  getLibraryConfig(),
  getSolidJSConfig()
))
