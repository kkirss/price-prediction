import { Session } from 'lucia'

export type ResponseSession = Exclude<Session, ['fresh', 'state']>

export const getResponseSession = (session: Session): ResponseSession => {
  const { fresh, state, ...rest } = session
  return rest
}
