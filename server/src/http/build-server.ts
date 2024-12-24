import fastify, { type FastifyInstance } from 'fastify'
import { routes } from './routes'

export function buildServer(): FastifyInstance {
  const server = fastify()

  routes(server)

  return server
}
