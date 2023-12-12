import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { name, description, logo, email } = await readBody(event)
  const benefactor = await prisma.benefactor.create({
    data: {
      name,
      description,
      logo,
      email,
    },
  })

  return benefactor
})
