import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (e) => {
  const organisers = await prisma.organiser.findMany();

  return organisers;
});
