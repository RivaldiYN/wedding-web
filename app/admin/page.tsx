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
      <div className="min-h-screen bg-[#FBF8F3] flex items-center justify-center">
        <div className="text-[#9E7B35] font-sans text-sm animate-pulse">Verifying session...</div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "links", label: "Link Generator", icon: "🔗" },
    { id: "rsvp", label: "RSVP Overview", icon: "📊" },
    { id: "wishes", label: "Guestbook Wishes", icon: "💌" },
  ];

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#2C251E] bg-wedding-paper">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 border-b border-[#C5A869]/25 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 bg-champagne-gold rounded-full" />
            <h1 className="font-serif text-[#2C251E] text-lg font-normal">Admin Dashboard</h1>
            <span className="font-sans text-[#8E8272] text-xs hidden sm:block">
              {COUPLE.displayName} Wedding
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="font-sans text-[#8E8272] text-xs uppercase tracking-wider hover:text-[#A34848] transition-colors cursor-pointer"
            aria-label="Sign out of admin panel"
          >
            Sign Out →
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab navigation */}
        <nav className="flex gap-2 mb-8 glass-wedding-card rounded-2xl p-1.5 shadow-sm" aria-label="Admin Navigation Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-champagne-gold text-white font-semibold shadow-md shadow-[#9E7B35]/20"
                  : "text-[#61574B] hover:text-[#2C251E] hover:bg-[#C5A869]/10"
              }`}
              aria-selected={activeTab === tab.id}
              aria-controls={`tab-${tab.id}`}
              role="tab"
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="tabpanel"
          id={`tab-${activeTab}`}
        >
          {activeTab === "links" && <LinkGenerator />}
          {activeTab === "rsvp" && <RSVPDashboard />}
          {activeTab === "wishes" && <WishesModeration />}
        </motion.div>
      </div>
    </main>
  );
}
