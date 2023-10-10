import asyncHandler from 'express-async-handler'

import { type SignupRequest, type Session as ResponseSession } from '@price-prediction/api-schema'

import { createSession, createUser, getResponseSession } from '~/auth'
import { isUniqueConstraintError } from '~/database'
import { createValidatorError } from '~/openAPI'

export const signup = asyncHandler(async (req, res) => {
  const { username, password }: SignupRequest = req.body

  try {
    const user = await createUser(username, password)
    const session = await createSession(user.userId)
    const responseSession: ResponseSession = getResponseSession(session)
    res
      .status(201)
      .json(responseSession)
  } catch (e) {
    if (isUniqueConstraintError(e)) {
      throw createValidatorError('Username already taken', 'username')
    }
    throw e
  }
})
