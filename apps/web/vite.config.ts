import { defineConfig } from 'vite'

import { combine, getBaseConfig, getSolidJSConfig } from '@price-prediction/vite-config'

export default defineConfig(combine(
  getBaseConfig(),
  getSolidJSConfig()
))
