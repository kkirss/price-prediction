import asyncHandler from 'express-async-handler'

import { getResponseSession, tryLogin } from '~/auth'
import { createUnauthorizedError } from '~/openAPI'

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const session = await tryLogin(username, password)

  if (session === null) {
    throw createUnauthorizedError('Invalid username or password')
  }
  res
    .status(200)
    .json(getResponseSession(session))
})
