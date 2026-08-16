import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Magazine stock: warm white, rich black, one spot colour.
        // The spot is their own hot pink, deepened so it passes contrast as
        // text — the brand carried forward rather than thrown away.
        paper: "#FBF9F5",
        card: "#FFFFFF",
        kraft: "#F1EDE5",
        ink: "#131211",
        "ink-soft": "#4E4941",
        "ink-faint": "#8A837A",
        rule: "#D8D1C5",
        "rule-firm": "#A8A093",
        rec: "#C4105E", // spot, text-safe
        "rec-bright": "#FF3D8B", // spot, graphic use only
        tape: "#1B4D8F",
        kodak: "#FFD400", // highlighter
        shell: "#131211",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        label: ["var(--font-label)", "system-ui", "sans-serif"],
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
