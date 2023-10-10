import { type Component } from 'solid-js'
import { Card } from '@suid/material'
import { type SxProps } from '@suid/system'

import { AssetPriceDisplay } from '~/components/AssetPriceDisplay'

export const PricePrediction: Component<{
  assetName: string
  price: number
  currencySymbol: string
  priceDecimalPlaces?: number
  sx?: SxProps
}> = (props) => {
  const predictionTitle = (): string => `${props.assetName} Prediction`
  return (
    <Card
      sx={{
        ...props.sx,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
      elevation={2}
    >
      <AssetPriceDisplay
        assetName={predictionTitle()}
        price={props.price}
        priceDecimalPlaces={props.priceDecimalPlaces}
        currencySymbol={props.currencySymbol}
        muted
      />
    </Card>
  )
}
