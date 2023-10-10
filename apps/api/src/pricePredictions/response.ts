import { Asset, type PricePrediction } from '@prisma/client'

import { PredictionType, type PreviousPricePrediction } from '@price-prediction/api-schema'

export const getPreviousPricePrediction = (asset: Asset, pricePrediction: PricePrediction): PreviousPricePrediction => ({
  id: pricePrediction.id,
  assetSlug: asset.slug,
  predictionType: pricePrediction.predictionType as PredictionType,
  initialPriceUsd: String(pricePrediction.initialPriceUsd),
  predictionTime: pricePrediction.predictionTime.toISOString(),
  finalPriceUsd: pricePrediction.finalPriceUsd === null ? null : String(pricePrediction.finalPriceUsd),
  predictionResolveTime: pricePrediction.predictionResolveTime === null ? null : pricePrediction.predictionResolveTime.toISOString(),
  scoreChange: pricePrediction.scoreChange
})
