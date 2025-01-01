import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z
    .string()
    .email('O texto inserido no campo de e-mail deve ser um e-mail válido'),
  password: z.string(),
  confirm_password: z.string(),
})
