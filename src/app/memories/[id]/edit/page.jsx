import Navbar from "@/components/Navbar";
import EditMemoryForm from "@/components/memories/EditMemoryForm";
import { ArrowLeft, PencilLine } from "lucide-react";
import Link from "next/link";

export default async function EditMemoryPage({ params }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-base-200/50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6">
          <Link
            href={`/memories/${id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-base-content/60 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to memory
          </Link>
        </div>

        <div className="bg-base-100 rounded-3xl border border-base-300/80 shadow-xl p-6 sm:p-8">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-[0.18em] mb-3">
              <PencilLine className="w-3.5 h-3.5" />
              Edit Memory
            </div>
            <h1 className="text-3xl font-extrabold text-base-content tracking-tight">
              Update your moment
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              Refine the title, description, and photo to keep this memory
              looking its best.
            </p>
          </div>

          <EditMemoryForm id={id} />
        </div>
      </main>
    </div>
  );
}
