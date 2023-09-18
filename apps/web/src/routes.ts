import type { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(async () => await import('./pages/home/Home'))
  }
]
