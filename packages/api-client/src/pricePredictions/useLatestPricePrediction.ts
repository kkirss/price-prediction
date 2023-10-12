import { type Accessor } from 'solid-js'
import { useService } from 'solid-services'
import { createQuery } from '@tanstack/solid-query'

import { APIErrorObject, LATEST_PRICE_PREDICTION_PATH } from '@price-prediction/api-schema'

import { APIClientService } from '~/services/client'

import { type PricePredictionData } from './types'
import { AuthService } from '~/services'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useLatestPricePrediction = (assetSlug: Accessor<string>) => {
  const authService = useService(AuthService)
  const client = useService(APIClientService)
  return createQuery({
    queryKey: (): [string, string, string] => ['price-predictions', assetSlug(), 'latest'],
    queryFn: async ({ queryKey }) => {
      const { data, error } = await client().GET(LATEST_PRICE_PREDICTION_PATH, {
        headers: authService().authHeaders(),
        params: { path: { assetSlug: queryKey[1] } }
      })
      if (error !== undefined) {
        throw new APIErrorObject(error)
      }
      return data
    },
    select: ({ initialPriceUsd, finalPriceUsd, ...rest }): PricePredictionData => ({
      ...rest,
      initialPriceUsd: Number(initialPriceUsd),
      finalPriceUsd: finalPriceUsd !== null ? Number(finalPriceUsd) : null
    }),
    refetchInterval: 5000
  })
}
