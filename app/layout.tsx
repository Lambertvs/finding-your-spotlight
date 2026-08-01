import React from "react"
import type { Metadata } from 'next'
import { DM_Sans, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { cn } from "@/lib/utils";

const spaceGroteskHeading = Space_Grotesk({subsets:['latin'],variable:'--font-heading'});

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: 'Finding Your Spotlight | Personal Brand Mentorship & Purpose Coaching',
  description: 'Helping artists, creatives, and professionals discover purpose, confidence, clarity and direction with Jennis Williamson.',
  generator: 'v0.app',
  icons: {
    icon: '/images/site_icon.png',
    apple: '/images/site_icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("dark", spaceGroteskHeading.variable)}>
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
