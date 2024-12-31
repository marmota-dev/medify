import { buildServer } from './build-server'
import { env } from '../env'

const server = buildServer()

server
  .listen({ port: env.PORT })
  .then(() => {
    console.log('HTTP server running successfully!')
  })
  .catch(e => {
    console.error(e)
  })
