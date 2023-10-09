import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

// TODO: Use Typescript here
//       Tried to run using ts-node but couldn't due to this issue: https://github.com/TypeStrong/ts-node/issues/2000
async function main() {
  const bitcoinAsset = await prisma.asset.upsert({
    where: {slug: 'bitcoin'},
    update: {},
    create: {
      slug: 'bitcoin',
      name: 'Bitcoin',
      lastPriceUsd: 28000,
      lastPriceChange: new Date('2023-10-09T00:00:00.000Z'),
      coincapId: 'bitcoin'
    },
  })

  console.log('Seeded bitcoin asset:', bitcoinAsset)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
