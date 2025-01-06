import type { FastifyInstance } from 'fastify'
import { authRoutes } from './auth.routes'
import { pharmacyRoutes } from './pharmacy.routes'

export async function routes(server: FastifyInstance) {
  server.get('/', async (request, reply) => {
    return { message: 'Hello World!' }
  })

  server.register(authRoutes)
  server.register(pharmacyRoutes)
}
