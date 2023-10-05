import * as zod from 'zod'

// TODO: Share this validation between the client and server
export const signupSchema = zod.object({
  username: zod.string().min(1),
  password: zod.string().min(8)
})
