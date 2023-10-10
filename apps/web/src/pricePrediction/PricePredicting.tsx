import { type Component, Show, Suspense } from 'solid-js'
import { Alert, CircularProgress } from '@suid/material'
import { type SxProps } from '@suid/system'

import { useAssetDetails } from '@price-prediction/api-client'

import { AssetPricePrediction } from './AssetPricePrediction'

export const PricePredicting: Component<{
  assetId: string
  sx?: SxProps
}> = (props) => {
  const assetQuery = useAssetDetails(() => props.assetId)
  return (
    <Suspense fallback={<CircularProgress />}>
      <Show when={assetQuery.data}>
        {(assetResponse) =>
          <AssetPricePrediction
            asset={assetResponse()}
            sx={props.sx}
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
