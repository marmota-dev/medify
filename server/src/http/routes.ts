import { compare } from 'bcrypt'
import { hash } from 'bcrypt'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import * as jwt from 'jsonwebtoken'
import { prisma } from '../database/prisma'
import { env } from '../env'
import { loginRouteSchema } from './schemas/LoginRouteSchema'
import { registerRouteSchema } from './schemas/RegisterRouteSchema'

export async function routes(server: FastifyInstance) {
  server.get('/', async (request, reply) => {
    return { message: 'Hello World!' }
  })

  server
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/api/login',
      { schema: loginRouteSchema },
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
      { schema: registerRouteSchema },
      async (request, reply) => {
        const { email, password, name } = request.body

        const existingUser = await prisma.user.findFirst({ where: { email } })

        if (existingUser) {
          return reply.status(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'E-mail já cadastrado',
          })
        }

        const hashedPassword = await hash(password, 10)

        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        })

        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET_KEY, {
          expiresIn: '1h',
        })

        return reply.status(201).send({
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
