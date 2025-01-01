import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userSchema } from './schemas/userSchema'
import { prisma } from '../database/prisma'
import { hash } from 'bcrypt'

export async function routes(server: FastifyInstance) {
  server.get('/', async (request, reply) => {
    return { message: 'Hello World!' }
  })

  server.withTypeProvider<ZodTypeProvider>().post('api/register', { schema: { body: userSchema } }, async (request, reply) => {
    const { email, name, password } = request.body

    let user = await prisma.user.findFirst({ where: { email } })

    if (user) {
      return reply.send({ error: "E-mail já cadastrado no sistema"})
    }

    const hashPassword = await hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        name: name
      }
    })

    const { password:_, ...userRegister } = newUser

    return reply.status(201).send({
      user: JSON.stringify(userRegister)
    })
  })

  server.post('api/pharmacy/add', async (request, reply) => {
    reply.status(201).send({ message: 'Pharmacy added successfully' })
  })

  server.delete('api/pharmacy/delete', async (request, reply) => {
    reply.status(200).send({ message: 'Pharmacy deleted successfully!' })
  })
}