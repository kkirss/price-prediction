import { Component, Show } from 'solid-js'
import { useService } from 'solid-services'
import { Button, Typography } from '@suid/material'

import { SIGNUP_PATH } from '~/pages/auth/paths'

import { AuthService } from './authService'

const AuthInfo: Component = () => {
  const authService = useService(AuthService)
  return (
    <Show
      when={authService().session()}
      fallback={
        // TODO: Use login button instead
        <Button
          href={SIGNUP_PATH}
          variant='contained'
          color='primary'
          sx={{ ml: 1 }}
        >
          Sign up
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
