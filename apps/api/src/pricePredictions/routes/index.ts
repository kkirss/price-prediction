import { Router } from 'express'

import { getLatestPricePrediction } from './getLatestPricePrediction'

export const latestPricePredictionPath = '/assets/:assetSlug/price-predictions/latest'

const pricePredictionsRouter = Router()

pricePredictionsRouter.get(latestPricePredictionPath, getLatestPricePrediction)

export { pricePredictionsRouter }
