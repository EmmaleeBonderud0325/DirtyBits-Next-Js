import { NextResponse, NextRequest } from "next/server";

export async function middleware(req, ev) {
  console.log("req", req.nextUrl);
  if (!req.cookies["access"]) {
    return NextResponse.redirect("/auth/signin");
  }
  return NextResponse.rewrite(req.nextUrl);
}
