import { type ParentComponent } from 'solid-js'
import { ThemeProvider as SUIDThemeProvider } from '@suid/material'
import { useService } from 'solid-services'

import { DarkModeService } from '~/darkMode'
import { getTheme } from './getTheme'

export const ThemeProvider: ParentComponent = (props) => {
  const darkModeService = useService(DarkModeService)
  const theme = getTheme(darkModeService().darkMode)

  return (
    <SUIDThemeProvider theme={theme}>
      {props.children}
    </SUIDThemeProvider>
  )
}
