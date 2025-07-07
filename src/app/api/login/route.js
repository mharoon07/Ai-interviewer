import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { userLoginSchema } from "../../../types/userLoginSchema";
import connectDb from "../../../lib/db.js";
import bcrypt from "bcryptjs";
import User from "../../../model/UserSchemaDb.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-fallback-secret";
const COOKIE_MAX_AGE = 60 * 60 * 24;
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "strict",
  maxAge: COOKIE_MAX_AGE,
};
const findData = async (email) => {
  try {
    const user = await User.findOne({
      email,
    }).exec();
    return user;
  } catch (err) {
    console.error("Error finding user:", err);
    return null;
  }
};
const verifyRole = (user, role) => {
  console.log(user + " user " + role + "Role");
  if (user.role !== role) {
    return {
      error: "Role mismatch",
      status: 403,
    };
  }
  return null;
};
const createErrorResponse = (message, status) =>
  NextResponse.json(
    {
      message,
    },
    {
      status,
    }
  );
const validateUser = async (user, password) => {
  if (!user)
    return {
      error: "User not found",
      status: 404,
    };
  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isPasswordValid);
    if (isPasswordValid)
      return {
        user,
      };
    return {
      error: "Wrong password",
      status: 400,
    };
  } catch (err) {
    console.error("Error comparing passwords:", err);
    return {
      error: "Invalid password format",
      status: 400,
    };
  }
};
const generateToken = (email) => {
  try {
    return jwt.sign(
      {
        email,
      },
      JWT_SECRET
    );
  } catch (e) {
    throw new Error("Failed to generate token" +e);
  }
};

// POST handler
export async function POST(request) {
  await connectDb();

  try {
    const body = await request.json();
    const validateData = userLoginSchema.parse(body);
    const { email, password, role } = validateData;
    console.log(role + "Role");
    const user = await findData(email);
    console.log(user);
    console.log("User found in login: ", user?._id.valueOf());
    const userId = user?._id.valueOf() || "No user found";
    console.log(userId + "this is user ID");
    const validation = await validateUser(user, password);
    if (validation.error)
      return createErrorResponse(validation.error, validation.status);
    const verifyUserRole = verifyRole(user, role);
    if (verifyUserRole)
      return createErrorResponse(verifyUserRole.error, verifyUserRole.status);
    const token = generateToken(email);
    const response = NextResponse.json({
      message: "Login successful",
      user,
      redirect: "/",
    });
    response.cookies.set("token", token, COOKIE_OPTIONS);
    response.cookies.set("userId", userId, COOKIE_OPTIONS);
    response.cookies.set("role", role, COOKIE_OPTIONS);
    return response;
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
