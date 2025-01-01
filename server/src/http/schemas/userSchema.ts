import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'O nome de usuário é obrigatório'),
  email: z.string().email().min(1, 'O email é obrigatório'),
  password: z
    .string()
    .min(8, 'A senha é obrigatória e deve ter 8 ou mais caracteres'),
})
