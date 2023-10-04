import { LuciaError, Session } from 'lucia'

import { auth } from './auth'
import { createUnauthorizedError } from '~/openAPI'

export type ResponseSession = Exclude<Session, ['fresh', 'state']>

export const createSession = async (userId: string): Promise<Session> =>
  await auth.createSession({
    userId,
    attributes: {}
  })

export const getResponseSession = (session: Session): ResponseSession => {
  const { fresh, state, ...rest } = session
  return rest
}

export const tryLogin = async (username: string, password: string): Promise<Session | null> => {
  try {
    const key = await auth.useKey('username', username, password)
    return await createSession(key.userId)
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === 'AUTH_INVALID_KEY_ID' ||
       e.message === 'AUTH_INVALID_PASSWORD')
    ) {
      throw createUnauthorizedError('Invalid username or password')
    }
    throw e
  }
}
