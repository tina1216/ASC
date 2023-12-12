import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { userId, scholarshipId } = await readBody(event)
  const application = await prisma.application.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      scholarship: {
        connect: {
          id: scholarshipId,
        },
      },
    },
  })

  return application
})
