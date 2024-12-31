import { buildServer } from './build-server'
import { env } from '../env'
import { PrismaClient } from '@prisma/client'

const server = buildServer()

export const prisma = new PrismaClient({
  log: ['query']
})

server
  .listen({ port: env.PORT })
  .then(() => {
    console.log('HTTP server running successfully!')
  })
  .catch(e => {
    console.error(e)
  })
