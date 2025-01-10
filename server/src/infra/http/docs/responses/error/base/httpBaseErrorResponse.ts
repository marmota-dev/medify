import { z } from 'zod'

export const httpBaseErrorResponse = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string(),
})

export type HttpBaseErrorResponse = z.infer<typeof httpBaseErrorResponse>
