"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WhoIHelpGrid } from "@/components/ui/who-i-help-grid";
import { BlurRevealHeading } from "@/components/blur-reveal-heading";
import { TextMaskReveal } from "@/components/text-mask-reveal";

export function WhoIHelpSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll rotation from 0deg to -35deg when scrolling down, returning back on scroll up
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -35]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0F0F0F] py-16 md:py-24 flex flex-col justify-center border-b border-zinc-700/30 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16 w-full">
        <div className="flex items-center gap-3 px-4 py-2 border border-zinc-700 w-fit mb-8">
          <div className="w-2.5 h-2.5 bg-amber-500" />
          <span className="text-sm font-medium text-zinc-400 tracking-wide">
            Who I Help
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
          <BlurRevealHeading
            text="Tailored Guidance for the Creative Soul"
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.15]"
          />
          <div className="text-zinc-400 text-lg md:text-xl leading-relaxed lg:pt-2">
            <TextMaskReveal text="You are here for a reason. I help those ready to stop searching and start building." />
          </div>
        </div>

        <div className="relative">
          {/* Overflow-hidden clipping mask container bounded by red line on right & green line at bottom */}
          <div className="absolute -right-6 md:-right-12 lg:-right-16 bottom-full w-[550px] lg:w-[750px] h-[450px] md:h-[600px] overflow-hidden pointer-events-none z-0">
            <div className="absolute right-0 bottom-0 pointer-events-none opacity-25 md:opacity-30">
              <motion.svg
                style={{ rotate }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="w-[420px] h-[420px] md:w-[560px] md:h-[560px] lg:w-[700px] lg:h-[700px] text-zinc-500 transform translate-x-1/4 translate-y-1/4 origin-center"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  d="M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z"
                />
              </motion.svg>
            </div>
          </div>

          <WhoIHelpGrid />
        </div>
      </div>
    </section>
  );
}
