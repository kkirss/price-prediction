import { error } from 'express-openapi-validator'
import { HttpError } from 'express-openapi-validator/dist/framework/types'

export type OpenAPIErrorClassType = typeof error[keyof typeof error]
export type OpenAPIError = InstanceType<OpenAPIErrorClassType>

export {
  HttpError
}

export const createValidatorError = (message: string, fieldPath?: string): HttpError =>
  HttpError.create({
    status: 400,
    message,
    path: fieldPath !== undefined
      ? `/body/${fieldPath}`
      : '/body'
  })

export const createUnauthorizedError = (message: string): HttpError =>
  HttpError.create({
    status: 401,
    message,
    path: '/body'
  })
