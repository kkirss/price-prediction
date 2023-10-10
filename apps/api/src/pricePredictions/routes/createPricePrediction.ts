import asyncHandler from 'express-async-handler'

import { type operations } from '@price-prediction/api-schema'

import { getAssetBySlug } from '~/assets'
import { createNotFoundError, createValidatorError } from '~/openAPI'
import { createPricePrediction, getPricePredictionResponse, UserHasActivePricePrediction } from '~/pricePredictions'

export const createPricePredictionRoute = asyncHandler<operations['createPricePrediction']['parameters']['path']>(async (req, res) => {
  const user = res.locals.user
  const asset = await getAssetBySlug(req.params.assetSlug)

  if (asset === null) {
    throw createNotFoundError('Asset not found')
  }

  let pricePrediction
  try {
    pricePrediction = await createPricePrediction({
      userId: user.userId,
      asset,
      predictionType: req.body.predictionType
    })
  } catch (error) {
    if (error instanceof UserHasActivePricePrediction) {
      throw createValidatorError('You already have an active price prediction for this asset')
    }
    console.log('error', error)
    throw error
  }

  const pricePredictionResponse = getPricePredictionResponse(asset, pricePrediction)
  res
    .status(201)
    .json(pricePredictionResponse)
})
