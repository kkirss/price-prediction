import asyncHandler from 'express-async-handler'

import { createSession, createUser, getResponseSession } from '~/auth'
import { isUniqueConstraintError } from '~/database'
import { createValidatorError } from '~/openAPI/errors'

export const signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await createUser(username, password)
    const session = await createSession(user.userId)
    res
      .status(201)
      .json(getResponseSession(session))
  } catch (e) {
    if (isUniqueConstraintError(e)) {
      throw createValidatorError('Username already taken', 'username')
    }
    throw e
  }
})
