import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import path from 'path'
import express, { Request, type Response } from 'express'
import { middleware as openAPIMiddleware } from 'express-openapi-validator'

import { healthRouter } from '~/healthRoutes/routes'
import { OpenAPIError } from '~/openAPI/error'
import openAPISchema from '~/openAPI/schema.json'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))
const openAPISchemaPath = path.join(_dirname, 'openAPI/schema.json')

const app = express()

app.use(express.json())

app.use('/openapi.json', express.static(openAPISchemaPath))
app.use(
  openAPIMiddleware({
    // @ts-expect-error
    apiSpec: openAPISchema,
    validateResponses: true
  })
)

app.use(healthRouter)

app.use((err: OpenAPIError, _req: Request, res: Response, _next: any) => {
  console.error(err)
  if (err.status === undefined) {
    res.status(500).json({
      error: 'Internal Server Error'
    })
  }
  res.status(err.status).json({
    error: err.message,
    errors: err.errors
  })
})

export { app }
