import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .email('O e-mail digitado deve ser um e-mail válido')
    .max(255, 'O limite de caracteres do e-mail é 255')
    .nonempty('O e-mail é obrigatório'),
  password: z
    .string()
    .min(8, 'O mínimo de caracteres da senha é 8')
    .max(255, 'O limite de caracteres da senha é 255')
    .nonempty('A senha é obrigatória'),
})

export const registerSchema = z.object({
  email: z
    .string()
    .email('O e-mail digitado deve ser um e-mail válido')
    .max(255, 'O limite de caracteres do e-mail é 255')
    .nonempty('O e-mail é obrigatório'),
  password: z
    .string()
    .min(8, 'O mínimo de caracteres da senha é 8')
    .max(255, 'O limite de caracteres da senha é 255')
    .nonempty('A senha é obrigatória'),
  name: z
    .string()
    .min(3, 'O mínimo de caracteres do nome é 3')
    .max(255, 'O limite de caracteres do nome é 255')
    .nonempty('O nome é obrigatório'),
  confirm_password: z.string().nonempty('A confirmação da senha é obrigatória'),
})