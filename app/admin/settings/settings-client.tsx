"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { UserIcon, LockIcon, CheckCircle2Icon, ShieldCheckIcon, AlertCircleIcon, UploadIcon, CameraIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SettingsClient({
  currentAdmin,
}: {
  currentAdmin: { name: string; email: string; avatar: string; isSuperAdmin: boolean };
}) {
  const [name, setName] = useState(currentAdmin.name);
  const [email] = useState(currentAdmin.email);
  const [avatarUrl, setAvatarUrl] = useState(currentAdmin.avatar || "/images/site_icon.png");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileMsg, setProfileMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const supabase = createClient();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setProfileMsg("");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "avatars");
      formData.append("folder", "profiles");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to upload avatar image.");
      }

      const uploadedUrl = data.publicUrl;
      setAvatarUrl(uploadedUrl);

      // Save to Supabase Auth user_metadata
      const { error: authErr } = await supabase.auth.updateUser({
        data: { avatar_url: uploadedUrl },
      });

      if (authErr) throw authErr;

      setProfileMsg("Avatar image uploaded and updated successfully!");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload avatar image.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg("");
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name, avatar_url: avatarUrl },
      });

      if (error) throw error;
      setProfileMsg("Profile details updated successfully!");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setSavingPassword(true);
    setPasswordMsg("");
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setPasswordMsg("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update password.");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Account & Profile Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your administrator profile avatar, display details, and security passwords.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium flex items-center gap-2">
          <AlertCircleIcon className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Profile & Avatar Section */}
      <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b pb-3">
          <UserIcon className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-foreground">Administrator Profile & Avatar</h2>
        </div>

        {profileMsg && (
          <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium flex items-center gap-2">
            <CheckCircle2Icon className="w-4 h-4 shrink-0" />
            <span>{profileMsg}</span>
          </div>
        )}

        {/* Avatar Upload Preview */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-border/50 bg-muted/20">
          <div className="relative group w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-card shadow-md flex items-center justify-center shrink-0">
            <Image
              src={avatarUrl}
              alt={name}
              fill
              className="object-cover"
              unoptimized
            />
            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-white text-[10px] font-medium gap-1">
              <CameraIcon className="w-4 h-4" />
              <span>Change</span>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleAvatarUpload}
                disabled={uploadingAvatar}
                className="hidden"
              />
            </label>
          </div>

          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <h3 className="text-sm font-semibold text-foreground">Profile Picture</h3>
            <p className="text-xs text-muted-foreground">
              Upload a custom PNG, JPG, or WebP photo for your administrator avatar.
            </p>
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:bg-muted cursor-pointer transition-colors mt-1">
              <UploadIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>{uploadingAvatar ? "Uploading Avatar..." : "Upload New Avatar"}</span>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleAvatarUpload}
                disabled={uploadingAvatar}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4 text-sm font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 block font-sans">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jennis Williamson"
                style={{
                  color: "#ffffff",
                  backgroundColor: "#09090b",
                  WebkitTextFillColor: "#ffffff",
                  WebkitBoxShadow: "0 0 0px 1000px #09090b inset",
                }}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 block font-sans">
                Admin Email (Read-Only)
              </label>
              <input
                type="email"
                disabled
                value={email}
                style={{
                  color: "#a1a1aa",
                  backgroundColor: "#09090b",
                  WebkitTextFillColor: "#a1a1aa",
                  WebkitBoxShadow: "0 0 0px 1000px #09090b inset",
                }}
                className="w-full bg-zinc-950/60 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-zinc-400 cursor-not-allowed text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <ShieldCheckIcon className="w-4 h-4 text-amber-500" />
              <span className={currentAdmin.isSuperAdmin ? "text-amber-400" : "text-emerald-400"}>
                Role: {currentAdmin.isSuperAdmin ? "Super Admin" : "Administrator"}
              </span>
            </div>

            <Button
              type="submit"
              disabled={savingProfile}
              className="bg-primary text-primary-foreground font-medium text-xs"
            >
              {savingProfile ? "Saving..." : "Save Profile Details"}
            </Button>
          </div>
        </form>
      </div>

      {/* Password Security Section */}
      <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b pb-3">
          <LockIcon className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-foreground">Password & Security</h2>
        </div>

        {passwordMsg && (
          <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium flex items-center gap-2">
            <CheckCircle2Icon className="w-4 h-4 shrink-0" />
            <span>{passwordMsg}</span>
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4 text-sm font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 block font-sans">
                New Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  color: "#ffffff",
                  backgroundColor: "#09090b",
                  WebkitTextFillColor: "#ffffff",
                  WebkitBoxShadow: "0 0 0px 1000px #09090b inset",
                }}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 block font-sans">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  color: "#ffffff",
                  backgroundColor: "#09090b",
                  WebkitTextFillColor: "#ffffff",
                  WebkitBoxShadow: "0 0 0px 1000px #09090b inset",
                }}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={savingPassword}
              className="bg-primary text-primary-foreground font-medium text-xs"
            >
              {savingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
