"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlurRevealHeading } from "@/components/blur-reveal-heading";
import { TextMaskReveal } from "@/components/text-mask-reveal";

interface PillarItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

const pillars: PillarItem[] = [
  {
    id: "1",
    number: "01",
    title: "Finding Purpose",
    description:
      "Uncover your authentic drive, core values, and what truly inspires your personal and professional journey.",
  },
  {
    id: "2",
    number: "02",
    title: "Career Direction",
    description:
      "Map out a strategic, long-term career path that aligns with your unique talents, passions, and ambition.",
  },
  {
    id: "3",
    number: "03",
    title: "Confidence",
    description:
      "Develop unshakeable self-belief to own your voice, overcome self-doubt, and step into any room with poise.",
  },
  {
    id: "4",
    number: "04",
    title: "Personal Branding",
    description:
      "Craft a compelling, authentic identity that sets you apart and clearly communicates your value to the world.",
  },
  {
    id: "5",
    number: "05",
    title: "Handling Rejection",
    description:
      "Reframe setbacks into powerful fuel, building emotional resilience and fortitude to keep moving forward.",
  },
  {
    id: "6",
    number: "06",
    title: "Entertainment Industry Guidance",
    description:
      "Leverage two decades of industry expertise to navigate auditions, representation, contracts, and strategy.",
  },
  {
    id: "7",
    number: "07",
    title: "Goal Setting",
    description:
      "Transform high-level ambitions into structured, actionable milestones backed by clear accountability.",
  },
  {
    id: "8",
    number: "08",
    title: "Reinventing Yourself",
    description:
      "Break free from old limits and pivot seamlessly into your next chapter with total clarity and confidence.",
  },
];

export function AreasSection() {
  const [openId, setOpenId] = useState<string | null>("1");

  const togglePillar = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0F0F0F] text-white py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden border-b border-zinc-700/30">
      <div className="relative max-w-7xl w-full">
        {/* Static Vector Chevron Emblem aligned flush at left-0 of max-w-7xl (red line) & bottom border (green line) */}
        <div className="absolute left-0 -bottom-24 md:-bottom-32 pointer-events-none opacity-25 md:opacity-30 z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[340px] lg:h-[340px] text-zinc-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              vectorEffect="non-scaling-stroke"
              d="M 128 192 L 0 256 L 0 192 L 128 128 Z M 256 192 L 128 256 L 128 192 L 256 128 Z M 128 64 L 128 128 L 0 64 L 0 0 Z M 256 64 L 256 128 L 128 64 L 128 0 Z"
            />
          </svg>
        </div>

        <div className="px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Heading & Description */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 px-4 py-2 border border-zinc-700 w-fit">
                <div className="w-2.5 h-2.5 bg-amber-500" />
                <span className="text-sm font-medium text-zinc-400 tracking-wide">
                  Areas I Can Help With
                </span>
              </div>

              <BlurRevealHeading
                text="Turning Ambition into Direction"
                className="text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
              />

              <div className="text-balance text-zinc-400 text-base md:text-lg leading-relaxed max-w-lg">
                <TextMaskReveal text="Key areas of focus during our one-on-one sessions, designed to turn uncertainty into a clear, actionable roadmap." />
              </div>
            </div>

            {/* Right Column: Interactive Accordion List */}
            <div className="flex flex-col border-t border-zinc-800">
              {pillars.map((pillar) => {
                const isOpen = openId === pillar.id;
                return (
                  <div
                    key={pillar.id}
                    className="border-b border-zinc-800/80 transition-colors"
                  >
                    <button
                      onClick={() => togglePillar(pillar.id)}
                      className="w-full py-6 flex items-center justify-between gap-4 text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-4 md:gap-6">
                        {/* Framer-style vertical slide mask container */}
                        <div className="h-[20px] overflow-hidden flex flex-col font-sans text-sm font-medium text-zinc-500 group-hover:text-amber-500 transition-colors">
                          <div className="flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-y-1/2">
                            <span className="h-[20px] flex items-center">{pillar.number}</span>
                            <span className="h-[20px] flex items-center text-amber-500">{pillar.number}</span>
                          </div>
                        </div>

                        <span
                          className={cn(
                            "text-[20px] font-normal tracking-wide transition-colors",
                            isOpen ? "text-amber-400" : "text-zinc-200 group-hover:text-white"
                          )}
                        >
                          {pillar.title}
                        </span>
                      </div>

                      {/* Frameless Thin-Line Plus / Close (X) Symbol */}
                      <div
                        className={cn(
                          "relative w-4 h-4 flex items-center justify-center shrink-0 transition-transform duration-300 transform",
                          isOpen
                            ? "rotate-45 group-hover:rotate-135"
                            : "rotate-0 group-hover:rotate-90"
                        )}
                        style={{ willChange: "transform" }}
                      >
                        {/* Horizontal line */}
                        <span
                          className={cn(
                            "absolute w-3.5 h-[1px] transition-colors duration-300",
                            isOpen ? "bg-amber-400" : "bg-zinc-400 group-hover:bg-white"
                          )}
                        />
                        {/* Vertical line */}
                        <span
                          className={cn(
                            "absolute h-3.5 w-[1px] transition-colors duration-300",
                            isOpen ? "bg-amber-400" : "bg-zinc-400 group-hover:bg-white"
                          )}
                        />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pl-10 md:pl-12 text-sm md:text-base leading-relaxed text-zinc-400 max-w-xl">
                            {pillar.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
