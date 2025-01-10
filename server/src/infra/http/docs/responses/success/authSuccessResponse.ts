import z from 'zod'

export const authSuccessResponse = z.object({
  access_token: z.string(),
  token_type: z.literal('Bearer'),
  expires_in: z.number(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
  }),
})
