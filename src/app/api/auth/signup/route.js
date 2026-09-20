import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { message: "Invalid email format" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    if (password.length < 8) {
      return Response.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const cookieStore = await cookies();
    cookieStore.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return Response.json(
      {
        message: "User registerd successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profilePic: user.profilePic,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
