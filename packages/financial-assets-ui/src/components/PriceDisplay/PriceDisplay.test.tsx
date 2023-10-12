import { describe, expect, it } from 'vitest'
import { render } from '@solidjs/testing-library'

import { PriceDisplay } from './PriceDisplay'

describe('PriceDisplay', () => {
  it('should render price', () => {
    const { getByText } = render(() =>
      <PriceDisplay price={1} priceDecimalPlaces={3} currencySymbol='$' />
    )
    expect(getByText('1.000')).toBeInTheDocument()
    expect(getByText('$')).toBeInTheDocument()
  })
})
