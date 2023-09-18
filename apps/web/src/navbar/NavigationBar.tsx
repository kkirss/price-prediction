import { Component } from 'solid-js'
import { AppBar, Toolbar, Typography } from '@suid/material'

const NavigationBar: Component = () => (
  <AppBar position='static'>
    <Toolbar>
      <Typography variant='h6'>
        Price Prediction
      </Typography>
    </Toolbar>
  </AppBar>
)

export default NavigationBar
