import type { FastifyInstance } from 'fastify'
import { BadRequest } from './errors/BadRequest'
import { Unauthorized } from './errors/Unauthorized'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof BadRequest) {
    return reply.status(error.statusCode).send({
      error: error.name,
      message: error.message,
      statusCode: error.statusCode,
    })
  }

  if (error instanceof Unauthorized) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
    })
  }

  reply.send(error)
}
