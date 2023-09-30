import express from 'express'

import { healthRouter } from './health/routes'

const app = express()

app.use('/', healthRouter)

export { app }
