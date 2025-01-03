import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { registerSchema } from './schemas/authSchema'
import { prisma } from '../database/prisma'
import { hash } from 'bcrypt'

export async function routes(server: FastifyInstance) {
  server.get('/', async (request, reply) => {
    return { message: 'Hello World!' }
  })

  server
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/api/register',
      { schema: { body: registerSchema } },
      async (request, reply) => {
        const { email, password, name, confirm_password } = request.body

        if (password !== confirm_password) {
          return reply.status(400).send({ error: "As senhas não são iguais"})
        }

        const user = await prisma.user.findFirst({ where: { email } })

        if (user) {
          return reply.status(401).send({ error: 'O e-mail já está cadastrado' })
        }

        const hashedPassword = await hash(password, 10)

        const newUser = await prisma.user.create({
          data: {
            email: email,
            name: name,
            password: hashedPassword
          }
        })

        const { password:_, id:x, ...userRegister } = newUser

        return reply.send({
          message: {
            user: userRegister
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
