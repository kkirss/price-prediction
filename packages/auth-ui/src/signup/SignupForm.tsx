import { type Component } from 'solid-js'
import { Box, Button, TextField } from '@suid/material'
import { type SxProps } from '@suid/system'
import { createForm } from '@felte/solid'
import { validator } from '@felte/validator-zod'

import { signupSchema } from './schema'
import { type SignupData, type SignUpOnSubmit } from './types'

// TODO: Add error handling
export const SignupForm: Component<{
  onSubmit: SignUpOnSubmit
  disabled?: boolean
  sx?: SxProps
}> = (props) => {
  const { form, isValid } = createForm<SignupData>({
    onSubmit: props.onSubmit,
    extend: validator<SignupData>({ schema: signupSchema })
  })
  const submitDisabled = (): boolean => (props.disabled ?? false) || !isValid()
  return (
    <Box
      component='form'
      sx={props.sx}
      ref={form}
    >
      <TextField
        label='Username'
        name='username'
        disabled={props.disabled ?? false}
      />
      <TextField
        label='Password'
        name='password'
        type='password'
        disabled={props.disabled ?? false}
      />
      <Button
        variant='contained'
        color='primary'
        type='submit'
        disabled={submitDisabled()}
      >
        Sign up
      </Button>
    </Box>
  )
}
