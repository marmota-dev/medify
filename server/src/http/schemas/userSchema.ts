import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email('O e-mail digitado deve ser um e-mail válido').max(255, 'O limite de caracteres do e-mail é 255'),
  password: z
    .string()
    .min(8, 'O mínimo de caracteres da senha é 8')
    .max(255, 'O limite de caracteres da senha é 255'),
  name: z.string().min(3, 'O mínimo de caracteres do nome é 3').max(255, 'O limite de caracteres do nome é 255'),
  confirm_password: z.string()
})
