import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { type FastifyInstance, fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { errorHandler } from './error-handler'
import { routes } from './routes/routes'

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

  server.setErrorHandler(errorHandler)

  server.register(routes)

  return server
}
