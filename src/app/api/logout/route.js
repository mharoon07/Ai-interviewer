import { NextResponse } from "next/server";

export async function POST(req) {
  // Clear the auth cookies (e.g., token or sessionId)
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Set cookies to expire (remove them)
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
  response.cookies.set("userId", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
  response.cookies.set("role", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
