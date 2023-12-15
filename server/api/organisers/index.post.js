import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (e) => {
  const { name, description, logo, email } = await readBody(e);
  const organiser = await prisma.organiser.create({
    data: {
      name,
      description,
      logo,
      email,
    },
  });

  return organiser;
});
