"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { Cloud, Home, Images, User, LogOut, Loader2 } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        setUser(response.data?.user ?? response.data);
      } catch (error) {
        console.error("Get current user error:", error);
      }
    };

    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axios.post("/api/auth/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/memories", label: "Memories", icon: Images },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors duration-200">
            <Cloud className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-base-content tracking-tight">
            Cloud<span className="text-primary">Memories</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`btn btn-ghost btn-sm gap-2 font-medium ${
                  isActive
                    ? "bg-base-200 text-primary font-semibold"
                    : "text-base-content/70"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}

          <div className="h-6 w-px bg-base-300 mx-1 sm:mx-2" />

          {/* User Avatar & Info */}
          {user && (
            <div className="flex items-center gap-2.5 pl-1">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full ring-2 ring-primary/20 bg-base-200 flex items-center justify-center overflow-hidden">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.username}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-primary uppercase">
                      {user.username?.[0] || "U"}
                    </span>
                  )}
                </div>
              </div>
              <span className="hidden md:inline text-sm font-semibold text-base-content">
                {user.username}
              </span>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="btn btn-ghost btn-sm text-error hover:bg-error/10 ml-1"
            title="Log out"
          >
            {isLoggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
