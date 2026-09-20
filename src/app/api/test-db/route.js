import { connectToDatabase } from "@/lib/mongodb";

export const GET = async () => {
  try {
    await connectToDatabase();
    return Response.json(
      { message: "Connected to database successfully" },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to connect to database" },
      { status: 500 },
    );
  }
};
