import { User } from 'lucia'

import { auth } from './auth'
import { dbClient } from '~/database'

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

export const deleteUserIfExists = async (username: string): Promise<void> => {
  await dbClient.user.deleteMany({
    where: {
      username
    }
  })
}
