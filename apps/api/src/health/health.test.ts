import { describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '~/app'

describe('API /health', () => {
  it('should return OK', async () => {
    const response = await request(app).get('/health')

    expect(response.status).toBe(200)
    expect(response.text).toBe('OK')
  })
})
