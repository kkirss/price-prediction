import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from '@solidjs/testing-library'
import { Component } from 'solid-js'
import { ServiceRegistry, useService } from 'solid-services'

import { DarkModeService } from './darkModeService'
import { ToggleDarkMode } from './ToggleDarkMode'

const mocks = vi.hoisted(() => ({
  usePrefersDarkMode: vi.fn()
}))

vi.mock('~/darkMode/usePrefersDarkMode', () => ({
  usePrefersDarkMode: mocks.usePrefersDarkMode
}))

const DarkModeTest: Component = () => {
  const darkModeService = useService(DarkModeService)
  const darkModeString = (): string => String(darkModeService().darkMode())
  return (
    <p data-testid='darkModeEnabled'>
      {darkModeString()}
    </p>
  )
}

describe('ToggleDarkMode', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('can toggle dark mode', async () => {
    mocks.usePrefersDarkMode.mockImplementation(() => () => false)

    const { getByRole, getByTestId } = render(() => (
      <ServiceRegistry>
        <ToggleDarkMode />
        <DarkModeTest />
      </ServiceRegistry>
    ))

    expect(getByTestId('darkModeEnabled')).toHaveTextContent('false')

    const toggleDarkModeButton = getByRole('button', { name: 'Toggle dark mode' })
    toggleDarkModeButton.click()
    await Promise.resolve()

    expect(getByTestId('darkModeEnabled')).toHaveTextContent('true')
  })
})
