import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (e) => {
  const applicationsByUser = await prisma.application.findMany({
    where: {
      user: {
        id: parseInt(e.context.params.userId),
      },
    },
    include: {
      event: {
        include: {
          organiser: true,
        },
      },
    },
  });

  return applicationsByUser;
});
