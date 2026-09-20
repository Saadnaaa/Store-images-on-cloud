"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Sparkles,
  Images,
  PlusCircle,
  User,
  Mail,
  ShieldCheck,
  Loader2,
} from "lucide-react";

export default function HomeContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        setUser(response.data?.user ?? response.data ?? null);
      } catch (error) {
        console.error("Get current user error:", error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-base-content/60">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16 bg-base-100 rounded-3xl border border-base-300 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-base-content mb-2">
          Welcome to Cloud Memories
        </h2>
        <p className="text-base-content/70 mb-6">
          Please log in to access your personal photo vualt.
        </p>
        <Link href="/login" className="btn btn-primary">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-base-100 to-secondary/10 rounded-3xl border border-base-300/80 p-8 sm:p-12 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
            Welcome back, <span className="text-primary">{user.username}</span>!
          </h1>
          <p className="text-base-content/70 mt-3 text-base sm:text-lg">
            Your personal digital safe is ready. Capture moments today, cherish
            them forever.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Link
              href="/memories"
              className="btn btn-primary gap-2 shadow-lg shadow-primary/20"
            >
              <Images className="w-4 h-4" />
              View Vault
            </Link>
            <Link href="/memories/create" className="btn btn-outline gap-2">
              <PlusCircle className="w-4 h-4" />
              Add Memory
            </Link>
          </div>
        </div>
      </div>

      {/* Account Quick Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-base-100 p-6 rounded-2xl border border-base-300/70 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-primary/10 text-primary rounded-2xl">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">
              Username
            </p>
            <p className="text-lg font-bold text-base-content">
              {user.username}
            </p>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl border border-base-300/70 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-secondary/10 text-secondary rounded-2xl">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">
              Email Address
            </p>
            <p className="text-lg font-bold text-base-content">
              {user.email || "No email linked"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
