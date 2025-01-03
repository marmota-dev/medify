import type { FastifyInstance } from 'fastify'
import * as jwt from 'jsonwebtoken'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userSchema } from './schemas/userSchema'
import { prisma } from '../database/prisma'
import { compare } from 'bcrypt'

import { env } from '../env'
import z from 'zod'

export async function routes(server: FastifyInstance) {
  server.get('/', async (request, reply) => {
    return { message: 'Hello World!' }
  })

  server.withTypeProvider<ZodTypeProvider>().post(
    '/api/login',
    {
      schema: {
        tags: ['auth'],
        summary: 'This route is responsible for authenticating the user',
        body: userSchema,
        response: {
          200: z.object({
            access_token: z.string(),
            token_type: z.literal('Bearer'),
            expires_in: z.number(),
            user: z.object({
              id: z.number(),
              name: z.string(),
              email: z.string(),
            }),
          }),
          401: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findFirst({ where: { email } })

      if (!user || !compare(password, user.password)) {
        return reply.status(401).send({ error: 'Credenciais inválidas' })
      }

      const token = jwt.sign({ userId: user.id }, env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      })

      return reply.status(200).send({
        access_token: token,
        token_type: 'Bearer',
        expires_in: 3600,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
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
