import { Component } from 'solid-js'
import { Box } from '@suid/material'
import { PredictAssetPrice } from '@price-prediction/financial-assets-ui'

const Home: Component = () => (
  <Box sx={{
    mt: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}
  >
    <PredictAssetPrice
      sx={{ minWidth: '50%' }}
      assetName='Bitcoin'
      price={9001}
      currencySymbol='€'
      onPredictPrice={() => {}}
    />
  </Box>
)

export default Home
