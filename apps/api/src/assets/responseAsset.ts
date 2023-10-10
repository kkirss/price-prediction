import { Asset } from '@prisma/client'

import { Asset as ResponseAsset } from '@price-prediction/api-schema'

export const getResponseAsset = (asset: Asset): ResponseAsset => ({
  ...asset,
  lastPriceUsd: String(asset.lastPriceUsd),
  lastPriceChange: asset.lastPriceChange.toISOString()
})
