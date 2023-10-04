import { error } from 'express-openapi-validator'
import { HttpError } from 'express-openapi-validator/dist/framework/types'

export type OpenAPIErrorClassType = typeof error[keyof typeof error]
export type OpenAPIError = InstanceType<OpenAPIErrorClassType>

export {
  HttpError
}
