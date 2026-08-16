import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Windows 95. The exact system palette — teal desktop, silver chrome,
        // navy title bars. Nothing here is invented.
        paper: "#008080", // the desktop
        card: "#C0C0C0", // window face
        kraft: "#008080",
        ink: "#000000",
        "ink-soft": "#3A3A3A",
        "ink-faint": "#6B6B6B",
        rule: "#808080", // the dark bevel
        rec: "#000080", // active title bar navy
        tape: "#000080",
        kodak: "#FFFF00",
        shell: "#C0C0C0",
        highlight: "#FFFFFF", // the light bevel
        crt: "#000000",
        phosphor: "#00FF00",
      },
      fontFamily: {
        // Tahoma and Verdana ship on virtually every machine and are what the
        // era actually looked like — no webfont download, no fallback risk.
        display: ["Tahoma", "Verdana", "Geneva", "sans-serif"],
        body: ["Tahoma", "Verdana", "Geneva", "sans-serif"],
        label: ["var(--font-label)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "none",
        lift: "none",
      },
    },
  },
  plugins: [],
};

export default config;
