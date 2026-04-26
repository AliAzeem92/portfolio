import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin-token")?.value;

  try {
    if (token) {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      // Token is valid
      if (pathname === "/admin/login") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return NextResponse.next();
    } else {
      // No token
      if (pathname === "/admin/login") return NextResponse.next();
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  } catch {
    // Invalid token
    if (pathname === "/admin/login") return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
