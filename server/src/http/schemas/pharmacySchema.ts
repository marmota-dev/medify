import { z } from 'zod'

export const userSchema = z.object({
  id: z
    .string(),
  name: z
    .string()
    .min(1, 'O nome é obrigatório'),
  address: z
    .string()
    .min(1, 'O endereço é obrigatório'),
  phoneNumber: z
    .string()
    .regex(/^\+?\d{10,15}$/, 'Telefone inválido'),
  operatingHours: z
    .string()
    .regex(/^\d{2}:\d{2} - \d{2}:\d{2}$/, 'Horário de funcionamento deve estar no formato HH:MM - HH:MM'),
  email: z
    .string()
    .email()
    .min(1, 'O e-mail é obrigatório'),
})