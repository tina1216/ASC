import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const benefactors = await prisma.benefactor.findMany()

  return benefactors
})
