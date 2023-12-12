import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const applicationsByUser = await prisma.application.findMany({
    where: {
      user: {
        id: parseInt(event.context.params.userId),
      },
    },
    include: {
      scholarship: {
        include: {
          benefactor: true,
        },
      },
    },
  })

  return applicationsByUser
})
