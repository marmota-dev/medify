import z from 'zod'

export const badRequestResponse = z.object({
  statusCode: z.literal(400),
  error: z.string(),
  message: z.string(),
})
