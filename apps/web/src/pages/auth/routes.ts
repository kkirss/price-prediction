import { type RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'

import { LOGIN_PATH, SIGNUP_PATH } from './paths'

export const authRoutes: RouteDefinition[] = [
  {
    path: LOGIN_PATH,
    component: lazy(async () => await import('./login/Login'))
  },
  {
    path: SIGNUP_PATH,
    component: lazy(async () => await import('./signup/Signup'))
  }
]
