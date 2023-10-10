import asyncHandler from 'express-async-handler'

import { Asset as ResponseAsset, type operations } from '@price-prediction/api-schema'

import { getAssetBySlug, getResponseAsset } from '~/assets'
import { createNotFoundError } from '~/openAPI'

export const getAsset = asyncHandler<operations['getAsset']['parameters']['path']>(async (req, res) => {
  const asset = await getAssetBySlug(req.params.assetSlug)

  if (asset === null) {
    throw createNotFoundError('Asset not found')
  }

  const responseAsset: ResponseAsset = getResponseAsset(asset)
  res
    .status(200)
    .json(responseAsset)
})
