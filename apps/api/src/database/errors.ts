import { Prisma } from '@prisma/client'

export const isUniqueConstraintError = (e: any): boolean =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
