import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (e) => {
  const applications = await prisma.application.findMany({
    include: {
      user: true,
      event: {
        include: {
          organiser: true,
        },
      },
    },
  });

  return applications;
});
