import { useService } from 'solid-services'
import { createMutation, CreateMutationOptions, useQueryClient } from '@tanstack/solid-query'

import {
  APIErrorObject,
  CREATE_PRICE_PREDICTION_PATH,
  CreatePricePrediction,
  PricePrediction
} from '@price-prediction/api-schema'

import { AuthService } from '~/services/authService'
import { APIClientService } from '~/services/client'
import { Accessor } from 'solid-js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useCreatePricePrediction = (assetSlug: Accessor<string>, options?: CreateMutationOptions<PricePrediction, APIErrorObject, CreatePricePrediction>) => {
  const authService = useService(AuthService)
  const client = useService(APIClientService)
  const queryClient = useQueryClient()
  return createMutation({
    mutationFn: async (requestData: CreatePricePrediction) => {
      const { data, error } = await client().POST(CREATE_PRICE_PREDICTION_PATH, {
        headers: authService().authHeaders(),
        params: { path: { assetSlug: assetSlug() } },
        body: requestData
      })
      if (error !== undefined) {
        throw new APIErrorObject(error)
      }
      return data
    },
    ...options,
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(['price-predictions', assetSlug(), 'latest'], data)
      if (options?.onSuccess !== undefined) {
        options.onSuccess(data, ...args)
      }
    }
  })
}
