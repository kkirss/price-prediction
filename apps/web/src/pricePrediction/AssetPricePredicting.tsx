import { type Component } from 'solid-js'
import { useService } from 'solid-services'
import { Stack, Typography } from '@suid/material'
import { type SxProps } from '@suid/system'

import { type AssetData, AuthService, useCreatePricePrediction } from '@price-prediction/api-client'
import { PredictionType } from '@price-prediction/api-schema'
import { PredictAssetPrice } from '@price-prediction/financial-assets-ui'

import { usePredictingStatus } from './predictingStatus'

export const AssetPricePredicting: Component<{
  asset: AssetData
  sx?: SxProps
}> = (props) => {
  const authService = useService(AuthService)
  const [predictingState, { lockPredicting, showPrediction }] = usePredictingStatus()

  const createPrediction = useCreatePricePrediction(() => props.asset.slug, {
    onSuccess: () => {
      lockPredicting()
      showPrediction()
    }
  })
  const onPredictPrice = (predictionType: PredictionType): void => {
    if (predictingState.predictingLocked) {
      return
    }
    createPrediction.mutate({ predictionType })
  }

  const predictingDisabled = (): boolean =>
    predictingState.predictingLocked || createPrediction.isLoading || !authService().isAuthenticated()

  return (
    <Stack gap={2}>
      <Typography variant='h4' textAlign='center'>
        {props.asset.name}
      </Typography>
      <PredictAssetPrice
        sx={props.sx}
        price={props.asset.lastPriceUsd}
        currencySymbol='$'
        onPredictPrice={onPredictPrice}
        disabled={predictingDisabled()}
      />
    </Stack>
  )
}
