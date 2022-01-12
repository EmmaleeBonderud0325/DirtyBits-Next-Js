import { NextResponse, NextRequest } from "next/server";

export async function middleware(req, ev) {
  if (!req.cookies["access"]) {
    return NextResponse.redirect("/auth/signin");
  }
  return NextResponse.next();
}
