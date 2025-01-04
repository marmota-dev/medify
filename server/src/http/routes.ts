import { compare } from 'bcrypt'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import * as jwt from 'jsonwebtoken'
import { prisma } from '../database/prisma'
import { registerSchema } from './schemas/authSchema'
import { loginSchema } from './schemas/authSchema'

import { hash } from 'bcrypt'
import z from 'zod'
import { env } from '../env'

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
        body: loginSchema,
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
          400: z.object({
            statusCode: z.number(),
            error: z.string(),
            message: z.string(),
          }),
          401: z.object({
            statusCode: z.number(),
            error: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findFirst({ where: { email } })

      if (!user || !compare(password, user.password)) {
        return reply.status(401).send({
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Credenciais inválidas',
        })
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

  server
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/api/register',
      { schema: { body: registerSchema } },
      async (request, reply) => {
        const { email, password, name, confirm_password } = request.body

        const user = await prisma.user.findFirst({ where: { email } })

        if (user) {
          return reply
            .status(401)
            .send({ error: 'O e-mail já está cadastrado' })
        }

        const hashedPassword = await hash(password, 10)

        const newUser = await prisma.user.create({
          data: {
            email: email,
            name: name,
            password: hashedPassword,
          },
        })

        const { password: _, id: x, ...userRegister } = newUser

        return reply.send({
          message: {
            user: userRegister,
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
