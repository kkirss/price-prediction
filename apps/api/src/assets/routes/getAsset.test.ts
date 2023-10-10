import { describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '~/app'

describe('API asset detail', () => {
  it('should return 404 for missing asset', async () => {
    const response = await request(app)
      .get('/assets/this_asset_does_not_exist')

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
  it('should return asset', async () => {
    const response = await request(app)
      .get('/assets/bitcoin')

    expect(response.status).toBe(200)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot({
      id: expect.any(Number),
      lastPriceChange: expect.any(String),
      lastPriceUsd: expect.any(String)
    }, `
      {
        "coincapId": "bitcoin",
        "id": Any<Number>,
        "lastPriceChange": Any<String>,
        "lastPriceUsd": Any<String>,
        "name": "Bitcoin",
        "slug": "bitcoin",
      }
    `)
  })
})
