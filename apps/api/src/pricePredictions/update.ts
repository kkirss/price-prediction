import { type Asset, type PricePrediction, Prisma } from '@prisma/client'

import { PredictionType, PRICE_PREDICTION_RESOLVE_TIME_MS } from '@price-prediction/api-schema'

import { getAssetActivePricePredictions, isPricePredictionActive, resolvePricePrediction } from './dbPricePredictions'

/**
 * Check if a price prediction should be resolved
 */
export const shouldResolvePricePrediction = (pricePrediction: PricePrediction, updateTime: Date): boolean => {
  if (!isPricePredictionActive(pricePrediction)) {
    return false
  }
  const resolveTime = new Date(pricePrediction.predictionTime.getTime() + PRICE_PREDICTION_RESOLVE_TIME_MS)
  return updateTime >= resolveTime
}

/**
 * Get the score change for a price prediction
 */
export const getScoreChange = (predictionType: PredictionType | string, initialPrice: Prisma.Decimal, finalPrice: Prisma.Decimal): number => {
  let isCorrectPrediction
  if (predictionType === 'up') {
    isCorrectPrediction = finalPrice.gt(initialPrice)
  } else if (predictionType === 'down') {
    isCorrectPrediction = finalPrice.lt(initialPrice)
  } else {
    throw new Error(`Unknown prediction type: ${predictionType}`)
  }

  return isCorrectPrediction ? 1 : -1
}

/**
 * Update a price prediction with a new price
 */
export const updatePricePrediction = async (pricePrediction: PricePrediction, newPrice: Prisma.Decimal, updateTime: Date): Promise<void> => {
  if (!shouldResolvePricePrediction(pricePrediction, updateTime)) {
    return
  }

  const scoreChange = getScoreChange(pricePrediction.predictionType, pricePrediction.initialPriceUsd, newPrice)

  await resolvePricePrediction({
    pricePrediction,
    predictionResolveTime: updateTime,
    finalPriceUsd: newPrice,
    scoreChange
  })
}

/**
 * Update all active price predictions for an asset
 */
export const updateAssetPricePredictions = async (asset: Asset): Promise<void> => {
  await Promise.all((await getAssetActivePricePredictions(asset.slug))
    .map(async pricePrediction =>
      await updatePricePrediction(pricePrediction, asset.lastPriceUsd, asset.lastPriceChange)
    )
  )
}
