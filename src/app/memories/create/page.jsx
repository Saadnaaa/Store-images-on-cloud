import Navbar from "@/components/Navbar";
import CreateMemoryForm from "@/components/memories/CreateMemoryForm";
import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";

export default function CreateMemoryPage() {
  return (
    <div className="min-h-screen bg-base-200/50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navigation & Header */}
        <div className="mb-6">
          <Link
            href="/memories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-base-content/60 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Memories
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
              <PlusCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
                Create New Memory
              </h1>
              <p className="text-sm text-base-content/70">
                Upload photos and add details to preserve your special moment.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300/60 p-6 sm:p-10">
          <CreateMemoryForm />
        </div>
      </main>
    </div>
  );
}
