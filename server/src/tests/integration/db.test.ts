import { it } from '@jest/globals'
import { prisma } from '../../infra/database/prisma'
import { conditionalDescribe } from '../helpers/testHelpers'

const isIntegration = process.env.NODE_ENV === 'integration'

conditionalDescribe(isIntegration, 'Database Connection', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should connect to the database', async () => {
    const databases = await prisma.$queryRawUnsafe(
      'SELECT datname FROM pg_database;'
    )

    expect(databases).toContainEqual(
      expect.objectContaining({ datname: 'medify' })
    )
  })
})
