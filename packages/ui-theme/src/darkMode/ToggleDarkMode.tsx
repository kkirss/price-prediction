import { type Component } from 'solid-js'
import { useService } from 'solid-services'
import { Brightness4, Brightness7 } from '@suid/icons-material'
import { IconButton } from '@suid/material'
import { type SxProps } from '@suid/system'

import { DarkModeService } from '~/darkMode'

export const ToggleDarkMode: Component<{
  sx?: SxProps
}> = (props) => {
  const darkModeService = useService(DarkModeService)
  return (
    <IconButton
      sx={props.sx}
      // eslint-disable-next-line react/jsx-handler-names
      onClick={darkModeService().toggleDarkMode}
      aria-label='Toggle dark mode'
    >
      {darkModeService().darkMode()
        ? (
          <Brightness7 />
          )
        : (
          <Brightness4 />
          )}
    </IconButton>
  )
}
