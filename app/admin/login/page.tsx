"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid email or password. Please try again.");
      }
    } catch {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF8F3] flex items-center justify-center px-4 bg-wedding-paper">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="h-px w-16 bg-[#7A5E24]/40 mx-auto mb-5" aria-hidden="true" />
          <h1 className="font-serif text-[#2C251E] text-3xl font-light">Admin Portal</h1>
          <p className="font-sans text-[#594E3F] text-xs mt-2 uppercase tracking-[0.25em] font-bold">
            Wedding Management Dashboard
          </p>
          <div className="h-px w-16 bg-[#7A5E24]/40 mx-auto mt-5" aria-hidden="true" />
        </div>

        {/* Card */}
        <div className="glass-wedding-card rounded-3xl p-8 shadow-2xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block font-sans text-[#2C251E] text-xs uppercase tracking-wider font-bold mb-2">
                Admin Email Address <span className="text-[#8B1E2A]" aria-hidden="true">*</span>
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="w-full bg-white border border-[#7A5E24]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm placeholder-[#594E3F]/70 focus-visible:ring-2 focus-visible:ring-[#7A5E24] transition-colors shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block font-sans text-[#2C251E] text-xs uppercase tracking-wider font-bold mb-2">
                Security Password <span className="text-[#8B1E2A]" aria-hidden="true">*</span>
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-white border border-[#7A5E24]/40 rounded-xl px-4 py-3 font-sans text-[#2C251E] text-sm placeholder-[#594E3F]/70 focus-visible:ring-2 focus-visible:ring-[#7A5E24] transition-colors shadow-sm"
              />
            </div>

            {error && (
              <p className="text-[#8B1E2A] text-xs font-sans text-center font-semibold" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-wedding-gold w-full py-3.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider cursor-pointer shadow-lg disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-[#7A5E24] focus-visible:ring-offset-2"
              aria-busy={loading}
            >
              {loading ? "Signing In..." : "Sign In to Dashboard →"}
            </button>
          </form>
        </div>

        <p className="text-center font-sans text-[#594E3F] text-xs mt-6 font-medium">
          Authorized personnel only &bull; Jacob &amp; Ghina Wedding
        </p>
      </motion.div>
    </main>
  );
}
