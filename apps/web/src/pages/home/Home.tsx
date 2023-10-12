import { Component } from 'solid-js'

import { CenteredBox } from '~/layout/CenteredBox'
import { PricePredicting } from '~/pricePrediction'

const Home: Component = () =>
  <CenteredBox>
    <PricePredicting assetSlug='bitcoin' />
  </CenteredBox>

export default Home
