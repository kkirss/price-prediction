import { type Component, Show, Suspense } from 'solid-js'
import { Alert, CircularProgress, Stack } from '@suid/material'
import { type SxProps } from '@suid/system'

import { useAssetDetails } from '@price-prediction/api-client'

import { NotAuthenticatedMessage } from '~/auth/NotAuthenticatedMessage'

import { AssetPricePredicting } from './AssetPricePredicting'
import { PredictingStatusProvider } from './PredictingStatusProvider'
import { AssetPricePrediction } from './AssetPricePrediction'

export const PricePredicting: Component<{
  assetSlug: string
  sx?: SxProps
}> = (props) => {
  const assetQuery = useAssetDetails(() => props.assetSlug)
  return (
    <>
      <NotAuthenticatedMessage />
      <Suspense fallback={<CircularProgress />}>
        <Show when={assetQuery.data}>
          {(assetResponse) =>
            <PredictingStatusProvider>
              <Stack gap={8}>
                <AssetPricePredicting asset={assetResponse()} />
                <AssetPricePrediction asset={assetResponse()} />
              </Stack>
            </PredictingStatusProvider>}
        </Show>
        <Show when={assetQuery.error}>
          <Alert severity='error'>
            {assetQuery.error as string}
          </Alert>
        </Show>
      </Suspense>
    </>
  )
}
