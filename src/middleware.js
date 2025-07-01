import { NextResponse } from "next/server";
import { getUserIdFromCookies } from "./helper/getUserId";
import { getRoleFromCookies } from "./helper/getUserRole";

export function middleware(request) {
  const userId = getUserIdFromCookies(request);
  const userRole = getRoleFromCookies(request);
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  const publicApi = path === "/api/login" || path === "/api/signup";
  const isDashboardRoot = path === "/dashboard";
  const isProfileRoot = path === "/profile";
  const loggedInUserNotAllowed =
    path === "/login" ||
    path === "/signup" ||
    path === "/login/candidate" ||
    path === "/signup/candidate" ||
    path === "/login/recruiter" ||
    path === "/signup/recruiter";
  if (publicApi) return NextResponse.next();
  if (isDashboardRoot) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (userRole === "candidate") {
      return NextResponse.redirect(
        new URL("/dashboard/candidate", request.url)
      );
    } else if (userRole === "recruiter") {
      return NextResponse.redirect(
        new URL("/dashboard/recruiter", request.url)
      );
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (!token && !loggedInUserNotAllowed) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token && (loggedInUserNotAllowed || isProfileRoot)) {
    return NextResponse.redirect(new URL(`/profile/${userId}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login/:path*",
    "/api/:path*",
    "/signup/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
  ],
};
