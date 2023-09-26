import { Component } from 'solid-js'
import { Box } from '@suid/material'

import { PricePrediction } from '~/pricePrediction'

const Home: Component = () =>
  <Box sx={{
    mt: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}
  >
    <PricePrediction
      sx={{ minWidth: '50%' }}
    />
  </Box>

export default Home
