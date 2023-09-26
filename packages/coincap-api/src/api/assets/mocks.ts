import openAPISchema from '~/openAPI/schema.json'
import { type MockResponses } from '~/tests/mockResponses'

import { ASSET_DETAILS_PATH } from './paths'

const ASSET_DETAILS_RESPONSE = openAPISchema.components.schemas.AssetDetailsResponse.example

export const ASSETS_MOCK_RESPONSES = {
  [ASSET_DETAILS_PATH]: {
    get: {
      status: 200,
      body: ASSET_DETAILS_RESPONSE
    }
  }
} satisfies MockResponses
