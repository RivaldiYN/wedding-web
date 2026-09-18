"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COUPLE, WEDDING } from "@/lib/dummy-data";
import confetti from "canvas-confetti";

interface CoverGateProps {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

export default function CoverGate({ guestName, isOpen, onOpen }: CoverGateProps) {
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      openButtonRef.current?.focus();
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
        colors: ["#8B1A1A", "#C5A869", "#EBD8B0", "#FFFFFF", "#7A5E24"],
      });
    } catch { }
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-label={`Wedding Invitation for ${guestName}`}
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%", transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 text-center bg-[#FBF8F3] overflow-hidden select-none bg-wedding-paper"
        >
          {/* Top-Left Batak Gorga Motifs */}
          <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 pointer-events-none opacity-30" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#7A5E24]">
              {/* Gorga Simeol-meol Spiral & Diamond Motifs */}
              <path d="M10 10C50 30 70 80 40 120C20 90 20 40 10 10Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M40 30C90 40 120 90 90 140C60 110 50 60 40 30Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 60C60 90 80 150 50 180C20 140 30 90 10 60Z" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="50,20 65,35 50,50 35,35" stroke="currentColor" strokeWidth="1" fill="#8B1A1A" fillOpacity="0.25" />
              <polygon points="85,60 100,75 85,90 70,75" stroke="currentColor" strokeWidth="1" fill="#8B1A1A" fillOpacity="0.25" />
              <circle cx="85" cy="50" r="3" fill="currentColor" opacity="0.6" />
              <circle cx="45" cy="110" r="2.5" fill="currentColor" opacity="0.6" />
            </svg>
          </div>

          {/* Bottom-Right Batak Gorga Motifs */}
          <div className="absolute bottom-0 right-0 w-56 sm:w-80 h-56 sm:h-80 pointer-events-none opacity-30 rotate-180" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#7A5E24]">
              <path d="M10 10C50 30 70 80 40 120C20 90 20 40 10 10Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M40 30C90 40 120 90 90 140C60 110 50 60 40 30Z" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="50,20 65,35 50,50 35,35" stroke="currentColor" strokeWidth="1" fill="#8B1A1A" fillOpacity="0.25" />
            </svg>
          </div>

          {/* Center Background Batak Ulos Weave Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 -z-10" aria-hidden="true">
            <svg width="450" height="450" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#8B1A1A]">
              <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <polygon points="100,20 180,100 100,180 20,100" stroke="#7A5E24" strokeWidth="1" />
              <polygon points="100,40 160,100 100,160 40,100" stroke="currentColor" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Top Pre-title with Batak Greeting */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="pt-8 sm:pt-14 relative z-10 space-y-1"
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#8B1A1A]/10 border border-[#8B1A1A]/30 text-[#8B1E2A] text-xs font-sans uppercase tracking-[0.3em] font-bold">
              Horas &bull; The Holy Matrimony
            </span>
            <p className="font-serif text-sm sm:text-base tracking-[0.2em] text-[#594E3F] uppercase font-medium pt-1">
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
            <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#7A5E24] font-normal leading-tight tracking-wide drop-shadow-sm py-2">
              {COUPLE.groomName.split(" ")[0]} &amp; {COUPLE.brideName.split(" ")[0]}
            </h1>

            {/* Wedding Date & Clans */}
            <div className="space-y-2">
              <p className="font-serif text-[#2C251E] text-base sm:text-lg tracking-[0.15em] font-normal">
                {WEDDING.displayDate}
              </p>
              <p className="font-sans text-[11px] sm:text-xs text-[#594E3F] tracking-[0.25em] uppercase font-bold">
                Manullang &bull; Simanjuntak &bull; #withCOB
              </p>
            </div>

            {/* Guest Personalization Box with Ulos Accent */}
            <div className="mt-6 p-5 sm:p-6 rounded-2xl glass-wedding-card max-w-sm mx-auto space-y-1.5 border border-[#7A5E24]/30 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B1A1A] via-[#D4AF37] to-[#8B1A1A]" aria-hidden="true" />
              <p className="font-sans text-[11px] text-[#594E3F] uppercase tracking-[0.25em] font-semibold">
                Dear Honorable Guest:
              </p>
              <h2 className="font-serif text-xl sm:text-2xl text-[#2C251E] font-medium capitalize">
                {guestName}
              </h2>
              <p className="font-sans text-xs text-[#594E3F] italic font-normal pt-1">
                You are warmly invited to celebrate our joyful union.
              </p>
            </div>
          </motion.div>

          {/* Bottom Action & Hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pb-8 sm:pb-12 relative z-10 flex flex-col items-center gap-3"
          >
            <button
              ref={openButtonRef}
              onClick={handleOpen}
              className="btn-wedding-gold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-sans flex items-center gap-3 cursor-pointer shadow-xl focus-visible:ring-2 focus-visible:ring-[#7A5E24] focus-visible:ring-offset-2"
              aria-label={`Open Wedding Invitation for ${guestName}`}
            >
              <span aria-hidden="true">💌</span>
              <span>Open Invitation</span>
              <span aria-hidden="true" className="text-xs">→</span>
            </button>

            {/* Animated Hint */}
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-0.5 text-[#7A5E24] text-xs mt-1"
              aria-hidden="true"
            >
              <span>∨</span>
            </motion.div>
          </motion.div>

          {/* Bottom Brand Bar */}
          <div className="absolute bottom-0 left-0 right-0 py-2 bg-[#EFE8DD]/90 border-t border-[#7A5E24]/20 text-center text-[10px] sm:text-[11px] text-[#594E3F] font-serif font-medium">
            Pesta Unjuk &bull; The Wedding Celebration of Manullang &amp; Simanjuntak
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
