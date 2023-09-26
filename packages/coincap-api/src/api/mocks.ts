import { type MockResponses } from '~/tests/mockResponses'

import { ASSETS_MOCK_RESPONSES } from './assets/mocks'

export const MOCK_RESPONSES = {
  ...ASSETS_MOCK_RESPONSES
} as const satisfies MockResponses
