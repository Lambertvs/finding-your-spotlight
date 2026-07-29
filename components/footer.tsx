"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function FitText({ children }: { children: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  useEffect(() => {
    const adjustFontSize = () => {
      const container = containerRef.current;
      const text = textRef.current;
      if (!container || !text) return;

      const containerWidth = container.clientWidth;
      if (containerWidth === 0) return;

      // Pass 1: Measure at 100px base font size
      text.style.fontSize = "100px";
      const initialWidth = text.getBoundingClientRect().width;

      if (initialWidth > 0) {
        let computedSize = (containerWidth / initialWidth) * 100;
        text.style.fontSize = `${computedSize}px`;

        // Pass 2: Re-measure at calculated size to eliminate sub-pixel kerning gaps
        const actualWidth = text.getBoundingClientRect().width;
        if (actualWidth > 0 && Math.abs(containerWidth - actualWidth) > 0.1) {
          computedSize = (containerWidth / actualWidth) * computedSize;
          text.style.fontSize = `${computedSize}px`;
        }

        setFontSize(computedSize);
      }
    };

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(adjustFontSize);
    } else {
      adjustFontSize();
    }

    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [children]);

  return (
    <div ref={containerRef} className="w-full py-1 overflow-hidden">
      <h1
        ref={textRef}
        className="font-normal tracking-tight bg-gradient-to-b from-white via-white/70 to-transparent bg-clip-text text-transparent leading-[1.08] whitespace-nowrap inline-block text-left pb-1 md:pb-2"
        style={{
          fontSize: fontSize ? `${fontSize}px` : "100px",
          opacity: fontSize ? 1 : 0,
          transition: "opacity 0.15s ease-in-out",
        }}
      >
        {children}
      </h1>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-[#0F0F0F] text-white border-t border-zinc-700/30 overflow-hidden relative pt-12 md:pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 flex flex-col justify-between">
        {/* Top Grid Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-6 md:mb-8">
          {/* Left Column: Contact Details */}
          <div className="space-y-2 max-w-lg">
            <p className="text-sm md:text-base text-zinc-400 font-normal tracking-wide">
              +27 (0)79 935 5251
            </p>
            <a
              href="mailto:info@findingyourspotlight.com"
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal tracking-tight text-white hover:text-amber-400 transition-colors block"
            >
              info@findingyourspotlight.com
            </a>
          </div>

          {/* Right Columns: Navigate & Social */}
          <div className="flex items-start gap-16 md:gap-24">
            {/* Navigate Column */}
            <div className="space-y-4">
              <span className="text-xs text-zinc-500 font-normal uppercase tracking-wider block">
                Navigate
              </span>
              <ul className="space-y-2.5 text-sm md:text-base font-normal text-zinc-300">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#consultation" className="hover:text-white transition-colors">
                    Consultation
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition-colors">
                    Book a Session
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Column */}
            <div className="space-y-4">
              <span className="text-xs text-zinc-500 font-normal uppercase tracking-wider block">
                Social
              </span>
              <ul className="space-y-2.5 text-sm md:text-base font-normal text-zinc-300">
                <li>
                  <a
                    href="https://www.facebook.com/findingyourspotlight"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Facebook <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/findingyourspotlight/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Instagram <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Giant Wordmark Row - Tightened spacing */}
        <div className="w-full mt-2 md:mt-4 mb-2 select-none">
          <FitText>Finding Your Spotlight</FitText>
        </div>

        {/* Bottom Bar Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 md:pt-5 border-t border-zinc-800/80 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Finding Your Spotlight. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
