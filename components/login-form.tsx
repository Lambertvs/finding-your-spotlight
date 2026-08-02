"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || "Invalid email or password.");
      }

      if (data.session) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to sign in. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-md ${className || ""}`} {...props}>
      <Card className="border border-border/60 bg-card/90 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden p-6 md:p-8">
        <CardContent className="p-0 space-y-6">
          {/* Header section with top and bottom dividers */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Image
              src="/images/Finding Your Spotlight New Logo - wht@4x.png"
              alt="Finding Your Spotlight"
              width={220}
              height={55}
              className="h-10 w-auto object-contain drop-shadow"
              priority
            />
            <div className="w-full border-t border-b border-border/40 py-4">
              <h1 className="text-xl font-bold tracking-tight text-amber-500 font-heading">
                Executive Portal
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sign in to manage your session bookings and digital eBook catalog.
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <FieldGroup className="space-y-4">
              <Field className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-muted-foreground block">
                  Admin Email Address
                </label>
                <div className="relative">
                  <MailIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="info@findingyourspotlight.com"
                    className="w-full bg-background border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </Field>

              <Field className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-medium text-muted-foreground block">
                  Password
                </label>
                <div className="relative">
                  <LockIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-background border rounded-lg pl-9 pr-10 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
              </Field>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2.5 gap-2 mt-2"
              >
                {loading ? (
                  "Authenticating..."
                ) : (
                  <>
                    Sign In to Admin <ArrowRightIcon className="w-4 h-4" />
                  </>
                )}
              </Button>
            </FieldGroup>
          </form>

          {/* Security Footer with divider and zero em-dashes */}
          <div className="border-t border-border/40 pt-4 text-center">
            <p className="text-[11px] text-muted-foreground">
              Protected Area: Authorized Admin Personnel Only
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
