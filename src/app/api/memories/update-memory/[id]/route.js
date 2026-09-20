import { connectToDatabase } from "@/lib/mongodb";
import Memory from "@/models/Memory";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const PUT = async (request, { params }) => {
  try {
    await connectToDatabase();

    const { id } = await params;

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

    const memory = await Memory.findOneAndUpdate(
      {
        _id: id,
        user: decoded.userId,
      },
      {
        title,
        description: description || "",
        image: image || "",
      },
      {
        new: true,
      },
    ).populate("user", "username");

    if (!memory) {
      return Response.json({ message: "Memory not found" }, { status: 404 });
    }

    return Response.json(
      {
        message: "Memory updated successfully",
        memory,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update memory error:", error);

    return Response.json(
      {
        message: "Internal Server error",
      },
      { status: 500 },
    );
  }
};
