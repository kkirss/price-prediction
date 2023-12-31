import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from '@solidjs/testing-library'
import { Component } from 'solid-js'
import { useTheme } from '@suid/material'
import { ServiceRegistry } from 'solid-services'

import { ToggleDarkMode } from '~/darkMode'
import { ThemeProvider } from './ThemeProvider'

const mocks = vi.hoisted(() => ({
  usePrefersDarkMode: vi.fn()
}))

vi.mock('~/darkMode/usePrefersDarkMode', () => ({
  usePrefersDarkMode: mocks.usePrefersDarkMode
}))

const ThemePaletteModeTest: Component = () => (
  <p data-testid='themePaletteMode'>
    {useTheme().palette.mode}
  </p>
)

describe('ThemeProvider', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('can toggle dark mode', async () => {
    mocks.usePrefersDarkMode.mockImplementation(() => () => false)

    const { getByRole, getByTestId } = render(() => (
      <ServiceRegistry>
        <ThemeProvider>
          <ToggleDarkMode />
          <ThemePaletteModeTest />
        </ThemeProvider>
      </ServiceRegistry>
    ))

    expect(getByTestId('themePaletteMode')).toHaveTextContent('light')

    const toggleDarkModeButton = getByRole('button', { name: 'Toggle dark mode' })
    toggleDarkModeButton.click()
    await Promise.resolve()

    expect(getByTestId('themePaletteMode')).toHaveTextContent('dark')
  })
})
