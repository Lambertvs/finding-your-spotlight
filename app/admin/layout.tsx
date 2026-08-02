import React from "react";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import "./admin.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata = {
  title: "Admin Dashboard | Finding Your Spotlight",
  description: "Management layer for Finding Your Spotlight",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "admin-portal min-h-screen bg-background text-foreground font-sans",
        dmSans.variable,
        spaceGrotesk.variable
      )}
    >
      <TooltipProvider delayDuration={0}>
        {children}
      </TooltipProvider>
    </div>
  );
}
