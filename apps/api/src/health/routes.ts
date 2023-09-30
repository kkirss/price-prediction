import { RequestHandler, Router } from 'express'

const healthRouter = Router()

const getHealth: RequestHandler = (_, res) =>
  res.send('OK')

healthRouter.get('/', getHealth)
healthRouter.get('/health', getHealth)

export { healthRouter }
