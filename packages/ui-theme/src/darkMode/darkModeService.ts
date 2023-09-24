import { Accessor, createSignal } from 'solid-js'

import { usePrefersDarkMode } from './usePrefersDarkMode'

export interface DarkModeInfo {
  darkMode: Accessor<boolean>
  setDarkMode: (darkMode: boolean) => void
  toggleDarkMode: () => void
}

export function DarkModeService (): DarkModeInfo {
  const prefersDarkMode = usePrefersDarkMode()
  const [darkMode, setDarkMode] = createSignal(prefersDarkMode())

  return {
    darkMode,
    setDarkMode: (value: boolean) => {
      setDarkMode(value)
    },
    toggleDarkMode: () => {
      setDarkMode(previous => !previous)
    }
  }
}
