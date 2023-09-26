import createClient from 'openapi-fetch'

import { paths } from '~/openAPI/schema'
import { API_BASE_URL } from '~/openAPI/schemaInfo'

export type ClientOptions = Parameters<typeof createClient<paths>>[0]
export type CoinCapClient = ReturnType<typeof createClient<paths>>

export const createFetchClient = (clientOptions: ClientOptions = {}): CoinCapClient =>
  createClient<paths>({
    baseUrl: API_BASE_URL,
    ...clientOptions
  })
