import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "../../../model/UserSchemaDb";
import connectDb from "../../../lib/db";

export async function GET(request) {
  try {
    await connectDb();
    const authToken = request.cookies.get("token")?.value;
    console.log("authToken:", authToken);
    if (!authToken) {
      return NextResponse.json({ error: "error" }, { status: 401 });
    }
    const data = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log("JWT payload:", data);
    if (!data.email) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 }
      );
    }
    const user = await User.findOne({ email: data.email }).select("-password");
    // console.log("Current User found:", user);
    if (user) {
      return NextResponse.json({
        user: user,
        message: "User Found",
        status: 201,
      });
    }
  } catch (error) {
    console.error("Error in GET /Server/api/user:", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
