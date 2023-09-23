import { defineConfig } from 'vite'

import { combine, getBaseConfig, getLibraryConfig } from './src'

export default defineConfig(combine(
  getBaseConfig(),
  getLibraryConfig()
))
