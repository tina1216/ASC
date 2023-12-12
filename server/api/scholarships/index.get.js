import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const scholarships = await prisma.scholarship.findMany()
  return scholarships
})
