"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import LightRays from "@/components/LightRays"

import { TextMaskReveal } from "@/components/text-mask-reveal"

export function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0F0F0F] flex flex-col justify-between">
      {/* React Bits LightRays Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={1}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.3}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={2}
          saturation={0}
        />
      </div>

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/40 via-transparent to-[#0F0F0F]/80 pointer-events-none z-1" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        {/* Navigation */}
        <nav className="relative z-50 w-full py-6">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <img
                src="/images/Finding Your Spotlight New Logo - wht@4x.png"
                alt="Finding Your Spotlight"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 text-sm text-white/80 lg:flex">
              <Link href="#" className="transition-colors hover:text-white font-medium">
                Home
              </Link>
              <Link href="#about" className="transition-colors hover:text-white font-medium">
                About
              </Link>
              <Link href="#consultation" className="transition-colors hover:text-white font-medium">
                Consultation
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                href="#contact"
                className="hidden text-sm font-medium bg-white text-zinc-900 px-5 py-2.5 rounded-none hover:bg-zinc-200 transition-colors lg:block"
              >
                Book a Session
              </Link>
              
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white lg:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="absolute left-0 right-0 top-full bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-700/30 lg:hidden">
              <div className="flex flex-col px-6 py-6 gap-4">
                <Link
                  href="#"
                  className="text-white/80 transition-colors hover:text-white py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="#about"
                  className="text-white/80 transition-colors hover:text-white py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="#consultation"
                  className="text-white/80 transition-colors hover:text-white py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Consultation
                </Link>
                <Link
                  href="#contact"
                  className="mt-2 text-zinc-900 bg-white font-medium py-3 px-4 rounded-none text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a Session
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Content - Left Aligned matching Figma design */}
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 w-full flex-1 flex flex-col justify-center py-12 md:py-20 z-10">
          <div className="flex flex-col items-start text-left max-w-5xl">
            <h1 className="font-normal text-[74px] xs:text-[80px] sm:text-8xl md:text-9xl lg:text-[145px] xl:text-[180px] leading-[0.95] tracking-tight">
              <span className="block bg-gradient-to-r from-zinc-500 via-zinc-400 to-zinc-200 bg-clip-text text-transparent pb-1">
                {"Find Your".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(16px)", opacity: 0, y: 20 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block bg-gradient-to-r from-zinc-200 via-zinc-100 to-white bg-clip-text text-transparent pb-2 md:pb-4">
                <motion.span
                  initial={{ filter: "blur(16px)", opacity: 0, y: 20 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.22,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="inline-block pb-1"
                >
                  Spotlight
                </motion.span>
              </span>
            </h1>
            
            <div className="mt-10 md:mt-14 lg:mt-16 max-w-2xl text-left font-normal text-lg md:text-2xl lg:text-[36px] text-zinc-300 leading-snug">
              <TextMaskReveal
                text="Helping people discover purpose, confidence, clarity and direction."
                delay={0.35}
              />
            </div>

            {/* CTAs - Rectangular buttons left-aligned */}
            <div className="mt-8 md:mt-10 flex flex-row items-center gap-4">
              <Link
                href="#contact"
                className="bg-white text-zinc-900 px-6 py-3 text-sm font-medium hover:bg-zinc-200 transition-colors"
              >
                Book Your Session
              </Link>
              <Link
                href="#about"
                className="bg-zinc-900/80 text-white border border-zinc-700 px-6 py-3 text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
