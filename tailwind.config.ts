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
        chrome: "#1e1e1e",
        brand: {
          dark: "#0a0a0a",
          strong: "#171717",
          soft: "#262626",
          light: "#ffffff",
        },
        surface: {
          base: "#ffffff",
          subtle: "#fafafa",
          muted: "#f5f5f5",
        },
        content: {
          primary: "#0a0a0a",
          secondary: "#525252",
          tertiary: "#737373",
          muted: "#a3a3a3",
          inverse: "#ffffff",
          "inverse-muted": "#a3a3a3",
        },
        accent: {
          yellow: "#f8ea1e",
          orange: "#f9b03a",
          gold: "#b08f72",
          link: "#2563eb",
        },
        border: {
          subtle: "#e5e5e5",
          DEFAULT: "#d4d4d4",
          strong: "#525252",
        },
      },
      fontFamily: {
        sans: ["Mona Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Mona Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "80rem",
      },
      borderRadius: {
        "4xl": "2.5rem",
      },
      boxShadow: {
        sheet: "0 -8px 40px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
