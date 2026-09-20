import Link from "next/link";
import { User, ArrowRight, Image as ImageIcon } from "lucide-react";

export default function MemoryCard({ memory }) {
  return (
    <div className="group bg-base-100 rounded-2xl border border-base-300/70 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full max-w-sm w-full mx-auto">
      {/* Compact Image Container - Small Pinterest-style fixed height */}
      <div className="relative h-48 w-full bg-base-200 overflow-hidden">
        {memory.image ? (
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-base-content/30 gap-1.5 bg-base-200/50">
            <ImageIcon className="w-8 h-8" />
            <span className="text-xs">No image</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-base text-base-content line-clamp-1 group-hover:text-primary transition-colors">
          {memory.title}
        </h3>

        <p className="text-xs text-base-content/70 mt-1.5 line-clamp-2 flex-1 leading-relaxed">
          {memory.description || "No description provided."}
        </p>

        {/* Card Footer */}
        <div className="pt-3 mt-3 border-t border-base-200 flex items-center justify-between text-xs text-base-content/60">
          <div className="flex items-center gap-1.5 font-medium truncate max-w-[60%]">
            <User className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="truncate">
              {memory.user?.username || "Anonymous"}
            </span>
          </div>

          <Link
            href={`/memories/${memory._id}`}
            className="btn btn-ghost btn-xs text-primary gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            <span>View</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
