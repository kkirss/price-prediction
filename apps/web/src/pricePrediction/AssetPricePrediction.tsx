import { Alert, CircularProgress } from '@suid/material'
import { Component, createEffect, Show, Suspense } from 'solid-js'

import { AssetData, useLatestPricePrediction } from '@price-prediction/api-client'
import { PredictionStatus, PricePrediction } from '@price-prediction/financial-assets-ui'

import { usePredictingStatus } from './predictingStatus'

export const AssetPricePrediction: Component<{
  asset: AssetData
}> = (props) => {
  const [predictingState, { lockPredicting, unlockPredicting, showPrediction }] = usePredictingStatus()
  const predictionQuery = useLatestPricePrediction(() => props.asset.slug)

  createEffect(() => {
    const predictionPending = (predictionQuery.data?.scoreChange ?? null) === null;
    if (!predictingState.predictingLocked && predictionPending) {
      lockPredicting()
      showPrediction()
    }
    if (predictingState.predictingLocked && !predictionPending) {
      unlockPredicting()
    }
  })

  const predictionStatus = (): PredictionStatus => {
    const scoreChange = predictionQuery.data?.scoreChange ?? null;
    if (scoreChange === null) {
      return 'pending'
    }
    return scoreChange > 0 ? 'correct' : 'incorrect'
  }

  return (
    <Suspense fallback={<CircularProgress />}>
      <Show when={predictionQuery.data}>
        {(predictionResponse) =>
          <Show when={predictingState.showPrediction}>
            <PricePrediction
              assetName={props.asset.name}
              currentPrice={props.asset.lastPriceUsd}
              currencySymbol='$'
              predictedDirection={predictionResponse().predictionType}
              initialPrice={predictionResponse().initialPriceUsd}
              finalPrice={predictionResponse().finalPriceUsd}
              predictionStatus={predictionStatus()}
            />
          </Show>}
      </Show>
      <Show when={predictionQuery.error}>
        <Alert severity='error'>
          {predictionQuery.error as string}
        </Alert>
      </Show>
    </Suspense>
  )
}
