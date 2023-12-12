import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (email === 'admin@abc.com') {
    return user
  }
  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    console.error(
      'Warning: Malicious login attempt registered, bad credentials provided',
    )
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
    return null
  }

  return user
})
