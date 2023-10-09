import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import path from 'path'
import cors from 'cors'
import express, { type Request, type Response } from 'express'
import { middleware as openAPIMiddleware } from 'express-openapi-validator'

import { type APIError, openAPISchema } from '@price-prediction/api-schema'

import { authMiddleware } from './auth/authMiddleware'
import { authRouter } from '~/authRoutes/routes'
import { assetsRouter } from '~/assetsRoutes/routes'
import { healthRouter } from '~/healthRoutes/routes'
import { OpenAPIError } from '~/openAPI/errors'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))
const openAPISchemaPath = path.join(_dirname, 'openAPI/schema.json')

const app = express()

app.use(express.json())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.CORS_ORIGIN : '*'
}))

app.use('/openapi.json', express.static(openAPISchemaPath))
app.use(
  openAPIMiddleware({
    // @ts-expect-error
    apiSpec: openAPISchema,
    validateResponses: true
  })
)
app.use(authMiddleware)

app.use(healthRouter)
app.use(authRouter)
app.use(assetsRouter)

app.use((err: OpenAPIError, _req: Request, res: Response, _next: any) => {
  console.error(err)
  if (err.status === undefined) {
    res.status(500).json({
      error: 'Internal Server Error'
    })
  }
  const errorResponse: APIError = {
    error: err.message,
    errors: err.errors
  }
  res.status(err.status).json(errorResponse)
})

export { app }
