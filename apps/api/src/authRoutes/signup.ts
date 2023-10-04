import { Prisma } from '@prisma/client'
import asyncHandler from 'express-async-handler'

import { HttpError } from '~/openAPI/error'
import { createSession, createUser, getResponseSession } from '~/auth'

export const signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await createUser(username, password)
    const session = await createSession(user)
    res
      .status(201)
      .json(getResponseSession(session))
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      throw HttpError.create({
        status: 400,
        message: 'Username already taken',
        path: '/body/username'
      })
    }
    throw e
  }
})
