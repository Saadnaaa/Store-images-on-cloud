"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Edit3, Trash2, Loader2, Image as ImageIcon } from "lucide-react";

export default function SpecificMemory({ id }) {
  const router = useRouter();

  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const getSpecificMemory = async () => {
      try {
        const response = await axios.get(
          `/api/memories/get-specific-memory/${id}`,
        );
        setMemory(response.data.memory);
      } catch (error) {
        console.error("Get specific memory error:", error);
        toast.error(error.response?.data?.message || "Could not load memory");
      } finally {
        setLoading(false);
      }
    };

    getSpecificMemory();
  }, [id]);

  const handleDeleteMemory = async () => {
    if (!confirm("Are you sure you want to delete this memory?")) return;

    try {
      setDeleting(true);
      await axios.delete(`/api/memories/delete-memory/${id}`);
      toast.success("Memory deleted successfully");
      router.push("/memories");
    } catch (error) {
      console.error("Delete memory error:", error);
      toast.error(error.response?.data?.message || "Could not delete memory");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-base-content/60">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Fetching memory details...</p>
      </div>
    );
  }

  if (!memory) {
    return (
      <div className="text-center py-16 bg-base-100 rounded-3xl border border-base-300 p-8">
        <h3 className="text-xl font-bold text-base-content mb-2">
          Memory not found
        </h3>
        <p className="text-sm text-base-content/60 mb-6">
          This memory may have been removed or does not exist.
        </p>
        <Link href="/memories" className="btn btn-primary btn-sm">
          Return to Vault
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-3xl border border-base-300/80 shadow-xl overflow-hidden">
      {/* Visual Header Image */}
      {memory.image ? (
        <div className="bg-base-200 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-[420px] overflow-hidden rounded-[28px] border border-base-300 bg-base-100 shadow-lg shadow-base-300/20">
            <img
              src={memory.image}
              alt={memory.title}
              className="block w-full h-auto max-h-[560px] object-cover mx-auto rounded-[28px]"
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-48 bg-base-200 flex flex-col items-center justify-center text-base-content/30 gap-2">
          <ImageIcon className="w-12 h-12" />
          <span className="text-sm">No photo attached</span>
        </div>
      )}

      {/* Detailed Body */}
      <div className="p-6 sm:p-10 space-y-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
            {memory.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-base-content/60 mt-3">
            <User className="w-4 h-4 text-primary" />
            <span>
              Saved by{" "}
              <strong className="text-base-content">
                {memory.user?.username || "Anonymous"}
              </strong>
            </span>
          </div>
        </div>

        <p className="text-base sm:text-lg text-base-content/80 leading-relaxed whitespace-pre-wrap pt-2">
          {memory.description || "No description provided for this memory."}
        </p>

        {/* Action Bar */}
        <div className="pt-6 border-t border-base-200 flex flex-wrap items-center justify-end gap-3">
          <Link
            href={`/memories/${memory._id}/edit`}
            className="btn btn-outline gap-2"
          >
            <Edit3 className="w-4 h-4" /> Edit
          </Link>

          <button
            onClick={handleDeleteMemory}
            disabled={deleting}
            className="btn btn-error btn-outline gap-2"
          >
            {deleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
