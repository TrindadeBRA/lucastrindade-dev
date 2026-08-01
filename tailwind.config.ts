import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0a",
          soft: "#141414",
          muted: "#1e1e1e",
          line: "rgba(255,255,255,0.1)",
        },
        chalk: {
          DEFAULT: "#f5f5f5",
          muted: "#9a9a9a",
          dim: "#6b6b6b",
        },
        lime: {
          DEFAULT: "#d4ff4f",
          soft: "#eaff99",
          ink: "#10180a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        site: "72rem",
      },
      letterSpacing: {
        tighter2: "-0.04em",
      },
      backgroundImage: {
        "hero-wash":
          "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(212,255,79,0.12), transparent 55%), linear-gradient(180deg, #0a0a0a 0%, #141414 100%)",
        "noise-fade":
          "linear-gradient(180deg, transparent, #0a0a0a)",
      },
    },
  },
  plugins: [],
};
export default config;
