import type { BadRequestResponse } from '../docs/responses/error/badRequestResponse'

export class BadRequest extends Error implements BadRequestResponse {
  readonly statusCode = 400
  readonly error = 'Bad Request'

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
