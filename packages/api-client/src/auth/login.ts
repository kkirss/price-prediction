import { useService } from 'solid-services'
import { createMutation, CreateMutationOptions } from '@tanstack/solid-query'

import { APIErrorObject, LoginRequest, Session, LOGIN_PATH } from '@price-prediction/api-schema'

import { APIClientService } from '~/services/client'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useLogin = (options?: CreateMutationOptions<Session, unknown, LoginRequest>) => {
  const client = useService(APIClientService)
  return createMutation({
    mutationFn: async (inputData: LoginRequest) => {
      const { data, error } = await client().POST(LOGIN_PATH, { body: inputData })
      if (error !== undefined) {
        throw new APIErrorObject(error)
      }
      return data
    },
    ...options
  })
}
