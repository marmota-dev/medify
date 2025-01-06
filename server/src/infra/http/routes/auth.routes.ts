import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import login from '../../../application/usecase/Login'
import register from '../../../application/usecase/Register'
import { loginRouteSchema } from '../schemas/LoginRouteSchema'
import { registerRouteSchema } from '../schemas/RegisterRouteSchema'

export async function authRoutes(server: FastifyInstance) {
  server
    .withTypeProvider<ZodTypeProvider>()
    .post('/api/login', loginRouteSchema, async (request, reply) => {
      const { email, password } = request.body

      const response = await login(email, password)

      return reply.status(200).send(response)
    })

  server
    .withTypeProvider<ZodTypeProvider>()
    .post('/api/register', registerRouteSchema, async (request, reply) => {
      const { name, email, password } = request.body

      const response = await register(name, email, password)

      return reply.status(201).send(response)
    })
}
