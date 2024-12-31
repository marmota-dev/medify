import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().transform(val => Number.parseInt(val)),
  JWT_SECRET_KEY: z.string()
})

export const env = envSchema.parse(process.env)
