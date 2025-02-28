import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        firstColor: "#f7f7f7",
        secondColor: "#cccccc",
        thirdColor: "#b8b8b8",
        accentColor: "#fb1",
      },
      fontFamily: {
        custom: ["Playwrite IN", "serif"],
        customLogo: ["Alfa Slab One", "serif"],
      },
      boxShadow: {
        customShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
