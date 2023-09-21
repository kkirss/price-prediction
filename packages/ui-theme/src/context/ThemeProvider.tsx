import { type ParentComponent } from 'solid-js'
import { createTheme, ThemeProvider as SUIDThemeProvider, useMediaQuery } from '@suid/material'

export const ThemeProvider: ParentComponent = (props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = createTheme({
    palette: {
      mode: prefersDarkMode() ? 'dark' : 'light'
    }
  })

  return (
    <SUIDThemeProvider theme={theme}>
      {props.children}
    </SUIDThemeProvider>
  )
}
