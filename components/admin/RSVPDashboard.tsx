"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface RSVPEntry {
  id: string;
  guestName: string;
  attending: boolean;
  session: string;
  guestCount: number;
  message?: string;
  createdAt?: string;
}

export default function RSVPDashboard() {
  const [entries, setEntries] = useState<RSVPEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | "attending" | "declined">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/rsvp");
        if (res.ok) {
          const data = await res.json();
          setEntries(data);
        }
      } catch (err) {
        console.error("Failed to fetch RSVPs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const attending = entries.filter((e) => e.attending);
  const notAttending = entries.filter((e) => !e.attending);
  const totalGuests = attending.reduce((sum, e) => sum + (Number(e.guestCount) || 1), 0);

  // Breakdown Headcounts per Event Session
  const sessionHeadcounts = {
    matrimony: attending
      .filter((e) => e.session === "matrimony" || e.session === "all" || e.session === "both")
      .reduce((sum, e) => sum + (Number(e.guestCount) || 1), 0),
    reception: attending
      .filter((e) => e.session === "reception" || e.session === "all" || e.session === "both")
      .reduce((sum, e) => sum + (Number(e.guestCount) || 1), 0),
    traditional: attending
      .filter((e) => e.session === "traditional" || e.session === "all" || e.session === "both")
      .reduce((sum, e) => sum + (Number(e.guestCount) || 1), 0),
  };

  const sessionBarData = [
    { name: "Holy Matrimony", count: sessionHeadcounts.matrimony },
    { name: "Reception", count: sessionHeadcounts.reception },
    { name: "Mangulosi Adat", count: sessionHeadcounts.traditional },
  ];

  const pieData = [
    { name: "Attending", value: attending.length, color: "#7A5E24" },
    { name: "Declined", value: notAttending.length, color: "#8B1E2A" },
  ];

  const sessionLabels: Record<string, string> = {
    reception: "🥂 Reception",
    matrimony: "⛪ Holy Matrimony",
    traditional: "🎭 Heritage Blessing (Mangulosi)",
    all: "✨ All Sessions",
    both: "✨ All Sessions",
  };

  const filteredEntries = entries.filter((entry) => {
    if (filterStatus === "attending" && !entry.attending) return false;
    if (filterStatus === "declined" && entry.attending) return false;
    if (searchQuery.trim() && !entry.guestName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <section className="mb-10 space-y-8">
      {/* Prominent Headcount Spotlight Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#7A5E24] via-[#9E7B35] to-[#634A16] text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white/10 rounded-l-full pointer-events-none blur-2xl" aria-hidden="true" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-sans font-bold uppercase tracking-widest">
              Live RSVP Attendance Count
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal">
              Total Hadir: {totalGuests} Orang
            </h2>
            <p className="font-sans text-white/90 text-xs sm:text-sm font-medium">
              Dari total {attending.length} undangan keluarga yang telah konfirmasi hadir ({entries.length} respon masuk)
            </p>
          </div>

          {/* Quick Headcount Badges per Session */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full md:w-auto">
            <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/20">
              <span className="block text-xl sm:text-2xl font-serif font-bold">{sessionHeadcounts.matrimony}</span>
              <span className="block text-[10px] text-white/80 font-sans uppercase tracking-wider font-semibold">Pemberkatan</span>
            </div>
            <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/20">
              <span className="block text-xl sm:text-2xl font-serif font-bold">{sessionHeadcounts.reception}</span>
              <span className="block text-[10px] text-white/80 font-sans uppercase tracking-wider font-semibold">Resepsi</span>
            </div>
            <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/20">
              <span className="block text-xl sm:text-2xl font-serif font-bold">{sessionHeadcounts.traditional}</span>
              <span className="block text-[10px] text-white/80 font-sans uppercase tracking-wider font-semibold">Mangulosi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 shadow-md">
        <h2 className="font-serif text-[#2C251E] text-xl font-medium mb-6 flex items-center gap-2">
          <span className="text-[#7A5E24]" aria-hidden="true">📊</span>
          <span>RSVP Attendance Analytics &amp; Breakdown</span>
        </h2>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Respon", value: `${entries.length} Undangan`, color: "text-[#2C251E]" },
            { label: "Undangan Hadir", value: `${attending.length} Keluarga`, color: "text-[#634A16]" },
            { label: "Undangan Berhalangan", value: `${notAttending.length} Respon`, color: "text-[#8B1E2A]" },
            { label: "Total Orang (Pax)", value: `${totalGuests} Orang`, color: "text-[#7A5E24]" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/90 border border-[#7A5E24]/25 rounded-2xl p-4 text-center shadow-sm"
            >
              <p className={`font-serif text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="font-sans text-[#594E3F] text-xs mt-1 uppercase tracking-wider font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Row (Pie Chart + Bar Chart) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart: Status Kehadiran */}
          <div className="bg-white/80 border border-[#7A5E24]/20 rounded-2xl p-5 shadow-sm">
            <h3 className="font-serif text-[#2C251E] text-base font-normal mb-3 text-center">
              Rasio Konfirmasi Kehadiran
            </h3>
            <div className="h-48" aria-label="Attendance statistics pie chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    aria-label="Attendance Pie Chart"
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#FAF7F2",
                      border: "1px solid rgba(122,94,36,0.4)",
                      borderRadius: "12px",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontSize: "12px",
                      color: "#2C251E",
                    }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: "#2C251E", fontSize: "12px", fontWeight: 600 }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart: Jumlah Orang per Sesi */}
          <div className="bg-white/80 border border-[#7A5E24]/20 rounded-2xl p-5 shadow-sm">
            <h3 className="font-serif text-[#2C251E] text-base font-normal mb-3 text-center">
              Perkiraan Orang Hadir per Sesi
            </h3>
            <div className="h-48" aria-label="Headcount per session bar chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sessionBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(122,94,36,0.15)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#594E3F" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#594E3F" }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#FAF7F2",
                      border: "1px solid rgba(122,94,36,0.4)",
                      borderRadius: "12px",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontSize: "12px",
                      color: "#2C251E",
                    }}
                  />
                  <Bar dataKey="count" name="Jumlah Orang" fill="#7A5E24" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold cursor-pointer transition-all ${
                filterStatus === "all"
                  ? "bg-[#7A5E24] text-white shadow-sm"
                  : "bg-white/80 text-[#594E3F] hover:bg-white"
              }`}
            >
              Semua ({entries.length})
            </button>
            <button
              onClick={() => setFilterStatus("attending")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold cursor-pointer transition-all ${
                filterStatus === "attending"
                  ? "bg-champagne-gold text-white shadow-sm"
                  : "bg-white/80 text-[#594E3F] hover:bg-white"
              }`}
            >
              Hadir ({attending.length})
            </button>
            <button
              onClick={() => setFilterStatus("declined")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold cursor-pointer transition-all ${
                filterStatus === "declined"
                  ? "bg-[#8B1E2A] text-white shadow-sm"
                  : "bg-white/80 text-[#594E3F] hover:bg-white"
              }`}
            >
              Berhalangan ({notAttending.length})
            </button>
          </div>

          <div className="w-full sm:w-64">
            <label htmlFor="rsvp-search" className="sr-only">Cari Nama Tamu</label>
            <input
              id="rsvp-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama tamu..."
              className="w-full bg-white border border-[#7A5E24]/35 rounded-xl px-3.5 py-1.5 font-sans text-xs text-[#2C251E] placeholder-[#594E3F]/70 focus-visible:ring-2 focus-visible:ring-[#7A5E24] shadow-sm"
            />
          </div>
        </div>

        {/* RSVP Table */}
        {loading ? (
          <p className="text-[#594E3F] font-sans text-sm text-center py-4 font-medium" role="status">
            Memuat data RSVP...
          </p>
        ) : filteredEntries.length === 0 ? (
          <p className="text-[#594E3F] font-sans text-sm text-center py-6 font-medium">
            Tidak ada data RSVP yang sesuai filter.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Daftar konfirmasi RSVP tamu">
              <thead>
                <tr className="border-b border-[#7A5E24]/20 text-[#594E3F]">
                  {["Nama Tamu", "Status", "Sesi Acara", "Jumlah Orang (Pax)", "Waktu Kirim"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="text-left font-sans text-xs uppercase tracking-wider pb-3 pr-4 font-bold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry, idx) => (
                  <motion.tr
                    key={entry.id}
                    className="border-b border-[#7A5E24]/10 hover:bg-white/60 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    <td className="py-3.5 pr-4 font-sans text-[#2C251E] text-sm font-bold">
                      {entry.guestName}
                      {entry.message && (
                        <p className="text-[11px] text-[#594E3F] font-normal italic truncate max-w-xs mt-0.5">
                          &ldquo;{entry.message}&rdquo;
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-sans font-bold ${
                          entry.attending
                            ? "text-[#634A16] border-[#7A5E24]/40 bg-[#7A5E24]/15"
                            : "text-[#8B1E2A] border-[#8B1E2A]/30 bg-[#8B1E2A]/10"
                        }`}
                      >
                        {entry.attending ? "✅ Hadir" : "❌ Berhalangan"}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-sans text-[#594E3F] text-xs font-medium">
                      {sessionLabels[entry.session] || entry.session}
                    </td>
                    <td className="py-3.5 pr-4 font-sans text-[#2C251E] text-xs font-bold">
                      {entry.attending ? (
                        <span className="px-2 py-0.5 rounded-md bg-[#7A5E24]/15 text-[#634A16] border border-[#7A5E24]/30">
                          {entry.guestCount} Orang
                        </span>
                      ) : (
                        <span className="text-[#594E3F]/60">-</span>
                      )}
                    </td>
                    <td className="py-3.5 font-sans text-[#594E3F] text-xs font-medium">
                      {entry.createdAt
                        ? new Date(entry.createdAt).toLocaleDateString("id-ID", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
