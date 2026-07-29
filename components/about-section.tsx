"use client";

import { motion } from "framer-motion";
import { PixelImageReveal } from "@/components/pixel-image-reveal";
import { BlurRevealHeading } from "@/components/blur-reveal-heading";
import { TextMaskReveal } from "@/components/text-mask-reveal";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full min-h-screen bg-[#0F0F0F] py-16 md:py-24 flex flex-col justify-center border-b border-zinc-700/30">
      {/* Grain texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 result=%22noise%22 /></filter><rect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22 fill=%22%23ffffff%22/></svg>'\")",
      }} />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16 w-full">
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow, Heading & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-4 py-2 border border-zinc-700 w-fit">
              <div className="w-2.5 h-2.5 bg-amber-500" />
              <span className="text-sm font-medium text-zinc-400 tracking-wide">
                About
              </span>
            </div>

            <BlurRevealHeading
              text="Shaping creative careers for over 20 years"
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.15]"
            />

            <div className="space-y-4 text-zinc-300 text-base md:text-lg leading-relaxed">
              <div className="text-balance">
                <TextMaskReveal text="For over twenty years, Jennis Williamson has guided thousands of artists, creatives, and professionals toward building authentic, lasting careers. As founder of Talent-ETC™ and Life in a Bulb Productions, his approach combines deep experience in entertainment, psychology, and personal branding." />
              </div>
              <div className="text-balance">
                <TextMaskReveal text="Jennis believes success is not about chasing fame. It is about becoming irreplaceable by discovering your true value and stepping into your own spotlight." />
              </div>
            </div>
          </div>

          {/* Right Column: Image with Pixel Entrance Transition */}
          <div className="w-full max-w-md lg:max-w-none mx-auto">
            <PixelImageReveal
              src="/images/Finding Your Spotlight - About - Jennis .png"
              alt="Jennis Williamson - About"
              rows={12}
              cols={12}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
