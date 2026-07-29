"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextMaskRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextMaskReveal({
  text,
  className = "",
  delay = 0,
}: TextMaskRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[][]>([]);

  // Calculate visual lines based on word offsetTop coordinates
  useEffect(() => {
    if (!containerRef.current) return;

    const calculateLines = () => {
      const tempWords = containerRef.current?.querySelectorAll(".measuring-word");
      if (!tempWords || tempWords.length === 0) return;

      const lineGroups: string[][] = [];
      let currentLine: string[] = [];
      let currentTop: number | null = null;

      tempWords.forEach((wordEl) => {
        const top = (wordEl as HTMLElement).offsetTop;
        const wordText = wordEl.textContent || "";

        if (currentTop === null || Math.abs(top - currentTop) < 4) {
          currentLine.push(wordText);
          currentTop = top;
        } else {
          lineGroups.push(currentLine);
          currentLine = [wordText];
          currentTop = top;
        }
      });

      if (currentLine.length) {
        lineGroups.push(currentLine);
      }

      setLines(lineGroups);
    };

    calculateLines();

    window.addEventListener("resize", calculateLines);
    return () => window.removeEventListener("resize", calculateLines);
  }, [text]);

  // Animate line masks using GSAP ScrollTrigger
  useEffect(() => {
    if (!containerRef.current || lines.length === 0) return;

    const lineElements = containerRef.current.querySelectorAll(".mask-line-content");
    if (!lineElements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineElements,
        {
          yPercent: 115,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [lines, delay]);

  const allWords = text.split(" ");

  return (
    <span ref={containerRef} className={`block text-balance ${className}`}>
      {lines.length === 0 ? (
        // Initial hidden measurement pass to calculate line breaks
        <span className="inline opacity-0 pointer-events-none">
          {allWords.map((word, i) => (
            <span key={i} className="measuring-word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </span>
      ) : (
        // Render pass: Each visual line is wrapped in its own overflow-hidden mask
        lines.map((lineWords, lineIdx) => (
          <span key={lineIdx} className="block overflow-hidden py-0.5">
            <span className="mask-line-content block transform-gpu">
              {lineWords.join(" ")}
            </span>
          </span>
        ))
      )}
    </span>
  );
}
