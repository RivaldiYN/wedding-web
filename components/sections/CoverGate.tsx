"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COUPLE, WEDDING } from "@/shared";
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
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      openButtonRef.current?.focus();
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-between px-4 pt-4 sm:pt-6 pb-2 text-center bg-[#FBF8F3] overflow-y-auto select-none bg-wedding-paper h-[100dvh] w-screen"
        >
          {/* Top-Left Batak Gorga Motifs */}
          <div className="absolute top-0 left-0 w-36 sm:w-56 h-36 sm:h-56 pointer-events-none opacity-25" aria-hidden="true">
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
          <div className="absolute bottom-0 right-0 w-44 sm:w-64 h-44 sm:h-64 pointer-events-none opacity-25 rotate-180" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#7A5E24]">
              <path d="M10 10C50 30 70 80 40 120C20 90 20 40 10 10Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M40 30C90 40 120 90 90 140C60 110 50 60 40 30Z" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="50,20 65,35 50,50 35,35" stroke="currentColor" strokeWidth="1" fill="#8B1A1A" fillOpacity="0.25" />
            </svg>
          </div>

          {/* Center Background Batak Ulos Weave Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 -z-10" aria-hidden="true">
            <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#8B1A1A]">
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
            className="pt-2 sm:pt-4 relative z-10 space-y-1 flex-shrink-0"
          >
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#8B1A1A]/10 border border-[#8B1A1A]/30 text-[#8B1E2A] text-[11px] sm:text-xs font-sans uppercase tracking-[0.25em] font-bold">
              Horas &bull; The Holy Matrimony
            </span>
            <p className="font-serif text-xs sm:text-sm tracking-[0.2em] text-[#594E3F] uppercase font-medium">
              The Wedding of
            </p>
          </motion.div>

          {/* Center Calligraphy & Details */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="my-auto relative z-10 space-y-3 sm:space-y-4 max-w-lg mx-auto px-3 w-full"
          >
            {/* Calligraphic Couple Name */}
            <h1 className="font-script text-4xl sm:text-6xl md:text-7xl text-[#7A5E24] font-normal leading-tight tracking-wide drop-shadow-sm py-1">
              {COUPLE.groomName.split(" ")[0]} &amp; {COUPLE.brideName.split(" ")[0]}
            </h1>

            {/* Wedding Date & Clans */}
            <div className="space-y-1">
              <p className="font-serif text-[#2C251E] text-sm sm:text-base tracking-[0.15em] font-normal">
                {WEDDING.displayDate}
              </p>
              <p className="font-sans text-[10px] sm:text-[11px] text-[#594E3F] tracking-[0.2em] uppercase font-bold">
                Manullang &bull; Simanjuntak &bull; #withCOB
              </p>
            </div>

            {/* Guest Personalization Box with Ulos Accent */}
            <div className="mt-2 sm:mt-3 p-3.5 sm:p-4 rounded-xl glass-wedding-card max-w-xs sm:max-w-sm mx-auto space-y-1 border border-[#7A5E24]/30 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B1A1A] via-[#D4AF37] to-[#8B1A1A]" aria-hidden="true" />
              <p className="font-sans text-[10px] text-[#594E3F] uppercase tracking-[0.2em] font-semibold">
                Dear Honorable Guest:
              </p>
              <h2 className="font-serif text-lg sm:text-xl text-[#2C251E] font-medium capitalize truncate">
                {guestName}
              </h2>
              <p className="font-sans text-[11px] sm:text-xs text-[#594E3F] italic font-normal">
                You are warmly invited to celebrate our joyful union.
              </p>
            </div>
          </motion.div>

          {/* Bottom Action & Footer (Natural flow, cannot collide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full relative z-10 flex flex-col items-center gap-2 sm:gap-3 flex-shrink-0 pb-1"
          >
            <button
              ref={openButtonRef}
              onClick={handleOpen}
              className="btn-wedding-gold px-7 sm:px-9 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-sans flex items-center gap-2.5 cursor-pointer shadow-lg active:scale-95 transition-transform focus-visible:ring-2 focus-visible:ring-[#7A5E24] focus-visible:ring-offset-2"
              aria-label={`Open Wedding Invitation for ${guestName}`}
            >
              <span aria-hidden="true">💌</span>
              <span>Open Invitation</span>
              <span aria-hidden="true" className="text-xs">→</span>
            </button>

            {/* Bottom Brand Bar in natural document flow */}
            <div className="w-full pt-2 border-t border-[#7A5E24]/20 text-center text-[10px] sm:text-[11px] text-[#594E3F] font-serif">
              Pesta Unjuk &bull; The Wedding Celebration of Manullang &amp; Simanjuntak
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
