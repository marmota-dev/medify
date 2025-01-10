import z from 'zod'

export const passwordSchema = z
  .string()
  .min(8, 'O mínimo de caracteres da senha é 8')
  .max(255, 'O limite de caracteres da senha é 255')
  .nonempty('A senha é obrigatória')
