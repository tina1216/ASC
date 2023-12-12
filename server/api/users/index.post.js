import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { email, name } = body

  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  })
  return user
})
