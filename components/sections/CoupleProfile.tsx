"use client";

import { motion } from "framer-motion";
import { COUPLE } from "@/lib/dummy-data";

export default function CoupleProfile() {
  return (
    <section
      id="couple-profile"
      className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-[#F5ECE1]/90 via-[#F1E7DA]/95 to-[#FAF5EE]/90 border-t border-b border-[#C5A869]/25"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-24 right-10 w-80 h-80 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-80 h-80 bg-[#E8C5B8]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Background Floral Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-20">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#9E7B35]">
          <path d="M10 10C60 40 90 90 50 140C20 100 20 50 10 10Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M40 30C100 50 130 110 90 160C50 120 40 70 40 30Z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-[#C5A869]/15 border border-[#C5A869]/40 text-[#9E7B35] mb-3 text-lg"
        >
          💍
        </motion.div>

        <motion.p
          className="font-sans text-[#9E7B35] text-xs uppercase tracking-[0.35em] mb-2 font-semibold"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          The Happy Couple
        </motion.p>
        <motion.h2
          className="font-serif text-[#2C251E] text-3xl sm:text-4xl md:text-5xl font-light tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The Bride &amp; Groom
        </motion.h2>
        <motion.div
          className="h-px w-20 bg-[#C5A869]/40 mx-auto mt-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />
        <motion.p
          className="font-sans text-[#61574B] text-xs sm:text-sm max-w-lg mx-auto mt-6 leading-relaxed italic font-light"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          &ldquo;So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.&rdquo;
          <span className="block text-[#9E7B35] text-xs not-italic font-medium mt-1.5 tracking-wider">— Matthew 19:6</span>
        </motion.p>
      </div>

      {/* Profiles Grid with Stagger & Bidirectional Re-animation */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 relative z-10">
        {/* Groom Card */}
        <motion.div
          className="glass-wedding-card rounded-3xl p-8 sm:p-10 text-center relative space-y-4 shadow-xl"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
        >
          {/* Arch Portrait with Gold Double Ring */}
          <div className="relative w-40 h-52 mx-auto">
            <div className="absolute inset-0 rounded-t-full rounded-b-2xl border-2 border-[#C5A869]/30 transform -rotate-1" />
            <div className="w-full h-full rounded-t-full rounded-b-2xl border-2 border-[#C5A869]/60 p-1.5 overflow-hidden shadow-xl bg-white relative z-10">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600"
                alt={COUPLE.groomName}
                className="w-full h-full object-cover rounded-t-full rounded-b-xl hover:scale-108 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="space-y-1 pt-3">
            <h3 className="font-serif text-[#2C251E] text-2xl sm:text-3xl font-normal">
              {COUPLE.groomName}
            </h3>
            <p className="font-sans text-[#9E7B35] text-[11px] uppercase tracking-[0.25em] font-semibold">
              The Groom
            </p>
          </div>

          <div className="h-px w-14 bg-[#C5A869]/35 mx-auto" />

          <div className="space-y-1 text-xs">
            <p className="font-sans text-[#8E8272] uppercase tracking-wider text-[10px]">Beloved Son of</p>
            <p className="font-sans text-[#2C251E] font-medium text-sm">
              Mr. {COUPLE.groomFather} &amp; Mrs. {COUPLE.groomMother}
            </p>
          </div>
        </motion.div>

        {/* Bride Card */}
        <motion.div
          className="glass-wedding-card rounded-3xl p-8 sm:p-10 text-center relative space-y-4 shadow-xl"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
        >
          {/* Arch Portrait with Gold Double Ring */}
          <div className="relative w-40 h-52 mx-auto">
            <div className="absolute inset-0 rounded-t-full rounded-b-2xl border-2 border-[#C5A869]/30 transform rotate-1" />
            <div className="w-full h-full rounded-t-full rounded-b-2xl border-2 border-[#C5A869]/60 p-1.5 overflow-hidden shadow-xl bg-white relative z-10">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600"
                alt={COUPLE.brideName}
                className="w-full h-full object-cover rounded-t-full rounded-b-xl hover:scale-108 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="space-y-1 pt-3">
            <h3 className="font-serif text-[#2C251E] text-2xl sm:text-3xl font-normal">
              {COUPLE.brideName}
            </h3>
            <p className="font-sans text-[#9E7B35] text-[11px] uppercase tracking-[0.25em] font-semibold">
              The Bride
            </p>
          </div>

          <div className="h-px w-14 bg-[#C5A869]/35 mx-auto" />

          <div className="space-y-1 text-xs">
            <p className="font-sans text-[#8E8272] uppercase tracking-wider text-[10px]">Beloved Daughter of</p>
            <p className="font-sans text-[#2C251E] font-medium text-sm">
              Mr. {COUPLE.brideFather} &amp; Mrs. {COUPLE.brideMother}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
