import { Router } from 'express'

import { login } from './login'
import { signup } from './signup'

const authRouter = Router()

authRouter.post('/auth/login', login)
authRouter.post('/auth/signup', signup)

export { authRouter }
