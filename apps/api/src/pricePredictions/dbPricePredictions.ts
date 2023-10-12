import { type Asset, type PricePrediction, Prisma, type PricePredictionScore } from '@prisma/client'

import { PredictionType } from '@price-prediction/api-schema'

import { dbClient } from '~/database'

export interface CreatePricePredictionInput {
  userId: string
  asset: Asset
  predictionType: PredictionType
  predictionTime?: Date
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
    },
    orderBy: [
      {
        predictionTime: 'desc'
      }
    ]
  })

export const getAssetActivePricePredictions = async (assetSlug: string): Promise<PricePrediction[]> =>
  await dbClient.pricePrediction.findMany({
    where: {
      asset: {
        slug: assetSlug
      },
      scoreChange: null
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
      predictionTime: input.predictionTime ?? new Date(),
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

export interface ResolvePricePredictionInput {
  pricePrediction: PricePrediction
  predictionResolveTime: Date
  finalPriceUsd: Prisma.Decimal
  scoreChange: number
}

export const resolvePricePrediction = async (
  {
    pricePrediction,
    predictionResolveTime,
    finalPriceUsd,
    scoreChange
  }: ResolvePricePredictionInput
): Promise<[PricePrediction, PricePredictionScore]> => {
  const updatePredictionPromise = dbClient.pricePrediction.update({
    where: {
      id: pricePrediction.id
    },
    data: {
      predictionResolveTime,
      finalPriceUsd,
      scoreChange
    }
  })
  const updateScorePromise = dbClient.pricePredictionScore.upsert({
    where: {
      userId: pricePrediction.userId
    },
    create: {
      userId: pricePrediction.userId,
      score: scoreChange
    },
    update: {
      score: scoreChange
    }
  })
  // @ts-expect-error
  return await dbClient.$transaction<[PricePrediction, PricePredictionScore]>([
    updatePredictionPromise,
    updateScorePromise
  ])
}

export const deletePricePrediction = async (pricePredictionId: number): Promise<void> => {
  await dbClient.pricePrediction.delete({
    where: {
      id: pricePredictionId
    }
  })
}
