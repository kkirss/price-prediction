import { describe, expect, it } from 'vitest'
import { render } from '@solidjs/testing-library'

import NavigationBar from './NavigationBar'

describe('NavigationBar', () => {
  it('should render title', () => {
    const {
      getByText

    } = render(() =>
      <NavigationBar />
    )
    expect(getByText('Price Prediction')).toBeInTheDocument()
  })
})
