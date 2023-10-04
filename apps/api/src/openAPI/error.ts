import { error } from 'express-openapi-validator'

export type OpenAPIErrorClassType = typeof error[keyof typeof error]
export type OpenAPIError = InstanceType<OpenAPIErrorClassType>
