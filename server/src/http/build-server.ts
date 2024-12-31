import { fastify, type FastifyInstance } from 'fastify'
import { validatorCompiler, serializerCompiler} from 'fastify-type-provider-zod'
import { routes } from './routes'

export function buildServer(): FastifyInstance {
  const server = fastify()

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  routes(server)

  return server
}
