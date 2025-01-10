import type { FastifyInstance } from 'fastify'
import { BadRequest } from './errors/BadRequest'
import { Unauthorized } from './errors/Unauthorized'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof BadRequest || error instanceof Unauthorized) {
    return reply.status(error.statusCode).send({
      error: error.title,
      message: error.message,
      statusCode: error.statusCode,
    })
  }

  reply.send(error)
}
