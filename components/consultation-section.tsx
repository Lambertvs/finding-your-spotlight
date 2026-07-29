"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurRevealHeading } from "@/components/blur-reveal-heading";
import { TextMaskReveal } from "@/components/text-mask-reveal";

interface Plan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  outcome: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "single-session",
    name: "The One-Hour Consultation",
    badge: "SINGLE STRATEGY SESSION",
    description: "Immediate, deep-dive strategy for your current challenge.",
    outcome: "A clear perspective and actionable next steps.",
    features: [
      "1-on-1 private intensive session",
      "Online video or in-person format",
      "Follow-up action item summary",
    ],
    cta: "Book 1-Hour Consultation →",
    popular: true,
  },
  {
    id: "ongoing-mentorship",
    name: "Ongoing Mentorship",
    badge: "SUSTAINED GROWTH",
    description: "A sustained partnership for long-term accountability and growth.",
    outcome: "Consistent guidance to navigate your evolution and hold your vision.",
    features: [
      "Regular 1-on-1 strategic check-ins",
      "Priority messaging access & review",
      "Tailored long-term growth roadmapping",
    ],
    cta: "Enquire About Mentorship →",
    popular: false,
  },
];

export function ConsultationSection() {
  return (
    <section
      id="consultation"
      className="w-full min-h-screen bg-[#0F0F0F] py-24 md:py-32 flex flex-col justify-center border-b border-zinc-700/30"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 w-full">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 border border-zinc-700 w-fit mx-auto">
            <div className="w-2.5 h-2.5 bg-amber-500" />
            <span className="text-sm font-medium text-zinc-400 tracking-wide">
              Consultation
            </span>
          </div>
          <BlurRevealHeading
            text="Your Path to Clarity"
            className="text-4xl md:text-5xl lg:text-6xl leading-tight text-center"
          />
          <div className="text-balance text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-center">
            <TextMaskReveal text="Targeted strategy or sustained partnership tailored to where you are right now." />
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "relative flex flex-col justify-between gap-6 p-6 transition-all duration-300",
                plan.popular
                  ? "bg-[#141414] border border-amber-500/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                  : "bg-transparent border border-zinc-700/50 hover:bg-[#141414]"
              )}
            >
              <div className="flex flex-col gap-6">
                {/* Card Head */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    {plan.badge && (
                      <div className="bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 shrink-0 w-fit order-1 sm:order-2">
                        <span className="text-xs font-medium text-amber-500">
                          {plan.badge}
                        </span>
                      </div>
                    )}
                    <span className="text-xl font-normal text-white order-2 sm:order-1">
                      {plan.name}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest block">
                      FOCUS:
                    </span>
                    <p className="text-balance text-sm leading-relaxed text-zinc-400">
                      {plan.description}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={cn(
                    "w-full py-3 px-4 text-sm font-medium transition-all duration-200 cursor-pointer",
                    plan.popular
                      ? "bg-white text-zinc-900 hover:bg-zinc-200"
                      : "bg-transparent text-white border border-zinc-600 hover:bg-white/5"
                  )}
                >
                  {plan.cta}
                </button>

                {/* Outcome & Features List */}
                <div className="flex flex-col gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest block">
                      OUTCOME:
                    </span>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {plan.outcome}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-3 pt-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 group">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                        <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
