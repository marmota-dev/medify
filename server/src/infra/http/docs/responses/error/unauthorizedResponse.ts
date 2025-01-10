import z from 'zod'
import { httpBaseErrorResponse } from './base/httpBaseErrorResponse'

export const unauthorizedResponse = httpBaseErrorResponse.extend({
  statusCode: z.literal(401),
  error: z.literal('Unauthorized'),
})

export type UnauthorizedResponse = z.infer<typeof unauthorizedResponse>
