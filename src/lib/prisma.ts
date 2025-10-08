import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  console.log("Creating new Prisma client");
  console.log("DATABASE_URL available:", !!process.env.DATABASE_URL);
  console.log("POSTGRES_PRISMA_URL available:", !!process.env.POSTGRES_PRISMA_URL);
  console.log(
    "POSTGRES_URL_NON_POOLING available:",
    !!process.env.POSTGRES_URL_NON_POOLING
  );

  // Use POSTGRES_PRISMA_URL as fallback if DATABASE_URL is not set
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
  
  if (!databaseUrl) {
    throw new Error("No database URL found. Set DATABASE_URL or POSTGRES_PRISMA_URL environment variable.");
  }

  console.log("Using database URL:", databaseUrl.substring(0, 50) + "...");

  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    // Optimize for serverless/edge environments
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
};

export const prisma: PrismaClient =
  global.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}

// Ensure Prisma connects properly in serverless
export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("Successfully connected to database");
    return true;
  } catch (error) {
    console.error("Failed to connect to database:", error);
    return false;
  }
}
