import type { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'

import { authRoutes } from '~/pages/auth/routes'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(async () => await import('./pages/home/Home'))
  },
  ...authRoutes
]
