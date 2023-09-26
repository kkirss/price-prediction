import { Component } from 'solid-js'
import { type SxProps } from '@suid/system'

import { PredictAssetPrice } from '@price-prediction/financial-assets-ui'

export const PricePrediction: Component<{
  sx?: SxProps
}> = (props) =>
  <PredictAssetPrice
    sx={props.sx}
    assetName='Bitcoin'
    price={9001}
    currencySymbol='€'
    onPredictPrice={() => {
    }}
  />
