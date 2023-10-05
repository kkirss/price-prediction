import { APIError } from './models'

export class APIErrorObject extends Error {
  error: APIError['error']
  errors: APIError['errors']

  constructor (error: APIError) {
    super(error.error)
    this.error = error.error
    this.errors = error.errors
  }
}
