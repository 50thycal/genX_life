import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Manila folder / index card / tape label. Warm, archival, worn.
        paper: "#F2EAD9",
        card: "#FDF9F0",
        kraft: "#E4D6B8",
        ink: "#241F1A",
        "ink-soft": "#5C5348",
        "ink-faint": "#8A7F6E",
        rule: "#D6C7AA",
        rec: "#C4362B",
        tape: "#26707F",
        kodak: "#E0951C",
        shell: "#1C1815",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Black", "sans-serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        label: ["var(--font-label)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(36,31,26,0.06), 0 12px 28px -18px rgba(36,31,26,0.55)",
        lift: "0 2px 0 rgba(36,31,26,0.08), 0 20px 40px -22px rgba(36,31,26,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
