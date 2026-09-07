"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface RSVPFormProps {
  guestName: string;
  slug: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function RSVPForm({ guestName, slug }: RSVPFormProps) {
  const [attending, setAttending] = useState<"yes" | "no" | "">("yes");
  const [session, setSession] = useState("reception");
  const [guestCount, setGuestCount] = useState(2);
  const [message, setMessage] = useState("");
  const [name, setName] = useState(guestName || "");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!attending || !name.trim()) return;

    setFormState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: name.trim(),
          slug: slug || "honored-guest",
          attending: attending === "yes",
          session: session || "reception",
          guestCount: attending === "yes" ? guestCount : 0,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit RSVP");
      }

      if (attending === "yes") {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#C5A869", "#EBD8B0", "#FAF7F2", "#9E7B35"],
        });
      }

      setFormState("success");
    } catch (err) {
      console.error("RSVP error:", err);
      setErrorMsg("An error occurred while submitting your RSVP. Please try again.");
      setFormState("error");
    }
  };

  return (
    <section
      id="rsvp"
      className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-[#F4ECE0]/90 via-[#EFE3D3]/95 to-[#FAF5EE]/90 border-t border-b border-[#C5A869]/25"
    >
      {/* Decorative Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#C5A869]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#D9BA82]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            className="font-sans text-[#9E7B35] text-xs uppercase tracking-[0.3em] mb-2 font-semibold"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Reservation
          </motion.p>
          <motion.h2
            className="font-serif text-[#2C251E] text-3xl sm:text-4xl md:text-5xl font-light"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            RSVP Confirmation
          </motion.h2>
          <motion.div
            className="h-px w-20 bg-[#C5A869]/40 mx-auto mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          />
        </div>

        {/* Form Card */}
        <motion.div
          className="glass-wedding-card rounded-3xl p-6 sm:p-9 shadow-xl"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          {formState === "success" ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#C5A869]/20 border border-[#9E7B35] flex items-center justify-center text-2xl">
                ✨
              </div>
              <h3 className="font-serif text-[#2C251E] text-2xl sm:text-3xl font-light">
                Thank You Graciously!
              </h3>
              <p className="font-sans text-[#61574B] text-xs sm:text-sm max-w-sm mx-auto leading-relaxed font-light">
                {attending === "yes"
                  ? "Your confirmation has been recorded. We truly look forward to celebrating this memorable day with you!"
                  : "Thank you for letting us know. Your prayers and blessings are forever appreciated."}
              </p>
              <button
                type="button"
                onClick={() => setFormState("idle")}
                className="btn-wedding-outline mt-2 px-6 py-2 rounded-full text-xs font-sans"
              >
                Modify Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="rsvp-name" className="block font-sans text-[#2C251E] text-xs uppercase tracking-wider font-semibold mb-2">
                  Full Name <span className="text-[#A34848]">*</span>
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="w-full bg-white border border-[#C5A869]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm placeholder-[#8E8272]/60 focus:outline-none focus:border-[#9E7B35] focus:ring-1 focus:ring-[#9E7B35]/30 transition-colors shadow-sm"
                />
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block font-sans text-[#2C251E] text-xs uppercase tracking-wider font-semibold mb-2">
                  Will You Attend? <span className="text-[#A34848]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending("yes")}
                    className={`py-3 px-4 rounded-xl border font-sans text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      attending === "yes"
                        ? "bg-champagne-gold text-white border-[#9E7B35] shadow-md shadow-[#9E7B35]/25"
                        : "bg-white border-[#C5A869]/30 text-[#61574B] hover:border-[#9E7B35]"
                    }`}
                  >
                    <span>✅</span>
                    <span>Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending("no")}
                    className={`py-3 px-4 rounded-xl border font-sans text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      attending === "no"
                        ? "bg-[#6B1D24] text-white border-[#6B1D24] shadow-md"
                        : "bg-white border-[#C5A869]/30 text-[#61574B] hover:border-[#9E7B35]"
                    }`}
                  >
                    <span>❌</span>
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Details if Attending */}
              <AnimatePresence>
                {attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-2 border-t border-[#C5A869]/20"
                  >
                    <div>
                      <label htmlFor="rsvp-session" className="block font-sans text-[#2C251E] text-xs uppercase tracking-wider font-semibold mb-2">
                        Event Session
                      </label>
                      <select
                        id="rsvp-session"
                        value={session}
                        onChange={(e) => setSession(e.target.value)}
                        className="w-full bg-white border border-[#C5A869]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm focus:outline-none focus:border-[#9E7B35] transition-colors cursor-pointer shadow-sm"
                      >
                        <option value="reception">🥂 Wedding Reception (12:00 PM – 03:00 PM)</option>
                        <option value="matrimony">⛪ Holy Matrimony (09:00 AM – 11:00 AM)</option>
                        <option value="traditional">🎭 Heritage Blessing (03:30 PM – 06:00 PM)</option>
                        <option value="all">✨ All Sessions</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-[#2C251E] text-xs uppercase tracking-wider font-semibold mb-2">
                        Number of Guests
                      </label>
                      <div className="flex items-center gap-4 bg-white border border-[#C5A869]/30 rounded-xl p-2 w-fit shadow-sm">
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="w-8 h-8 rounded-lg bg-[#C5A869]/15 hover:bg-[#C5A869]/30 text-[#7A5E24] flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
                        >
                          −
                        </button>
                        <span className="font-serif text-[#2C251E] text-lg w-7 text-center tabular-nums font-semibold">
                          {guestCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.min(6, guestCount + 1))}
                          className="w-8 h-8 rounded-lg bg-[#C5A869]/15 hover:bg-[#C5A869]/30 text-[#7A5E24] flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
                        >
                          +
                        </button>
                        <span className="text-[#8E8272] text-xs font-sans pr-2">Person(s)</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message */}
              <div>
                <label htmlFor="rsvp-message" className="block font-sans text-[#2C251E] text-xs uppercase tracking-wider font-semibold mb-2">
                  Wishes &amp; Blessings
                </label>
                <textarea
                  id="rsvp-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Leave your heartfelt prayers and congratulations for the newlyweds..."
                  className="w-full bg-white border border-[#C5A869]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm placeholder-[#8E8272]/60 focus:outline-none focus:border-[#9E7B35] transition-colors resize-none shadow-sm"
                />
              </div>

              {errorMsg && (
                <p className="text-[#A34848] text-xs font-sans text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={formState === "submitting" || !name.trim()}
                className="btn-wedding-gold w-full py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-sans font-bold cursor-pointer disabled:opacity-40"
              >
                {formState === "submitting" ? "Submitting RSVP..." : "Send RSVP Confirmation ✨"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
