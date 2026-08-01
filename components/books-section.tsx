"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingBagIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { BlurRevealHeading } from "@/components/blur-reveal-heading";
import { TextMaskReveal } from "@/components/text-mask-reveal";
import { YocoCheckoutModal } from "@/components/yoco-checkout-modal";

export function BooksSection() {
  const [selectedBook, setSelectedBook] = useState<{
    id: string;
    title: string;
    priceZar: number;
    coverImage: string;
  } | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const books = [
    {
      id: "finding-your-spotlight",
      title: "Finding Your Spotlight",
      priceZar: 200.0,
      coverImage: "/images/Finding Your Spotlight Front Cover.png",
      tagline: "Essential guide to discovering executive presence and personal authority.",
    },
    {
      id: "directions-to-gaytown",
      title: "Directions To Gaytown",
      priceZar: 250.0,
      coverImage: "/images/Directions To Gaytown Cover.png",
      tagline: "A poignant journey of identity, perspective, and personal truth.",
    },
    {
      id: "20-things-parenting",
      title: "20 Things They Don't Tell You About Parenting",
      priceZar: 250.0,
      coverImage: "/images/20 Things Parenting Cover.png",
      tagline: "Unfiltered wisdom and practical insights for modern parents.",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  const currentBook = books[currentIndex];

  return (
    <section className="relative w-full min-h-screen bg-[#0F0F0F] py-16 md:py-24 flex flex-col justify-center border-b border-zinc-700/30 overflow-hidden">
      {/* Yoco Checkout Modal */}
      <YocoCheckoutModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      {/* Background vector decoration */}
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

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full z-10 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 mb-12 relative z-10"
        >
          <div className="flex items-center gap-3 px-4 py-2 border border-zinc-700 w-fit">
            <div className="w-2.5 h-2.5 bg-amber-500" />
            <span className="text-sm font-medium text-zinc-400 tracking-wide">
              Books
            </span>
          </div>

          <BlurRevealHeading
            text="Published Works"
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] max-w-[600px]"
          />
        </motion.div>

        {/* Carousel Single Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBook.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pt-2"
          >
            {/* Left Side: Pure Cover Image */}
            <div className="lg:col-span-5 flex items-end justify-center lg:justify-start group overflow-hidden">
              <img
                src={currentBook.coverImage}
                alt={currentBook.title}
                className="max-h-[520px] md:max-h-[580px] w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right Side: Square Nav Arrows at Top + Details aligned to bottom close to book cover */}
            <div className="lg:col-span-7 flex flex-col justify-start lg:justify-between h-full gap-6 lg:gap-0 lg:min-h-[520px] pb-4">
              {/* Square Navigation Arrows at the Top End of the Right Column */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Book"
                  className="w-10 h-10 border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:border-amber-400 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Book"
                  className="w-10 h-10 border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:border-amber-400 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Details Stack at Bottom */}
              <div className="flex flex-col gap-5 group max-w-xl">
                {/* Ebook Label */}
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <ShoppingBagIcon className="w-4 h-4" />
                  <span>Ebook</span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight group-hover:text-amber-400 transition-colors leading-[1.15]">
                    {currentBook.title}
                  </h3>
                </div>

                {/* Price & Bottom Line Frame */}
                <div className="border-b border-zinc-800 pb-5 pt-2 transition-colors group-hover:border-zinc-500">
                  <div className="flex items-center justify-between">
                    <div className="text-xl md:text-2xl font-medium text-zinc-200">
                      R {currentBook.priceZar.toFixed(2)}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-amber-400 group-hover:translate-x-1.5 transition-transform">
                      <span>Order eBook</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

