"use client";

import { motion } from "framer-motion";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { COUPLE, WEDDING } from "@/lib/dummy-data";

interface HeroProps {
  guestName: string;
}

export default function Hero({ guestName }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden px-4 py-24 text-center bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF5EE]/80 to-[#F5ECE1]/90"
    >
      {/* Decorative Botanical Leaf Accents & Golden Sunburst Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-8 right-8 w-44 h-44 pointer-events-none opacity-25">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#9E7B35]">
          <path d="M10 10C50 30 70 80 40 120C20 90 20 40 10 10Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M40 30C90 40 120 90 90 140C60 110 50 60 40 30Z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto gap-6">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-10 bg-[#C5A869]/40" />
          <span className="font-serif text-[#61574B] text-xs sm:text-sm uppercase tracking-[0.3em] font-light">
            The Wedding Celebration of
          </span>
          <div className="h-px w-10 bg-[#C5A869]/40" />
        </motion.div>

        {/* Personalized Guest Badge */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="px-6 py-2 rounded-full glass-wedding-card border border-[#C5A869]/30"
          >
            <p className="font-sans text-[#61574B] text-xs tracking-wider">
              Cordially Invited: <span className="text-[#2C251E] font-semibold">{guestName}</span>
            </p>
          </motion.div>
        )}

        {/* Couple Names (Calligraphic Script) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-1"
        >
          <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#9E7B35] font-normal leading-tight drop-shadow-sm py-2">
            {COUPLE.groomName.split(" ")[0]} &amp; {COUPLE.brideName.split(" ")[0]}
          </h1>
          <p className="font-sans text-[#8E8272] text-xs tracking-[0.25em] uppercase font-medium">
            {WEDDING.hashtag}
          </p>
        </motion.div>

        {/* Wedding Date */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="font-serif text-[#2C251E] text-base sm:text-lg tracking-[0.15em] font-normal">
            {WEDDING.displayDate}
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C5A869]/60 to-transparent mt-1" />
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-3 mt-3"
        >
          <p className="font-sans text-[#8E8272] text-[11px] uppercase tracking-[0.25em] font-medium">
            Counting Down to Forever
          </p>
          <CountdownTimer targetDate={WEDDING.date} />
        </motion.div>

        {/* Scroll CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-1 mt-6"
        >
          <a
            href="#couple-profile"
            className="font-sans text-[#8E8272] hover:text-[#9E7B35] text-xs tracking-widest uppercase transition-colors"
          >
            Scroll Down
          </a>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#9E7B35] text-xs"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
