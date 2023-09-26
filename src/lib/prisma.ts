import { PrismaClient } from "@prisma/client";

// prisma reads from the .env file
export const prisma = new PrismaClient({
  log: ["query"],
});
