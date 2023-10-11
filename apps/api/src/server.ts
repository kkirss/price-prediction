import * as process from 'process'

import { checkPricesForever } from '~/priceUpdate'

import { app } from './app'

const getPort = (): number => {
  const portString = process.env.PORT
  if (portString === undefined) {
    throw new Error('PORT environment variable is not defined')
  }
  const port = parseInt(portString, 10)
  if (Number.isNaN(port)) {
    throw new Error('PORT environment variable is not a number')
  }
  return port
}

// await checkPricesForever(5000)

checkPricesForever(5000).then(() => {
  console.error('Price checking loop exited unexpectedly')
  process.exit(1)
}, e => {
  console.error('Unexpected error when checking prices', e)
})

if (import.meta.env.PROD) {
  const port = getPort()
  console.log(`Starting server on port ${port}`)
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}

export const server = app
