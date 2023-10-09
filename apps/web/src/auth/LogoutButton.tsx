import { type Component, Show } from 'solid-js'
import { useService } from 'solid-services'
import { Button, CircularProgress } from '@suid/material'
import { type SxProps } from '@suid/system'

import { AuthService, useLogout } from '@price-prediction/api-client'

export const LogoutButton: Component<{
  sx?: SxProps
}> = (props) => {
  const authService = useService(AuthService)
  const logout = useLogout({
    onSuccess: () => {
      authService().clearSession()
    }
  })
  return (
    <Button
      variant='outlined'
      color='inherit'
      size='small'
      sx={props.sx}
      onClick={() => logout.mutate()}
    >
      Log out
      <Show when={logout.isLoading}>
        <CircularProgress size='1.5em' sx={{ position: 'absolute' }} />
      </Show>
    </Button>
  )
}
