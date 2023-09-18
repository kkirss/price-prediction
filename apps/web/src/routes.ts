import type { RouteDefinition } from '@solidjs/router'

import Home from './pages/home/Home'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home
  }
]
