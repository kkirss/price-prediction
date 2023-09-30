import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

import { combine, getBaseConfig } from '@price-prediction/vite-config'

export default defineConfig(combine(
  getBaseConfig(),
  {
    server: {
      port: 4000
    },
    plugins: [
      ...VitePluginNode({
        adapter: 'express',
        appPath: './src/server.ts',
        exportName: 'server'
      })
    ]
  }
))
