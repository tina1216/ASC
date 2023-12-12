import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  })
  return user
})
