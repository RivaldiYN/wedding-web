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
      aria-label="Prayers, Wishes and Guestbook"
      className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-[#FAF5EE]/90 via-[#FDFBF7]/95 to-[#EFE3D3]/90"
    >
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-[#7A5E24]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header with Animate On Scroll */}
        <div className="text-center mb-12">
          <motion.p
            className="font-sans text-[#7A5E24] text-xs uppercase tracking-[0.3em] mb-2 font-bold"
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
            className="h-px w-20 bg-[#7A5E24]/40 mx-auto mt-4"
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
            <label htmlFor="wish-name" className="block text-xs font-sans text-[#2C251E] uppercase tracking-wider font-bold mb-2">
              Your Name <span className="text-[#8B1E2A]" aria-hidden="true">*</span>
            </label>
            <input
              id="wish-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe &amp; Family"
              required
              className="w-full bg-white border border-[#7A5E24]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm placeholder-[#594E3F]/70 focus-visible:ring-2 focus-visible:ring-[#7A5E24] transition-colors shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="wish-text" className="block text-xs font-sans text-[#2C251E] uppercase tracking-wider font-bold mb-2">
              Your Warm Wishes &amp; Blessings <span className="text-[#8B1E2A]" aria-hidden="true">*</span>
            </label>
            <textarea
              id="wish-text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your prayers and congratulatory message for the couple..."
              rows={3}
              required
              className="w-full bg-white border border-[#7A5E24]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm placeholder-[#594E3F]/70 focus-visible:ring-2 focus-visible:ring-[#7A5E24] transition-colors resize-none shadow-sm"
            />
          </div>

          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
                aria-live="polite"
                className="p-3 rounded-xl bg-[#7A5E24]/15 border border-[#7A5E24]/40 text-[#634A16] text-xs font-sans text-center font-bold"
              >
                ✨ Thank you! Your warm blessing has been shared with the couple.
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={sending || !name.trim() || !message.trim()}
            className="btn-wedding-gold w-full py-3.5 rounded-full text-xs font-sans font-bold cursor-pointer disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-[#7A5E24] focus-visible:ring-offset-2"
            aria-busy={sending}
          >
            {sending ? "Sending Message..." : "Share Warm Wishes 💌"}
          </button>
        </motion.form>

        {/* Feed Header */}
        <div className="flex items-center justify-between max-w-5xl mx-auto mb-6 px-2">
          <div className="flex items-center gap-2">
            <span className="text-[#7A5E24] text-base" aria-hidden="true">💬</span>
            <h3 className="font-serif text-[#2C251E] text-xl font-normal">
              Heartfelt Blessings ({wishes.length})
            </h3>
          </div>
          <button
            onClick={fetchWishes}
            className="text-xs font-sans text-[#634A16] hover:underline flex items-center gap-1 cursor-pointer font-bold focus-visible:ring-2 focus-visible:ring-[#7A5E24] rounded px-2 py-1"
            aria-label="Refresh wishes list"
          >
            <span aria-hidden="true">🔄</span> Refresh
          </button>
        </div>

        {/* Wishes Masonry Feed */}
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
                  aria-label={`Wish from ${wish.name}`}
                  className="break-inside-avoid glass-wedding-card rounded-3xl p-5 space-y-3 transition-all shadow-sm"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#7A5E24]/20 border border-[#7A5E24]/40 text-[#634A16] font-serif font-bold text-xs flex items-center justify-center" aria-hidden="true">
                        {wish.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-serif text-[#2C251E] font-medium text-sm leading-tight">
                          {wish.name}
                        </h4>
                        <time className="text-[11px] text-[#594E3F] font-sans block font-normal">
                          {wish.createdAt
                            ? new Date(wish.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Just now"}
                        </time>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleLike(wish.id)}
                      className={`text-sm p-1.5 rounded-full transition-transform active:scale-125 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24] ${
                        isLiked ? "text-rose-600" : "text-[#594E3F]/60 hover:text-rose-600"
                      }`}
                      aria-label={isLiked ? `Unlike message from ${wish.name}` : `Like message from ${wish.name}`}
                      aria-pressed={isLiked}
                    >
                      {isLiked ? "❤️" : "🤍"}
                    </button>
                  </div>

                  <p className="font-sans text-[#594E3F] text-xs sm:text-sm leading-relaxed font-normal italic">
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
              className="btn-wedding-outline px-8 py-3 rounded-full text-xs font-sans font-bold uppercase tracking-wider cursor-pointer shadow-sm hover:scale-105 transition-all focus-visible:ring-2 focus-visible:ring-[#7A5E24]"
              aria-expanded={showAll}
            >
              {showAll ? "Show Less ↑" : `Show All (${wishes.length} Wishes) ↓`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
