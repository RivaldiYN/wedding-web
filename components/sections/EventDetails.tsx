"use client";

import { motion } from "framer-motion";
import { WEDDING, COUPLE } from "@/shared";

export default function EventDetails() {
  const getGoogleCalendarUrl = (event: (typeof WEDDING.events)[0]) => {
    const startTime = "20260502T020000Z";
    const endTime = "20260502T080000Z";
    const title = encodeURIComponent(`The Wedding of ${COUPLE.displayName} - ${event.title}`);
    const details = encodeURIComponent(
      `Wedding Celebration of ${COUPLE.displayName}\nEvent: ${event.title}\nTime: ${event.time}\nVenue: ${event.venue}\nAddress: ${event.address}`
    );
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  return (
    <section
      id="event-details"
      aria-label="Wedding Events and Schedule"
      className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-[#FAF5EE]/90 via-[#FDFBF7]/95 to-[#EFE4D6]/90"
    >
      {/* Golden Radial Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#7A5E24]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Section Header */}
      <div className="max-w-5xl mx-auto text-center mb-16 relative z-10">
        <motion.p
          className="font-sans text-[#7A5E24] text-xs uppercase tracking-[0.35em] mb-2 font-bold"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Save the Date
        </motion.p>
        <motion.h2
          className="font-serif text-[#2C251E] text-3xl sm:text-4xl md:text-5xl font-light tracking-wide"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          Wedding Events Schedule
        </motion.h2>
        <motion.div
          className="h-px w-20 bg-[#7A5E24]/40 mx-auto mt-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Event Cards Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative z-10">
        {WEDDING.events.map((event, idx) => (
          <motion.article
            key={event.id}
            aria-label={`${event.title} Event Details`}
            className="glass-wedding-card rounded-3xl p-8 flex flex-col justify-between relative group shadow-xl"
            initial={{ opacity: 0, x: idx === 0 ? -18 : 18, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
          >
            {/* Top Gold Foil Accent Line */}
            <div className="absolute top-0 left-8 right-8 h-1 bg-champagne-gold rounded-full opacity-70" aria-hidden="true" />

            <div>
              {/* Event Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl filter drop-shadow-sm" role="img" aria-label={event.title}>
                  {event.icon}
                </span>
                <span className="font-sans text-[11px] text-[#634A16] uppercase tracking-widest bg-[#7A5E24]/15 border border-[#7A5E24]/35 px-3.5 py-1 rounded-full font-bold">
                  {event.id === "matrimony" ? "Church Ceremony" : "Traditional Feast & Reception"}
                </span>
              </div>

              <h3 className="font-serif text-[#2C251E] text-2xl font-normal mb-4 group-hover:text-[#7A5E24] transition-colors">
                {event.title}
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#7A5E24] flex-none text-sm" aria-hidden="true">📅</span>
                  <span className="font-sans text-[#2C251E] font-medium">{event.date}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#7A5E24] flex-none text-sm" aria-hidden="true">🕐</span>
                  <span className="font-sans text-[#2C251E] font-medium">{event.time}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#7A5E24] flex-none text-sm" aria-hidden="true">📍</span>
                  <div>
                    <p className="font-sans text-[#2C251E] font-bold text-sm">{event.venue}</p>
                    <p className="font-sans text-[#594E3F] mt-0.5 leading-relaxed font-normal">{event.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-2.5 pt-5 border-t border-[#7A5E24]/20">
              <a
                href={getGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wedding-gold flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-sans font-bold shadow-md focus-visible:ring-2 focus-visible:ring-[#7A5E24] focus-visible:ring-offset-2"
                aria-label={`Save ${event.title} on ${event.date} to Google Calendar`}
              >
                <span aria-hidden="true">🗓️</span>
                <span>Save to Calendar</span>
              </a>
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wedding-outline flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-sans font-bold focus-visible:ring-2 focus-visible:ring-[#7A5E24] focus-visible:ring-offset-2"
                aria-label={`Open location of ${event.venue} on Google Maps`}
              >
                <span aria-hidden="true">🗺️</span>
                <span>View on Google Maps</span>
              </a>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Embedded Map with Bidirectional Scroll Animation */}
      <motion.div
        className="max-w-5xl mx-auto rounded-3xl overflow-hidden glass-wedding-card border border-[#7A5E24]/30 shadow-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-[#FAF7F2] px-6 py-3.5 border-b border-[#7A5E24]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#7A5E24] text-sm" aria-hidden="true">📍</span>
            <span className="font-sans text-[#2C251E] text-xs font-bold">{WEDDING.events[0].venue}</span>
          </div>
          <span className="text-[#594E3F] text-xs font-sans font-medium">Central Jakarta</span>
        </div>
        <iframe
          src={WEDDING.events[0].mapsEmbed}
          width="100%"
          height="320"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Location map of wedding venue: ${WEDDING.events[0].venue}`}
          className="opacity-95 hover:opacity-100 transition-opacity"
        />
      </motion.div>
    </section>
  );
}
