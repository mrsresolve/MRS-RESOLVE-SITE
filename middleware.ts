import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

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
