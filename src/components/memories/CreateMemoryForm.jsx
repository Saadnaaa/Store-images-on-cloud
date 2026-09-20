"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Upload, Image as ImageIcon, Loader2, Sparkles } from "lucide-react";

export default function CreateMemoryForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be smaller than 3MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateMemory = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/memories/create-memory", {
        title,
        description,
        image,
      });

      toast.success("Memory created successfully!");
      router.push("/memories");
    } catch (error) {
      console.error("Create memory error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreateMemory} className="space-y-6">
      {/* Title */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold text-base-content">
            Memory Title *
          </span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Sunset at Malibu Beach"
          className="input input-bordered w-full focus:input-primary transition-all"
          required
        />
      </div>

      {/* Description */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold text-base-content">
            Description
          </span>
        </label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What made this moment special?"
          rows={4}
          className="textarea textarea-bordered w-full focus:textarea-primary transition-all resize-none"
        />
      </div>

      {/* Image Upload Area */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold text-base-content">
            Attach Image
          </span>
        </label>
        <label className="border-2 border-dashed border-base-300 hover:border-primary rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-base-200/40 hover:bg-base-200 transition-all text-center group">
          <div className="p-3 bg-base-100 rounded-full text-primary shadow-sm group-hover:scale-110 transition-transform mb-2">
            <Upload className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold text-base-content">
            Click to upload image
          </span>
          <span className="text-xs text-base-content/50 mt-1">
            PNG, JPG or WEBP up to 3MB
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Image Preview Box */}
      {image && (
        <div className="p-4 bg-base-200/60 rounded-2xl border border-base-300">
          <p className="text-xs font-semibold text-base-content/60 mb-2 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-primary" /> Image Preview:
          </p>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-base-300 max-h-64">
            <img
              src={image}
              alt="Memory preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary gap-2 min-w-[160px] shadow-lg shadow-primary/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Create Memory
            </>
          )}
        </button>
      </div>
    </form>
  );
}
