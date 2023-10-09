import { ASSET_DETAILS_PATH, CoinCapClient, createFetchClient } from '@price-prediction/coincap-api'
import { Prisma } from '@prisma/client'

import { getAllAssets, updateAssetPrice } from '~/database/assets'

export const client: CoinCapClient = createFetchClient()

/**
 * Checks and persists the price of all assets in the database, running forever.
 *
 * @param frequencyMs How often to check the price of each asset, in milliseconds.
 */
export const checkPricesForever = async (frequencyMs: number): Promise<void> => {
  console.log('Starting price checking loop')
  const allAssets = await getAllAssets()

  while (true) {
    try {
      for (const asset of allAssets) {
        const { data, error } = await client.GET(ASSET_DETAILS_PATH, {
          params: { path: { id: asset.coincapId } }
        })
        if (data !== undefined) {
          const updated = await updateAssetPrice(
            asset.id,
            new Prisma.Decimal(data.data.priceUsd),
            new Date(data.timestamp)
          )
          console.debug(`Updated price of ${updated.name} to $${String(updated.lastPriceUsd)}`)
        } else {
          console.error('Error fetching asset price:', error?.error)
        }
      }
      await new Promise((resolve) => setTimeout(resolve, frequencyMs))
    } catch (e) {
      console.error('Unexpected error when checking prices', e)
    }
  }
}