import z from 'zod'

export const emailSchema = z
  .string()
  .email('O e-mail digitado deve ser um e-mail válido')
  .max(255, 'O limite de caracteres do e-mail é 255')
  .nonempty('O e-mail é obrigatório')
