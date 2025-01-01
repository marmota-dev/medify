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

  server.withTypeProvider<ZodTypeProvider>().post('api/login', { schema: { body: userSchema } }, async (request, reply) => {
      const { email, password } = request.body

      if (email === "") {
        return reply.status(400).send({ error: 'O e-mail é obrigatório' })
      } else if (password === "") {
        return reply.status(400).send({ error: 'A senha é obrigatória' })
      } else if (email === "" && password === "") {
        return reply.status(400).send({ error: 'O e-mail e a senha são obrigatórios' })
      }

      if (typeof email !== "string") {
        return reply.status(400).send({ error: 'O tipo do e-mail deve ser um texto' })
      } else if (typeof password !== "string") {
        return reply.status(400).send({ error: 'O tipo da senha deve ser um texto' })
      } else if (typeof email !== "string" && typeof password !== "string") {
        return reply.status(400).send({ error: 'Os tipos do e-mail e da senha devem ser textos' })
      }

      if (email.length > 255) {
        return reply.status(400).send({ error: 'O limite de caracteres do e-mail é 255' })
      }

      if (password.length > 255) {
        return reply.status(400).send({ error: 'O limite de caracteres da senha é 255' })
      }

      if (password.length < 8) {
        return reply.status(400).send({ error: 'O mínimo de caracteres da senha é 8' })
      }

      let user = await prisma.user.findFirst({ where: { email } })

      if (!user) {
        return reply.status(401).send({ error: 'O usuário não existe' })
      }

      if (!compare(password, user.password)) {
        return reply.status(401).send({ error: 'Senha incorreta' })
      }

      const token = jwt.sign({
        userId: user.id,
      }, env.JWT_SECRET_KEY)

      const { password:_, ...userLogin } = user

      return reply.send({
        message: {
          user: userLogin,
          token: token
        }
      })
    }
  )

  server.post('api/pharmacy/add', async (request, reply) => {
    reply.status(201).send({ message: 'Pharmacy added successfully' })
  })

  server.delete('api/pharmacy/delete', async (request, reply) => {
    reply.status(200).send({ message: 'Pharmacy deleted successfully!' })
  })
}