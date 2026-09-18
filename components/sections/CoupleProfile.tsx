"use client";

import { motion } from "framer-motion";
import { COUPLE } from "@/lib/dummy-data";

export default function CoupleProfile() {
  return (
    <section
      id="couple-profile"
      aria-label="The Bride and Groom Profile"
      className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-[#F5ECE1]/90 via-[#F1E7DA]/95 to-[#FAF5EE]/90 border-t border-b border-[#7A5E24]/25"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-24 right-10 w-80 h-80 bg-[#7A5E24]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-24 left-10 w-80 h-80 bg-[#E8C5B8]/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Background Floral Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-20" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#7A5E24]">
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
          className="inline-flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-[#7A5E24]/15 border border-[#7A5E24]/40 text-[#7A5E24] mb-3 text-lg"
          aria-hidden="true"
        >
          💍
        </motion.div>

        <motion.p
          className="font-sans text-[#7A5E24] text-xs uppercase tracking-[0.35em] mb-2 font-bold"
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
          className="h-px w-20 bg-[#7A5E24]/40 mx-auto mt-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />
        <motion.blockquote
          className="font-sans text-[#594E3F] text-xs sm:text-sm max-w-lg mx-auto mt-6 leading-relaxed italic font-normal"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          &ldquo;So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.&rdquo;
          <cite className="block text-[#7A5E24] text-xs not-italic font-semibold mt-1.5 tracking-wider">
            : Matthew 19:6
          </cite>
        </motion.blockquote>
      </div>

      {/* Profiles Grid with Stagger & Bidirectional Re-animation */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 relative z-10">
        {/* Groom Card */}
        <motion.article
          aria-label={`Profile of the groom ${COUPLE.groomName}`}
          className="glass-wedding-card rounded-3xl p-8 sm:p-10 text-center relative space-y-4 shadow-xl"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
        >
          {/* Arch Portrait with Gold Double Ring */}
          <div className="relative w-40 h-52 mx-auto">
            <div className="absolute inset-0 rounded-t-full rounded-b-2xl border-2 border-[#7A5E24]/30 transform -rotate-1" />
            <div className="w-full h-full rounded-t-full rounded-b-2xl border-2 border-[#7A5E24]/60 p-1.5 overflow-hidden shadow-xl bg-white relative z-10">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600"
                alt={`Portrait photograph of ${COUPLE.groomName}`}
                className="w-full h-full object-cover rounded-t-full rounded-b-xl hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="space-y-1 pt-3">
            <h3 className="font-serif text-[#2C251E] text-2xl sm:text-3xl font-normal">
              {COUPLE.groomName}
            </h3>
            <p className="font-sans text-[#7A5E24] text-xs uppercase tracking-[0.25em] font-bold">
              The Groom
            </p>
          </div>

          <div className="h-px w-14 bg-[#7A5E24]/35 mx-auto" />

          <div className="space-y-1 text-xs">
            <p className="font-sans text-[#594E3F] uppercase tracking-wider text-[11px] font-medium">Beloved Son of</p>
            <p className="font-sans text-[#2C251E] font-semibold text-sm">
              Mr. {COUPLE.groomFather} &amp; Mrs. {COUPLE.groomMother}
            </p>
          </div>
        </motion.article>

        {/* Bride Card */}
        <motion.article
          aria-label={`Profile of the bride ${COUPLE.brideName}`}
          className="glass-wedding-card rounded-3xl p-8 sm:p-10 text-center relative space-y-4 shadow-xl"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
        >
          {/* Arch Portrait with Gold Double Ring */}
          <div className="relative w-40 h-52 mx-auto">
            <div className="absolute inset-0 rounded-t-full rounded-b-2xl border-2 border-[#7A5E24]/30 transform rotate-1" />
            <div className="w-full h-full rounded-t-full rounded-b-2xl border-2 border-[#7A5E24]/60 p-1.5 overflow-hidden shadow-xl bg-white relative z-10">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600"
                alt={`Portrait photograph of ${COUPLE.brideName}`}
                className="w-full h-full object-cover rounded-t-full rounded-b-xl hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="space-y-1 pt-3">
            <h3 className="font-serif text-[#2C251E] text-2xl sm:text-3xl font-normal">
              {COUPLE.brideName}
            </h3>
            <p className="font-sans text-[#7A5E24] text-xs uppercase tracking-[0.25em] font-bold">
              The Bride
            </p>
          </div>

          <div className="h-px w-14 bg-[#7A5E24]/35 mx-auto" />

          <div className="space-y-1 text-xs">
            <p className="font-sans text-[#594E3F] uppercase tracking-wider text-[11px] font-medium">Beloved Daughter of</p>
            <p className="font-sans text-[#2C251E] font-semibold text-sm">
              Mr. {COUPLE.brideFather} &amp; Mrs. {COUPLE.brideMother}
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
