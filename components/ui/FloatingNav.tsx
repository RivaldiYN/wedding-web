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
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] px-2 sm:px-3 py-1.5 rounded-full glass-wedding-card shadow-xl border border-[#7A5E24]/35 flex items-center gap-1 sm:gap-1.5"
          aria-label="Quick Wedding Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`min-h-[36px] px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-sans transition-all flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24] ${
                  isActive
                    ? "bg-champagne-gold text-white font-bold shadow-sm"
                    : "text-[#594E3F] hover:text-[#2C251E] hover:bg-[#7A5E24]/15 font-medium"
                }`}
                aria-label={`Jump to ${item.label} section`}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span className="hidden md:inline text-[11px]">{item.label}</span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
