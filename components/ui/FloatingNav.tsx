"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingNavProps {
  isVisible: boolean;
}

export default function FloatingNav({ isVisible }: Readonly<FloatingNavProps>) {
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", label: "Cover", icon: "✨" },
    { id: "couple-profile", label: "Couple", icon: "👰" },
    { id: "event-details", label: "Events", icon: "📅" },
    { id: "love-story", label: "Story", icon: "❤️" },
    { id: "sketchbook", label: "Sketchbook", icon: "📖" },
    { id: "gallery", label: "Gallery", icon: "📸" },
    { id: "rsvp", label: "RSVP", icon: "✉️" },
    { id: "wishes", label: "Wishes", icon: "💬" },
    { id: "gift-registry", label: "Gift", icon: "🎁" },
  ];

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 300;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] px-2 sm:px-3 py-1.5 rounded-full glass-wedding-card shadow-xl border border-[#C5A869]/35 flex items-center gap-1 sm:gap-1.5"
          aria-label="Quick Wedding Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-sans transition-all flex items-center gap-1 cursor-pointer ${
                  isActive
                    ? "bg-champagne-gold text-white font-semibold shadow-sm"
                    : "text-[#61574B] hover:text-[#2C251E] hover:bg-[#C5A869]/15"
                }`}
                aria-label={`Jump to ${item.label}`}
              >
                <span>{item.icon}</span>
                <span className="hidden md:inline text-[11px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
