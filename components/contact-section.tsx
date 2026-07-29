"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, CheckCircle } from "lucide-react";
import { BlurRevealHeading } from "@/components/blur-reveal-heading";
import { TextMaskReveal } from "@/components/text-mask-reveal";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const [meetingFormat, setMeetingFormat] = useState("online");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="w-full bg-[#0F0F0F] py-24 md:py-32 flex flex-col justify-center"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Header & Business Contact */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-4 py-2 border border-zinc-700 w-fit">
              <div className="w-2.5 h-2.5 bg-amber-500" />
              <span className="text-sm font-medium text-zinc-400 tracking-wide">
                Book Your Session
              </span>
            </div>

            <BlurRevealHeading
              text="Ready to Discover Your Spotlight?"
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
            />

            <div className="text-balance text-base md:text-lg text-zinc-300 leading-relaxed max-w-lg">
              <TextMaskReveal text="The path from where you are to where you belong starts with a single conversation. Stop navigating alone. Let's build your future." />
            </div>

            {/* Contact & Social Links */}
            <div className="pt-6 space-y-6 border-t border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">
                    Business WhatsApp
                  </span>
                  <a
                    href="https://wa.me/27799355251"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-base hover:text-amber-400 transition-colors font-medium"
                  >
                    +27 (0)79 935 5251
                  </a>
                </div>

                <div>
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">
                    Email
                  </span>
                  <a
                    href="mailto:info@findingyourspotlight.com"
                    className="text-white text-base hover:text-amber-400 transition-colors font-medium"
                  >
                    info@findingyourspotlight.com
                  </a>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-3">
                  Social
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.facebook.com/findingyourspotlight"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/findingyourspotlight/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form (No Card Surface) */}
          <div className="w-full">
            <h3 className="text-2xl font-normal text-white tracking-tight mb-6">
              Let&apos;s Connect
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-amber-500 mx-auto" />
                <h4 className="text-xl font-medium text-white">Thank You!</h4>
                <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                  Your message has been received. We will get back to you shortly to confirm your consultation session.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-300">
                    Full Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-transparent border border-zinc-800 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/80 rounded-none px-4 py-3 text-white text-sm placeholder-zinc-600 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-300">
                    Email <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full bg-transparent border border-zinc-800 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/80 rounded-none px-4 py-3 text-white text-sm placeholder-zinc-600 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-300">
                    Phone <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+27 ..."
                    className="w-full bg-transparent border border-zinc-800 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/80 rounded-none px-4 py-3 text-white text-sm placeholder-zinc-600 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-300">
                    What would you like help with?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your current challenge or career goals..."
                    className="w-full bg-transparent border border-zinc-800 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/80 rounded-none px-4 py-3 text-white text-sm placeholder-zinc-600 outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <label className="text-xs font-medium text-zinc-300 block">
                    Preferred meeting format
                  </label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2.5 cursor-pointer text-sm text-zinc-300 hover:text-white">
                      <input
                        type="radio"
                        name="meetingFormat"
                        value="online"
                        checked={meetingFormat === "online"}
                        onChange={() => setMeetingFormat("online")}
                        className="accent-amber-500 w-4 h-4 cursor-pointer"
                      />
                      <span>Online</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer text-sm text-zinc-300 hover:text-white">
                      <input
                        type="radio"
                        name="meetingFormat"
                        value="in-person"
                        checked={meetingFormat === "in-person"}
                        onChange={() => setMeetingFormat("in-person")}
                        className="accent-amber-500 w-4 h-4 cursor-pointer"
                      />
                      <span>In Person</span>
                    </label>
                  </div>
                </div>

                <div className="pt-3">
                  <Button
                    type="submit"
                    className="w-full bg-white text-zinc-900 hover:bg-zinc-200 font-medium py-3 rounded-none text-base transition-colors"
                  >
                    Book Now
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
