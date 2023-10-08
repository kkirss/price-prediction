import { Router } from 'express'

import { registerUnauthorizedRoute } from '~/auth/unauthorizedRoutes'

import { login } from './login'
import { signup } from './signup'
import { logout } from './logout'

const authRouter = Router()

registerUnauthorizedRoute('/auth/login')
registerUnauthorizedRoute('/auth/signup')

authRouter.post('/auth/login', login)
authRouter.post('/auth/signup', signup)
authRouter.post('/auth/logout', logout)

export { authRouter }
