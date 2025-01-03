import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().email().max(255, 'O limite de caracteres do e-mail é 255'),
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .max(255, 'O limite de caracteres da senha é 255'),
})
