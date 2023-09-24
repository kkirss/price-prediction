import { Accessor } from 'solid-js'
import { createTheme, type Theme } from '@suid/material'
import { createPalette } from '@suid/material/styles/createPalette'

export const getTheme = (prefersDarkMode: Accessor<boolean>): Theme => (
  createTheme({
    // Need to wrap in a function to make it reactive
    // See https://github.com/swordev/suid/issues/84
    palette: () => createPalette({
      mode: prefersDarkMode() ? 'dark' : 'light'
    })
  })
)
