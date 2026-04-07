import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050816",
        sky: "#38bdf8",
        slateGlass: "rgba(15, 23, 42, 0.78)"
      },
      boxShadow: {
        glow: "0 25px 80px rgba(2, 8, 23, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
