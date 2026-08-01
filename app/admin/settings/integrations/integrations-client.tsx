"use client";

import React, { useState } from "react";
import {
  CheckCircle2Icon,
  AlertCircleIcon,
  MailIcon,
  DatabaseIcon,
  CreditCardIcon,
  SendIcon,
  RefreshCwIcon,
  HardDriveIcon,
  MessageSquareIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function IntegrationsClient() {
  const [testingEmail, setTestingEmail] = useState(false);
  const [emailMsg, setEmailMsg] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSendTestEmail = async () => {
    setTestingEmail(true);
    setEmailMsg("");
    setEmailError("");

    try {
      const res = await fetch("/api/admin/test-email", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send test email via Resend.");
      }

      setEmailMsg(`Test email sent successfully to ${data.recipient}! Check your inbox.`);
    } catch (err: any) {
      setEmailError(err.message || "Failed to send test email.");
    } finally {
      setTestingEmail(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Integrations & System Status</h1>
        <p className="text-sm text-muted-foreground">
          Monitor connected third-party services, API credentials, storage buckets, and email delivery status.
        </p>
      </div>

      {/* 1. Resend Email Integration */}
      <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <MailIcon className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-foreground">Resend Email Transactional Service</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2Icon className="w-3.5 h-3.5" /> Operational
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          Powers automated booking notifications and confirmation alerts to both client and executive inbox.
        </p>

        {emailMsg && (
          <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium flex items-center gap-2">
            <CheckCircle2Icon className="w-4 h-4 shrink-0" />
            <span>{emailMsg}</span>
          </div>
        )}

        {emailError && (
          <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium flex items-center gap-2">
            <AlertCircleIcon className="w-4 h-4 shrink-0" />
            <span>{emailError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 space-y-1">
            <span className="text-muted-foreground block text-[10px] uppercase font-mono">API Key Status</span>
            <span className="font-medium text-foreground">Configured (`re_drYf...`)</span>
          </div>

          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 space-y-1">
            <span className="text-muted-foreground block text-[10px] uppercase font-mono">Current Sender</span>
            <span className="font-medium text-foreground">onboarding@resend.dev</span>
          </div>

          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 space-y-1">
            <span className="text-muted-foreground block text-[10px] uppercase font-mono">Admin Alerts Inbox</span>
            <span className="font-medium text-foreground">info@findingyourspotlight.com</span>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 text-xs text-muted-foreground">
          <span className="font-semibold text-amber-500">Custom Domain Verification Step:</span> Once domain `findingyourspotlight.com` is verified in your Resend Dashboard, update `SENDER_EMAIL` in `.env.local` to `info@findingyourspotlight.com`.
        </div>

        <div className="flex justify-end pt-1">
          <Button
            onClick={handleSendTestEmail}
            disabled={testingEmail}
            className="bg-primary text-primary-foreground font-medium text-xs gap-2"
          >
            {testingEmail ? (
              <>
                <RefreshCwIcon className="w-3.5 h-3.5 animate-spin" /> Dispatching Test Email...
              </>
            ) : (
              <>
                <SendIcon className="w-3.5 h-3.5" /> Send Test Admin Notification Email
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 2. Supabase Database & Storage Integration */}
      <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-foreground">Supabase Database & Cloud Storage</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2Icon className="w-3.5 h-3.5" /> Connected
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          Houses session booking leads, admin user authentication, and secure file storage buckets.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 space-y-1">
            <span className="text-muted-foreground block text-[10px] uppercase font-mono">Project URL</span>
            <span className="font-medium text-foreground truncate block font-mono">obcjgxgeccfqdtsyqeky.supabase.co</span>
          </div>

          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 space-y-1">
            <span className="text-muted-foreground block text-[10px] uppercase font-mono">Private PDF Storage Bucket</span>
            <span className="font-medium text-emerald-400 font-mono">ebooks-private (Active)</span>
          </div>

          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 space-y-1">
            <span className="text-muted-foreground block text-[10px] uppercase font-mono">Public Avatars Bucket</span>
            <span className="font-medium text-emerald-400 font-mono">avatars (Active)</span>
          </div>
        </div>
      </div>

      {/* 3. Yoco Payment Gateway (Upcoming) */}
      <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <CreditCardIcon className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-foreground">Yoco Payment Gateway (South Africa)</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertCircleIcon className="w-3.5 h-3.5" /> Next Milestone
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          Enables South African ZAR credit card payments for digital eBook purchases with automatic single-use download links.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 space-y-1">
            <span className="text-muted-foreground block text-[10px] uppercase font-mono">Checkout API Route</span>
            <span className="font-mono text-muted-foreground">/api/checkout (Pending Setup)</span>
          </div>

          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 space-y-1">
            <span className="text-muted-foreground block text-[10px] uppercase font-mono">Currency</span>
            <span className="font-medium text-foreground">ZAR (South African Rand)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
