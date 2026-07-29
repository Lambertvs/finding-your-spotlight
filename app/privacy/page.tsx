import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Privacy Policy | Finding Your Spotlight",
  description: "Privacy Policy for Finding Your Spotlight under South Africa's Protection of Personal Information Act (POPIA).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-zinc-100 flex flex-col justify-between">
      {/* Header Bar */}
      <header className="border-b border-zinc-800/60 bg-[#0F0F0F]/80 backdrop-blur-md sticky top-0 z-50 py-4 px-6 md:px-12">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
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
            POPIA Compliant
          </div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-400">
            Effective Date: July 2026 &nbsp;|&nbsp; Last Updated: July 2026
          </p>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-10 text-zinc-300 text-base md:text-lg leading-relaxed">
          <p>
            At <strong>Finding Your Spotlight</strong>, we respect your privacy and are committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA) of South Africa. This Privacy Policy outlines how we collect, use, store, and safeguard the information you provide to us through our website.
          </p>

          {/* Responsible Party */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              Responsible Party
            </h2>
            <p>
              <strong>Finding Your Spotlight</strong> is the responsible party for processing your personal information gathered via this website.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li><strong>Business Name:</strong> Finding Your Spotlight</li>
              <li><strong>Email:</strong> <a href="mailto:info@findingyourspotlight.com" className="text-amber-400 hover:underline">info@findingyourspotlight.com</a></li>
              <li><strong>Business WhatsApp:</strong> <a href="https://wa.me/27799355251" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">+27 (0)79 935 5251</a></li>
              <li><strong>Location:</strong> South Africa</li>
            </ul>
          </section>

          {/* Information We Collect */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              Information We Collect
            </h2>
            <p>
              We only collect personal information that you voluntarily submit through our online booking and consultation enquiry form. This information includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone / WhatsApp Number</li>
              <li>Primary Area of Focus (e.g., what you would like help with during your session)</li>
              <li>Preferred Meeting Format (e.g., Online or In-Person)</li>
            </ul>
            <p className="text-zinc-400 text-sm italic">
              We do not run public membership databases, process online credit card transactions directly on this site, or collect high-risk sensitive personal data.
            </p>
          </section>

          {/* Purpose of Data Processing */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              Purpose of Data Processing
            </h2>
            <p>
              Your personal information is collected solely for legitimate business purposes connected to your direct request:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>To process and schedule your 1-hour consultation or ongoing mentorship enquiry.</li>
              <li>To communicate with you regarding your appointment details and session preparation.</li>
              <li>To respond to direct questions or support enquiries submitted via email or WhatsApp.</li>
            </ul>
          </section>

          {/* Retention and Storage */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              Retention and Storage of Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Your data is stored securely using modern encryption and access-controlled platforms.</li>
              <li>We retain your information only for as long as necessary to fulfill the consultation services requested or to comply with statutory legal and accounting requirements in South Africa.</li>
              <li>Once your data is no longer required, it is safely deleted or anonymised.</li>
            </ul>
          </section>

          {/* Third-Party Disclosure */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              Third-Party Disclosure
            </h2>
            <p>
              We do not sell, rent, trade, or leak your personal information to third parties for marketing purposes. Your information may only be shared with reliable service providers essential to operating our service, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Secure cloud infrastructure and email hosting services.</li>
              <li>Direct messaging platforms (such as WhatsApp) when you initiate communication with us.</li>
            </ul>
            <p className="text-zinc-400 text-sm">
              All third-party service providers processing data on our behalf are obligated to adhere to strict confidentiality and security standards consistent with POPIA.
            </p>
          </section>

          {/* Your Rights under POPIA */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              Your Rights under POPIA
            </h2>
            <p>
              As a data subject in South Africa, you hold the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-zinc-300">
              <li><strong>Right to Access:</strong> You may request confirmation of what personal information we hold about you.</li>
              <li><strong>Right to Correction:</strong> You may ask us to rectify incorrect, incomplete, or out-of-date personal information.</li>
              <li><strong>Right to Destruction/Objection:</strong> You may request that we delete or stop processing your personal information, subject to applicable law.</li>
              <li><strong>Right to Complain:</strong> You have the right to lodge a complaint with the South African Information Regulator if you believe your rights under POPIA have been infringed.</li>
            </ul>

            <div className="bg-zinc-900 border border-zinc-800 p-5 mt-4 space-y-2">
              <h3 className="font-semibold text-white">Information Regulator (South Africa)</h3>
              <p className="text-sm text-zinc-400">
                Website: <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">inforegulator.org.za</a>
              </p>
              <p className="text-sm text-zinc-400">
                General Enquiries: <a href="mailto:enquiries@inforegulator.org.za" className="text-amber-400 hover:underline">enquiries@inforegulator.org.za</a>
              </p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="space-y-4 border-t border-zinc-800/80 pt-8 pb-4">
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              Contact Us
            </h2>
            <p>
              If you wish to exercise any of your POPIA rights or have questions regarding this policy, please contact us at:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li><strong>Email:</strong> <a href="mailto:info@findingyourspotlight.com" className="text-amber-400 hover:underline">info@findingyourspotlight.com</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/27799355251" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">+27 (0)79 935 5251</a></li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
