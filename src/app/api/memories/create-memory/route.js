import { connectToDatabase } from "@/lib/mongodb";
import Memory from "@/models/Memory";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (request) => {
  try {
    await connectToDatabase();

    const { title, description, image } = await request.json();

    if (!title) {
      return Response.json({ message: "Title is required" }, { status: 400 });
    }

    const cookieStore = await cookies();

    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const memory = await Memory.create({
      title,
      description,
      image,
      user: decoded.userId,
    });

    await memory.populate("user", "username");

    return Response.json(
      {
        message: "Memory created successfully",
        memory,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create memory error:", error);

    return Response.json({ message: "Internal Server error" }, { status: 500 });
  }
};
