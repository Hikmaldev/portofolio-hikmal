import { NextResponse, type NextRequest } from "next/server";

const ADMIN_PATH = "/panel-x7k2";
const LOGIN_PATH = "/panel-x7k2/login";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(ADMIN_PATH) || pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  const hasSessionCookie = request.cookies
    .getAll()
    .some((cookie) => cookie.name.includes("-auth-token"));

  if (!hasSessionCookie) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel-x7k2/:path*"],
};
