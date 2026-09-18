"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nameToSlug, copyToClipboard } from "@/lib/utils";
import { COUPLE } from "@/shared";

interface GeneratedLink {
  id: string;
  guestName: string;
  slug: string;
  url: string;
  createdAt: string;
}

export default function LinkGenerator() {
  const [inputName, setInputName] = useState("");
  const [links, setLinks] = useState<GeneratedLink[]>([]);
  const [generating, setGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    const origin = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    setBaseUrl(origin);

    const loadLinks = async () => {
      try {
        const res = await fetch("/api/invitations");
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((inv: { id: string; guestName: string; slug: string; createdAt: string }) => ({
            id: inv.id,
            guestName: inv.guestName,
            slug: inv.slug,
            url: `${origin}/invite/${inv.slug}`,
            createdAt: new Date(inv.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));
          setLinks(formatted);
        }
      } catch (err) {
        console.error("Failed to load invitations:", err);
      }
    };
    loadLinks();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;

    setGenerating(true);
    const slug = nameToSlug(inputName.trim());
    const currentBase = baseUrl || window.location.origin;
    const url = `${currentBase}/invite/${slug}`;

    try {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestName: inputName.trim(), slug }),
      });

      if (res.ok) {
        const doc = await res.json();
        const newLink: GeneratedLink = {
          id: doc.id,
          guestName: doc.guestName,
          slug: doc.slug,
          url,
          createdAt: new Date(doc.createdAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        };
        setLinks((prev) => [newLink, ...prev.filter((l) => l.slug !== slug)]);
        setInputName("");
      }
    } catch (err) {
      console.error("Failed to generate link:", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async (url: string, id: string) => {
    await copyToClipboard(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsApp = (link: GeneratedLink) => {
    const text = encodeURIComponent(
      `Dear ${link.guestName} 🙏\n\nWe cordially invite you to celebrate our wedding.\nPlease find your personalized digital wedding invitation here:\n${link.url}\n\nWarmest regards,\n${COUPLE.displayName}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <section className="mb-10">
      <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 shadow-md">
        <h2 className="font-serif text-[#2C251E] text-xl font-medium mb-5 flex items-center gap-2">
          <span className="text-[#7A5E24]" aria-hidden="true">🔗</span>
          <span>Personalized Invitation Link Generator</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3 mb-6">
          <label htmlFor="generator-guest-name" className="sr-only">Guest Name</label>
          <input
            id="generator-guest-name"
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Guest name (e.g. John Doe & Family)"
            required
            className="flex-1 bg-white border border-[#7A5E24]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm placeholder-[#594E3F]/70 focus-visible:ring-2 focus-visible:ring-[#7A5E24] shadow-sm"
          />
          <button
            type="submit"
            disabled={generating || !inputName.trim()}
            className="btn-wedding-gold px-7 py-3 rounded-full text-xs font-sans font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap shadow-md disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-[#7A5E24] focus-visible:ring-offset-2"
            aria-busy={generating}
          >
            {generating ? "Generating..." : "Create Link +"}
          </button>
        </form>

        {/* URL Preview */}
        {inputName && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-5"
          >
            <p className="font-sans text-[#594E3F] text-xs mb-1 font-semibold">Generated URL Preview:</p>
            <code className="font-sans text-[#634A16] text-xs bg-white/90 px-3 py-1.5 rounded-lg border border-[#7A5E24]/30 block shadow-sm font-semibold">
              {baseUrl}/invite/{nameToSlug(inputName)}
            </code>
          </motion.div>
        )}

        {/* Table */}
        {links.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Generated guest links list">
              <thead>
                <tr className="border-b border-[#7A5E24]/20 text-[#594E3F]">
                  <th scope="col" className="text-left font-sans text-xs uppercase tracking-wider pb-3 pr-4 font-bold">
                    Guest Name
                  </th>
                  <th scope="col" className="text-left font-sans text-xs uppercase tracking-wider pb-3 pr-4 hidden md:table-cell font-bold">
                    Created Date
                  </th>
                  <th scope="col" className="text-left font-sans text-xs uppercase tracking-wider pb-3 font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {links.map((link) => (
                    <motion.tr
                      key={link.id}
                      className="border-b border-[#7A5E24]/10 hover:bg-white/60 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <td className="py-3.5 pr-4">
                        <p className="font-sans text-[#2C251E] text-sm font-bold">{link.guestName}</p>
                        <p className="font-sans text-[#594E3F] text-xs mt-0.5 truncate max-w-[240px]">
                          {link.url}
                        </p>
                      </td>
                      <td className="py-3.5 pr-4 hidden md:table-cell">
                        <span className="font-sans text-[#594E3F] text-xs font-medium">{link.createdAt}</span>
                      </td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(link.url, link.id)}
                            className="btn-wedding-outline px-3 py-1.5 rounded-lg text-xs font-sans font-bold flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24]"
                            aria-label={`Copy link for ${link.guestName}`}
                          >
                            <span aria-hidden="true">{copiedId === link.id ? "✅" : "📋"}</span>
                            <span>{copiedId === link.id ? "Copied" : "Copy"}</span>
                          </button>
                          <button
                            onClick={() => handleWhatsApp(link)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-sans font-bold flex items-center gap-1 hover:bg-emerald-800 transition-colors cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-[#7A5E24]"
                            aria-label={`Share on WhatsApp to ${link.guestName}`}
                          >
                            <span aria-hidden="true">📲</span>
                            <span>Share WA</span>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {links.length === 0 && (
          <p className="font-sans text-[#594E3F] text-sm text-center py-6 font-medium">
            No guest links generated yet. Enter a name above to create one.
          </p>
        )}
      </div>
    </section>
  );
}
