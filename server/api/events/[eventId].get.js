import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (e) => {
  const { eventId } = e.context.params;

  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(eventId),
    },
  });

  return event;
});
