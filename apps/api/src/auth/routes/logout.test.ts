import { describe, expect, it } from 'vitest'
import request from 'supertest'

import { LOGOUT_PATH } from '@price-prediction/api-schema'

import { app } from '~/app'
import { withAuthenticationIt } from '~/auth/test'

describe('API logout', () => {
  it('should return 401 error with missing Authorization header', async () => {
    const response = await request(app)
      .post(LOGOUT_PATH)
      .send({})

    expect(response.status).toBe(401)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot(`
      {
        "error": "Authorization header required",
        "errors": [
          {
            "message": "Authorization header required",
            "path": "/auth/logout",
          },
        ],
      }
    `)
  })

  withAuthenticationIt('can log out', async ({ authHeader }) => {
    const response = await request(app)
      .post(LOGOUT_PATH)
      .set('Authorization', authHeader)
      .send({})

    expect(response.status).toBe(200)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot(`
      {
        "message": "Successfully logged out",
      }
    `)

    const response2 = await request(app)
      .post(LOGOUT_PATH)
      .set('Authorization', authHeader)
      .send({})
    expect(response2.status).toBe(401)
  })
})
