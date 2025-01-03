import type { FastifyInstance } from 'fastify'
import * as jwt from 'jsonwebtoken'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userSchema } from './schemas/userSchema'
import { prisma } from '../database/prisma'
import { compare } from 'bcrypt'

import { env } from '../env'

export async function routes(server: FastifyInstance) {
  server.get('/', async (request, reply) => {
    return { message: 'Hello World!' }
  })

  server
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/api/register',
      { schema: { body: userSchema } },
      async (request, reply) => {
        const { email, password } = request.body

        const user = await prisma.user.findFirst({ where: { email } })

        if (!user) {
          return reply.status(401).send({ error: 'Usuário não encontrado' })
        }

        if (!compare(password, user.password)) {
          return reply.status(401).send({ error: "As senhas não são iguais" })
        }

        const token = jwt.sign({
          userId: user.id
        }, env.JWT_SECRET_KEY)

        const { password:_, ...userLogin } = user

        return reply.status(200).send({
          token: token,
          user: userLogin
        })
      }
    )

  server.post('/api/pharmacy/add', async (request, reply) => {
    reply.status(201).send({ message: 'Pharmacy added successfully' })
  })

  server.delete('/api/pharmacy/delete', async (request, reply) => {
    reply.status(200).send({ message: 'Pharmacy deleted successfully!' })
  })
}
