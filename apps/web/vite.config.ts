import { defineConfig } from 'vite'
import solidDevtoolsPlugin from 'solid-devtools/vite'

import { combine, getBaseConfig, getSolidJSConfig } from '@price-prediction/vite-config'

export default defineConfig(combine(
  {
    plugins: [
      solidDevtoolsPlugin({
        autoname: true
      })
    ]
  },
  getBaseConfig(),
  getSolidJSConfig()
))
