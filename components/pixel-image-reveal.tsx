"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface PixelImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  rows?: number;
  cols?: number;
}

export function PixelImageReveal({
  src,
  alt,
  className = "",
  rows = 10,
  cols = 10,
}: PixelImageRevealProps) {
  // Generate grid cell delays for a organic pixel dissolve entrance
  const pixels = useMemo(() => {
    const total = rows * cols;
    const arr = [];
    for (let i = 0; i < total; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      // Stagger wave delay based on row, col & randomized noise
      const delay = (row * 0.04 + col * 0.04) + Math.random() * 0.35;
      arr.push({ id: i, delay });
    }
    return arr;
  }, [rows, cols]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`relative w-full aspect-[4/5] overflow-hidden border border-zinc-700/50 bg-zinc-950 group ${className}`}
    >
      {/* Base Image with subtle zoom & blur un-pixelate effect */}
      <motion.img
        initial={{ filter: "blur(14px) contrast(160%)", scale: 1.08 }}
        whileInView={{ filter: "blur(0px) contrast(100%)", scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-top"
      />

      {/* Pixel Matrix Grid Overlay */}
      <div
        className="absolute inset-0 grid pointer-events-none z-10"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {pixels.map((pixel) => (
          <motion.div
            key={pixel.id}
            initial={{ opacity: 1, scale: 1.02 }}
            whileInView={{ opacity: 0, scale: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.45,
              delay: pixel.delay,
              ease: "easeInOut",
            }}
            className="bg-zinc-950 border border-zinc-900/30"
          />
        ))}
      </div>

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none z-20" />
    </motion.div>
  );
}
