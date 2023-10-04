import { Session, User } from 'lucia'

import { auth } from './auth'

export type ResponseSession = Exclude<Session, ['fresh', 'state']>

export const createSession = async (user: User): Promise<Session> =>
  await auth.createSession({
    userId: user.userId,
    attributes: {}
  })

export const getResponseSession = (session: Session): ResponseSession => {
  const { fresh, state, ...rest } = session
  return rest
}
