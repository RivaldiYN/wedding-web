"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COUPLE, WEDDING } from "@/lib/dummy-data";
import confetti from "canvas-confetti";

interface CoverGateProps {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

export default function CoverGate({ guestName, isOpen, onOpen }: CoverGateProps) {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOpen = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.65 },
        colors: ["#C5A869", "#EBD8B0", "#FFFFFF", "#D48B70"],
      });
    } catch (e) { }
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%", transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 text-center bg-[#FBF8F3] overflow-hidden select-none bg-wedding-paper"
        >
          {/* Top-Left Botanical Floral Sketch */}
          <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 pointer-events-none opacity-25">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#9E7B35]">
              <path d="M10 10C50 30 70 80 40 120C20 90 20 40 10 10Z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M40 30C90 40 120 90 90 140C60 110 50 60 40 30Z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M10 60C60 90 80 150 50 180C20 140 30 90 10 60Z" stroke="currentColor" strokeWidth="1" />
              <circle cx="85" cy="50" r="3" fill="currentColor" opacity="0.4" />
              <circle cx="45" cy="110" r="2.5" fill="currentColor" opacity="0.4" />
            </svg>
          </div>

          {/* Bottom-Right Botanical Floral Sketch */}
          <div className="absolute bottom-0 right-0 w-56 sm:w-80 h-56 sm:h-80 pointer-events-none opacity-25 rotate-180">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#9E7B35]">
              <path d="M10 10C50 30 70 80 40 120C20 90 20 40 10 10Z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M40 30C90 40 120 90 90 140C60 110 50 60 40 30Z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M10 60C60 90 80 150 50 180C20 140 30 90 10 60Z" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Center Background Watermark Flowers */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 -z-10">
            <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#9E7B35]">
              <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
              <path d="M100 30 C120 60 140 80 170 100 C140 120 120 140 100 170 C80 140 60 120 30 100 C60 80 80 60 100 30 Z" stroke="currentColor" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Top Pre-title */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="pt-8 sm:pt-14 relative z-10"
          >
            <p className="font-serif text-sm sm:text-base tracking-[0.2em] text-[#61574B] uppercase font-light">
              The Wedding of
            </p>
          </motion.div>

          {/* Center Calligraphy & Details */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="my-auto relative z-10 space-y-6 max-w-xl mx-auto px-4"
          >
            {/* Calligraphic Couple Name */}
            <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#9E7B35] font-normal leading-tight tracking-wide drop-shadow-sm py-2">
              {COUPLE.groomName.split(" ")[0]} &amp; {COUPLE.brideName.split(" ")[0]}
            </h1>

            {/* Wedding Date */}
            <div className="space-y-2">
              <p className="font-serif text-[#2C251E] text-base sm:text-lg tracking-[0.15em] font-normal">
                {WEDDING.displayDate}
              </p>
              <p className="font-sans text-[11px] sm:text-xs text-[#8E8272] tracking-[0.25em] uppercase font-medium">
                #withCOB &bull; #TheWeddingCelebration
              </p>
            </div>

            {/* Guest Personalization Box */}
            <div className="mt-6 p-5 sm:p-6 rounded-2xl glass-wedding-card max-w-sm mx-auto space-y-1.5 border border-[#C5A869]/30">
              <p className="font-sans text-[10px] sm:text-[11px] text-[#8E8272] uppercase tracking-[0.25em] font-medium">
                Dear Honorable Guest:
              </p>
              <h2 className="font-serif text-xl sm:text-2xl text-[#2C251E] font-medium capitalize">
                {guestName}
              </h2>
              <p className="font-sans text-[11px] text-[#61574B] italic font-light pt-1">
                You are warmly invited to celebrate our joyful union.
              </p>
            </div>
          </motion.div>

          {/* Bottom Action & Chevron Hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pb-8 sm:pb-12 relative z-10 flex flex-col items-center gap-3"
          >
            <button
              onClick={handleOpen}
              className="btn-wedding-gold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-sans flex items-center gap-3 cursor-pointer shadow-xl"
            >
              <span>💌</span>
              <span>Open Invitation</span>
              <span className="text-xs">→</span>
            </button>

            {/* Animated Chevron Hint */}
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-0.5 text-[#9E7B35]/70 text-xs mt-1"
            >
              <span>∨</span>
              <span className="-mt-1.5">∨</span>
            </motion.div>
          </motion.div>

          {/* Bottom Brand Bar */}
          <div className="absolute bottom-0 left-0 right-0 py-2 bg-[#EFE8DD]/80 border-t border-[#C5A869]/20 text-center text-[10px] sm:text-[11px] text-[#8E8272] font-serif">
            The Wedding Celebration &bull; With Joy &amp; Gratitude
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
