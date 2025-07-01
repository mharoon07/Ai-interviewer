import { NextResponse } from "next/server";
import { userSchema } from "../../../types/userSchema";
import connectDb from "../../../lib/db.js";
import bcrypt from "bcryptjs";
import User from "../../../model/UserSchemaDb.js";

const existingUser = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.error("Error checking existing user:", error);
    throw new Error("Database error");
  }
};
export async function POST(request) {
  try {
    const body = await request.json();
    console.log(JSON.stringify(body) + " Body");
    await connectDb();
    const validatedData = userSchema.parse(body);

    let { email, password, name, role } = validatedData;
    console.log(email, password, name, role + "validatedData ");

    const isUser = await existingUser(email);

    if (isUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    console.log("User to be saved Role:", role);
    const savedUser = await user.save();
    console.log("Saved user:", savedUser);

    console.log("7");
    await user.save();
    console.log("8");
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully!",
        data: {
          name: user.name,
          email: user.email,
        },
        redirect: "/login",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          issues: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("Server error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
