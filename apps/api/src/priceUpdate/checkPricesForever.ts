import { ASSET_DETAILS_PATH, CoinCapClient, createFetchClient } from '@price-prediction/coincap-api'

export const client: CoinCapClient = createFetchClient()

export const checkPricesForever = async (assetId: string, frequencyMs: number): Promise<void> => {
  console.log('Starting price checking loop')
  while (true) {
    try {
      const { data, error } = await client.GET(ASSET_DETAILS_PATH, {
        params: { path: { id: assetId } }
      })
      if (data !== undefined) {
        const price = Number(data.data.priceUsd)
        console.log(`Price of ${assetId} is $${price}`)
      } else {
        console.error('Error fetching asset price:', error?.error)
      }
      await new Promise((resolve) => setTimeout(resolve, frequencyMs))
    } catch (e) {
      console.error('Unexpected error when checking prices', e)
    }
  }
}
