import { SubmitContext } from '@felte/common'

import { type SignupRequest } from '@price-prediction/api-client'

export type SignupData = SignupRequest
export type SignUpOnSubmit = (values: SignupData, context: SubmitContext<SignupData>) => Promise<unknown> | unknown
