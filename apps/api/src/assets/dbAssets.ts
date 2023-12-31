import { Asset, Prisma } from '@prisma/client'

import { dbClient } from '~/database'

export const PRICE_DECIMAL_PLACES = 10

export type CreateAsset = Omit<Asset, 'id'>

export const createAsset = async (asset: CreateAsset): Promise<Asset> =>
  await dbClient.asset.create({
    data: {
      ...asset
    }
  })

export const getAllAssets = async (): Promise<Asset[]> =>
  await dbClient.asset.findMany()

export const getAssetBySlug = async (slug: string): Promise<Asset | null> =>
  await dbClient.asset.findUnique({ where: { slug } })

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

export const deleteAssetIfExists = async (slug: string): Promise<void> => {
  await dbClient.asset.deleteMany({
    where: {
      slug
    }
  })
}
