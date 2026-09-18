"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface RSVPFormProps {
  guestName: string;
  slug: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function RSVPForm({ guestName, slug }: Readonly<RSVPFormProps>) {
  const [attending, setAttending] = useState<"yes" | "no" | "">("yes");
  const [session, setSession] = useState("all");
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
          colors: ["#C5A869", "#EBD8B0", "#FAF7F2", "#7A5E24"],
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
      aria-label="RSVP Confirmation"
      className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-[#F4ECE0]/90 via-[#EFE3D3]/95 to-[#FAF5EE]/90 border-t border-b border-[#7A5E24]/25"
    >
      {/* Decorative Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#7A5E24]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#D9BA82]/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            className="font-sans text-[#7A5E24] text-xs uppercase tracking-[0.3em] mb-2 font-bold"
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Reservation
          </motion.p>
          <motion.h2
            className="font-serif text-[#2C251E] text-3xl sm:text-4xl md:text-5xl font-light"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            RSVP Confirmation
          </motion.h2>
          <motion.div
            className="h-px w-20 bg-[#7A5E24]/40 mx-auto mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Form Card */}
        <motion.div
          className="glass-wedding-card rounded-3xl p-6 sm:p-9 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {formState === "success" ? (
            <div className="text-center py-6 space-y-4" role="status" aria-live="polite">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#7A5E24]/20 border border-[#7A5E24] flex items-center justify-center text-2xl" aria-hidden="true">
                ✨
              </div>
              <h3 className="font-serif text-[#2C251E] text-2xl sm:text-3xl font-light">
                Thank You Graciously!
              </h3>
              <p className="font-sans text-[#594E3F] text-xs sm:text-sm max-w-sm mx-auto leading-relaxed font-normal">
                {attending === "yes"
                  ? "Your confirmation has been recorded. We truly look forward to celebrating this memorable day with you!"
                  : "Thank you for letting us know. Your prayers and blessings are forever appreciated."}
              </p>
              <button
                type="button"
                onClick={() => setFormState("idle")}
                className="btn-wedding-outline mt-2 px-6 py-2 rounded-full text-xs font-sans font-bold cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24]"
              >
                Modify Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
              {/* Name Field */}
              <div>
                <label htmlFor="rsvp-name" className="block font-sans text-[#2C251E] text-xs uppercase tracking-wider font-bold mb-2">
                  Full Name <span className="text-[#8B1E2A]" aria-hidden="true">*</span>
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="w-full bg-white border border-[#7A5E24]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm placeholder-[#594E3F]/70 focus-visible:ring-2 focus-visible:ring-[#7A5E24] transition-colors shadow-sm"
                />
              </div>

              {/* Attendance Choice */}
              <fieldset>
                <legend className="block font-sans text-[#2C251E] text-xs uppercase tracking-wider font-bold mb-2">
                  Will You Attend? <span className="text-[#8B1E2A]" aria-hidden="true">*</span>
                </legend>
                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Attendance selection">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={attending === "yes"}
                    onClick={() => setAttending("yes")}
                    className={`py-3 px-4 rounded-xl border font-sans text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24] ${
                      attending === "yes"
                        ? "bg-champagne-gold text-white border-[#7A5E24] shadow-md shadow-[#7A5E24]/25"
                        : "bg-white border-[#7A5E24]/30 text-[#594E3F] hover:border-[#7A5E24]"
                    }`}
                  >
                    <span aria-hidden="true">✅</span>
                    <span>Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={attending === "no"}
                    onClick={() => setAttending("no")}
                    className={`py-3 px-4 rounded-xl border font-sans text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24] ${
                      attending === "no"
                        ? "bg-[#6B1D24] text-white border-[#6B1D24] shadow-md"
                        : "bg-white border-[#7A5E24]/30 text-[#594E3F] hover:border-[#7A5E24]"
                    }`}
                  >
                    <span aria-hidden="true">❌</span>
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </fieldset>

              {/* Details if Attending */}
              <AnimatePresence>
                {attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-2 border-t border-[#7A5E24]/20"
                  >
                    <div>
                      <label htmlFor="rsvp-session" className="block font-sans text-[#2C251E] text-xs uppercase tracking-wider font-bold mb-2">
                        Event Session
                      </label>
                      <select
                        id="rsvp-session"
                        value={session}
                        onChange={(e) => setSession(e.target.value)}
                        className="w-full bg-white border border-[#7A5E24]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm focus-visible:ring-2 focus-visible:ring-[#7A5E24] transition-colors cursor-pointer shadow-sm"
                      >
                        <option value="all">✨ Both Sessions (Holy Matrimony &amp; Traditional Feast)</option>
                        <option value="matrimony">⛪ Holy Matrimony Only (08:00 AM - 11:00 AM)</option>
                        <option value="adat_reception">🏛️ Traditional Feast &amp; Reception Only (12:00 PM - 05:00 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="rsvp-guests-count" className="block font-sans text-[#2C251E] text-xs uppercase tracking-wider font-bold mb-2">
                        Number of Guests
                      </label>
                      <div className="flex items-center gap-4 bg-white border border-[#7A5E24]/30 rounded-xl p-2 w-fit shadow-sm">
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="w-8 h-8 rounded-lg bg-[#7A5E24]/15 hover:bg-[#7A5E24]/30 text-[#634A16] flex items-center justify-center font-bold text-base transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24]"
                          aria-label="Decrease guest count"
                        >
                          −
                        </button>
                        <span id="rsvp-guests-count" className="font-serif text-[#2C251E] text-lg w-7 text-center tabular-nums font-bold" aria-live="polite">
                          {guestCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.min(6, guestCount + 1))}
                          className="w-8 h-8 rounded-lg bg-[#7A5E24]/15 hover:bg-[#7A5E24]/30 text-[#634A16] flex items-center justify-center font-bold text-base transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24]"
                          aria-label="Increase guest count"
                        >
                          +
                        </button>
                        <span className="text-[#594E3F] text-xs font-sans pr-2 font-medium">Person(s)</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message */}
              <div>
                <label htmlFor="rsvp-message" className="block font-sans text-[#2C251E] text-xs uppercase tracking-wider font-bold mb-2">
                  Wishes &amp; Blessings
                </label>
                <textarea
                  id="rsvp-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Leave your heartfelt prayers and congratulations for the newlyweds..."
                  className="w-full bg-white border border-[#7A5E24]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm placeholder-[#594E3F]/70 focus-visible:ring-2 focus-visible:ring-[#7A5E24] transition-colors resize-none shadow-sm"
                />
              </div>

              {errorMsg && (
                <p className="text-[#8B1E2A] text-xs font-sans text-center font-semibold" role="alert">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={formState === "submitting" || !name.trim()}
                className="btn-wedding-gold w-full py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-sans font-bold cursor-pointer disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-[#7A5E24] focus-visible:ring-offset-2"
                aria-busy={formState === "submitting"}
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
