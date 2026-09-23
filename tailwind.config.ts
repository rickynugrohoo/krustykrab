import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fef4ea",
        brand: "#d41907",
        "brand-dark": "#c32b1b",
        yellow: "#f7df59",
        ink: "#1a1a1a",
        "ink-soft": "#161312",
        "pink-border": "#fddbd8",
        "muted-1": "#4d4d4d",
        "muted-2": "#525252",
        "line": "#e5e5e5",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        hard: "6px 6px 0px #11241c",
        "hard-sm": "3px 3px 0px #161312",
        "hard-black": "4px 4px 0px #000000",
      },
    },
  },
  plugins: [],
};

export default config;
