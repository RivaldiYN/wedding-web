import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1A1A1A",
        crimson: "#B22222",
        gold: "#D4AF37",
        pearl: "#F9F9F9",
        "gold-light": "#E8C84A",
        "gold-dark": "#A8871E",
        "crimson-light": "#D42B2B",
        "crimson-dark": "#8B1A1A",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 175, 55, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(212, 175, 55, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #E8C84A 50%, #A8871E 100%)",
        "crimson-gradient": "linear-gradient(135deg, #8B1A1A 0%, #B22222 50%, #D42B2B 100%)",
        "dark-gradient": "linear-gradient(180deg, #1A1A1A 0%, #2D2D2D 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
