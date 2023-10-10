import { Prisma } from '@prisma/client'
import { describe, it, expect } from 'vitest'

import { getScoreChange } from './update'

describe('getScoreChange', () => {
  it.each([
    { predictionType: 'up', initialPrice: 1, finalPrice: 1.1, expected: 1 },
    { predictionType: 'up', initialPrice: 1, finalPrice: 1, expected: -1 },
    { predictionType: 'up', initialPrice: 1, finalPrice: 0.9, expected: -1 },
    { predictionType: 'down', initialPrice: 1, finalPrice: 1.1, expected: -1 },
    { predictionType: 'down', initialPrice: 1, finalPrice: 1, expected: -1 },
    { predictionType: 'down', initialPrice: 1, finalPrice: 0.9, expected: 1 }
  ])('returns $expected when predicting $predictionType from $initialPrice to $finalPrice', async (
    { predictionType, initialPrice, finalPrice, expected }
  ) => {
    expect(getScoreChange(predictionType, new Prisma.Decimal(initialPrice), new Prisma.Decimal(finalPrice))).toBe(expected)
  })
})
