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
  const totalGuests = attending.reduce((sum, e) => sum + (e.guestCount || 1), 0);

  const pieData = [
    { name: "Attending", value: attending.length, color: "#7A5E24" },
    { name: "Declined", value: notAttending.length, color: "#8B1E2A" },
  ];

  const sessionLabels: Record<string, string> = {
    reception: "🥂 Reception",
    matrimony: "⛪ Holy Matrimony",
    traditional: "🎭 Heritage Blessing",
    all: "✨ All Sessions",
  };

  return (
    <section className="mb-10">
      <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 shadow-md">
        <h2 className="font-serif text-[#2C251E] text-xl font-medium mb-6 flex items-center gap-2">
          <span className="text-[#7A5E24]" aria-hidden="true">📊</span>
          <span>RSVP Attendance Analytics</span>
        </h2>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Responses", value: entries.length, color: "text-[#2C251E]" },
            { label: "Attending", value: attending.length, color: "text-[#634A16]" },
            { label: "Declined", value: notAttending.length, color: "text-[#8B1E2A]" },
            { label: "Total Headcount", value: totalGuests, color: "text-[#7A5E24]" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/90 border border-[#7A5E24]/25 rounded-2xl p-4 text-center shadow-sm"
            >
              <p className={`font-serif text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="font-sans text-[#594E3F] text-xs mt-1 uppercase tracking-wider font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="mb-8 h-56" aria-label="Attendance statistics pie chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
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

        {/* RSVP Table */}
        {loading ? (
          <p className="text-[#594E3F] font-sans text-sm text-center py-4 font-medium" role="status">
            Loading RSVP data...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="RSVP responses summary table">
              <thead>
                <tr className="border-b border-[#7A5E24]/20 text-[#594E3F]">
                  {["Guest Name", "Status", "Session", "Pax", "Submitted At"].map((h) => (
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
                {entries.map((entry, idx) => (
                  <motion.tr
                    key={entry.id}
                    className="border-b border-[#7A5E24]/10 hover:bg-white/60 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <td className="py-3.5 pr-4 font-sans text-[#2C251E] text-sm font-bold">{entry.guestName}</td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-sans font-bold ${
                          entry.attending
                            ? "text-[#634A16] border-[#7A5E24]/40 bg-[#7A5E24]/15"
                            : "text-[#8B1E2A] border-[#8B1E2A]/30 bg-[#8B1E2A]/10"
                        }`}
                      >
                        {entry.attending ? "✅ Attending" : "❌ Declined"}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-sans text-[#594E3F] text-xs font-medium">
                      {sessionLabels[entry.session] || entry.session}
                    </td>
                    <td className="py-3.5 pr-4 font-sans text-[#2C251E] text-xs font-bold">
                      {entry.guestCount} {entry.guestCount > 1 ? "guests" : "guest"}
                    </td>
                    <td className="py-3.5 font-sans text-[#594E3F] text-xs font-medium">
                      {entry.createdAt
                        ? new Date(entry.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
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
