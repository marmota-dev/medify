import z from 'zod'
import { loginSchema } from './auth'

export const loginRouteSchema = {
  schema: {
    tags: ['auth'],
    summary: 'This route is responsible for authenticating the user',
    body: loginSchema,
    response: {
      200: z.object({
        access_token: z.string(),
        token_type: z.literal('Bearer'),
        expires_in: z.number(),
        user: z.object({
          id: z.number(),
          name: z.string(),
          email: z.string(),
        }),
      }),
      400: z.object({
        statusCode: z.number(),
        error: z.string(),
        message: z.string(),
      }),
      401: z.object({
        statusCode: z.number(),
        error: z.string(),
        message: z.string(),
      }),
    },
  },
}
