"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { copyToClipboard } from "@/lib/utils";
import { GIFT_REGISTRY, COUPLE } from "@/lib/dummy-data";

export default function GiftRegistry() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState(false);

  const handleCopy = async (text: string, id: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section
      id="gift-registry"
      className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-[#EFE3D3]/90 via-[#EAE0D0]/95 to-[#FBF8F3]/90 border-t border-[#C5A869]/25"
    >
      {/* Decorative Glow */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#C5A869]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            className="font-sans text-[#9E7B35] text-xs uppercase tracking-[0.3em] mb-2 font-semibold"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Wedding Gift &amp; Blessings
          </motion.p>
          <motion.h2
            className="font-serif text-[#2C251E] text-3xl sm:text-4xl md:text-5xl font-light"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Digital Wedding Gift
          </motion.h2>
          <motion.div
            className="h-px w-20 bg-[#C5A869]/40 mx-auto mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          />
          <motion.p
            className="font-sans text-[#61574B] text-xs sm:text-sm mt-5 max-w-md mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your presence and heartfelt prayers are the greatest gift of all. Should you wish to honor us with a wedding gift, you may do so via:
          </motion.p>
        </div>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {GIFT_REGISTRY.map((item, idx) => (
            <motion.div
              key={item.id}
              className="glass-wedding-card rounded-3xl p-6 relative overflow-hidden space-y-4 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#7A5E24] bg-[#C5A869]/15 px-3 py-1 rounded-full border border-[#C5A869]/30">
                  {item.bank}
                </span>
                <span className="text-xl">💳</span>
              </div>

              <div>
                <p className="font-sans text-[#8E8272] text-[11px] uppercase tracking-wider mb-1">
                  Bank Account Number
                </p>
                <p className="font-serif text-[#2C251E] text-2xl font-normal tracking-wider">
                  {item.accountNumber}
                </p>
                <p className="font-sans text-[#61574B] text-xs mt-1">
                  a.n. <strong className="font-semibold text-[#2C251E]">{item.accountName}</strong>
                </p>
              </div>

              <button
                onClick={() => handleCopy(item.accountNumber, item.id)}
                className={`w-full py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  copiedId === item.id
                    ? "bg-emerald-700 text-white shadow-md"
                    : "btn-wedding-gold"
                }`}
                aria-label={`Copy account number for ${item.bank}`}
              >
                {copiedId === item.id ? (
                  <>
                    <span>✅</span>
                    <span>Account Number Copied!</span>
                  </>
                ) : (
                  <>
                    <span>📋</span>
                    <span>Copy Account Number</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* QRIS Card */}
        <motion.div
          className="glass-wedding-card rounded-3xl p-7 text-center space-y-4 max-w-sm mx-auto shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A869]/15 border border-[#C5A869]/30">
            <span className="text-xs">📱</span>
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#7A5E24] font-bold">
              QRIS Instant Payment
            </span>
          </div>

          <p className="text-xs text-[#8E8272] font-sans">
            Supports all Indonesian mobile banking &amp; e-wallets
          </p>

          <div
            onClick={() => setShowQrisModal(true)}
            className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl border border-[#C5A869]/40 shadow-md cursor-pointer hover:scale-105 transition-transform flex flex-col items-center justify-center group"
          >
            <div className="w-full h-full bg-[#FAF7F2] rounded-xl flex flex-col items-center justify-center text-[#2C251E] p-2 text-center border border-[#C5A869]/20">
              <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">📲</span>
              <span className="font-sans text-[10px] text-[#9E7B35] font-bold">OFFICIAL QRIS</span>
              <span className="text-[9px] text-[#8E8272] mt-0.5">Click to Enlarge</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* QRIS Zoom Modal */}
      <AnimatePresence>
        {showQrisModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2C251E]/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowQrisModal(false)}
          >
            <div
              className="bg-white rounded-3xl p-7 max-w-xs w-full text-center space-y-4 relative shadow-2xl border border-[#C5A869]/40"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQrisModal(false)}
                className="absolute top-4 right-4 text-[#8E8272] hover:text-[#2C251E] text-lg"
              >
                ✕
              </button>
              <h3 className="font-serif text-[#2C251E] text-xl font-normal">Scan QRIS</h3>
              <div className="w-52 h-52 mx-auto bg-[#FAF7F2] p-3 rounded-2xl flex items-center justify-center border border-[#C5A869]/25">
                <div className="w-full h-full bg-white rounded-xl flex flex-col items-center justify-center text-[#9E7B35] shadow-inner">
                  <span className="text-4xl mb-1">📷</span>
                  <span className="text-xs font-semibold text-[#2C251E]">{COUPLE.displayName} Wedding</span>
                </div>
              </div>
              <p className="font-sans text-[11px] text-[#61574B]">
                Scan using any banking or e-wallet application
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
