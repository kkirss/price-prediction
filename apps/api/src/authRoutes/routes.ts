import { Router } from 'express'

import { LOGIN_PATH, LOGOUT_PATH, SIGNUP_PATH } from '@price-prediction/api-schema'

import { registerUnauthorizedRoute } from '~/auth/unauthorizedRoutes'

import { login } from './login'
import { signup } from './signup'
import { logout } from './logout'

const authRouter = Router()

registerUnauthorizedRoute(LOGIN_PATH)
registerUnauthorizedRoute(SIGNUP_PATH)

authRouter.post(LOGIN_PATH, login)
authRouter.post(SIGNUP_PATH, signup)
authRouter.post(LOGOUT_PATH, logout)

export { authRouter }
