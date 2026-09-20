import { cookies } from "next/headers";

export const POST = async () => {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("jwt");

    return Response.json(
      {
        message: "Logged out successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Logout error:", error);
    return Response.json({ message: "Internal Server error" }, { status: 500 });
  }
};
