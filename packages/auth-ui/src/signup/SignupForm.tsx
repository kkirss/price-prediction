import { type Component, Show } from 'solid-js'
import { Box, Button, CircularProgress, TextField } from '@suid/material'
import { type SxProps } from '@suid/system'
import { createForm } from '@felte/solid'
import { validator } from '@felte/validator-zod'

import { signupSchema } from './schema'
import type { SignupData, SignUpOnError, SignUpOnSubmit } from './types'

export const SignupForm: Component<{
  onError: SignUpOnError
  onSubmit: SignUpOnSubmit
  disabled?: boolean
  sx?: SxProps
}> = (props) => {
  const { form, isValid, errors, isSubmitting } = createForm<SignupData>({
    onSubmit: props.onSubmit,
    onError: props.onError,
    extend: validator<SignupData>({ schema: signupSchema })
  })
  const submitDisabled = (): boolean =>
    (props.disabled ?? false) ||
    !isValid() ||
    isSubmitting()
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
        error={(() => Boolean(errors().username))()}
        helperText={(() => errors().username?.[0])()}
      />
      <TextField
        label='Password'
        name='password'
        type='password'
        disabled={props.disabled ?? false}
        error={(() => Boolean(errors().password))()}
        helperText={(() => errors().password?.[0])()}
      />
      <Button
        variant='contained'
        color='primary'
        type='submit'
        size='large'
        disabled={submitDisabled()}
      >
        Sign up
        <Show when={isSubmitting()}>
          <CircularProgress size='1.5em' sx={{ position: 'absolute' }} />
        </Show>
      </Button>
    </Box>
  )
}
