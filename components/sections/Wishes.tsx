"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt?: string;
}

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      }
    } catch (err) {
      console.error("Failed to load wishes:", err);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (res.ok) {
        const newWish = await res.json();
        setWishes((prev) => [newWish, ...prev]);
        setName("");
        setMessage("");
        setSent(true);
        setTimeout(() => setSent(false), 4000);
      }
    } catch (err) {
      console.error("Failed to send wish:", err);
    } finally {
      setSending(false);
    }
  };

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Limit display to 6 comments by default
  const displayedWishes = showAll ? wishes : wishes.slice(0, 6);

  return (
    <section
      id="wishes"
      className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-[#FAF5EE]/90 via-[#FDFBF7]/95 to-[#EFE3D3]/90"
    >
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header with Animate On Scroll */}
        <div className="text-center mb-12">
          <motion.p
            className="font-sans text-[#9E7B35] text-xs uppercase tracking-[0.3em] mb-2 font-semibold"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Prayers &amp; Wishes
          </motion.p>
          <motion.h2
            className="font-serif text-[#2C251E] text-3xl sm:text-4xl md:text-5xl font-light"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Guestbook &amp; Blessings
          </motion.h2>
          <motion.div
            className="h-px w-20 bg-[#C5A869]/40 mx-auto mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          />
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mb-16 glass-wedding-card rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <label htmlFor="wish-name" className="block text-xs font-sans text-[#2C251E] uppercase tracking-wider font-semibold mb-2">
              Your Name
            </label>
            <input
              id="wish-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe &amp; Family"
              required
              className="w-full bg-white border border-[#C5A869]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm placeholder-[#8E8272]/60 focus:outline-none focus:border-[#9E7B35] transition-colors shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="wish-text" className="block text-xs font-sans text-[#2C251E] uppercase tracking-wider font-semibold mb-2">
              Your Warm Wishes &amp; Blessings
            </label>
            <textarea
              id="wish-text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your prayers and congratulatory message for the couple..."
              rows={3}
              required
              className="w-full bg-white border border-[#C5A869]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm placeholder-[#8E8272]/60 focus:outline-none focus:border-[#9E7B35] transition-colors resize-none shadow-sm"
            />
          </div>

          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-xl bg-[#C5A869]/15 border border-[#C5A869]/40 text-[#7A5E24] text-xs font-sans text-center font-medium"
              >
                ✨ Thank you! Your warm blessing has been shared with the couple.
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={sending || !name.trim() || !message.trim()}
            className="btn-wedding-gold w-full py-3.5 rounded-full text-xs font-sans font-bold cursor-pointer disabled:opacity-40"
          >
            {sending ? "Sending Message..." : "Share Warm Wishes 💌"}
          </button>
        </motion.form>

        {/* Feed Header */}
        <div className="flex items-center justify-between max-w-5xl mx-auto mb-6 px-2">
          <div className="flex items-center gap-2">
            <span className="text-[#9E7B35] text-base">💬</span>
            <span className="font-serif text-[#2C251E] text-xl font-normal">
              Heartfelt Blessings ({wishes.length})
            </span>
          </div>
          <button
            onClick={fetchWishes}
            className="text-xs font-sans text-[#7A5E24] hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>🔄</span> Refresh
          </button>
        </div>

        {/* Wishes Masonry Feed (Limited to 6 by default) */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence>
            {displayedWishes.map((wish, idx) => {
              const isLiked = likedIds.has(wish.id);
              return (
                <motion.article
                  layout
                  key={wish.id || idx}
                  className="break-inside-avoid glass-wedding-card rounded-3xl p-5 space-y-3 transition-all shadow-sm"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#C5A869]/20 border border-[#C5A869]/40 text-[#7A5E24] font-serif font-bold text-xs flex items-center justify-center">
                        {wish.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-serif text-[#2C251E] font-medium text-sm leading-tight">
                          {wish.name}
                        </h4>
                        <span className="text-[10px] text-[#8E8272] font-sans block">
                          {wish.createdAt
                            ? new Date(wish.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Just now"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleLike(wish.id)}
                      className={`text-sm p-1 rounded-full transition-transform active:scale-125 cursor-pointer ${
                        isLiked ? "text-rose-500" : "text-[#8E8272]/40 hover:text-rose-400"
                      }`}
                      aria-label="Like message"
                    >
                      {isLiked ? "❤️" : "🤍"}
                    </button>
                  </div>

                  <p className="font-sans text-[#61574B] text-xs sm:text-sm leading-relaxed font-light italic">
                    &ldquo;{wish.message}&rdquo;
                  </p>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Show All / Show Less Toggle Button */}
        {wishes.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-wedding-outline px-8 py-3 rounded-full text-xs font-sans font-semibold uppercase tracking-wider cursor-pointer shadow-sm hover:scale-105 transition-all"
            >
              {showAll ? "Show Less ↑" : `Show All (${wishes.length} Wishes) ↓`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
