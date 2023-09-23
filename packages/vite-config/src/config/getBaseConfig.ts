import { type UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { readFileSync } from 'fs'

const PROJECT_NAME_PREFIX = '@price-prediction/'

export const getBaseConfig = (): UserConfig => {
  const projectPackageJson = JSON.parse(readFileSync('package.json').toString())
  const projectDependencies = projectPackageJson.dependencies
  const projectNameWithoutPrefix = projectPackageJson.name.split(PROJECT_NAME_PREFIX)[1]

  return ({
    plugins: [
      tsconfigPaths()
    ],
    server: {
      port: 3000
    },
    preview: {
      port: 3001
    },
    build: {
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          /*
          * Split each dependency to its own chunk
          * This allows chunks to be fetched in parallel and on demand.
          * See https://rollupjs.org/configuration-options/#output-manualchunks
          *
          * @param {string} id - Refers to a file used in the build.
          */
          manualChunks: (id) => {
            // Note: We look up package names from package.json as it's difficult to parse the id for a name.
            if (id.includes('node_modules')) { // 3rd-party dependency
              // Find a dependency in package.json that matches the id.
              return Object.keys(projectDependencies)
                .find((dependency) => {
                  // Strip everything before the last `node_modules/`
                  //  because some dependencies may include another dependency in the full path.
                  const strippedId = id.split('node_modules/').slice(-1)[0]
                  return strippedId.includes(dependency)
                })
            } else if (id.includes('packages')) { // Local dependency
              // Skip the current project.
              const packageNameWithoutPrefix = id.split('/packages/')[1].split('/')[0]
              if (projectNameWithoutPrefix === packageNameWithoutPrefix) {
                return
              }

              // Look up the package name in its package.json.
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
      setupFiles: ['src/setupVitest.ts']
    }
  })
}
