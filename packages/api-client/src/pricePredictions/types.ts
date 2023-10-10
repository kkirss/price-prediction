import { type PricePrediction } from '@price-prediction/api-schema'

export interface PricePredictionData extends Omit<PricePrediction, 'initialPriceUsd' | 'finalPriceUsd'> {
  initialPriceUsd: number
  finalPriceUsd: number | null
}
