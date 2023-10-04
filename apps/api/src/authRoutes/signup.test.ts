import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '~/app'
import { dbClient } from '~/database'

const deleteUser = async (username: string): Promise<void> => {
  await dbClient.user.deleteMany({
    where: {
      username
    }
  })
}

describe('API signup', () => {
  it('should return 400 error when no credentials are passed', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({})

    expect(response.status).toBe(400)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot(`
      {
        "error": "request/body must have required property 'username', request/body must have required property 'password'",
        "errors": [
          {
            "errorCode": "required.openapi.validation",
            "message": "must have required property 'username'",
            "path": "/body/username",
          },
          {
            "errorCode": "required.openapi.validation",
            "message": "must have required property 'password'",
            "path": "/body/password",
          },
        ],
      }
    `)
  })
})

describe('API signup', () => {
  beforeAll(async () => {
    await deleteUser('testuser')
  })
  afterEach(async () => {
    await deleteUser('testuser')
  })

  it('should create a user', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        username: 'testuser',
        password: 'testpassword'
      })

    expect(response.status).toBe(201)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot({
      // Could test the date format here but skipping for simplicity
      activePeriodExpiresAt: expect.any(String),
      idlePeriodExpiresAt: expect.any(String),
      sessionId: expect.any(String),
      user: {
        userId: expect.any(String)
      }
    }, `
      {
        "activePeriodExpiresAt": Any<String>,
        "idlePeriodExpiresAt": Any<String>,
        "sessionId": Any<String>,
        "user": {
          "userId": Any<String>,
          "username": "testuser",
        },
      }
    `)
  })
  it('should return 400 if username is taken', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        username: 'testuser',
        password: 'testpassword'
      })

    expect(response.status).toBe(201)

    const response2 = await request(app)
      .post('/auth/signup')
      .send({
        username: 'testuser',
        password: 'testpassword'
      })

    expect(response2.status).toBe(400)
    const responseData = JSON.parse(response2.text)
    expect(responseData).toMatchInlineSnapshot(`
      {
        "error": "Username already taken",
        "errors": [
          {
            "message": "Username already taken",
            "path": "/body/username",
          },
        ],
      }
    `)
  })
})
