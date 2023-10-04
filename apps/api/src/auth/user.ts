import { User } from 'lucia'

import { auth } from './auth'

export const createUser = async (username: string, password: string): Promise<User> =>
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
