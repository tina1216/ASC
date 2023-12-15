import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (e) => {
  const body = await readBody(e);
  const { title, description, deadline, slug, categoryIds, organiserId } = body;

  const mappedCategoryIds = categoryIds.map((category) => ({ id: category.id }));
  const event = await prisma.event.create({
    data: {
      title,
      description,
      deadline: new Date(deadline),
      slug,
      organiser: {
        connect: {
          id: organiserId,
        },
      },
      categories: {
        connect: mappedCategoryIds,
      },
    },
  });
  return event;
});
