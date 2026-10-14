import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#05050f",
          900: "#0b0b1f",
          800: "#12122b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        "light-mono": ["var(--font-light-mono)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
