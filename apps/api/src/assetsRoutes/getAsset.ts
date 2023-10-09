import asyncHandler from 'express-async-handler'

import { Asset as ResponseAsset, type operations } from '@price-prediction/api-schema'

import { getAssetBySlug } from '~/database/assets'
import { createNotFoundError } from '~/openAPI/errors'

import { getResponseAsset } from './asset'

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
