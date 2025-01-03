import { describe, expect, it, jest } from '@jest/globals'
import { buildServer } from '../../http/build-server'
import { prisma } from '../../database/prisma'

jest.mock('bcrypt', () => ({
  compare: (data: string, encripted: string) => data === encripted,
}))

jest.mock('jsonwebtoken', () => ({
  sign: () => 'valid.token.here',
}))

describe('Login route', () => {
  const server = buildServer()

  it('should authenticate successfully with valid credentials', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
      created_at: new Date(),
      updated_at: new Date(),
    }

    jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(user)

    const response = await server.inject({
      method: 'POST',
      url: '/api/login',
      payload: {
        email: 'john.doe@example.com',
        password: 'password',
      },
    })

    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)

    expect(body).toEqual({
      token: 'valid.token.here',
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        created_at: user.created_at.toISOString(),
        updated_at: user.updated_at.toISOString(),
      },
    })
  })
})
