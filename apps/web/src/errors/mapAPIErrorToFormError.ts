import type { AssignableErrors, Obj } from '@felte/common'

import { APIErrorObject } from '@price-prediction/api-schema'

/**
 * Map an APIErrorObject into a format that Felte expects.
 */
export const mapAPIErrorToFormError = <Data extends Obj, FormError = AssignableErrors<Data>>(
  apiError: unknown | APIErrorObject
): FormError | {} | undefined => {
  if (!(apiError instanceof APIErrorObject)) {
    return
  }
  if (apiError.errors === undefined) {
    return
  }
  return apiError.errors.reduce((acc, error) => {
    const fieldName = error.path.split('body/')[1] as keyof FormError
    if (acc[fieldName] === undefined) {
      // @ts-expect-error
      acc[fieldName] = [] as string[]
    }
    (acc[fieldName] as string[]).push(error.message)
    return acc
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/consistent-type-assertions
  }, {} as FormError)
}
