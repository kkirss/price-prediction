import { Router } from 'express'

import { registerUnauthorizedRoute } from '~/auth'

import { getAsset } from './getAsset'

export const assetDetailPath = '/assets/:assetSlug'

const assetsRouter = Router()

registerUnauthorizedRoute(assetDetailPath)

assetsRouter.get(assetDetailPath, getAsset)

export { assetsRouter }
