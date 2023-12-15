import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (e) => {
  const { id, application_status } = await readBody(e);

  const application = await prisma.application.update({
    where: {
      id,
    },
    data: {
      application_status: application_status,
    },
  });

  return application;
});
