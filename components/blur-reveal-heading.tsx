"use client";

import { motion } from "framer-motion";

interface BlurRevealHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function BlurRevealHeading({
  text,
  className = "",
  as = "h2",
}: BlurRevealHeadingProps) {
  const Component = motion[as];
  const words = text.split(" ");

  return (
    <Component className={`text-balance font-normal tracking-tight text-white ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(14px)", opacity: 0, y: 12 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
