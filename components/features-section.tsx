"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBagIcon } from "lucide-react";
import { BlurRevealHeading } from "@/components/blur-reveal-heading";
import { TextMaskReveal } from "@/components/text-mask-reveal";
import { YocoCheckoutModal } from "@/components/yoco-checkout-modal";

export function FeaturesSection() {
  const [selectedBook, setSelectedBook] = useState<{
    id: string;
    title: string;
    priceZar: number;
    coverImage: string;
  } | null>(null);

  const books = [
    {
      id: "finding-your-spotlight",
      title: "Finding Your Spotlight",
      priceZar: 490.0,
      coverImage: "/images/Finding Your Spotlight Book Cover.jpg",
    },
    {
      id: "directions-to-gaytown",
      title: "Directions To Gaytown",
      priceZar: 390.0,
      coverImage: "/images/Directions To Gaytown Book Cover.jpg",
    },
    {
      id: "20-things-parenting",
      title: "20 Things They Don't Tell You About Parenting",
      priceZar: 350.0,
      coverImage: "/images/20 Things They Dont Tell You About Parenting Book Cover.jpg",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#0F0F0F] py-16 md:py-20 flex flex-col justify-center border-b border-zinc-700/30 overflow-hidden">
      {/* Yoco Checkout Modal */}
      <YocoCheckoutModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      {/* Bottom line & left margin aligned vector shape */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full relative">
          <div className="absolute left-0 bottom-0 opacity-20 md:opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] text-zinc-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                vectorEffect="non-scaling-stroke"
                d="M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 mb-20 relative z-10"
        >
          <div className="flex items-center gap-3 px-4 py-2 border border-zinc-700 w-fit">
            <div className="w-2.5 h-2.5 bg-amber-500" />
            <span className="text-sm font-medium text-zinc-400 tracking-wide">
              Books
            </span>
          </div>
          
          <BlurRevealHeading
            text="Published Works"
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] max-w-[700px]"
          />

          <div className="text-balance text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
            <TextMaskReveal text="Explore Jennis's published books and upcoming releases. In-depth literature designed to offer new perspectives, personal insights, and practical guidance." />
          </div>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Column 1: Finding Your Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedBook(books[0])}
            className="flex flex-col gap-6 group cursor-pointer"
          >
            {/* Book Cover Image (Top) */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-zinc-800 bg-zinc-950/60 rounded-xl">
              <img
                src={books[0].coverImage}
                alt={books[0].title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-400 bg-zinc-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/30">
                  R {books[0].priceZar.toFixed(2)} ZAR
                </span>
                <span className="text-xs font-semibold text-zinc-900 bg-amber-400 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                  <ShoppingBagIcon className="w-3.5 h-3.5" /> Buy eBook
                </span>
              </div>
            </div>

            {/* Title - Arrow - Bottom Line (Below Image) */}
            <div className="border-b border-zinc-800 pb-5 transition-colors group-hover:border-zinc-500">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-3xl md:text-4xl font-normal text-white tracking-tight group-hover:text-amber-400 transition-colors">
                  {books[0].title}
                </h3>
                <ArrowRight className="w-6 h-6 text-zinc-400 group-hover:text-amber-400 group-hover:translate-x-1.5 transition-all shrink-0" />
              </div>
            </div>
          </motion.div>

          {/* Column 2: 2 Rows (Directions To Gaytown & Parenting) */}
          <div className="flex flex-col gap-12 lg:gap-14">
            {/* Row 1: Directions To Gaytown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => setSelectedBook(books[1])}
              className="flex flex-col gap-6 group cursor-pointer"
            >
              {/* Book Cover Image (Top) */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-zinc-800 bg-zinc-950/60 rounded-xl">
                <img
                  src={books[1].coverImage}
                  alt={books[1].title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-emerald-400 bg-zinc-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/30">
                    R {books[1].priceZar.toFixed(2)} ZAR
                  </span>
                  <span className="text-xs font-semibold text-zinc-900 bg-amber-400 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                    <ShoppingBagIcon className="w-3.5 h-3.5" /> Buy eBook
                  </span>
                </div>
              </div>

              {/* Title - Arrow - Bottom Line (Below Image) */}
              <div className="border-b border-zinc-800 pb-5 transition-colors group-hover:border-zinc-500">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl md:text-3xl font-normal text-white tracking-tight group-hover:text-amber-400 transition-colors">
                    {books[1].title}
                  </h3>
                  <ArrowRight className="w-6 h-6 text-zinc-400 group-hover:text-amber-400 group-hover:translate-x-1.5 transition-all shrink-0" />
                </div>
              </div>
            </motion.div>

            {/* Row 2: 20 Things They Don't Tell You About Parenting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setSelectedBook(books[2])}
              className="flex flex-col gap-6 group cursor-pointer"
            >
              {/* Book Cover Image (Top) */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-zinc-800 bg-zinc-950/60 rounded-xl">
                <img
                  src={books[2].coverImage}
                  alt={books[2].title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-emerald-400 bg-zinc-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/30">
                    R {books[2].priceZar.toFixed(2)} ZAR
                  </span>
                  <span className="text-xs font-semibold text-zinc-900 bg-amber-400 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                    <ShoppingBagIcon className="w-3.5 h-3.5" /> Buy eBook
                  </span>
                </div>
              </div>

              {/* Title - Arrow - Bottom Line (Below Image) */}
              <div className="border-b border-zinc-800 pb-5 transition-colors group-hover:border-zinc-500">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl md:text-3xl font-normal text-white tracking-tight group-hover:text-amber-400 transition-colors">
                    {books[2].title}
                  </h3>
                  <ArrowRight className="w-6 h-6 text-zinc-400 group-hover:text-amber-400 group-hover:translate-x-1.5 transition-all shrink-0" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

