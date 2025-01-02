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
      '/api/login',
      { schema: { body: userSchema } },
      async (request, reply) => {
        const { email, password } = request.body

        const errors: object[] = []

        if (email === '') {
          errors.push({ error: 'O e-mail é obrigatório' })
        }

        if (password === '') {
          errors.push({ error: 'A senha é obrigatória' })
        }

        if (typeof email !== 'string') {
          errors.push({ error: 'O e-mail deve ser um texto' })
        }

        if (typeof password !== 'string') {
          errors.push({ error: 'A senha deve ser um texto' })
        }

        if (email.length > 255) {
          errors.push({ error: 'O limite de caracteres do e-mail é 255' })
        }

        if (password.length > 255 || password.length < 8) {
          errors.push({
            error: 'O mínimo de caracteres da senha é 255 e o limite é 255',
          })
        }

        if (errors.length >= 1) {
          return reply.status(400).send({ errors: JSON.stringify(errors) })
        }

        const user = await prisma.user.findFirst({ where: { email } })

        if (!user) {
          return reply.status(401).send({ error: 'O usuário não existe' })
        }

        if (!compare(password, user.password)) {
          return reply.status(401).send({ error: 'Senha incorreta' })
        }

        const token = jwt.sign(
          {
            userId: user.id,
          },
          env.JWT_SECRET_KEY
        )

        const { password: _, ...userLogin } = user

        return reply.send({
          message: {
            user: userLogin,
            token: token,
          },
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
