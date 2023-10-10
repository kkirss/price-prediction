import { type Accessor } from 'solid-js'
import { useService } from 'solid-services'
import { createQuery } from '@tanstack/solid-query'

import { APIErrorObject, ASSETS_DETAIL_PATH } from '@price-prediction/api-schema'

import { APIClientService } from '~/services/client'

import { type AssetData } from './types'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAssetDetails = (assetSlug: Accessor<string>) => {
  const client = useService(APIClientService)
  return createQuery({
    queryKey: (): [string, string] => ['assets', assetSlug()],
    queryFn: async ({ queryKey }) => {
      const { data, error } = await client().GET(ASSETS_DETAIL_PATH, {
        params: { path: { assetSlug: queryKey[1] } }
      })
      if (error !== undefined) {
        throw new APIErrorObject(error)
      }
      return data
    },
    select: ({ lastPriceUsd, ...rest }): AssetData => ({
      ...rest,
      lastPriceUsd: Number(lastPriceUsd)
    }),
    refetchInterval: 5000
  })
}
