import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@solidjs/testing-library'

import { DarkModeService } from './darkModeService'

const mocks = vi.hoisted(() => ({
  usePrefersDarkMode: vi.fn()
}))

vi.mock('~/darkMode/usePrefersDarkMode', () => ({
  usePrefersDarkMode: mocks.usePrefersDarkMode
}))

describe('DarkModeService', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it.each([
    [true],
    [false]
  ])('should default to system dark mode preference (%s)', (prefersDarkMode) => {
    mocks.usePrefersDarkMode.mockImplementation(() => () => prefersDarkMode)

    const { result: darkModeService } = renderHook(DarkModeService)

    expect(darkModeService.darkMode()).toBe(prefersDarkMode)
  })

  it('can set dark mode', () => {
    mocks.usePrefersDarkMode.mockImplementation(() => () => false)

    const { result: darkModeService } = renderHook(DarkModeService)
    expect(darkModeService.darkMode()).toBe(false)

    darkModeService.setDarkMode(true)
    expect(darkModeService.darkMode()).toBe(true)
  })

  it('can toggle dark mode', () => {
    mocks.usePrefersDarkMode.mockImplementation(() => () => false)

    const { result: darkModeService } = renderHook(DarkModeService)
    expect(darkModeService.darkMode()).toBe(false)

    darkModeService.toggleDarkMode()
    expect(darkModeService.darkMode()).toBe(true)
  })
})
