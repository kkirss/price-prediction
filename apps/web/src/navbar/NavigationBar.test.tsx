import { type Component } from 'solid-js'
import { Router } from '@solidjs/router'
import { ServiceRegistry } from 'solid-services'
import { describe, expect, it, vi } from 'vitest'
import { render } from '@solidjs/testing-library'
import * as uiTheme from '@price-prediction/ui-theme'

import NavigationBar from './NavigationBar'

vi.spyOn(uiTheme, 'ToggleDarkMode').mockImplementation(() => (
  <button>Toggle dark mode mocked</button>
))

const TestNavigationBar: Component = () => (
  <Router>
    <ServiceRegistry>
      <NavigationBar />
    </ServiceRegistry>
  </Router>
)

describe('NavigationBar', () => {
  it('should render title', () => {
    const { getByText } = render(() =>
      <TestNavigationBar />
    )
    expect(getByText('Price Prediction')).toBeInTheDocument()
  })
  it('should render sign up button', () => {
    const { getByText } = render(() =>
      <TestNavigationBar />
    )
    expect(getByText('Sign up')).toBeInTheDocument()
  })
  it('should render dark mode toggle button', () => {
    const { getByText } = render(() =>
      <TestNavigationBar />
    )
    expect(getByText('Toggle dark mode mocked')).toBeInTheDocument()
  })
})
