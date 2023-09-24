import { Accessor } from 'solid-js'
import { useMediaQuery } from '@suid/material'

export const usePrefersDarkMode = (): Accessor<boolean> => (
  useMediaQuery('(prefers-color-scheme: dark)')
)
