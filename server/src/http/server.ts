import { env } from '../env'
import { buildServer } from './build-server'

const server = buildServer()

server
  .listen({ port: env.PORT })
  .then(() => {
    console.log('HTTP server running successfully!')
  })
  .catch(e => {
    console.error(e)
  })
