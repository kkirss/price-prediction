import { RequestHandler, Router } from 'express'

import { HEALTH_PATH, HEALTH_ROOT_PATH } from '@price-prediction/api-schema'

import { registerUnauthorizedRoute } from '~/auth'

const healthRouter = Router()

const getHealth: RequestHandler = (_, res) =>
  res.send('OK')

registerUnauthorizedRoute(HEALTH_ROOT_PATH)
registerUnauthorizedRoute(HEALTH_PATH)

healthRouter.get(HEALTH_ROOT_PATH, getHealth)
healthRouter.get(HEALTH_PATH, getHealth)

export { healthRouter }
