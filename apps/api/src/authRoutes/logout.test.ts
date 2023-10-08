import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '~/app'
import { createSession, createUser, deleteUserIfExists } from '~/auth'

describe('API logout', () => {
  it('should return 401 error with missing Authorization header', async () => {
    const response = await request(app)
      .post('/auth/logout')
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
})

describe('API logout', () => {
  beforeAll(async () => {
    await deleteUserIfExists('test_logout')
  })
  afterAll(async () => {
    await deleteUserIfExists('test_logout')
  })

  it('can log out', async () => {
    const user = await createUser('test_logout', 'testpassword')
    const sessionId: string = (await createSession(user.userId)).sessionId

    const response = await request(app)
      .post('/auth/logout')
      .set('Authorization', `Bearer ${sessionId}`)
      .send({})

    expect(response.status).toBe(200)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot(`
      {
        "message": "Successfully logged out",
      }
    `)

    const response2 = await request(app)
      .post('/auth/logout')
      .set('Authorization', `Bearer ${sessionId}`)
      .send({})
    expect(response2.status).toBe(401)
  })
})
