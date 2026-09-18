"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { copyToClipboard } from "@/lib/utils";
import { GIFT_REGISTRY, COUPLE } from "@/shared";

export default function GiftRegistry() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState(false);
  const qrisCloseRef = useRef<HTMLButtonElement>(null);

  const handleCopy = async (text: string, id: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showQrisModal && e.key === "Escape") {
        setShowQrisModal(false);
      }
    };

    if (showQrisModal) {
      document.body.style.overflow = "hidden";
      qrisCloseRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showQrisModal]);

  return (
    <section
      id="gift-registry"
      aria-label="Digital Wedding Gift and Registry"
      className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-[#EFE3D3]/90 via-[#EAE0D0]/95 to-[#FBF8F3]/90 border-t border-[#7A5E24]/25"
    >
      {/* Decorative Glow */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#7A5E24]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            className="font-sans text-[#7A5E24] text-xs uppercase tracking-[0.3em] mb-2 font-bold"
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Wedding Gift &amp; Blessings
          </motion.p>
          <motion.h2
            className="font-serif text-[#2C251E] text-3xl sm:text-4xl md:text-5xl font-light"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Digital Wedding Gift
          </motion.h2>
          <motion.div
            className="h-px w-20 bg-[#7A5E24]/40 mx-auto mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            className="font-sans text-[#594E3F] text-xs sm:text-sm mt-5 max-w-md mx-auto leading-relaxed font-normal"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            Your presence and heartfelt prayers are the greatest gift of all. Should you wish to honor us with a wedding gift, you may do so via:
          </motion.p>
        </div>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {GIFT_REGISTRY.map((item, idx) => (
            <motion.article
              key={item.id}
              aria-label={`Bank account for ${item.bank}`}
              className="glass-wedding-card rounded-3xl p-6 relative overflow-hidden space-y-4 shadow-md"
              initial={{ opacity: 0, x: idx === 0 ? -16 : 16, y: 16 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#634A16] bg-[#7A5E24]/15 px-3 py-1 rounded-full border border-[#7A5E24]/30">
                  {item.bank}
                </span>
                <span className="text-xl" aria-hidden="true">💳</span>
              </div>

              <div>
                <p className="font-sans text-[#594E3F] text-xs uppercase tracking-wider mb-1 font-semibold">
                  Bank Account Number
                </p>
                <p className="font-serif text-[#2C251E] text-2xl font-normal tracking-wider">
                  {item.accountNumber}
                </p>
                <p className="font-sans text-[#594E3F] text-xs mt-1">
                  a.n. <strong className="font-semibold text-[#2C251E]">{item.accountName}</strong>
                </p>
              </div>

              <button
                onClick={() => handleCopy(item.accountNumber, item.id)}
                className={`w-full py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24] focus-visible:ring-offset-2 ${
                  copiedId === item.id
                    ? "bg-emerald-700 text-white shadow-md"
                    : "btn-wedding-gold"
                }`}
                aria-label={`Copy account number for ${item.bank}`}
              >
                {copiedId === item.id ? (
                  <>
                    <span aria-hidden="true">✅</span>
                    <span>Account Number Copied!</span>
                  </>
                ) : (
                  <>
                    <span aria-hidden="true">📋</span>
                    <span>Copy Account Number</span>
                  </>
                )}
              </button>
            </motion.article>
          ))}
        </div>

        {/* QRIS Card */}
        <motion.div
          className="glass-wedding-card rounded-3xl p-7 text-center space-y-4 max-w-sm mx-auto shadow-md"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7A5E24]/15 border border-[#7A5E24]/30">
            <span className="text-xs" aria-hidden="true">📱</span>
            <span className="font-sans text-xs uppercase tracking-widest text-[#634A16] font-bold">
              QRIS Instant Payment
            </span>
          </div>

          <p className="text-xs text-[#594E3F] font-sans font-medium">
            Supports all Indonesian mobile banking &amp; e-wallets
          </p>

          <button
            type="button"
            onClick={() => setShowQrisModal(true)}
            className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl border border-[#7A5E24]/40 shadow-md cursor-pointer hover:scale-105 transition-transform flex flex-col items-center justify-center group focus-visible:ring-2 focus-visible:ring-[#7A5E24]"
            aria-label="Click to enlarge official QRIS code"
          >
            <div className="w-full h-full bg-[#FAF7F2] rounded-xl flex flex-col items-center justify-center text-[#2C251E] p-2 text-center border border-[#7A5E24]/20">
              <span className="text-3xl mb-1 group-hover:scale-110 transition-transform" aria-hidden="true">📲</span>
              <span className="font-sans text-xs text-[#7A5E24] font-bold">OFFICIAL QRIS</span>
              <span className="text-[10px] text-[#594E3F] mt-0.5 font-medium">Click to Enlarge</span>
            </div>
          </button>
        </motion.div>
      </div>

      {/* QRIS Zoom Modal */}
      <AnimatePresence>
        {showQrisModal && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Official QRIS Payment Code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1A1612]/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowQrisModal(false)}
          >
            <div
              className="bg-white rounded-3xl p-7 max-w-xs w-full text-center space-y-4 relative shadow-2xl border border-[#7A5E24]/40"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={qrisCloseRef}
                onClick={() => setShowQrisModal(false)}
                className="absolute top-4 right-4 text-[#594E3F] hover:text-[#2C251E] text-lg w-8 h-8 rounded-full flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#7A5E24]"
                aria-label="Close QRIS modal"
              >
                ✕
              </button>
              <h3 className="font-serif text-[#2C251E] text-xl font-normal">Scan QRIS</h3>
              <div className="w-52 h-52 mx-auto bg-[#FAF7F2] p-3 rounded-2xl flex items-center justify-center border border-[#7A5E24]/25">
                <div className="w-full h-full bg-white rounded-xl flex flex-col items-center justify-center text-[#7A5E24] shadow-inner">
                  <span className="text-4xl mb-1" aria-hidden="true">📷</span>
                  <span className="text-xs font-bold text-[#2C251E]">{COUPLE.displayName} Wedding</span>
                </div>
              </div>
              <p className="font-sans text-xs text-[#594E3F] font-medium">
                Scan using any banking or e-wallet application
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
