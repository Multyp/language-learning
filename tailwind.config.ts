/* eslint-disable @typescript-eslint/no-require-imports */
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
        background: "#f8f9fa", // Light background for better readability
        foreground: "#212529", // Darker text for better contrast
        card: {
          DEFAULT: "#ffffff", // White background for cards
          foreground: "#212529", // Dark text for better contrast
        },
        popover: {
          DEFAULT: "#f8f9fa", // Light background for popovers
          foreground: "#212529", // Dark text for better contrast
        },
        primary: {
          DEFAULT: "#007bff", // Blue primary color
          foreground: "#ffffff", // White text for better contrast
        },
        secondary: {
          DEFAULT: "#6c757d", // Gray secondary color
          foreground: "#ffffff", // White text for better contrast
        },
        muted: {
          DEFAULT: "#adb5bd", // Light gray for muted text
          foreground: "#495057", // Darker gray for better contrast
        },
        accent: {
          DEFAULT: "#6a6dec",
          foreground: "#ffffff", // White text for better contrast
        },
        destructive: {
          DEFAULT: "#dc3545", // Red for destructive actions
          foreground: "#ffffff", // White text for better contrast
        },
        border: "#dee2e6", // Light gray for borders
        input: "#ced4da", // Light gray for input fields
        ring: "#80bdff", // Light blue for focus rings
        chart: {
          "1": "#1d4ed8", // Blue
          "2": "#9333ea", // Purple
          "3": "#dc2626", // Red
          "4": "#059669", // Green
          "5": "#f59e0b", // Yellow
        },
        success: "#28a745", // Green for success messages
        warning: "#ffc107", // Yellow for warning messages
        info: "#17a2b8", // Blue for informational messages
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
