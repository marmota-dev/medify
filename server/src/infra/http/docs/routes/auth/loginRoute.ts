import { loginSchema } from '../../../validation/auth/loginSchema'
import { badRequestResponse } from '../../responses/error/badRequestResponse'
import { unauthorizedResponse } from '../../responses/error/unauthorizedResponse'
import { authSuccessResponse } from '../../responses/success/authSuccessResponse'

export const loginRouteSchema = {
  schema: {
    tags: ['auth'],
    summary: 'This route is responsible for authenticating the user',
    body: loginSchema,
    response: {
      200: authSuccessResponse,
      400: badRequestResponse,
      401: unauthorizedResponse,
    },
  },
}
