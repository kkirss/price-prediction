import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from '@solidjs/testing-library'
import { Component } from 'solid-js'
import { useTheme } from '@suid/material'
import { ServiceRegistry, useService } from 'solid-services'

import { DarkModeService } from '~/darkMode'
import { ThemeProvider } from './ThemeProvider'

const mocks = vi.hoisted(() => ({
  usePrefersDarkMode: vi.fn()
}))

vi.mock('~/darkMode/usePrefersDarkMode', () => ({
  usePrefersDarkMode: mocks.usePrefersDarkMode
}))

const ThemePaletteModeTest: Component = () => {
  const darkModeService = useService(DarkModeService)
  return (
    <>
      <p data-testid='themePaletteMode'>
        {useTheme().palette.mode}
      </p>
      <button
        data-testid='toggleDarkModeButton'
        onClick={() => darkModeService().toggleDarkMode()}
      >
        Toggle Dark Mode
      </button>
    </>
  )
}

const ThemeProviderTest: Component = () => (
  <ServiceRegistry>
    <ThemeProvider>
      <ThemePaletteModeTest />
    </ThemeProvider>
  </ServiceRegistry>
)

describe('ThemeProvider', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it.each([
    ['dark', true],
    ['light', false]
  ])('should provide theme.palette.mode (%s) for system dark mode preference (%s)', (expectedPaletteMode, prefersDarkMode) => {
    mocks.usePrefersDarkMode.mockImplementation(() => () => prefersDarkMode)

    const { getByTestId } = render(() => (
      <ThemeProviderTest />
    ))

    expect(getByTestId('themePaletteMode')).toHaveTextContent(expectedPaletteMode)
  })

  it('can toggle dark mode', async () => {
    mocks.usePrefersDarkMode.mockImplementation(() => () => false)

    const { getByTestId } = render(() => (
      <ThemeProviderTest />
    ))

    expect(getByTestId('themePaletteMode')).toHaveTextContent('light')

    const toggleDarkModeButton = getByTestId('toggleDarkModeButton')
    toggleDarkModeButton.click()
    await Promise.resolve()

    expect(getByTestId('themePaletteMode')).toHaveTextContent('dark')
  })
})
