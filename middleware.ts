import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

/**
 * Instância separada, só com a config leve (sem provider) — evita que o
 * bundle do middleware (Edge Runtime, limite de 1MB na Vercel) puxe
 * Prisma/bcrypt de lib/auth.ts.
 */
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = req.nextUrl.pathname === "/login";

  if (isAdminRoute && !isLoggedIn) {
    const url = new URL("/login", req.url);
    url.searchParams.set("proximo", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
