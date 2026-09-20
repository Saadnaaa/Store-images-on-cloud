"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Cloud,
  User,
  Mail,
  Lock,
  UserPlus,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Image,
  Sparkles,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.post("/api/auth/signup", formData);

      toast.success(response.data.message || "Account created successfully!");

      router.push("/");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="w-full max-w-5xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-base-300/60">
        {/* LEFT SECTION - Photo Branding & Hero Area */}
        <div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 sm:p-12 text-primary-content flex flex-col justify-between relative overflow-hidden">
          {/* Decorative background blur shapes */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Tag */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-wide text-white">
                Cloud Memories
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wider uppercase border border-white/15 text-white/90">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure Photo Vault
            </div>
          </div>

          {/* Center Showcase Info */}
          <div className="relative z-10 my-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Start preserving your favorite moments today.
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Create your account to automatically back up your photos in
              original quality and organize them effortlessly.
            </p>

            {/* Photo Specific Feature Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-medium text-white/90">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Image className="w-4 h-4" />
                </div>
                <span>Full resolution photo backup</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-white/90">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Instant photo library access</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="relative z-10 text-xs text-white/60 font-medium">
            © {new Date().getFullYear()} Cloud Memories Photo Storage Inc.
          </div>
        </div>

        {/* RIGHT SECTION - Form Area */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-base-100">
          <div className="max-w-md mx-auto w-full space-y-6">
            {/* Form Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">
                Create Account
              </h1>
              <p className="text-sm text-base-content/60 mt-1">
                Sign up to start saving your precious photo memories.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="form-control">
                <label className="label py-1.5">
                  <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">
                    Username
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    className="input input-bordered w-full pl-11 focus:outline-primary bg-base-200/50 focus:bg-base-100 transition-all"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label py-1.5">
                  <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">
                    Email Address
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered w-full pl-11 focus:outline-primary bg-base-200/50 focus:bg-base-100 transition-all"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label py-1.5">
                  <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    className="input input-bordered w-full pl-11 focus:outline-primary bg-base-200/50 focus:bg-base-100 transition-all"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-6 text-base gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider text-xs text-base-content/40 my-6">OR</div>

            {/* Footer Navigation */}
            <div className="text-center">
              <p className="text-sm text-base-content/70">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="link link-primary font-bold inline-flex items-center gap-1 hover:underline ml-1"
                >
                  Login
                  <ArrowRight className="w-4 h-4" />
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
