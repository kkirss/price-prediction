import { Component } from 'solid-js'
import { AppBar, Toolbar, Typography } from '@suid/material'

import { ToggleDarkMode } from '@price-prediction/ui-theme'

const NavigationBar: Component = () => (
  <AppBar position='static'>
    <Toolbar>
      <Typography variant='h6' sx={{ flexGrow: 1 }}>
        Price Prediction
      </Typography>
      <ToggleDarkMode sx={{ ml: 1 }} />
    </Toolbar>
  </AppBar>
)

export default NavigationBar
