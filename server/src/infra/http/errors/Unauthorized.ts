import type { UnauthorizedResponse } from '../docs/responses/error/unauthorizedResponse'

export class Unauthorized extends Error implements UnauthorizedResponse {
  readonly statusCode = 401
  readonly error = 'Unauthorized'

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
