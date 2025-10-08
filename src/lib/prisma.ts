import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  console.log("Creating new Prisma client");
  console.log("DATABASE_URL available:", !!process.env.DATABASE_URL);
  console.log("POSTGRES_URL_NON_POOLING available:", !!process.env.POSTGRES_URL_NON_POOLING);
  
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

export const prisma: PrismaClient =
  global.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}
