import * as zod from 'zod'

export const signupSchema = zod.object({
  username: zod.string().min(1),
  password: zod.string().min(8)
})
