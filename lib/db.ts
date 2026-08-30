import { PrismaClient } from "@prisma/client";

/**
 * Uma instância só por processo. Em dev, o Next recarrega módulos a cada
 * mudança de arquivo — sem guardar em `globalThis`, cada reload abriria
 * uma conexão nova com o banco até esgotar o pool do Supabase.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
