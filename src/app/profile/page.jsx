import Navbar from "@/components/Navbar";
import ProfileForm from "@/components/ProfileForm";
import { User, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-base-200/50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 border-b border-base-300 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Account Settings
            </div>
            <h1 className="text-3xl font-extrabold text-base-content tracking-tight">
              My Profile
            </h1>
            <p className="text-sm text-base-content/70 mt-1">
              Manage your account details and storage preferences.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300/60 p-6 sm:p-8">
          <ProfileForm />
        </div>
      </main>
    </div>
  );
}
