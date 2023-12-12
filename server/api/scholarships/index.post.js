import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const {
    title,
    description,
    award,
    deadline,
    slug,
    categoryIds,
    benefactorId,
  } = body

  const mappedCategoryIds = categoryIds.map((category) => ({ id: category.id }))
  const scholarship = await prisma.scholarship.create({
    data: {
      title,
      description,
      award,
      deadline: new Date(deadline),
      slug,
      benefactor: {
        connect: {
          id: benefactorId,
        },
      },
      categories: {
        connect: mappedCategoryIds,
      },
    },
  })
  return scholarship
})
