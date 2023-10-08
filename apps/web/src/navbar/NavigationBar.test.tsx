import { describe, expect, it, vi } from 'vitest'
import { render } from '@solidjs/testing-library'
import * as uiTheme from '@price-prediction/ui-theme'

import NavigationBar from './NavigationBar'
import { ServiceRegistry } from 'solid-services'

vi.spyOn(uiTheme, 'ToggleDarkMode').mockImplementation(() => (
  <button>Toggle dark mode mocked</button>
))

describe('NavigationBar', () => {
  it('should render title', () => {
    const { getByText } = render(() =>
      <ServiceRegistry>
        <NavigationBar />
      </ServiceRegistry>
    )
    expect(getByText('Price Prediction')).toBeInTheDocument()
  })
  it('should render sign up button', () => {
    const { getByText } = render(() =>
      <ServiceRegistry>
        <NavigationBar />
      </ServiceRegistry>
    )
    expect(getByText('Sign up')).toBeInTheDocument()
  })
  it('should render dark mode toggle button', () => {
    const { getByText } = render(() =>
      <ServiceRegistry>
        <NavigationBar />
      </ServiceRegistry>
    )
    expect(getByText('Toggle dark mode mocked')).toBeInTheDocument()
  })
})
