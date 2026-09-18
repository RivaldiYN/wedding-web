"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_IMAGES } from "@/shared";

export default function BentoGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "prewedding", label: "Pre-wedding" },
    { id: "outdoor", label: "Outdoor" },
    { id: "adat", label: "Heritage" },
  ];

  const filteredImages =
    activeCategory === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const gridClasses: Record<string, string> = {
    large: "col-span-2 row-span-2",
    tall: "col-span-1 row-span-2",
    wide: "col-span-2 row-span-1",
    small: "col-span-1 row-span-1",
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % filteredImages.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + filteredImages.length) % filteredImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowRight") setSelectedIdx((selectedIdx + 1) % filteredImages.length);
      if (e.key === "ArrowLeft")
        setSelectedIdx((selectedIdx - 1 + filteredImages.length) % filteredImages.length);
    };

    if (selectedIdx !== null) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedIdx, filteredImages.length]);

  return (
    <section
      id="gallery"
      aria-label="Pre-wedding Photo Gallery"
      className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-[#F9F5EE]/90 via-[#FCFAF6]/95 to-[#F4ECE0]/90"
    >
      {/* Soft Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#7A5E24]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <motion.p
          className="font-sans text-[#7A5E24] text-xs uppercase tracking-[0.3em] mb-2 font-bold"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Cherished Moments
        </motion.p>
        <motion.h2
          className="font-serif text-[#2C251E] text-3xl sm:text-4xl md:text-5xl font-light"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          Pre-wedding Photo Gallery
        </motion.h2>
        <motion.div
          className="h-px w-20 bg-[#7A5E24]/40 mx-auto mt-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8" role="group" aria-label="Photo Categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24] ${
                activeCategory === cat.id
                  ? "bg-champagne-gold text-white font-bold shadow-md shadow-[#7A5E24]/25 scale-105"
                  : "bg-white/90 border border-[#7A5E24]/30 text-[#594E3F] hover:border-[#7A5E24] hover:text-[#2C251E] font-medium"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Harmonious Photo Grid */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
      >
        <AnimatePresence>
          {filteredImages.map((img, idx) => {
            // Highlight only the first 2 photos when in 'all' view, rest are uniform
            const isHighlighted = activeCategory === "all" ? idx < 2 : filteredImages.length <= 2;

            return (
              <motion.button
                layout
                key={img.id}
                className={`${
                  isHighlighted
                    ? "col-span-2 aspect-[4/3] sm:aspect-[16/10]"
                    : "col-span-1 aspect-square sm:aspect-[4/3]"
                } relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#7A5E24]/30 hover:border-[#7A5E24] group transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24] shadow-md text-left`}
                onClick={() => setSelectedIdx(idx)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                aria-label={`View photo ${img.alt}, click to enlarge`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={isHighlighted ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                  <span className="text-white text-xs sm:text-sm font-serif font-medium drop-shadow-sm">{img.alt}</span>
                  <span className="text-[#EBD8B0] text-[10px] uppercase tracking-widest mt-0.5 font-sans font-bold">
                    Click to Expand 🔍
                  </span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Enlarged photo: ${filteredImages[selectedIdx].alt}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1A1612]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedIdx(null)}
          >
            <button
              ref={closeBtnRef}
              onClick={() => setSelectedIdx(null)}
              className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close photo preview"
            >
              ✕
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 border border-white/40 text-white flex items-center justify-center text-2xl transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous photo in gallery"
            >
              ‹
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 border border-white/40 text-white flex items-center justify-center text-2xl transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next photo in gallery"
            >
              ›
            </button>

            <div
              className="relative max-w-4xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[70vh] rounded-2xl overflow-hidden border border-white/30 shadow-2xl">
                <Image
                  src={filteredImages[selectedIdx].src}
                  alt={filteredImages[selectedIdx].alt}
                  fill
                  unoptimized
                  className="object-contain"
                  priority
                />
              </div>

              <div className="mt-4 text-center">
                <p className="font-serif text-white text-lg font-light">
                  {filteredImages[selectedIdx].alt}
                </p>
                <p className="font-sans text-white/80 text-xs mt-1 font-medium">
                  {selectedIdx + 1} of {filteredImages.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
