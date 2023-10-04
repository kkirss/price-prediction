import { Router } from 'express'

import { signup } from './signup'

const authRouter = Router()

authRouter.post('/auth/signup', signup)

export { authRouter }
