"use client";

import { motion } from "framer-motion";
import { MengToSketchbookLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export default function SketchbookJourney() {
  return (
    <section
      id="sketchbook"
      className="relative py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FAF5EE]/90 via-[#F7EFE4]/95 to-[#EFE4D6]/90 border-t border-b border-[#C5A869]/25"
    >
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#C5A869]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center mb-10 relative z-10">
        <motion.p
          className="font-sans text-[#9E7B35] text-xs uppercase tracking-[0.35em] mb-2 font-semibold"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Tactile Keepsake Album
        </motion.p>
        <motion.h2
          className="font-serif text-[#2C251E] text-3xl sm:text-4xl md:text-5xl font-light"
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
        <motion.p
          className="font-sans text-[#8E8272] text-xs sm:text-sm mt-4 max-w-lg mx-auto italic font-light"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Turn the curled pages, drag the interactive magnifying glass 🔍, and explore our memories.
        </motion.p>
      </div>

      {/* Interactive Sketchbook Frame Container */}
      <motion.div
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C5A869]/40 bg-[#2b2721] h-[720px] sm:h-[800px] relative z-10"
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7 }}
      >
        <div className="shader-frame w-full h-full">
          <MengToSketchbookLandingPage
            headingFont="instrument-serif"
            bodyFont="newsreader"
            headingWeight="400"
            bodyWeight="400"
            primaryColor="#2b2721"
            headingSize={30}
            bodySize={20}
            headingLetterSpacing={0.01}
          />
        </div>
      </motion.div>
    </section>
  );
}
