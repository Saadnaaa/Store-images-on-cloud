import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    await connectToDatabase();

    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return Response.json(
        {
          message: "User not found",
        },
        { status: 404 },
      );
    }

    return Response.json(user);
  } catch (error) {
    console.error("Get current user error:", error);

    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 },
    );
  }
};
