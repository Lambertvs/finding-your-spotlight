import React from "react";
import Image from "next/image";
import { LoginForm } from "@/components/login-form";

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-6 overflow-hidden bg-background text-foreground">
      {/* Crisp Full Background Image: surrealis-2-Image 15.png */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/surrealis-2-Image 15.png"
          alt="Surrealis Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Centered Single Card Login Form */}
      <div className="relative z-10 w-full max-w-md flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
