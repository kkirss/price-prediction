import { useService } from 'solid-services'
import { createMutation, CreateMutationOptions } from '@tanstack/solid-query'

import { APIErrorObject, LOGOUT_PATH, MessageResponse } from '@price-prediction/api-schema'

import { AuthService } from '~/services/authService'
import { APIClientService } from '~/services/client'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useLogout = (options?: CreateMutationOptions<MessageResponse>) => {
  const authService = useService(AuthService)
  const client = useService(APIClientService)
  return createMutation({
    mutationFn: async () => {
      const { data, error } = await client().POST(LOGOUT_PATH, { headers: authService().authHeaders() })
      if (error !== undefined) {
        throw new APIErrorObject(error)
      }
      return data
    },
    ...options,
    onSuccess: (...args) => {
      authService().clearSession()
      if (options?.onSuccess !== undefined) {
        options.onSuccess(...args)
      }
    }
  })
}
