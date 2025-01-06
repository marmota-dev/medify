import z from 'zod'
import { registerSchema } from './authSchema'

export const registerRouteSchema = {
  schema: {
    tags: ['auth'],
    summary: 'This route is responsible for registering a new user',
    body: registerSchema,
    response: {
      201: z.object({
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
    },
  },
}
