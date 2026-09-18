"use client";

import { motion } from "framer-motion";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { COUPLE, WEDDING } from "@/lib/dummy-data";

interface HeroProps {
  guestName: string;
}

export default function Hero({ guestName }: Readonly<HeroProps>) {
  return (
    <section
      id="hero"
      aria-label="Wedding Introduction"
      className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden px-4 py-24 text-center bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF5EE]/80 to-[#F5ECE1]/90"
    >
      {/* Decorative Botanical & Batak Gorga Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#7A5E24]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-8 right-8 w-44 h-44 pointer-events-none opacity-25" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#7A5E24]">
          <path d="M10 10C50 30 70 80 40 120C20 90 20 40 10 10Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M40 30C90 40 120 90 90 140C60 110 50 60 40 30Z" stroke="currentColor" strokeWidth="1.2" />
          <polygon points="50,20 65,35 50,50 35,35" stroke="currentColor" strokeWidth="1" fill="#8B1A1A" fillOpacity="0.2" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto gap-6">
        {/* Batak Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B1A1A]/10 border border-[#8B1A1A]/30 text-[#8B1E2A] text-xs font-sans uppercase tracking-[0.25em] font-bold"
        >
          <span aria-hidden="true">✦</span>
          <span>Horas Ma Di Hita Saluhutna</span>
          <span aria-hidden="true">✦</span>
        </motion.div>

        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-10 bg-[#7A5E24]/40" />
          <span className="font-serif text-[#594E3F] text-xs sm:text-sm uppercase tracking-[0.3em] font-medium">
            The Wedding Celebration of
          </span>
          <div className="h-px w-10 bg-[#7A5E24]/40" />
        </motion.div>

        {/* Personalized Guest Badge */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="px-6 py-2 rounded-full glass-wedding-card border border-[#7A5E24]/30 shadow-sm"
          >
            <p className="font-sans text-[#594E3F] text-xs tracking-wider font-normal">
              Cordially Invited: <span className="text-[#2C251E] font-bold">{guestName}</span>
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
          <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#7A5E24] font-normal leading-tight drop-shadow-sm py-2">
            {COUPLE.groomName.split(" ")[0]} &amp; {COUPLE.brideName.split(" ")[0]}
          </h1>
          <p className="font-sans text-[#594E3F] text-xs tracking-[0.25em] uppercase font-bold">
            Manullang &bull; Simanjuntak &bull; {WEDDING.hashtag}
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
          <p className="font-serif text-[#2C251E] text-base sm:text-lg tracking-[0.15em] font-medium">
            {WEDDING.displayDate}
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#7A5E24]/60 to-transparent mt-1" />
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-3 mt-3"
        >
          <p className="font-sans text-[#594E3F] text-xs uppercase tracking-[0.25em] font-bold">
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
            className="font-sans text-[#594E3F] hover:text-[#7A5E24] text-xs tracking-widest uppercase font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#7A5E24] rounded-full px-4 py-1"
            aria-label="Scroll to couple profile"
          >
            Scroll Down
          </a>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#7A5E24] text-xs font-bold"
            aria-hidden="true"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
