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

if (import.meta.env.PROD) {
  const port = getPort()
  console.log(`Starting server on port ${port}`)
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}

export const server = app
