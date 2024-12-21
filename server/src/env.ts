import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().transform(val => Number.parseInt(val)),
})

export const env = envSchema.parse(process.env)
