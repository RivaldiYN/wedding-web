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
    { name: "Attending", value: attending.length, color: "#9E7B35" },
    { name: "Declined", value: notAttending.length, color: "#6B1D24" },
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
        <h2 className="font-serif text-[#2C251E] text-xl font-normal mb-6 flex items-center gap-2">
          <span className="text-[#9E7B35]" aria-hidden="true">📊</span>
          <span>RSVP Attendance Analytics</span>
        </h2>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Responses", value: entries.length, color: "text-[#2C251E]" },
            { label: "Attending", value: attending.length, color: "text-[#7A5E24]" },
            { label: "Declined", value: notAttending.length, color: "text-[#A34848]" },
            { label: "Total Headcount", value: totalGuests, color: "text-[#9E7B35]" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/80 border border-[#C5A869]/25 rounded-2xl p-4 text-center shadow-sm"
            >
              <p className={`font-serif text-3xl font-normal ${stat.color}`}>{stat.value}</p>
              <p className="font-sans text-[#8E8272] text-[11px] mt-1 uppercase tracking-wider font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="mb-8 h-56">
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
                  border: "1px solid rgba(197,168,105,0.4)",
                  borderRadius: "12px",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: "12px",
                  color: "#2C251E",
                }}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: "#2C251E", fontSize: "12px", fontWeight: 500 }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* RSVP Table */}
        {loading ? (
          <p className="text-[#8E8272] font-sans text-sm text-center py-4">Loading RSVP data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="RSVP responses table">
              <thead>
                <tr className="border-b border-[#C5A869]/20 text-[#8E8272]">
                  {["Guest Name", "Status", "Session", "Pax", "Submitted At"].map((h) => (
                    <th
                      key={h}
                      className="text-left font-sans text-xs uppercase tracking-wider pb-3 pr-4 font-semibold"
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
                    className="border-b border-[#C5A869]/10 hover:bg-white/60 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <td className="py-3.5 pr-4 font-sans text-[#2C251E] text-sm font-semibold">{entry.guestName}</td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-sans font-medium ${
                          entry.attending
                            ? "text-[#7A5E24] border-[#C5A869]/40 bg-[#C5A869]/15"
                            : "text-[#A34848] border-[#A34848]/30 bg-[#A34848]/10"
                        }`}
                      >
                        {entry.attending ? "✅ Attending" : "❌ Declined"}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-sans text-[#61574B] text-xs">
                      {sessionLabels[entry.session] || entry.session}
                    </td>
                    <td className="py-3.5 pr-4 font-sans text-[#2C251E] text-xs font-semibold">
                      {entry.guestCount} {entry.guestCount > 1 ? "guests" : "guest"}
                    </td>
                    <td className="py-3.5 font-sans text-[#8E8272] text-xs">
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
