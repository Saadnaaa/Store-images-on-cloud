import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const PUT = async (request) => {
  try {
    await connectToDatabase();

    const { username, profilePic } = await request.json();

    if (!username) {
      return Response.json(
        { message: "Username is required" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();

    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByIdAndUpdate(
      decoded.userId,
      {
        username,
        profilePic,
      },
      {
        new: true,
      },
    ).select("-password");

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(
      {
        message: "Profile updated successfully",
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update profile error:", error);

    return Response.json({ message: "Internal Server error" }, { status: 500 });
  }
};
