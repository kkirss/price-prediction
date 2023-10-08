import * as zod from 'zod'

export const loginSchema = zod.object({
  username: zod.string().min(1),
  password: zod.string().min(8)
})
