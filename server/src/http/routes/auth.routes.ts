import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import login from '../../application/usecase/Login'
import register from '../../application/usecase/Register'
import { loginRouteSchema } from '../schemas/LoginRouteSchema'
import { registerRouteSchema } from '../schemas/RegisterRouteSchema'

export async function authRoutes(server: FastifyInstance) {
  server
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/api/login',
      { schema: loginRouteSchema },
      async (request, reply) => {
        const { email, password } = request.body

        try {
          const loginResponse = await login(email, password)

          return reply.status(200).send(loginResponse)
        } catch (error) {
          return reply.status(401).send({
            statusCode: 401,
            error: 'Unauthorized',
            message: 'Credenciais inválidas',
          })
        }
      }
    )

  server
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/api/register',
      { schema: registerRouteSchema },
      async (request, reply) => {
        const { name, email, password } = request.body

        try {
          const registerResponse = await register(name, email, password)

          return reply.status(201).send(registerResponse)
        } catch (error) {
          return reply.status(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'E-mail já cadastrado',
          })
        }
      }
    )
}
