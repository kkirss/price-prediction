import { Component, Show } from 'solid-js'
import { useService } from 'solid-services'
import { A } from '@solidjs/router'
import { Alert, Button, Stack, Typography } from '@suid/material'

import { AuthService } from '@price-prediction/api-client'

import { LOGIN_PATH } from '~/pages/auth/paths'

export const NotAuthenticatedMessage: Component = () => {
  const authService = useService(AuthService)
  const shouldShow = (): boolean => !(authService().isAuthenticated())
  return (
    <Show when={shouldShow()}>
      <Alert severity='info' sx={{ flexShrink: 1 }}>
        <Stack direction='column' gap={2}>
          <Typography>
            Please log in to predict
          </Typography>
          <Button
            component={A}
            href={LOGIN_PATH}
            variant='contained'
            color='primary'
            size='small'
          >
            Log in
          </Button>
        </Stack>
      </Alert>
    </Show>
  )
}
