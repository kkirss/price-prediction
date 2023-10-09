import { Component, Show } from 'solid-js'
import { AppBar, Box, Link, Toolbar, Typography } from '@suid/material'
import { A, useLocation } from '@solidjs/router'

import { ToggleDarkMode } from '@price-prediction/ui-theme'

import AuthInfo from '~/auth/AuthInfo'

const NavigationBarHeader: Component = () => {
  const location = useLocation()
  const header = 'Price Prediction'
  return (
    <Show
      when={location.pathname !== '/'}
      fallback={
        <Typography variant='h6'>
          {header}
        </Typography>
      }
    >
      <Link href='/' component={A} variant='h6'>
        {header}
      </Link>
    </Show>
  )
}

const NavigationBar: Component = () =>
  <AppBar position='static'>
    <Toolbar>
      <NavigationBarHeader />
      <Box sx={{ flexGrow: 1 }} />
      <AuthInfo />
      <ToggleDarkMode sx={{ ml: 1 }} />
    </Toolbar>
  </AppBar>

export default NavigationBar
