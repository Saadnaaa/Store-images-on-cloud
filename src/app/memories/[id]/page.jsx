import Navbar from "@/components/Navbar";
import SpecificMemory from "@/components/memories/SpecificMemory";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function SpecificMemoryPage({ params }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-base-200/50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/memories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-base-content/60 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Memories
          </Link>
        </div>

        {/* Specific Memory Details Display */}
        <SpecificMemory id={id} />
      </main>
    </div>
  );
}
