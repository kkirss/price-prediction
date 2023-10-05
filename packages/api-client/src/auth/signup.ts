import { useService } from 'solid-services'
import { createMutation, CreateMutationOptions } from '@tanstack/solid-query'

import { Session, SIGNUP_PATH, SignupRequest } from '@price-prediction/api-schema'

import { APIClientService } from '~/services/client'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useSignup = (options?: CreateMutationOptions<Session, unknown, SignupRequest>) => {
  const client = useService(APIClientService)
  return createMutation({
    mutationFn: async (inputData: SignupRequest) => {
      const { data, error } = await client().POST(SIGNUP_PATH, { body: inputData })
      if (error !== undefined) {
        throw new Error(error.error)
      }
      return data
    },
    ...options
  })
}
