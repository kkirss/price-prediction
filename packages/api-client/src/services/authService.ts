import { Accessor, createMemo, createSignal } from 'solid-js'

import type { Session } from '@price-prediction/api-schema'

export interface AuthInfo {
  isAuthenticated: Accessor<boolean>
  session: Accessor<Session | null>
  setSession: (session: Session) => void
}

const SESSION_STORAGE_KEY = 'session'

const setStoredSession = (session: Session): void => {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
}

const getStoredSession = (): Session | null => {
  const sessionStr = localStorage.getItem(SESSION_STORAGE_KEY)
  if (sessionStr === null) {
    return null
  }
  return JSON.parse(sessionStr) as Session
}

const clearStoredSession = (): void => {
  localStorage.removeItem(SESSION_STORAGE_KEY)
}

export const AuthService = (): AuthInfo => {
  const storedSession = createMemo(() => {
    const session = getStoredSession()
    if (session === null) {
      return null
    }

    if (Date.parse(session.idlePeriodExpiresAt) < Date.now()) {
      // Session has expired
      clearStoredSession()
      return null
    }
    if (Date.parse(session.activePeriodExpiresAt) < Date.now()) {
      // TODO: refresh token
    }
    return session
  })

  const [session, setSession] = createSignal<Session | null>(storedSession())
  return {
    isAuthenticated: createMemo(() => session() !== null),
    session,
    setSession: (session: Session) => {
      setStoredSession(session)
      setSession(session)
    }
  }
}
