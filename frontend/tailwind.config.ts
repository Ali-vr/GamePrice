import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "var(--color-bg-base)",
        "bg-surface": "var(--color-bg-surface)",
        "accent": "var(--color-accent)",
        "text-soft": "var(--color-text-soft)",
        "border": "var(--color-border)",
        "text": "var(--color-text)",
      },
      fontFamily: {
        "display": ["Archivo Expanded", "Oswald", "ui-sans-serif", "system-ui", "sans-serif"],
        "sans": ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "nav": "15px",
        "button": "15px",
        "pill": "15px",
        "card": "12px",
        "hero": "38px",
      },
      fontSize: {
        "display-lg": ["160px", { lineHeight: "0.75", letterSpacing: "0.06em" }],
        "display-md": ["120px", { lineHeight: "0.8", letterSpacing: "0.05em" }],
        "display-sm": ["64px", { lineHeight: "0.85", letterSpacing: "0.04em" }],
        "body": ["16px", { lineHeight: "1.4" }],
        "body-sm": ["14px", { lineHeight: "1.4" }],
      },
      spacing: {
        "section": "56px",
        "section-lg": "64px",
      },
      maxWidth: {
        "content": "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
