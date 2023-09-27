import { Component, Show, Suspense } from 'solid-js'
import { Alert, CircularProgress } from '@suid/material'
import { type SxProps } from '@suid/system'

import { PredictAssetPrice } from '@price-prediction/financial-assets-ui'

import { useAssetDetails } from '~/coincap/assets'

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
            assetName={assetResponse().data.name}
            price={assetResponse().data.priceUsd}
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
