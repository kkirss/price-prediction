import { describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '~/app'
import { getAssetBySlug } from '~/assets'
import { createPricePrediction } from '~/pricePredictions'
import { withAuthenticationIt } from '~/auth/test'

describe('API latest price prediction', async () => {
  it('should return 401 error with missing Authorization header', async () => {
    const response = await request(app)
      .get('/assets/bitcoin/price-predictions/latest')

    expect(response.status).toBe(401)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot(`
      {
        "error": "Authorization header required",
        "errors": [
          {
            "message": "Authorization header required",
            "path": "/assets/{assetSlug}/price-predictions/latest",
          },
        ],
      }
    `)
  })
  withAuthenticationIt('should return 404 for missing asset', async ({ authHeader }) => {
    const response = await request(app)
      .get('/assets/this_asset_does_not_exist/price-predictions/latest')
      .set('Authorization', authHeader)

    expect(response.status).toBe(404)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot(`
      {
        "error": "Asset not found",
        "errors": [
          {
            "message": "Asset not found",
            "path": "/body",
          },
        ],
      }
    `)
  })
  withAuthenticationIt('should return 404 when no price prediction exists', async ({ authHeader }) => {
    const response = await request(app)
      .get('/assets/bitcoin/price-predictions/latest')
      .set('Authorization', authHeader)

    expect(response.status).toBe(404)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot(`
      {
        "error": "Price prediction not found",
        "errors": [
          {
            "message": "Price prediction not found",
            "path": "/body",
          },
        ],
      }
    `)
  })
  withAuthenticationIt('should return latest price prediction', async ({ authHeader, userId }) => {
    const asset = await getAssetBySlug('bitcoin')
    if (asset === null) {
      throw new Error('Asset not found')
    }
    const pricePrediction = await createPricePrediction({
      userId,
      asset,
      predictionType: 'up'
    })

    const response = await request(app)
      .get('/assets/bitcoin/price-predictions/latest')
      .set('Authorization', authHeader)

    expect(response.status).toBe(200)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot({
      id: expect.any(Number),
      initialPriceUsd: expect.any(String),
      predictionTime: expect.any(String)
    }, `
      {
        "assetSlug": "bitcoin",
        "finalPriceUsd": null,
        "id": Any<Number>,
        "initialPriceUsd": Any<String>,
        "predictionResolveTime": null,
        "predictionTime": Any<String>,
        "predictionType": "up",
        "scoreChange": null,
      }
    `)
    expect(responseData.initialPriceUsd).toBe(String(asset.lastPriceUsd))
    expect(responseData.predictionTime).toBe(pricePrediction.predictionTime.toISOString())
  })
})
