import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createFetchClient } from '~/api/createFetchClient'
import { mockResponses } from '~/tests/mockResponses'

import { ASSETS_MOCK_RESPONSES } from './mocks'
import { ASSET_DETAILS_PATH } from './paths'

describe('mocked assets', () => {
  beforeEach(() => {
    mockResponses(ASSETS_MOCK_RESPONSES)
  })

  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('get asset details is mocked', async () => {
    const client = createFetchClient()
    const { data, response } = await client.GET(ASSET_DETAILS_PATH, {
      params: { path: { id: 'bitcoin' } }
    })

    expect(response.status).toBe(200)
    expect(data).toEqual(ASSETS_MOCK_RESPONSES[ASSET_DETAILS_PATH].get.body)
  })
})
