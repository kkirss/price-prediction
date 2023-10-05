import { SubmitContext } from '@felte/common'

export interface SignupData extends Record<string, unknown> {
  username: string
  password: string
}

export type SignUpOnSubmit = (values: SignupData, context: SubmitContext<SignupData>) => Promise<unknown> | unknown
