"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import MemoryCard from "./MemoryCard";
import { Loader2, ImageOff, Plus } from "lucide-react";
import Link from "next/link";

export default function MemoryList() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMemories = async () => {
      try {
        const response = await axios.get("/api/memories/show-all-memories");
        setMemories(response.data.memories || []);
      } catch (error) {
        console.error("Get memories error:", error);
        toast.error(error.response?.data?.message || "Could not load memories");
      } finally {
        setLoading(false);
      }
    };

    getMemories();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-base-content/60">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Unlocking your memories...</p>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-base-100 rounded-3xl border border-dashed border-base-300 max-w-md mx-auto">
        <div className="p-4 bg-base-200 text-base-content/40 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <ImageOff className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-base-content">
          No memories created yet
        </h3>
        <p className="text-sm text-base-content/60 mt-1 mb-6">
          Start building your collection by uploading your first photo.
        </p>
        <Link href="/memories/create" className="btn btn-primary gap-2">
          <Plus className="w-4 h-4" /> Create First Memory
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {memories.map((memory) => (
        <MemoryCard key={memory._id} memory={memory} />
      ))}
    </div>
  );
}
