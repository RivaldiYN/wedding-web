"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Wish {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  createdAt?: string;
}

export default function WishesModeration() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const res = await fetch("/api/wishes?all=true");
        if (res.ok) {
          const data = await res.json();
          setWishes(data);
        }
      } catch (err) {
        console.error("Failed to load wishes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishes();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/wishes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: true }),
      });

      if (res.ok) {
        setWishes((prev) =>
          prev.map((w) => (w.id === id ? { ...w, approved: true } : w))
        );
      }
    } catch (err) {
      console.error("Failed to approve wish:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this wish?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/wishes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setWishes((prev) => prev.filter((w) => w.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete wish:", err);
    } finally {
      setDeleting(null);
    }
  };

  const pending = wishes.filter((w) => !w.approved);
  const approved = wishes.filter((w) => w.approved);

  return (
    <section>
      <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 shadow-md">
        <h2 className="font-serif text-[#2C251E] text-xl font-normal mb-1 flex items-center gap-2">
          <span className="text-[#9E7B35]" aria-hidden="true">💌</span>
          <span>Guestbook Wishes Moderation</span>
        </h2>
        <p className="font-sans text-[#8E8272] text-xs mb-6">
          {pending.length} pending moderation &bull; {approved.length} approved and published
        </p>

        {loading ? (
          <p className="text-[#8E8272] font-sans text-sm text-center py-6">Loading guestbook messages...</p>
        ) : wishes.length === 0 ? (
          <p className="text-[#8E8272] font-sans text-sm text-center py-6">
            No wishes received yet.
          </p>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {[...pending, ...approved].map((wish) => (
                <motion.div
                  key={wish.id}
                  className={`rounded-2xl border p-4 transition-all duration-200 ${
                    wish.approved
                      ? "border-[#C5A869]/20 bg-white/70 shadow-sm"
                      : "border-[#C5A869]/40 bg-[#FFF9F3] shadow-md"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  layout
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-sans text-[#2C251E] text-sm font-semibold">
                          {wish.name}
                        </span>
                        {wish.approved ? (
                          <span className="text-[10px] bg-[#C5A869]/15 text-[#7A5E24] border border-[#C5A869]/30 px-2 py-0.5 rounded-full font-sans font-medium">
                            Published
                          </span>
                        ) : (
                          <span className="text-[10px] bg-[#6B1D24]/10 text-[#6B1D24] border border-[#6B1D24]/20 px-2 py-0.5 rounded-full font-sans font-medium">
                            Pending Review
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-[#61574B] text-xs sm:text-sm leading-relaxed truncate">
                        &ldquo;{wish.message}&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-none">
                      {!wish.approved && (
                        <button
                          onClick={() => handleApprove(wish.id)}
                          className="px-3 py-1.5 rounded-lg bg-champagne-gold text-white text-xs font-sans font-semibold hover:brightness-105 transition-all cursor-pointer shadow-sm"
                          aria-label={`Approve message from ${wish.name}`}
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(wish.id)}
                        disabled={deleting === wish.id}
                        className="px-3 py-1.5 rounded-lg bg-[#6B1D24]/10 border border-[#6B1D24]/30 text-[#6B1D24] text-xs font-sans font-semibold hover:bg-[#6B1D24]/20 transition-all cursor-pointer disabled:opacity-40"
                        aria-label={`Delete message from ${wish.name}`}
                      >
                        {deleting === wish.id ? "..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
