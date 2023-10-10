import { Asset, PricePrediction } from '@prisma/client'

import { PredictionType } from '@price-prediction/api-schema'

import { dbClient } from '~/database'

export interface CreatePricePredictionInput {
  userId: string
  asset: Asset
  predictionType: PredictionType
}

export class UserHasActivePricePrediction extends Error {
}

export const getUserLatestPricePrediction = async (userId: string, assetSlug: string): Promise<PricePrediction | null> =>
  await dbClient.pricePrediction.findFirst({
    where: {
      userId,
      asset: {
        slug: assetSlug
      }
    }
  })

export const isPricePredictionActive = (pricePrediction: PricePrediction): boolean =>
  pricePrediction.scoreChange === null

export const userHasActivePricePrediction = async (userId: string, assetSlug: string): Promise<boolean> => {
  const pricePrediction = await getUserLatestPricePrediction(userId, assetSlug)
  if (pricePrediction === null) {
    return false
  }
  return isPricePredictionActive(pricePrediction)
}

export const createPricePrediction = async (
  input: CreatePricePredictionInput
): Promise<PricePrediction> => {
  if (await userHasActivePricePrediction(input.userId, input.asset.slug)) {
    throw new UserHasActivePricePrediction('User already has an active price prediction for this asset')
  }
  return await dbClient.pricePrediction.create({
    data: {
      predictionType: input.predictionType,
      initialPriceUsd: input.asset.lastPriceUsd,
      predictionTime: new Date(),
      user: {
        connect: {
          id: input.userId
        }
      },
      asset: {
        connect: {
          id: input.asset.id
        }
      }
    }
  })
}
