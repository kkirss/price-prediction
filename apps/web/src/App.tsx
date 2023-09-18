import type { Component } from 'solid-js'
import { useRoutes } from '@solidjs/router'
import { Container, CssBaseline } from '@suid/material'

import NavigationBar from './navbar/NavigationBar'
import { routes } from './routes'

const App: Component = () => {
  const Route = useRoutes(routes)

  return (
    <>
      <CssBaseline />
      <NavigationBar />
      <Container>
        <Route />
      </Container>
    </>
  )
}

export default App
