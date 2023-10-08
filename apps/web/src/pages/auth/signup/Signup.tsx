import { type Component } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { useService } from 'solid-services'
import { Typography } from '@suid/material'

import { useSignup } from '@price-prediction/api-client'
import { type SignupRequest } from '@price-prediction/api-schema'
import { SignupForm } from '@price-prediction/auth-ui'

import { AuthService } from '~/auth/authService'
import { mapAPIErrorToFormError } from '~/errors/mapAPIErrorToFormError'
import { CenteredBox } from '~/layout/CenteredBox'

const Signup: Component = () => {
  const authService = useService(AuthService)
  const navigate = useNavigate()
  const signup = useSignup({
    onSuccess: (session) => {
      authService().setSession(session)
      navigate('/')
    }
  })
  const onSubmit = async (data: SignupRequest): Promise<void> => {
    await signup.mutateAsync(data)
  }
  return (
    <CenteredBox>
      <Typography variant='h2' sx={{ mb: 4 }}>
        Sign up
      </Typography>
      <SignupForm
        onError={mapAPIErrorToFormError<SignupRequest>}
        onSubmit={onSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: '40ch'
        }}
      />
    </CenteredBox>
  )
}

export default Signup
