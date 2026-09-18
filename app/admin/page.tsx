"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { COUPLE } from "@/lib/dummy-data";

const LinkGenerator = dynamic(() => import("@/components/admin/LinkGenerator"), { ssr: false });
const RSVPDashboard = dynamic(() => import("@/components/admin/RSVPDashboard"), { ssr: false });
const WishesModeration = dynamic(() => import("@/components/admin/WishesModeration"), { ssr: false });

type Tab = "links" | "rsvp" | "wishes";

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("links");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => {
        if (!res.ok) {
          router.replace("/admin/login");
        }
      })
      .catch(() => {
        router.replace("/admin/login");
      })
      .finally(() => setChecking(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.replace("/admin/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#FBF8F3] flex items-center justify-center" role="status" aria-live="polite">
        <div className="text-[#7A5E24] font-sans text-sm animate-pulse font-bold">Verifying session...</div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "links", label: "Link Generator", icon: "🔗" },
    { id: "rsvp", label: "RSVP Overview", icon: "📊" },
    { id: "wishes", label: "Guestbook Wishes", icon: "💌" },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#2C251E] bg-wedding-paper">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 border-b border-[#7A5E24]/25 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 bg-champagne-gold rounded-full" aria-hidden="true" />
            <h1 className="font-serif text-[#2C251E] text-lg font-medium">Admin Dashboard</h1>
            <span className="font-sans text-[#594E3F] text-xs hidden sm:block font-medium">
              {COUPLE.displayName} Wedding
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="font-sans text-[#594E3F] text-xs uppercase tracking-wider hover:text-[#8B1E2A] transition-colors cursor-pointer font-bold focus-visible:ring-2 focus-visible:ring-[#7A5E24] rounded px-3 py-1.5"
            aria-label="Sign out of admin panel"
          >
            Sign Out →
          </button>
        </div>
      </header>

      <main id="main-content" className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab navigation */}
        <nav className="flex gap-2 mb-8 glass-wedding-card rounded-2xl p-1.5 shadow-sm" aria-label="Admin Navigation Tabs">
          <div className="flex w-full gap-2" role="tablist" aria-label="Dashboard sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-xs sm:text-sm transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24] ${
                  activeTab === tab.id
                    ? "bg-champagne-gold text-white font-bold shadow-md shadow-[#7A5E24]/20"
                    : "text-[#594E3F] hover:text-[#2C251E] hover:bg-[#7A5E24]/10 font-medium"
                }`}
                aria-selected={activeTab === tab.id}
                aria-controls={`tab-panel-${tab.id}`}
                role="tab"
              >
                <span aria-hidden="true">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="tabpanel"
          id={`tab-panel-${activeTab}`}
          aria-labelledby={`tab-btn-${activeTab}`}
        >
          {activeTab === "links" && <LinkGenerator />}
          {activeTab === "rsvp" && <RSVPDashboard />}
          {activeTab === "wishes" && <WishesModeration />}
        </motion.div>
      </main>
    </div>
  );
}
