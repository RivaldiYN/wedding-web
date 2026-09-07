"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SketchPage {
  id: number;
  title: string;
  location: string;
  date: string;
  caption: string;
  image: string;
  watercolorNote: string;
}

const SKETCH_PAGES: SketchPage[] = [
  {
    id: 1,
    title: "Where It All Began",
    location: "Menteng Heritage Café, Jakarta",
    date: "OCT 14 2021",
    caption: "A rainy Thursday afternoon, two warm cups of coffee, and a conversation that effortlessly lasted until the café closed.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200",
    watercolorNote: "First date & laughter",
  },
  {
    id: 2,
    title: "Strolls Under Golden Sun",
    location: "Botanic Gardens",
    date: "JUN 20 2023",
    caption: "Walking hand in hand through the lush botanical paths, sharing our dreams for the future under the blooming rain trees.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200",
    watercolorNote: "Sunlight & promises",
  },
  {
    id: 3,
    title: "The Sunset Proposal",
    location: "Bayside Promenade",
    date: "NOV 12 2024",
    caption: "With the city skyline glittering in the distance and the water reflecting the twilight, he asked the question that changed our lives forever.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    watercolorNote: "She said YES! 💍",
  },
  {
    id: 4,
    title: "Heritage Blessing & Family",
    location: "Lake Toba Highlands",
    date: "JAN 18 2025",
    caption: "Surrounded by our families, receiving traditional blessings and prayers for a holy union rooted in enduring love.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200",
    watercolorNote: "Ulos woven with love",
  },
  {
    id: 5,
    title: "Counting Down to Forever",
    location: "Holy Matrimony & Reception",
    date: "MAY 02 2026",
    caption: "Beginning our lifetime of adventures together as one, blessed in the presence of our beloved family and dearest friends.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200",
    watercolorNote: "Jacob & Ghina",
  },
];

