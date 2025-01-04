import { describe, expect, it, jest } from '@jest/globals'
import { prisma } from '../../database/prisma'
import { buildServer } from '../../http/build-server'

jest.mock('bcrypt', () => ({
  hash: () => 'password-hashed',
}))

jest.mock('jsonwebtoken', () => ({
  sign: () => 'valid.token.here',
}))

describe('Register route', () => {
  const server = buildServer()
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password-hashed',
    created_at: new Date(),
    updated_at: new Date(),
  }

  it('should authenticate successfully with valid credentials', async () => {
    // Arrange
    jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null)
    jest.spyOn(prisma.user, 'create').mockResolvedValue(mockUser)

    // Act
    const response = await server.inject({
      method: 'POST',
      url: '/api/register',
      payload: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
        confirm_password: 'password',
      },
    })

    // Assert
    expect(response.statusCode).toBe(201)
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

  it('should return 400 when the email is already registered', async () => {
    // Arrange
    jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(mockUser)

    // Act
    const response = await server.inject({
      method: 'POST',
      url: '/api/register',
      payload: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
        confirm_password: 'password',
      },
    })

    // Assert
    expect(response.statusCode).toBe(400)

    const body = JSON.parse(response.body)

    expect(body).toEqual({
      error: 'Bad Request',
      message: 'E-mail já cadastrado',
      statusCode: 400,
    })
  })

  it('should return 400 when the passwords do not match', async () => {
    // Act
    const response = await server.inject({
      method: 'POST',
      url: '/api/register',
      payload: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
        confirm_password: 'password-different',
      },
    })

    // Assert
    expect(response.statusCode).toBe(400)
    const body = JSON.parse(response.body)

    expect(body).toEqual({
      error: 'Bad Request',
      message: 'body/confirm_password As senhas devem ser iguais.',
      statusCode: 400,
    })
  })

  it.each([
    {
      zodTag: 'name::min',
      name: 'Jo',
      email: 'john.doe@example.com',
      password: 'password',
      confirm_password: 'password',
      message: 'body/name O mínimo de caracteres do nome é 3',
    },
    {
      zodTag: 'name::max',
      name: `${'a'.repeat(255)} John Doe`,
      email: 'john.doe@example.com',
      password: 'password',
      confirm_password: 'password',
      message: 'body/name O limite de caracteres do nome é 255',
    },
    {
      zodTag: 'name::nonempty',
      name: '',
      email: 'john.doe@example.com',
      password: 'password',
      confirm_password: 'password',
      message:
        'body/name O mínimo de caracteres do nome é 3, body/name O nome é obrigatório',
    },
    {
      zodTag: 'email::email',
      name: 'John Doe',
      email: 'email-invalid',
      password: 'password',
      confirm_password: 'password',
      message: 'body/email O e-mail digitado deve ser um e-mail válido',
    },
    {
      zodTag: 'email::max',
      name: 'John Doe',
      email: `${'a'.repeat(255)}@example.com`,
      password: 'password',
      confirm_password: 'password',
      message: 'body/email O limite de caracteres do e-mail é 255',
    },
    {
      zodTag: 'email::nonempty',
      name: 'John Doe',
      email: '',
      password: 'password',
      confirm_password: 'password',
      message:
        'body/email O e-mail digitado deve ser um e-mail válido, body/email O e-mail é obrigatório',
    },
    {
      zodTag: 'password::min',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'pass',
      confirm_password: 'pass',
      message: 'body/password O mínimo de caracteres da senha é 8',
    },
    {
      zodTag: 'password::max',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: `${'a'.repeat(255)}password`,
      confirm_password: `${'a'.repeat(255)}password`,
      message: 'body/password O limite de caracteres da senha é 255',
    },
    {
      zodTag: 'password::nonempty',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '',
      confirm_password: '',
      message:
        'body/password O mínimo de caracteres da senha é 8, body/password A senha é obrigatória, body/confirm_password A confirmação da senha é obrigatória',
    },
    {
      zodTag: 'confirm_password::nonempty',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
      confirm_password: '',
      message:
        'body/confirm_password A confirmação da senha é obrigatória, body/confirm_password As senhas devem ser iguais.',
    },
  ])(
    'should return 400 when the payload is invalid - Zod tag: $zodTag',
    async ({ name, email, password, confirm_password, message }) => {
      // Act
      const response = await server.inject({
        method: 'POST',
        url: '/api/register',
        payload: {
          name: name,
          email: email,
          password: password,
          confirm_password: confirm_password,
        },
      })

      // Assert
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
