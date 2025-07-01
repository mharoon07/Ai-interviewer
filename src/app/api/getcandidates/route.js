import { NextResponse } from "next/server";
import User from "../../../model/UserSchemaDb";
import connectDb from "../../../lib/db";


export async function GET(request) {
  try {
    await connectDb();

    const userId = await getUserIdFromCookies(request); // Ensure this is async if decoding JWT
    console.log("Received request for user ID:", userId);

    const user = await User.findById(userId).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      username: user.username || "user123",
      createdAt: user.createdAt,
      imgurl: user.imgurl,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
