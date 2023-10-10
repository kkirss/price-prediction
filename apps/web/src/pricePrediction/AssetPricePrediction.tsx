import { type Component, createSignal, Show, Suspense } from 'solid-js'
import { type SxProps } from '@suid/system'
import { Alert, CircularProgress, Stack } from '@suid/material'

import { type AssetData, useLatestPricePrediction } from '@price-prediction/api-client'
import { PredictAssetPrice, PricePrediction } from '@price-prediction/financial-assets-ui'

export const AssetPricePrediction: Component<{
  asset: AssetData
  sx?: SxProps
}> = (props) => {
  const [showPrediction] = createSignal(false)
  const predictionQuery = useLatestPricePrediction(() => props.asset.slug, showPrediction)
  return (
    <Stack gap={4}>
      <PredictAssetPrice
        sx={props.sx}
        assetName={props.asset.name}
        price={props.asset.lastPriceUsd}
        currencySymbol='$'
        onPredictPrice={() => {
        }}
      />
      <Suspense fallback={<CircularProgress />}>
        <Show when={predictionQuery.data}>
          {(predictionResponse) =>
            <PricePrediction
              assetName={props.asset.name}
              currencySymbol='$'
              price={predictionResponse().initialPriceUsd}
            />}
        </Show>
        <Show when={predictionQuery.error}>
          <Alert severity='error'>
            {predictionQuery.error as string}
          </Alert>
        </Show>
      </Suspense>
    </Stack>
  )
}
