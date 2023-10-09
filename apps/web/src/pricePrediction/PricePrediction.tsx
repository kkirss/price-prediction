import { Component, createMemo, Show, Suspense } from 'solid-js'
import { Alert, CircularProgress } from '@suid/material'
import { type SxProps } from '@suid/system'

import { useAssetDetails } from '@price-prediction/api-client'
import { PredictAssetPrice } from '@price-prediction/financial-assets-ui'

export const PricePrediction: Component<{
  assetId: string
  sx?: SxProps
}> = (props) => {
  const assetQuery = useAssetDetails(() => props.assetId)
  return (
    <Suspense fallback={<CircularProgress />}>
      <Show when={assetQuery.data}>
        {(assetResponse) =>
          <PredictAssetPrice
            sx={props.sx}
            assetName={assetResponse().name}
            price={createMemo(() => Number(assetResponse().lastPriceUsd))()}
            currencySymbol='$'
            onPredictPrice={() => {
            }}
          />}
      </Show>
      <Show when={assetQuery.error}>
        <Alert severity='error'>
          {assetQuery.error as string}
        </Alert>
      </Show>
    </Suspense>
  )
}
