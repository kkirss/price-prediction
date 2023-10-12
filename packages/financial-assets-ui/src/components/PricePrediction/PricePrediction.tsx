import { type Component, Switch, Match, Show } from 'solid-js'
import { Card, CardContent, Typography } from '@suid/material'
import { type SxProps, type SystemProps } from '@suid/system'

import { PriceDisplay } from '~/components/PriceDisplay'
import { PredictionDirection, type PredictionStatus } from '~/types'

export const PricePrediction: Component<{
  assetName: string
  currentPrice: number
  currencySymbol: string
  priceDecimalPlaces?: number
  initialPrice: number
  predictedDirection: PredictionDirection
  finalPrice: number | null
  predictionStatus: PredictionStatus
  sx?: SxProps
}> = (props) => {
  const isPending = (): boolean => props.predictionStatus === 'pending'
  const isNotPending = (): boolean => props.predictionStatus !== 'pending'
  const predictionStatusColor = (): SystemProps['color'] => {
    switch (props.predictionStatus) {
      case 'correct':
        return 'success.main'
      case 'incorrect':
        return 'error.main'
      default:
        return undefined
    }
  }
  const isCorrectPrediction = () => {
    switch (props.predictedDirection) {
      case 'up':
        return props.currentPrice > props.initialPrice
      case 'down':
        return props.currentPrice < props.initialPrice
    }
  }
  const priceColor = (): SystemProps['color'] => {
    if (isPending()) {
      return isCorrectPrediction()
        ? 'success.main'
        : 'error.main'
    } else {
      return predictionStatusColor()
    }
  }
  return (
    <Card elevation={2} sx={props.sx}>
      <CardContent>
        <Show
          when={isPending()}
          fallback={
            <Typography>
              You predicted the price will go {props.predictedDirection} from:
            </Typography>
          }
        >
          <Typography>
            You predict the price will go {props.predictedDirection} from:
          </Typography>
        </Show>
        <PriceDisplay
          price={props.initialPrice}
          priceDecimalPlaces={props.priceDecimalPlaces}
          currencySymbol={props.currencySymbol}
          muted={isPending()}
          textColor={priceColor()}
        />
        <Typography color={predictionStatusColor()}>
          <Switch>
            <Match when={props.predictionStatus === 'correct'}>
              You were correct!
            </Match>
            <Match when={props.predictionStatus === 'incorrect'}>
              You were incorrect.
            </Match>
            <Match when={props.predictionStatus === 'pending'}>
              Pending...
            </Match>
          </Switch>
        </Typography>
        <Show when={isNotPending()}>
          <Typography sx={{ mt: 4 }}>
            The final price was:
          </Typography>
          <PriceDisplay
            price={props.finalPrice ?? 0}
            priceDecimalPlaces={props.priceDecimalPlaces}
            currencySymbol={props.currencySymbol}
            muted
          />
        </Show>
      </CardContent>
    </Card>
  )
}
