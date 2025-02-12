import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Create a single Prisma client instance and reuse it in development
const prismaClient = globalForPrisma.prisma ?? new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaClient;
}

export const prisma = prismaClient;
