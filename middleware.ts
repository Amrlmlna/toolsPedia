import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get("admin-session")

    // If no admin session cookie exists, redirect to login
    if (!adminSession) {
      return NextResponse.redirect(new URL("/admin-login", request.url))
    }
  }

  return NextResponse.next()
}

// Configure matcher to only run middleware on admin paths
export const config = {
  matcher: "/admin/:path*",
}
