import { connectToDatabase } from "@/lib/mongodb";
import Memory from "@/models/Memory";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    connectToDatabase();

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

    const memories = await Memory.find({ user: decoded.userId }).populate(
      "user",
      "username",
    );

    return Response.json(
      {
        message: "All memories fetched successfully",
        memories,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get all memories error:", error);
    return Response.json(
      {
        message: "Internal Server error",
      },
      { status: 500 },
    );
  }
};
