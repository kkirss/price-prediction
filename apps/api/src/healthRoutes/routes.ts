import { RequestHandler, Router } from 'express'

import { registerUnauthorizedRoute } from '~/auth/unauthorizedRoutes'

const healthRouter = Router()

const getHealth: RequestHandler = (_, res) =>
  res.send('OK')

registerUnauthorizedRoute('/')
registerUnauthorizedRoute('/health')

healthRouter.get('/', getHealth)
healthRouter.get('/health', getHealth)

export { healthRouter }
