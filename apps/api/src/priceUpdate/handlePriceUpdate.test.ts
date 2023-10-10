import { Prisma } from '@prisma/client'
import { describe, it, expect, afterEach, beforeEach } from 'vitest'

import { createUser, deleteUserIfExists } from '~/auth'
import { getRandomString } from '~/auth/test'
import { createAsset, deleteAssetIfExists } from '~/assets'
import { createPricePrediction, getUserLatestPricePrediction } from '~/pricePredictions'

import { handlePriceUpdate } from './handlePriceUpdate'

describe('handlePriceChange', () => {
  beforeEach(async () => {
    await deleteUserIfExists('test_update_asset_price_predictions')
    await deleteAssetIfExists('test-asset')
  })
  afterEach(async () => {
    await deleteUserIfExists('test_update_asset_price_predictions')
    await deleteAssetIfExists('test-asset')
  })

  it.each([
    { predictionTime: 100 * 1000, assetPriceTime: 90 * 1000, shouldResolve: false },
    { predictionTime: 100 * 1000, assetPriceTime: 110 * 1000, shouldResolve: false },
    { predictionTime: 100 * 1000, assetPriceTime: 160 * 1000, shouldResolve: true }
  ])('should($shouldResolve) resolve price prediction made at $predictionTime from update at $assetPriceTime', async (
    { predictionTime, assetPriceTime, shouldResolve }
  ) => {
    // Note: Score changes are already tested in update.test.ts
    const predictionPrice = 1
    const updatedPrice = 2
    const predictionType = 'up'
    const scoreChange = 1

    const user = await createUser('test_update_asset_price_predictions', getRandomString())
    const asset = await createAsset({
      name: 'Test Asset',
      slug: 'test-asset',
      coincapId: 'test-asset',
      lastPriceUsd: new Prisma.Decimal(predictionPrice),
      lastPriceChange: new Date(0)
    })

    // Create price prediction
    await createPricePrediction({
      asset,
      predictionType,
      userId: user.userId,
      predictionTime: new Date(predictionTime)
    })

    // Handle price update
    await handlePriceUpdate(
      asset.id,
      String(updatedPrice),
      new Date(assetPriceTime)
    )

    // Get latest price prediction
    const latestPricePrediction = await getUserLatestPricePrediction(user.userId, asset.slug)
    if (latestPricePrediction === null) {
      throw new Error('Price prediction not found')
    }

    // Check that price prediction was resolved (or not) correctly
    if (shouldResolve) {
      expect(latestPricePrediction.scoreChange).toBe(scoreChange)
      expect(latestPricePrediction.finalPriceUsd).toEqual(new Prisma.Decimal(updatedPrice))
      expect(latestPricePrediction.predictionResolveTime).toEqual(new Date(assetPriceTime))
    } else {
      expect(latestPricePrediction.scoreChange).toBeNull()
      expect(latestPricePrediction.finalPriceUsd).toBeNull()
      expect(latestPricePrediction.predictionResolveTime).toBeNull()
    }
  })
})
