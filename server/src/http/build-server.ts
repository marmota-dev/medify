import { fastify, type FastifyInstance } from 'fastify'
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { routes } from './routes'

export function buildServer(): FastifyInstance {
  const server = fastify().withTypeProvider<ZodTypeProvider>()

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  server.register(fastifyCors, {
    origin: '*',
  })

  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Medify API',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })

  server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })

  server.register(routes)

  return server
}
