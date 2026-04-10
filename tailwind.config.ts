import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#d7b87a",
          600: "#b88b44"
        },
        surface: {
          DEFAULT: "#060914",
          card: "rgba(10, 16, 31, 0.78)",
          border: "rgba(201, 169, 109, 0.14)"
        },
        ink: "#050816",
        sky: "#38bdf8",
        slateGlass: "rgba(15, 23, 42, 0.78)"
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        float: "float 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        shimmer: "shimmer 1.8s infinite"
      },
      boxShadow: {
        glow: "0 25px 80px rgba(2, 8, 23, 0.45)"
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        glowPulse: {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" }
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" }
        }
      }
    }
  },
  plugins: []
};

export default config;
