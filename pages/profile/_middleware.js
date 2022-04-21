import { NextResponse, NextRequest } from "next/server";

export async function middleware(req, ev) {
  if (!req.cookies["access"]) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }
  return NextResponse.rewrite(req.nextUrl);
}
