import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { prisma } from '../../infra/database/prisma'
import { env } from '../../infra/env'
import { Unauthorized } from '../../infra/http/errors/Unauthorized'

type LoginResponse = {
  access_token: string
  token_type: 'Bearer'
  expires_in: number
  user: {
    id: number
    name: string
    email: string
  }
}

export default async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const user = await prisma.user.findFirst({ where: { email } })

  if (!user || !compare(password, user.password)) {
    throw new Unauthorized('Credenciais inválidas')
  }

  const token = sign({ userId: user.id }, env.JWT_SECRET_KEY, {
    expiresIn: '1h',
  })

  return {
    access_token: token,
    token_type: 'Bearer',
    expires_in: 3600,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  }
}
