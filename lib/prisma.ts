import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DB_URI

if (!connectionString) {
  throw new Error('DB_URI is not defined in environment variables')
}

const adapter = new PrismaPg({
  connectionString,
})

export const prisma = new PrismaClient({ adapter });