import { Prisma } from '@prisma/client'

import { updateAssetPrice } from '~/assets'
import { updateAssetPricePredictions } from '~/pricePredictions'

export const handlePriceUpdate = async (
  assetId: number,
  priceUsd: string,
  updateTime: Date
): Promise<void> => {
  const asset = await updateAssetPrice(
    assetId,
    new Prisma.Decimal(priceUsd),
    updateTime
  )
  await updateAssetPricePredictions(asset)
  console.debug(`Updated price of ${asset.name} to $${String(asset.lastPriceUsd)}`)
}
