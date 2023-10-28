import { connect } from "@planetscale/database";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { PrismaClient } from "@prisma/client/edge";
import { fetch as undiciFetch } from "undici";

const connectionString = process.env.DATABASE_URL;

const connection = connect({ url: connectionString, fetch: undiciFetch });
const adapter = new PrismaPlanetScale(connection);
const prismaEdge = new PrismaClient({ adapter });

// development
const prismaClientSingleton = () => {
  // prisma reads from the .env file

  return new PrismaClient({
    log: ["query"],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
const prisma = globalForPrisma.prisma ?? prismaEdge;

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
