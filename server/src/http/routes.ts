import type { FastifyInstance } from 'fastify'
import { authRoutes } from './routes/auth.routes'
import { pharmacyRoutes } from './routes/pharmacy.routes'

export async function routes(server: FastifyInstance) {
  server.get('/', async (request, reply) => {
    return { message: 'Hello World!' }
  })

  server.register(authRoutes)
  server.register(pharmacyRoutes)
}
