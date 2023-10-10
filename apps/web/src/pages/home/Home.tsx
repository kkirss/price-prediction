import { Component } from 'solid-js'

import { CenteredBox } from '~/layout/CenteredBox'
import { PricePredicting } from '~/pricePrediction'

const Home: Component = () =>
  <CenteredBox>
    <PricePredicting
      assetId='bitcoin'
      sx={{ minWidth: '50%' }}
    />
  </CenteredBox>

export default Home
