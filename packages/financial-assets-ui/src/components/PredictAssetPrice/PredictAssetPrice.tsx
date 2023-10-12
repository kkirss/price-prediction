import { Show, type Component } from 'solid-js'
import { Alert, Card, CardContent, Stack } from '@suid/material'
import { type SxProps } from '@suid/system'

import { PriceDisplay } from '~/components/PriceDisplay'
import { UpDownButtons } from '~/components/UpDownButtons'
import { PredictionDirection } from '~/types'

export const PredictAssetPrice: Component<{
  price: number
  priceDecimalPlaces?: number
  currencySymbol: string
  onPredictPrice: (direction: PredictionDirection) => void
  disabled?: boolean
  sx?: SxProps
}> = (props) => (
  <Card elevation={2} sx={props.sx}>
    <CardContent>
      <Stack direction='column' gap={2}>
        <Stack direction='row' gap={2}>
          <PriceDisplay
            price={props.price}
            priceDecimalPlaces={props.priceDecimalPlaces}
            currencySymbol={props.currencySymbol}
            sx={{ flexGrow: 1 }}
          />
          <UpDownButtons
            onUpClick={() => props.onPredictPrice('up')}
            onDownClick={() => props.onPredictPrice('down')}
            disabled={props.disabled ?? false}
            sx={{ flexGrow: 0, flexShrink: 1 }}
          />
        </Stack>
        <Show when={(() => !(props.disabled ?? false))()}>
          <Alert severity='info'>
            Predict whether the price will go up or down in the next 1 minute.
          </Alert>
        </Show>
      </Stack>
    </CardContent>
  </Card>
)
