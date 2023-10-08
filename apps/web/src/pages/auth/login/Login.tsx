import { type Component } from 'solid-js'
import { A, useNavigate } from '@solidjs/router'
import { useService } from 'solid-services'
import { Button, Typography } from '@suid/material'

import { useLogin } from '@price-prediction/api-client'
import { LoginRequest } from '@price-prediction/api-schema'
import { LoginForm } from '@price-prediction/auth-ui'

import { AuthService } from '~/auth/authService'
import { mapAPIErrorToFormError } from '~/errors/mapAPIErrorToFormError'
import { CenteredBox } from '~/layout/CenteredBox'
import { SIGNUP_PATH } from '~/pages/auth/paths'

const Login: Component = () => {
  const authService = useService(AuthService)
  const navigate = useNavigate()
  const login = useLogin({
    onSuccess: (session) => {
      authService().setSession(session)
      navigate('/')
    }
  })
  const onSubmit = async (data: LoginRequest): Promise<void> => {
    await login.mutateAsync(data)
  }
  return (
    <CenteredBox>
      <Typography variant='h2' sx={{ mb: 4 }}>
        Log in
      </Typography>
      <LoginForm
        onError={mapAPIErrorToFormError<LoginRequest>}
        onSubmit={onSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: '40ch'
        }}
      />
      <Typography variant='body1' sx={{ mt: 6 }}>
        Don't have an account?
      </Typography>
      <Button
        component={A}
        href={SIGNUP_PATH}
        variant='contained'
        color='primary'
        size='large'
        sx={{ mt: 1 }}
      >
        Sign up
      </Button>
    </CenteredBox>
  )
}

export default Login
