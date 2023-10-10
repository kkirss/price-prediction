import {updateAssetPrice} from "~/assets";
import {Prisma} from "@prisma/client";

export const handlePriceUpdate = async (
  assetId: number,
  priceUsd: string,
  updateTime: Date
) => {
  const asset = await updateAssetPrice(
    assetId,
    new Prisma.Decimal(priceUsd),
    updateTime
  )
  console.debug(`Updated price of ${asset.name} to $${String(asset.lastPriceUsd)}`)
}
