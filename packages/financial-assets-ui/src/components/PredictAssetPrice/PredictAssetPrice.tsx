import { type Component } from 'solid-js'
import { Card } from '@suid/material'
import { type SxProps } from '@suid/system'

import { AssetPriceDisplay } from '~/components/AssetPriceDisplay'
import { UpDownButtons } from '~/components/UpDownButtons'
import { PredictionDirection } from '~/types'

export const PredictAssetPrice: Component<{
  assetName: string
  price: number
  priceDecimalPlaces?: number
  currencySymbol: string
  onPredictPrice: (direction: PredictionDirection) => void
  predictionLocked?: boolean
  sx?: SxProps
}> = (props) => (
  <Card
    sx={{
      ...props.sx,
      p: 4,
      display: 'flex',
      flexDirection: 'row',
      gap: 2
    }}
    elevation={2}
  >
    <AssetPriceDisplay
      assetName={props.assetName}
      price={props.price}
      priceDecimalPlaces={props.priceDecimalPlaces}
      currencySymbol={props.currencySymbol}
      sx={{ flexGrow: 1 }}
    />
    <UpDownButtons
      onUpClick={() => props.onPredictPrice('up')}
      onDownClick={() => props.onPredictPrice('down')}
      disabled={props.predictionLocked ?? false}
      sx={{ flexGrow: 0, flexShrink: 1 }}
    />
  </Card>
)
