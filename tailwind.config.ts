import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#111111",
        card: {
          DEFAULT: "#f8f9fa",
          foreground: "#333333",
        },
        popover: {
          DEFAULT: "#f1f5f9",
          foreground: "#1f2937",
        },
        primary: {
          DEFAULT: "#1e40af",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ffed4a",
          foreground: "#1a202c",
        },
        muted: {
          DEFAULT: "#e9ecef",
          foreground: "#495057",
        },
        accent: {
          DEFAULT: "#e83e8c",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#e3342f",
          foreground: "#ffffff",
        },
        border: "#dee2e6",
        input: "#ced4da",
        ring: "#d1d5db",
        chart: {
          "1": "#1d4ed8",
          "2": "#9333ea",
          "3": "#dc2626",
          "4": "#059669",
          "5": "#f59e0b",
        },

        success: "#28a745",
        warning: "#ffc107",
        info: "#17a2b8",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
