import { it } from 'vitest'

import { createUser, deleteUserIfExists } from './user'
import { createSession } from './session'

export const getRandomString = (): string =>
  Math.random().toString(36).substring(2)

export interface AuthFixtures {
  username: string
  password: string
  userId: string
  authHeader: string
}

export const withAuthenticationIt = it.extend<AuthFixtures>({
  // eslint-disable-next-line no-empty-pattern
  username: async ({}, use) => (
    await use(`test_user_${getRandomString()}`)
  ),
  // eslint-disable-next-line no-empty-pattern
  password: async ({}, use) => (
    await use(getRandomString())
  ),
  userId: async ({ username, password }, use) => {
    const user = await createUser(username, password)
    await use(user.userId)
    await deleteUserIfExists(user.username)
  },
  authHeader: async ({ userId }, use) => {
    const sessionId: string = (await createSession(userId)).sessionId
    const authHeader = `Bearer ${sessionId}`
    await use(authHeader)
  }
})

// export const withAuthFixtures = (wrappingIt: typeof it) =>
//   wrappingIt.extend<AuthFixtures>({
//     user: async (context, use) => {
//       const user = await createUser(`test_user_${getRandomString()}`, getRandomString())
//       await use(user)
//       await deleteUserIfExists(user.username)
//     },
//     authHeader: async ({user}, use) => {
//       const sessionId: string = (await createSession(user.userId)).sessionId
//       const authHeader = `Bearer ${sessionId}`;
//       await use(authHeader)
//     }
//   })
