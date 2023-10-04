import { Prisma } from '@prisma/client'
import asyncHandler from 'express-async-handler'
import { type Session, type User } from 'lucia'

import { auth } from '~/auth'
import { HttpError } from '~/openAPI/error'

import { getResponseSession } from './session'

const createUser = async (username: string, password: string): Promise<User> =>
  await auth.createUser({
    key: {
      providerId: 'username',
      providerUserId: username,
      password
    },
    attributes: {
      username
    }
  })

const createSession = async (user: User): Promise<Session> =>
  await auth.createSession({
    userId: user.userId,
    attributes: {}
  })

export const signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await createUser(username, password)
    const session = await createSession(user)
    res.status(201).json(getResponseSession(session))
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
