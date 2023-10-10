import { describe, expect, it } from 'vitest'
import request from 'supertest'

import { CreatePricePrediction } from '@price-prediction/api-schema'

import { app } from '~/app'
import { getAssetBySlug } from '~/assets'
import { withAuthenticationIt } from '~/auth/test'
import { createPricePrediction, deletePricePrediction } from '~/pricePredictions'

describe('API create price prediction', async () => {
  it('should return 401 error with missing Authorization header', async () => {
    const response = await request(app)
      .post('/assets/bitcoin/price-predictions')
      .send({ predictionType: 'up' } satisfies CreatePricePrediction)

    expect(response.status).toBe(401)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot(`
      {
        "error": "Authorization header required",
        "errors": [
          {
            "message": "Authorization header required",
            "path": "/assets/{assetSlug}/price-predictions",
          },
        ],
      }
    `)
  })
  withAuthenticationIt('should return 404 for missing asset', async ({ authHeader }) => {
    const response = await request(app)
      .post('/assets/this_asset_does_not_exist/price-predictions')
      .set('Authorization', authHeader)
      .send({ predictionType: 'up' } satisfies CreatePricePrediction)

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
  withAuthenticationIt('should return 400 when user has active price prediction', async ({ authHeader, userId }) => {
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
      .post('/assets/bitcoin/price-predictions')
      .set('Authorization', authHeader)
      .set('Content-Type', 'application/json')
      .send({ predictionType: 'up' } satisfies CreatePricePrediction)

    expect(response.status, response.text).toBe(400)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot(`
      {
        "error": "You already have an active price prediction for this asset",
        "errors": [
          {
            "message": "You already have an active price prediction for this asset",
            "path": "/body",
          },
        ],
      }
    `)
    await deletePricePrediction(pricePrediction.id)
  })
  withAuthenticationIt('should create price prediction', async ({ authHeader }) => {
    const response = await request(app)
      .post('/assets/bitcoin/price-predictions')
      .set('Authorization', authHeader)
      .send({ predictionType: 'up' } satisfies CreatePricePrediction)

    expect(response.status).toBe(201)
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
  })
})
