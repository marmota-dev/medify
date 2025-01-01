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
    const { email, name, password, confirm_password } = request.body

    const errors: object[] = []

    if (email === '') {
      errors.push({ error: 'O e-mail é obrigatório' })
    }

    if (password === '') {
      errors.push({ error: 'A senha é obrigatória' })
    }

    if (name === '') {
      errors.push({ error: 'O nome é obrigatório' })
    }

    if (confirm_password === '') {
      errors.push({ error: 'A confirmação da senha é obrigatória' })
    }

    if (typeof email !== 'string') {
      errors.push({ error: 'O e-mail deve ser um texto' })
    }

    if (typeof password !== 'string') {
      errors.push({ error: 'A senha deve ser um texto' })
    }

    if (typeof name !== 'string') {
      errors.push({ error: 'O nome deve ser um texto' })
    }

    if (typeof confirm_password !== 'string') {
      errors.push({ error: 'A confirmação da senha deve ser um texto' })
    }

    if (name.length < 3 || name.length > 255) {
      errors.push({
        error: 'O nome deve ter no mínimo 3 caracteres e no máximo 255',
      })
    }

    if (password.length < 8 || password.length > 255) {
      errors.push({
        error: 'A senha deve ter no mínimo 8 caracteres e no máximo 255',
      })
    }

    if (email.length > 255) {
      errors.push({ error: 'O email deve ter no máximo 255 caracteres' })
    }

    if (password !== confirm_password) {
      errors.push({ error: 'As senhas inseridas devem ser iguais' })
    }

    if (errors.length >= 1) {
      return reply.status(400).send({ errors: errors })
    }

    const user = await prisma.user.findFirst({ where: { email } })

    if (user) {
      return reply.status(401).send({ error: 'E-mail já cadastrado no sistema' })
    }

    const hashPassword = await hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        name: name
      },
    })

    const { password: _, ...userRegister } = newUser

    return reply.status(201).send({
      user: JSON.stringify(userRegister),
    })
  })

  server.post('api/pharmacy/add', async (request, reply) => {
    reply.status(201).send({ message: 'Pharmacy added successfully' })
  })

  server.delete('api/pharmacy/delete', async (request, reply) => {
    reply.status(200).send({ message: 'Pharmacy deleted successfully!' })
  })
}
