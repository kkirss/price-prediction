import { Component, Show } from 'solid-js'
import { A } from '@solidjs/router'
import { useService } from 'solid-services'
import { Button, Typography } from '@suid/material'

import { AuthService } from '@price-prediction/api-client'

import { LOGIN_PATH } from '~/pages/auth/paths'

const AuthInfo: Component = () => {
  const authService = useService(AuthService)
  return (
    <Show
      when={authService().session()}
      fallback={
        // TODO: Use login button instead
        <Button
          component={A}
          href={LOGIN_PATH}
          variant='contained'
          color='primary'
          sx={{ ml: 1 }}
        >
          Log in
        </Button>
      }
    >
      {(session) => (
        <Typography overflow='ellipsis'>
          {session().user.username}
        </Typography>
        // TODO: Add logout button
      )}
    </Show>
  )
}

export default AuthInfo
