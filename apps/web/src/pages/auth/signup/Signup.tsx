import { type Component } from 'solid-js'
import { Typography } from '@suid/material'

import { useSignup } from '@price-prediction/api-client'
import { SignupRequest } from '@price-prediction/api-schema'
import { SignupForm } from '@price-prediction/auth-ui'

import { CenteredBox } from '~/layout/CenteredBox'

const Signup: Component = () => {
  const signup = useSignup({
    onSuccess: (data) => {
      alert(`Successfully signed up as ${data.user.username}`)
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
