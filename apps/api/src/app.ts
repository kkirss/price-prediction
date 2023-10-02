import express from 'express'

import { healthRouter } from './health/routes'

const app = express()

app.use('/', healthRouter)

app.on('error', (err) => {
  console.error(err)
})

export { app }
