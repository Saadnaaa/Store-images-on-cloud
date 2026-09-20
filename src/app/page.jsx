import Navbar from "@/components/Navbar";
import HomeContent from "@/components/HomeContent";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function requireUser() {
  try {
    const token = (await cookies()).get("jwt")?.value;

    if (!token) {
      redirect("/login");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();

    const user = await User.findById(decoded.userId).select("_id");

    if (!user) {
      redirect("/login");
    }
  } catch (error) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    redirect("/login");
  }
}

export default async function HomePage() {
  await requireUser();

  return (
    <div className="min-h-screen bg-base-200/50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <HomeContent />
      </main>
    </div>
  );
}
