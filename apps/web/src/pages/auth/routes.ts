import { type RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'

import { SIGNUP_PATH } from './paths'

export const authRoutes: RouteDefinition[] = [
  {
    path: SIGNUP_PATH,
    component: lazy(async () => await import('./signup/Signup'))
  }
]
