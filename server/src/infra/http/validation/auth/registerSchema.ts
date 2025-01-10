import { z } from 'zod'
import { emailSchema } from '../shared/emailSchema'
import { passwordSchema } from '../shared/passwordSchema'

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, 'O mínimo de caracteres do nome é 3')
      .max(255, 'O limite de caracteres do nome é 255')
      .nonempty('O nome é obrigatório'),
    email: emailSchema,
    password: passwordSchema,
    confirm_password: z
      .string()
      .nonempty('A confirmação da senha é obrigatória'),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'As senhas devem ser iguais.',
    path: ['confirm_password'],
  })

export type RegisterInput = z.infer<typeof registerSchema>
