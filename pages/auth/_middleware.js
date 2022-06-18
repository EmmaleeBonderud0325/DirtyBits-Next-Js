import { NextResponse } from "next/server";
import redirectUrl from "config/environment";

export async function middleware(req) {
  const token = req.cookies["access"];
  const { pathname } = req.nextUrl;
  if (
    (pathname.includes("/auth/signin") || pathname.includes("/auth/signup")) &&
    !token
  ) {
    return NextResponse.next();
  }

  if (token && (pathname === "/auth/signup" || pathname === "/auth/signin")) {
    return NextResponse.redirect(redirectUrl);
  }
}
