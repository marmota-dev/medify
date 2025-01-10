import z from 'zod'

export const unauthorizedResponse = z.object({
  statusCode: z.literal(401),
  error: z.string(),
  message: z.string(),
})
