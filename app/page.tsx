import { Hero } from "@/components/hero";
import { WhoIHelpSection } from "@/components/who-i-help-section";
import { AboutSection } from "@/components/about-section";
import { AreasSection } from "@/components/areas-section";
import { ConsultationSection } from "@/components/consultation-section";
import { FeaturesSection } from "@/components/features-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { StackingSections } from "@/components/stacking-sections";

export default function Home() {
  return (
    <>
      {/* Vertical margin lines */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <div className="mx-auto h-full max-w-7xl">
          <div className="relative h-full">
            <div className="absolute left-0 top-0 h-full w-px bg-zinc-700/30" />
            <div className="absolute right-0 top-0 h-full w-px bg-zinc-700/30" />
          </div>
        </div>
      </div>

      <main>
        <StackingSections>
          <Hero />
          <WhoIHelpSection />
          <AboutSection />
          <AreasSection />
          <ConsultationSection />
          <FeaturesSection />
          <div className="relative w-full bg-[#0F0F0F]">
            <ContactSection />
            <Footer />
          </div>
        </StackingSections>
      </main>
    </>
  );
}
