import asyncHandler from 'express-async-handler'

import { type operations } from '@price-prediction/api-schema'

import { getAssetBySlug } from '~/assets'
import { createNotFoundError } from '~/openAPI'
import {
  getPreviousPricePrediction,
  getUserLatestPricePrediction
} from '~/pricePredictions'

export const getLatestPricePrediction = asyncHandler<operations['getLatestPricePrediction']['parameters']['path']>(async (req, res) => {
  const asset = await getAssetBySlug(req.params.assetSlug)
  if (asset === null) {
    throw createNotFoundError('Asset not found')
  }

  const pricePrediction = await getUserLatestPricePrediction(res.locals.user.userId, asset.slug)
  if (pricePrediction === null) {
    throw createNotFoundError('Price prediction not found')
  }

  const previousPricePrediction = getPreviousPricePrediction(asset, pricePrediction)
  res
    .status(200)
    .json(previousPricePrediction)
})
