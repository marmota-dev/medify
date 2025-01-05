import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { prisma } from '../../database/prisma'
import { env } from '../../env'

type RegisterResponse = {
  access_token: string
  token_type: 'Bearer'
  expires_in: number
  user: {
    id: number
    name: string
    email: string
  }
}

export default async function register(
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  const existingUser = await prisma.user.findFirst({ where: { email } })

  if (existingUser) {
    throw new Error('Email já cadastrado')
  }

  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

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
