import { type Asset } from '@price-prediction/api-schema'

export interface AssetData extends Omit<Asset, 'lastPriceUsd'> {
  lastPriceUsd: number
}