export default function WeddingSketchbook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [lensPos, setLensPos] = useState({ x: 420, y: 280 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);

  const page = SKETCH_PAGES[currentPage];

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!bookRef.current) return;
    const rect = bookRef.current.getBoundingClientRect();
    const x = Math.max(30, Math.min(rect.width - 30, e.clientX - rect.left));
    const y = Math.max(30, Math.min(rect.height - 30, e.clientY - rect.top));
    setLensPos({ x, y });
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % SKETCH_PAGES.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + SKETCH_PAGES.length) % SKETCH_PAGES.length);
  };

  return (
    <section id="sketchbook" className="relative py-28 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FAF5EE]/90 via-[#F7EFE4]/95 to-[#EFE4D6]/90 border-t border-b border-[#C5A869]/25">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#C5A869]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
        <motion.p
          className="font-sans text-[#9E7B35] text-xs uppercase tracking-[0.35em] mb-2 font-semibold"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Tactile Illustrated Album
        </motion.p>
        <motion.h2
          className="font-serif text-[#2C251E] text-3xl sm:text-4xl md:text-5xl font-light tracking-wide"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Our Illustrated Sketchbook
        </motion.h2>
        <motion.div
          className="h-px w-20 bg-[#C5A869]/40 mx-auto mt-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />
        <p className="font-sans text-[#8E8272] text-xs sm:text-sm mt-3 max-w-md mx-auto italic font-light">
          Move your cursor or drag the magnifying glass 🔍 to inspect our watercolor memories.
        </p>
      </div>

      {/* Realistic Open Sketchbook Spread Container */}
      <div className="max-w-5xl mx-auto relative z-10 select-none">
        <div
          ref={bookRef}
          onPointerMove={handlePointerMove}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => {
            setIsHovered(false);
            setIsDragging(false);
          }}
          className="relative w-full aspect-[16/10] min-h-[420px] max-h-[640px] rounded-3xl p-3 sm:p-6 bg-[#E8DFD3] shadow-2xl border-4 border-[#D4C5B0] overflow-hidden flex cursor-crosshair"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, #FAF6F0 0%, #E9DECFA0 100%)",
            boxShadow: "0 25px 60px -15px rgba(60, 45, 30, 0.25), inset 0 2px 6px rgba(255,255,255,0.6)",
          }}
        >
          {/* Central Book Spine Shadow / Crease */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/15 via-black/25 to-black/15 z-20 pointer-events-none blur-[1px]" />
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-black/30 z-20 pointer-events-none" />

          {/* Left Page (Story, Watercolor Notes, Date & Signature Seal) */}
          <div className="w-1/2 h-full bg-[#FAF7F2] rounded-l-2xl p-6 sm:p-10 flex flex-col justify-between relative shadow-inner border-r border-[#E0D5C1]/60 overflow-hidden">
            {/* Botanical Floral Corner Watermark */}
            <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-20">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#9E7B35]">
                <path d="M10 10 C30 30 50 10 70 30 C50 50 30 70 10 10 Z" stroke="currentColor" strokeWidth="1" />
                <path d="M5 25 C25 45 45 25 65 45" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentPage}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className="space-y-4 my-auto relative z-10"
              >
                <div className="space-y-1">
                  <span className="font-sans text-[10px] sm:text-xs text-[#9E7B35] uppercase tracking-[0.25em] font-bold">
                    Plate {page.id} of {SKETCH_PAGES.length}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2C251E] font-normal leading-tight">
                    {page.title}
                  </h3>
                  <p className="font-sans text-[11px] text-[#8E8272] tracking-wider uppercase font-medium">
                    📍 {page.location}
                  </p>
                </div>

                <div className="h-px w-16 bg-[#C5A869]/40" />

                <p className="font-serif text-sm sm:text-base text-[#61574B] leading-relaxed italic font-light">
                  &ldquo;{page.caption}&rdquo;
                </p>

                <div className="pt-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#C5A869]/15 border border-[#C5A869]/30 text-[#7A5E24] text-[10px] font-sans font-semibold uppercase tracking-widest">
                    ✨ {page.watercolorNote}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Left Date Stamp & Artist Seal */}
            <div className="flex items-center justify-between pt-4 border-t border-[#C5A869]/20 relative z-10 text-[10px] sm:text-xs text-[#8E8272] font-sans">
              <span className="tracking-widest uppercase font-medium">{page.date}</span>
              <div className="flex items-center gap-1 text-[#9E7B35] font-serif font-bold">
                <span className="w-4 h-4 rounded border border-rose-700 bg-rose-50 text-rose-700 flex items-center justify-center text-[8px]">
                  印
                </span>
                <span>J &amp; G</span>
              </div>
            </div>
          </div>

          {/* Right Page (Watercolor Art / Sketch Plate) */}
          <div className="w-1/2 h-full bg-[#FAF7F2] rounded-r-2xl p-4 sm:p-8 flex items-center justify-center relative shadow-inner overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${currentPage}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative rounded-xl overflow-hidden shadow-md border-2 border-[#E5DAC8] bg-[#F3ECE0]"
              >
                <Image
                  src={page.image}
                  alt={page.title}
                  fill
                  unoptimized
                  className="object-cover sepia-[0.2] contrast-[1.05] brightness-[0.98]"
                  sizes="(max-width: 768px) 50vw, 40vw"
                />
                {/* Watercolor Edge Vignette Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40"
                  style={{
                    background: "radial-gradient(circle, transparent 60%, #8A6E4B 100%)",
                  }}
                />
                {/* Watercolor Texture Film */}
                <div className="absolute inset-0 bg-[#FFFDF9]/10 pointer-events-none backdrop-contrast-125" />

                {/* Right Bottom Date Stamp on Image */}
                <div className="absolute bottom-3 right-3 bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded border border-[#C5A869]/40 text-[9px] font-sans uppercase tracking-widest text-[#61574B] font-semibold">
                  {page.date}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Draggable & Floating Magnifying Glass Lens (Kaca Pembesar Emas) */}
          <div
            className="absolute z-30 pointer-events-none transition-transform duration-75 ease-out"
            style={{
              left: `${lensPos.x}px`,
              top: `${lensPos.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Magnifying Glass Lens Body */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-[#C5A869] shadow-[0_15px_35px_rgba(0,0,0,0.35)] overflow-hidden bg-white/40 backdrop-blur-[0.5px]">
              {/* Gold Lens Metal Highlight Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-200/70 pointer-events-none z-20" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-white/40 pointer-events-none z-20" />

              {/* Magnified Image Projection */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  backgroundImage: `url(${page.image})`,
                  backgroundSize: "600% 600%",
                  backgroundPosition: `${(lensPos.x / (bookRef.current?.clientWidth || 800)) * 100}% ${(lensPos.y / (bookRef.current?.clientHeight || 500)) * 100}%`,
                  transform: "scale(1.4)",
                  transformOrigin: "center center",
                }}
              />
            </div>

            {/* Brass / Wooden Magnifier Handle */}
            <div
              className="absolute -bottom-10 -right-10 w-14 h-4 bg-gradient-to-r from-[#9E7B35] via-[#C5A869] to-[#61491B] rounded-full shadow-lg transform rotate-45 pointer-events-none"
              style={{ transformOrigin: "top left" }}
            />
          </div>

          {/* Left / Right Page Turning Controls */}
          <button
            onClick={prevPage}
            aria-label="Previous sketch plate"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/90 border border-[#C5A869]/50 text-[#7A5E24] shadow-lg flex items-center justify-center hover:scale-110 hover:bg-[#9E7B35] hover:text-white transition-all cursor-pointer"
          >
            ❮
          </button>
          <button
            onClick={nextPage}
            aria-label="Next sketch plate"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/90 border border-[#C5A869]/50 text-[#7A5E24] shadow-lg flex items-center justify-center hover:scale-110 hover:bg-[#9E7B35] hover:text-white transition-all cursor-pointer"
          >
            ❯
          </button>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {SKETCH_PAGES.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentPage(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === idx
                  ? "w-8 bg-champagne-gold shadow-md shadow-[#9E7B35]/30"
                  : "w-2 bg-[#C5A869]/40 hover:bg-[#9E7B35]"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
