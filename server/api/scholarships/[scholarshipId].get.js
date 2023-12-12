import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { scholarshipId } = event.context.params

  const scholarship = await prisma.scholarship.findUnique({
    where: {
      id: parseInt(scholarshipId),
    },
  })

  return scholarship
})
