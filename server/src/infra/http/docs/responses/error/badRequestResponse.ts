import z from 'zod'
import { httpBaseErrorResponse } from './base/httpBaseErrorResponse'

export const badRequestResponse = httpBaseErrorResponse.extend({
  statusCode: z.literal(400),
  error: z.literal('Bad Request'),
})

export type BadRequestResponse = z.infer<typeof badRequestResponse>
