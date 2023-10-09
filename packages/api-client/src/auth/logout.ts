import { useService } from 'solid-services'
import { createMutation, CreateMutationOptions } from '@tanstack/solid-query'

import { APIErrorObject, LOGOUT_PATH, MessageResponse } from '@price-prediction/api-schema'

import { useAuthHeaders } from '~/services/authService'
import { APIClientService } from '~/services/client'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useLogout = (options?: CreateMutationOptions<MessageResponse>) => {
  const client = useService(APIClientService)
  const authHeaders = useAuthHeaders()
  return createMutation({
    mutationFn: async () => {
      const { data, error } = await client().POST(LOGOUT_PATH, { headers: authHeaders() })
      if (error !== undefined) {
        throw new APIErrorObject(error)
      }
      return data
    },
    ...options
  })
}
