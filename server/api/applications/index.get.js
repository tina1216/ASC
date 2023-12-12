import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const applications = await prisma.application.findMany({
    include: {
      user: true,
      scholarship: {
        include: {
          benefactor: true,
        },
      },
    },
  })

  return applications
})
