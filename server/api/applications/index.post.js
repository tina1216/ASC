import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (e) => {
  const { userId, eventId } = await readBody(e);

  const application = await prisma.application.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      event: {
        connect: {
          id: eventId,
        },
      },
    },
  });

  return application;
});
