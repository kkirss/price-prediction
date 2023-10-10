import { Router } from 'express'

import { getLatestPricePrediction } from './getLatestPricePrediction'
import { createPricePredictionRoute } from './createPricePrediction'

export const latestPricePredictionPath = '/assets/:assetSlug/price-predictions/latest'
export const createPricePredictionPath = '/assets/:assetSlug/price-predictions'

const pricePredictionsRouter = Router()

pricePredictionsRouter.get(latestPricePredictionPath, getLatestPricePrediction)
pricePredictionsRouter.post(createPricePredictionPath, createPricePredictionRoute)

export { pricePredictionsRouter }
