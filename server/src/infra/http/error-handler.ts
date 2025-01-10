import type { FastifyInstance } from 'fastify'
import { BadRequest } from './errors/BadRequest'
import { Unauthorized } from './errors/Unauthorized'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (e, request, reply) => {
  if (e instanceof BadRequest || e instanceof Unauthorized) {
    return reply.status(e.statusCode).send({
      error: e.error,
      message: e.message,
      statusCode: e.statusCode,
    })
  }

  reply.send(e)
}
