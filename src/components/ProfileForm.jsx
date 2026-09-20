"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Upload, Loader2, Camera, Save } from "lucide-react";

export default function ProfileForm() {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        const user = response.data?.user ?? response.data;
        setUsername(user?.username ?? "");
        setProfilePic(user?.profilePic ?? "");
      } catch (error) {
        console.error("Get current user error:", error);
        toast.error("Could not load profile");
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

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
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    try {
      setUpdating(true);
      const response = await axios.put("/api/auth/update-profile", {
        username,
        profilePic,
      });

      const user = response.data?.user ?? response.data;
      setUsername(user?.username ?? "");
      setProfilePic(user?.profilePic ?? "");
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-base-content/60">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Loading profile details...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleUpdateProfile} className="space-y-8">
      {/* Avatar Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-base-200">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full ring-4 ring-primary/20 bg-base-200 flex items-center justify-center overflow-hidden shadow-inner">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-base-content/40" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-primary text-primary-content p-2 rounded-full cursor-pointer shadow-md hover:scale-105 transition-transform">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div className="text-center sm:text-left space-y-1">
          <h3 className="font-bold text-base-content text-lg">Avatar Photo</h3>
          <p className="text-xs text-base-content/60">
            JPG, PNG or WEBP up to 3MB. High resolution square images work best.
          </p>
          <label className="btn btn-outline btn-xs gap-1.5 mt-2">
            <Upload className="w-3.5 h-3.5" />
            <span>Choose File</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {/* Username Field */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold text-base-content">
            Username
          </span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full focus:input-primary transition-all"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your display name"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={updating}
          className="btn btn-primary gap-2 min-w-[140px] shadow-lg shadow-primary/20"
        >
          {updating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Updating...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}
