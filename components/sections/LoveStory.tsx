"use client";

import { motion } from "framer-motion";
import { LOVE_STORY } from "@/lib/dummy-data";

export default function LoveStory() {
  return (
    <section
      id="love-story"
      aria-label="The Journey of Jacob and Ghina"
      className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-[#EFE4D6]/90 via-[#EAE0D1]/95 to-[#F9F5EE]/90 border-t border-b border-[#7A5E24]/25"
    >
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/4 right-5 w-72 h-72 bg-[#E2B7A8]/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-5 w-72 h-72 bg-[#7A5E24]/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.p
          className="font-sans text-[#7A5E24] text-xs uppercase tracking-[0.3em] mb-2 font-bold"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Our Journey
        </motion.p>
        <motion.h2
          className="font-serif text-[#2C251E] text-3xl sm:text-4xl md:text-5xl font-light"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          How Our Story Unfolded
        </motion.h2>
        <motion.div
          className="h-px w-20 bg-[#7A5E24]/40 mx-auto mt-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />
      </div>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#7A5E24]/20 via-[#7A5E24]/60 to-[#7A5E24]/20 md:left-1/2 md:-translate-x-px" aria-hidden="true" />

        <ol className="space-y-10 list-none p-0 m-0">
          {LOVE_STORY.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.li
                key={item.year}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: isEven ? -25 : 25, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                {/* Content Card */}
                <div className={`flex-1 pl-14 md:pl-0 ${isEven ? "md:pr-10" : "md:pl-10"}`}>
                  <article className="glass-wedding-card rounded-3xl p-6 transition-all group shadow-sm hover:shadow-md">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <span className="font-sans text-[#634A16] text-xs font-bold bg-[#7A5E24]/15 px-3 py-0.5 rounded-full border border-[#7A5E24]/30">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="font-serif text-[#2C251E] text-xl font-normal mb-1.5 group-hover:text-[#7A5E24] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[#594E3F] text-xs sm:text-sm leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </article>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-3.5 top-5 md:relative md:left-auto md:top-auto md:flex-none md:flex md:items-start md:pt-5 md:w-12 md:justify-center" aria-hidden="true">
                  <div className="w-5 h-5 rounded-full bg-[#FBF8F3] border-2 border-[#7A5E24] flex items-center justify-center shadow-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7A5E24]" />
                  </div>
                </div>

                <div className="hidden md:block flex-1" aria-hidden="true" />
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
