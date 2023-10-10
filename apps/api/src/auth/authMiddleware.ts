import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import { createUnauthorizedError } from '~/openAPI'

import { auth } from './auth'
import { isUnauthorizedRoute } from './unauthorizedRoutes'

export const authMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (isUnauthorizedRoute(req.path)) {
    return next()
  }

  const authRequest = auth.handleRequest(req, res)
  const session = await authRequest.validateBearerToken()

  if (session === null) {
    throw createUnauthorizedError('Unauthorized')
  }

  res.locals.user = session.user
  res.locals.sessionId = session.sessionId
  res.locals.authRequest = authRequest

  return next()
})
