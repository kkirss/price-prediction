import { Asset, Prisma } from '@prisma/client'

import { dbClient } from './client'

export const PRICE_DECIMAL_PLACES = 10

export const getAllAssets = async (): Promise<Asset[]> =>
  await dbClient.asset.findMany()

export const updateAssetPrice = async (
  id: number,
  priceUsd: Prisma.Decimal,
  updateTime: Date
): Promise<Asset> => {
  const newPrice = priceUsd.toDecimalPlaces(PRICE_DECIMAL_PLACES)
  return await dbClient.asset.update({
    where: { id },
    data: {
      lastPriceUsd: newPrice,
      lastPriceChange: updateTime
    }
  })
}
