import { connectToDatabase } from "@/lib/mongodb";
import Memory from "@/models/Memory";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const { id } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const memory = await Memory.findOne({
      _id: id,
      user: decoded.userId,
    }).populate("user", "username");
    if (!memory) {
      return Response.json({ message: "Memory not found" }, { status: 404 });
    }

    return Response.json(
      { message: "Memory fetched successfully", memory },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get specific memory error:", error);

    return Response.json(
      {
        message: "Internal Server error",
      },
      { status: 500 },
    );
  }
};
