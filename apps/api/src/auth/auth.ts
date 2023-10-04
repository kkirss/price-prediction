import { lucia } from 'lucia'
import { express } from 'lucia/middleware'
import { prisma } from '@lucia-auth/adapter-prisma'

import { dbClient } from '~/database'

export const auth = lucia({
  adapter: prisma(dbClient),
  middleware: express(),
  env: process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV',
  getUserAttributes: (user) => {
    return {
      username: user.username
    }
  }
})

export type Auth = typeof auth
