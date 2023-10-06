import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, fireEvent, waitFor } from '@solidjs/testing-library'

import { SignupForm } from './SignupForm'

const USERNAME_LABEL = 'Username'
const PASSWORD_LABEL = 'Password'
const SIGNUP_BUTTON_TEXT = 'Sign up'

describe('SignupForm', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  const onError = vi.fn()
  const onSubmit = vi.fn()

  it('renders fields', async () => {
    const { getByLabelText } = render(() =>
      <SignupForm
        onError={onError}
        onSubmit={onSubmit}
      />
    )

    const usernameField = getByLabelText(USERNAME_LABEL)
    expect(usernameField).toBeInTheDocument()
    const passwordField = getByLabelText(PASSWORD_LABEL)
    expect(passwordField).toBeInTheDocument()
  })
  it('cannot submit with empty fields', async () => {
    const { getByRole } = render(() =>
      <SignupForm
        onError={onError}
        onSubmit={onSubmit}
      />
    )

    const submitButton = getByRole('button', { name: SIGNUP_BUTTON_TEXT })
    // TODO: Wait for validation to finish before expecting.
    //       Currently, this test would pass even with valid data.
    //       I'm not sure how to wait for the validation to finish when the end result is the initial state (disabled).
    await waitFor(() =>
      expect(submitButton).toBeDisabled()
    )
  })
  it('can submit with valid fields', async () => {
    const username = 'testuser'
    const password = 'testpassword'
    const { getByLabelText, getByRole } = render(() =>
      <SignupForm
        onError={onError}
        onSubmit={onSubmit}
      />
    )

    const usernameField = getByLabelText(USERNAME_LABEL)
    const passwordField = getByLabelText(PASSWORD_LABEL)
    const submitButton = getByRole('button', { name: SIGNUP_BUTTON_TEXT })

    fireEvent.input(usernameField, { target: { value: username } })
    fireEvent.input(passwordField, { target: { value: password } })

    await waitFor(() =>
      expect(submitButton).not.toBeDisabled()
    )
    submitButton.click()

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({ username, password }, expect.anything())
    )
  })
})
