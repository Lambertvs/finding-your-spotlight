import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Terms of Service | Finding Your Spotlight",
  description: "Terms of Service for Finding Your Spotlight personal brand mentorship & consultation.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-zinc-100 flex flex-col justify-between">
      {/* Header Bar */}
      <header className="border-b border-zinc-800/60 bg-[#0F0F0F]/80 backdrop-blur-md sticky top-0 z-50 py-4 px-6 md:px-12">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/images/Finding Your Spotlight New Logo - wht@4x.png"
              alt="Finding Your Spotlight"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 md:px-12 py-16 md:py-24 space-y-12">
        <div className="border-b border-zinc-800 pb-8 space-y-3">
          <div className="flex items-center gap-3 px-3 py-1 border border-zinc-800 w-fit text-xs font-medium text-amber-500 uppercase tracking-widest">
            Legal Terms
          </div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-sm text-zinc-400">
            Effective Date: July 2026
          </p>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-10 text-zinc-300 text-base md:text-lg leading-relaxed">
          <p>
            Welcome to <strong>Finding Your Spotlight</strong>. By accessing or using our website, you agree to comply with and be bound by the following Terms of Service. Please review them carefully before submitting any booking requests or using our services.
          </p>

          {/* 1. General Overview */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              1. General Overview
            </h2>
            <p>
              <strong>Finding Your Spotlight</strong> provides personal brand mentorship, purpose coaching, creative direction, and consultation services led by Jennis Williamson. The contents of this website are for general informational purposes and booking administration only.
            </p>
          </section>

          {/* 2. Consultation Bookings and Services */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              2. Consultation Bookings and Services
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-zinc-300">
              <li>
                <strong>Nature of Service:</strong> Mentorship and consultation sessions provide strategic guidance, perspective, and mentorship. They do not constitute licensed medical, clinical psychological, legal, or formal financial advice.
              </li>
              <li>
                <strong>Enquiries and Confirmation:</strong> Submitting an enquiry or booking request via the website form does not guarantee a scheduled session until formal confirmation and payment arrangements are finalized directly with Finding Your Spotlight.
              </li>
              <li>
                <strong>Format:</strong> Sessions take place either online via virtual platforms or in person by prior mutual agreement.
              </li>
            </ul>
          </section>

          {/* 3. Intellectual Property Rights */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              3. Intellectual Property Rights
            </h2>
            <p>
              All content on this website, including but not limited to text, branding assets, logos, design elements, graphics, and video clips, is the intellectual property of <strong>Finding Your Spotlight</strong> and Jennis Williamson.
            </p>
            <p>
              You may not reproduce, duplicate, copy, sell, or exploit any portion of this website or its content without express written authorization from us.
            </p>
          </section>

          {/* 4. User Conduct */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              4. User Conduct
            </h2>
            <p>When using our contact and booking forms, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Provide true, accurate, and current contact details.</li>
              <li>Refrain from submitting unlawful, abusive, threatening, or spam content.</li>
              <li>Avoid attempting to breach or compromise the security and performance of this website.</li>
            </ul>
          </section>

          {/* 5. Limitation of Liability */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              5. Limitation of Liability
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-zinc-300">
              <li>
                <strong>Finding Your Spotlight</strong> strives to maintain website accuracy and uptime. However, we do not warrant that the website will be uninterrupted or error-free at all times.
              </li>
              <li>
                To the maximum extent permitted by South African law, Finding Your Spotlight shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from your use of, or inability to use, this website or its consultation services.
              </li>
            </ul>
          </section>

          {/* 6. Governing Law */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              6. Governing Law
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the <strong>Republic of South Africa</strong>. Any disputes arising under or in connection with these terms shall be subject to the jurisdiction of South African courts.
            </p>
          </section>

          {/* 7. Changes to Terms */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              7. Changes to Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms of Service at any time without prior notice. Any changes will be posted directly to this page with an updated effective date.
            </p>
          </section>

          {/* 8. Contact Information */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8 pb-4">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              8. Contact Information
            </h2>
            <p>
              For any legal or service queries regarding these Terms of Service, please contact:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li><strong>Email:</strong> <a href="mailto:info@findingyourspotlight.com" className="text-amber-400 hover:underline">info@findingyourspotlight.com</a></li>
              <li><strong>Business WhatsApp:</strong> <a href="https://wa.me/27799355251" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">+27 (0)79 935 5251</a></li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
