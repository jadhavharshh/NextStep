import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip auth check for now - will implement after fixing BetterAuth
  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // Temporarily allow access while we fix the auth setup
    // const session = await auth.api.getSession({
    //   headers: request.headers,
    // })

    // if (!session) {
    //   return NextResponse.redirect(new URL("/auth", request.url))
    // }
  }

  // Redirect authenticated users away from auth page
  if (pathname === "/auth") {
    // Temporarily skip auth check
    // const session = await auth.api.getSession({
    //   headers: request.headers,
    // })

    // if (session) {
    //   return NextResponse.redirect(new URL("/dashboard", request.url))
    // }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
}