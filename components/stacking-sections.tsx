"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StackingSectionsProps {
  children: React.ReactNode;
}

export function StackingSections({ children }: StackingSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Capture child elements before pinning creates wrappers
    const cards = Array.from(containerRef.current.children) as HTMLElement[];

    if (cards.length < 2) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        // Set stacking order and transform origin
        gsap.set(card, {
          zIndex: i + 1,
          transformOrigin: "center top",
          filter: "brightness(1)",
          scale: 1,
        });

        // Pin each card except the final grouped section
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];

          // Dynamic start trigger: if card height > viewport height, pin when bottom reaches viewport bottom
          const isTall = card.offsetHeight > window.innerHeight + 20;

          ScrollTrigger.create({
            trigger: card,
            start: isTall ? "bottom bottom" : "top top",
            endTrigger: nextCard,
            end: "top top",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });

          // Smooth scale & dimming transition as next card enters
          gsap.to(card, {
            scale: 0.92,
            filter: "brightness(0.4)",
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top bottom",
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden">
      {children}
    </div>
  );
}
