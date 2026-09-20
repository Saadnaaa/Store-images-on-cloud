import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();
    if (!email || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

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

    return Response.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Error during login:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
