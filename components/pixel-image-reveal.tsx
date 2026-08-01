"use client";

import { motion } from "framer-motion";

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
}: PixelImageRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain"
      />
    </motion.div>
  );
}
