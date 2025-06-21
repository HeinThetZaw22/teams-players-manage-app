import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const authCookie = request.cookies.get("auth");

  // const isLoggedIn = Boolean(authCookie?.value);
  // const isAuthPage = request.nextUrl.pathname === "/login";

  // if (!isLoggedIn && !isAuthPage) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // if (isLoggedIn && isAuthPage) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
