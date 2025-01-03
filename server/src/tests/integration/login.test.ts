import { describe, expect, it, jest } from '@jest/globals'
import { prisma } from '../../database/prisma'
import { buildServer } from '../../http/build-server'

jest.mock('bcrypt', () => ({
  compare: (data: string, encripted: string) => data === encripted,
}))

jest.mock('jsonwebtoken', () => ({
  sign: () => 'valid.token.here',
}))

describe('Login route', () => {
  const server = buildServer()
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password',
    created_at: new Date(),
    updated_at: new Date(),
  }

  it('should authenticate successfully with valid credentials', async () => {
    // Arrange
    jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(mockUser)

    // Act
    const response = await server.inject({
      method: 'POST',
      url: '/api/login',
      payload: {
        email: 'john.doe@example.com',
        password: 'password',
      },
    })

    // Assert
    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)

    expect(body).toEqual({
      access_token: 'valid.token.here',
      token_type: 'Bearer',
      expires_in: 3600,
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    })
  })

  it('should return 401 when the user does not exist', async () => {
    // Arrange
    jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null)

    // Act
    const response = await server.inject({
      method: 'POST',
      url: '/api/login',
      payload: {
        email: 'john.doe@example.com',
        password: 'password',
      },
    })

    // Assert
    expect(response.statusCode).toBe(401)

    const body = JSON.parse(response.body)

    expect(body).toEqual({
      error: 'Unauthorized',
      message: 'Credenciais inválidas',
      statusCode: 401,
    })
  })

  it('should return 401 when the password is invalid', async () => {
    // Arrange
    jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(mockUser)

    // Act
    const response = await server.inject({
      method: 'POST',
      url: '/api/login',
      payload: {
        email: 'john.doe@example.com',
        password: 'password-invalid',
      },
    })

    // Assert
    expect(response.statusCode).toBe(401)
    const body = JSON.parse(response.body)

    expect(body).toEqual({
      error: 'Unauthorized',
      message: 'Credenciais inválidas',
      statusCode: 401,
    })
  })

  it.each([
    {
      zodTag: 'email::email',
      email: 'email-invalid',
      password: 'password',
      message: 'body/email O e-mail digitado deve ser um e-mail válido',
    },
    {
      zodTag: 'email::max',
      email: `${'a'.repeat(255)}@example.com`,
      password: 'password',
      message: 'body/email O limite de caracteres do e-mail é 255',
    },
    {
      zodTag: 'email::nonempty',
      email: '',
      password: 'password',
      message:
        'body/email O e-mail digitado deve ser um e-mail válido, body/email O e-mail é obrigatório',
    },
    {
      zodTag: 'password::min',
      email: 'john.doe@example.com',
      password: 'pass',
      message: 'body/password O mínimo de caracteres da senha é 8',
    },
    {
      zodTag: 'password::max',
      email: 'john.doe@example.com',
      password: `${'a'.repeat(255)}password`,
      message: 'body/password O limite de caracteres da senha é 255',
    },
    {
      zodTag: 'password::nonempty',
      email: 'john.doe@example.com',
      password: '',
      message:
        'body/password O mínimo de caracteres da senha é 8, body/password A senha é obrigatória',
    },
  ])(
    'should return 400 when the payload is invalid - Zod tag: $zodTag',
    async ({ email, password, message }) => {
      jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(mockUser)

      const response = await server.inject({
        method: 'POST',
        url: '/api/login',
        payload: {
          email: email,
          password: password,
        },
      })

      expect(response.statusCode).toBe(400)
      const body = JSON.parse(response.body)

      expect(body).toEqual({
        error: 'Bad Request',
        message: message,
        statusCode: 400,
      })
    }
  )
})
