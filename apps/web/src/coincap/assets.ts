import { type Accessor } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'

import { ASSET_DETAILS_PATH } from '@price-prediction/coincap-api'

import { client } from './client'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAssetDetails = (assetId: Accessor<string>) =>
  createQuery({
    queryKey: (): [string, { id: string }] => ['assets', { id: assetId() }],
    queryFn: async ({ signal, queryKey: [_, { id }] }) => {
      const { data, error } = await client.GET(ASSET_DETAILS_PATH, {
        signal,
        params: { path: { id } }
      })
      if (error !== undefined) {
        throw new Error(error.error)
      }
      return data
    },
    select: (data) => ({
      data: {
        ...data.data,
        priceUsd: Number(data.data.priceUsd)
      }
    }),
    staleTime: 60 * 5 * 1000
  })
