import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "../../generated/prisma/client";
// import { PrismaClient } from "../../generated/prisma";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({
  adapter,
});