import { describe, expect, it } from 'vitest'
import request from 'supertest'

import { HEALTH_PATH } from '@price-prediction/api-schema'

import { app } from '~/app'

describe('API health', () => {
  it('should return OK', async () => {
    const response = await request(app).get(HEALTH_PATH)

    expect(response.status).toBe(200)
    expect(response.text).toBe('OK')
  })
})
