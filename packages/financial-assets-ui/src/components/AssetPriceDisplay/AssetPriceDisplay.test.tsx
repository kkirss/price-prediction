import { describe, expect, it } from 'vitest'
import { render } from '@solidjs/testing-library'

import { AssetPriceDisplay } from './AssetPriceDisplay'

describe('AssetPriceDisplay', () => {
  it('should render asset name', () => {
    const { getByText } = render(() =>
      <AssetPriceDisplay assetName='Bitcoin' price={1} currencySymbol='$' />
    )
    expect(getByText('Bitcoin')).toBeInTheDocument()
  })
  it('should render asset price', () => {
    const { getByText } = render(() =>
      <AssetPriceDisplay assetName='Bitcoin' price={1} currencySymbol='$' />
    )
    expect(getByText('1')).toBeInTheDocument()
    expect(getByText('$')).toBeInTheDocument()
  })
})
