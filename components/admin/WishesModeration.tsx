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
        <h2 className="font-serif text-[#2C251E] text-xl font-medium mb-1 flex items-center gap-2">
          <span className="text-[#7A5E24]" aria-hidden="true">💌</span>
          <span>Guestbook Wishes Moderation</span>
        </h2>
        <p className="font-sans text-[#594E3F] text-xs mb-6 font-semibold">
          {pending.length} pending moderation &bull; {approved.length} approved and published
        </p>

        {loading ? (
          <p className="text-[#594E3F] font-sans text-sm text-center py-6 font-medium" role="status">
            Loading guestbook messages...
          </p>
        ) : wishes.length === 0 ? (
          <p className="text-[#594E3F] font-sans text-sm text-center py-6 font-medium">
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
                      ? "border-[#7A5E24]/20 bg-white/80 shadow-sm"
                      : "border-[#7A5E24]/50 bg-[#FFF9F3] shadow-md"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  layout
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-sans text-[#2C251E] text-sm font-bold">
                          {wish.name}
                        </span>
                        {wish.approved ? (
                          <span className="text-[10px] bg-[#7A5E24]/15 text-[#634A16] border border-[#7A5E24]/30 px-2 py-0.5 rounded-full font-sans font-bold">
                            Published
                          </span>
                        ) : (
                          <span className="text-[10px] bg-[#8B1E2A]/10 text-[#8B1E2A] border border-[#8B1E2A]/30 px-2 py-0.5 rounded-full font-sans font-bold">
                            Pending Review
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-[#594E3F] text-xs sm:text-sm leading-relaxed truncate font-normal">
                        &ldquo;{wish.message}&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-none">
                      {!wish.approved && (
                        <button
                          onClick={() => handleApprove(wish.id)}
                          className="px-3 py-1.5 rounded-lg bg-champagne-gold text-white text-xs font-sans font-bold hover:brightness-105 transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-[#7A5E24]"
                          aria-label={`Approve message from ${wish.name}`}
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(wish.id)}
                        disabled={deleting === wish.id}
                        className="px-3 py-1.5 rounded-lg bg-[#8B1E2A]/10 border border-[#8B1E2A]/30 text-[#8B1E2A] text-xs font-sans font-bold hover:bg-[#8B1E2A]/20 transition-all cursor-pointer disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-[#8B1E2A]"
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
