import { type Component, Show } from 'solid-js'
import { Box, Button, CircularProgress, TextField } from '@suid/material'
import { type SxProps } from '@suid/system'
import { createForm } from '@felte/solid'
import { validator } from '@felte/validator-zod'

import { loginSchema } from './schema'
import type { LoginData, LoginOnError, LoginOnSubmit } from './types'

export const LoginForm: Component<{
  onError: LoginOnError
  onSubmit: LoginOnSubmit
  disabled?: boolean
  sx?: SxProps
}> = (props) => {
  const { form, isValid, errors, isSubmitting } = createForm<LoginData>({
    onSubmit: props.onSubmit,
    onError: props.onError,
    extend: validator<LoginData>({ schema: loginSchema })
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
        Log in
        <Show when={isSubmitting()}>
          <CircularProgress size='1.5em' sx={{ position: 'absolute' }} />
        </Show>
      </Button>
    </Box>
  )
}
