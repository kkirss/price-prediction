import { Component } from 'solid-js'
import { AppBar, Button, Toolbar, Typography } from '@suid/material'

import { ToggleDarkMode } from '@price-prediction/ui-theme'

import { SIGNUP_PATH } from '~/pages/auth/paths'

const NavigationBar: Component = () => (
  <AppBar position='static'>
    <Toolbar>
      <Typography variant='h6' sx={{ flexGrow: 1 }}>
        Price Prediction
      </Typography>
      <Button
        href={SIGNUP_PATH}
        variant='contained'
        color='primary'
        sx={{ ml: 1 }}
      >
        Sign up
      </Button>
      <ToggleDarkMode sx={{ ml: 1 }} />
    </Toolbar>
  </AppBar>
)

export default NavigationBar
