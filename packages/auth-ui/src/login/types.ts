import type { SubmitContext, FormConfigWithoutTransformFn } from '@felte/common'

import type { LoginRequest } from '@price-prediction/api-schema'

export type LoginData = LoginRequest
export type LoginOnError = FormConfigWithoutTransformFn<LoginData>['onError']
export type LoginOnSubmit = (values: LoginData, context: SubmitContext<LoginData>) => Promise<unknown> | unknown
