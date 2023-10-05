import asyncHandler from 'express-async-handler'

import { type LoginRequest, type Session as ResponseSession } from '@price-prediction/api-schema'

import { getResponseSession, tryLogin } from '~/auth'
import { createUnauthorizedError } from '~/openAPI'

export const login = asyncHandler(async (req, res) => {
  const { username, password }: LoginRequest = req.body

  const session = await tryLogin(username, password)

  if (session === null) {
    throw createUnauthorizedError('Invalid username or password')
  }
  const responseSession: ResponseSession = getResponseSession(session)
  res
    .status(200)
    .json(responseSession)
})
