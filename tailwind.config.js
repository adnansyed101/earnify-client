/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#4CAF50",
          secondary: "#FFC107",
          accent: "#2196F3",
          neutral: "#374151",
          "base-100": "#F9FAFB",
          success: "#34D399",
          error: "#EF4444",
        },
      },
      {
        dark: {
          primary: "#34D399",
          secondary: "#FACC15",
          accent: "#3B82F6",
          neutral: "#374151",
          "base-100": "#1F2937",
          success: "#10B981",
          error: "#F87171",
        },
      },
    ],
  },
};
