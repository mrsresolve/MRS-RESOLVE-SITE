import type { NextAuthConfig } from "next-auth";

/**
 * Config "leve", sem provider — importada pelo middleware (Edge Runtime).
 * Prisma e bcrypt não funcionam no Edge, então o provider de credenciais
 * fica só em lib/auth.ts (que roda em Node.js, nas Server Actions e na
 * rota de API do NextAuth).
 */
export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [],
} satisfies NextAuthConfig;
