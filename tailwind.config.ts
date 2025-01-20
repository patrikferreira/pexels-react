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
      },
      fontFamily: {
        custom: ["Playwrite IN", "serif"],
      },
      boxShadow: {
        customShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;
