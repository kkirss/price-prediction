import { Component } from 'solid-js'

import { CenteredBox } from '~/layout/CenteredBox'
import { PricePrediction } from '~/pricePrediction'

const Home: Component = () =>
  <CenteredBox>
    <PricePrediction
      assetId='bitcoin'
      sx={{ minWidth: '50%' }}
    />
  </CenteredBox>

export default Home
