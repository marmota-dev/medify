import { describe, expect, it } from '@jest/globals'
import { buildServer } from '../../http/build-server'

describe('Hello World!', () => {
  const server = buildServer()

  it("should return 'Hello World!' when the '/' route is called", async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe(JSON.stringify({ message: 'Hello World!' }))
  })
})
