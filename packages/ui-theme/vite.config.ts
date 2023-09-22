import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'
import { externalizeDeps } from 'vite-plugin-externalize-deps'
import solidPlugin from 'vite-plugin-solid'
import suidPlugin from '@suid/vite-plugin'
import { readFileSync } from 'fs'

const projectPackageJson = JSON.parse(readFileSync('package.json').toString())

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      entryRoot: 'src',
      insertTypesEntry: true
    }),
    externalizeDeps({
      deps: false
    }),
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
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es']
    },
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return Object.keys(projectPackageJson.dependencies).find((dependency) => {
              const strippedId = id.split('node_modules/').slice(-1)[0]
              return strippedId.includes(dependency)
            })
          } else if (id.includes('packages')) {
            const projectSplitName = projectPackageJson.name.split('@price-prediction/')[1]
            const packageSplitName = id.split('/packages/')[1].split('/')[0]
            if (projectSplitName === packageSplitName) {
              return
            }
            const packageDir = id.split('/dist')[0]
            if (!id.includes('dist')) {
              throw new Error(`Package with id ${id} does not contain dist`)
            }
            const packageJson = JSON.parse(readFileSync(`${packageDir}/package.json`).toString())
            return packageJson.name
          }
        }
      }
    },
    target: 'esnext'
  },
  resolve: {
    conditions: ['development']
  },
  test: {
    deps: {
      // This is to avoid solid-js being loaded twice.
      // See https://github.com/solidjs/solid-testing-library#known-issues
      inline: [/solid-js/]
    },
    environment: 'jsdom',
    setupFiles: ['src/setupVitest.ts']
  }
})
