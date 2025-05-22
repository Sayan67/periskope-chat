import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Define protected routes that require authentication
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/chats") ||
    request.nextUrl.pathname.startsWith("/dashboard");

  // Redirect to login if trying to access protected routes without auth
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Redirect to dashboard if already logged in but accessing auth pages
  if (
    session &&
    (request.nextUrl.pathname === "/auth" || request.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/chats", request.url));
  }

  return supabaseResponse;
}

// Specify which routes middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
};
