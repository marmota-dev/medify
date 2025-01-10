import { registerSchema } from '../../../validation/auth/registerSchema'
import { badRequestResponse } from '../../responses/error/badRequestResponse'
import { authSuccessResponse } from '../../responses/success/authSuccessResponse'

export const registerRouteSchema = {
  schema: {
    tags: ['auth'],
    summary: 'This route is responsible for registering a new user',
    body: registerSchema,
    response: {
      201: authSuccessResponse,
      400: badRequestResponse,
    },
  },
}
