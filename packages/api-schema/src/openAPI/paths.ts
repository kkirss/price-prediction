import { type paths } from './schema'

export const HEALTH_ROOT_PATH = '/' satisfies keyof paths
export const HEALTH_PATH = '/health' satisfies keyof paths

export const LOGIN_PATH = '/auth/login' satisfies keyof paths
export const SIGNUP_PATH = '/auth/signup' satisfies keyof paths
export const LOGOUT_PATH = '/auth/logout' satisfies keyof paths

export const ASSETS_DETAIL_PATH = '/assets/{assetSlug}' satisfies keyof paths

export const CREATE_PRICE_PREDICTION_PATH = '/assets/{assetSlug}/price-predictions' satisfies keyof paths
export const LATEST_PRICE_PREDICTION_PATH = '/assets/{assetSlug}/price-predictions/latest' satisfies keyof paths
