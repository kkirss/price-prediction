import { type Component } from 'solid-js'
import { Typography } from '@suid/material'

import { SignupForm } from '@price-prediction/auth-ui'

import { CenteredBox } from '~/layout/CenteredBox'

const Signup: Component = () => {
  const onSubmit: (data: any) => Promise<void> = async (data: any) => {
    console.log('data', data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
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
