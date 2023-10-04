import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '~/app'
import { createUser, deleteUserIfExists } from '~/auth'

describe('API login', () => {
  it('should return 400 error when no credentials are passed', async () => {
    const response = await request(app)
      .post('/auth/login')
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

describe('API login', () => {
  beforeAll(async () => {
    await deleteUserIfExists('test_login')
    await createUser('test_login', 'testpassword')
  })
  afterAll(async () => {
    await deleteUserIfExists('test_login')
  })

  it('should return 401 error when invalid password is passed', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'test_login',
        password: 'wrongpassword'
      })

    expect(response.status).toBe(401)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot(`
      {
        "error": "Invalid username or password",
        "errors": [
          {
            "message": "Invalid username or password",
            "path": "/body",
          },
        ],
      }
    `)
  })
  it('should return 401 error when user does not exist', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'this_user_does_not_exist',
        password: 'testpassword'
      })

    expect(response.status).toBe(401)
    const responseData = JSON.parse(response.text)
    expect(responseData).toMatchInlineSnapshot(`
      {
        "error": "Invalid username or password",
        "errors": [
          {
            "message": "Invalid username or password",
            "path": "/body",
          },
        ],
      }
    `)
  })
  it('can log in', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'test_login',
        password: 'testpassword'
      })

    expect(response.status).toBe(200)
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
          "username": "test_login",
        },
      }
    `)
  })
})
