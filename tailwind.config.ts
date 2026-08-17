import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // A Windows 95 desktop skinned in their own Memphis palette.
        // The chrome keeps its shape; the colours come from the channel art.
        paper: "#2B1B6B", // desktop ground
        card: "#EDE9F7", // window face — pale lavender instead of system grey
        kraft: "#E2DBF4",
        ink: "#1E1830",
        "ink-soft": "#463C63",
        "ink-faint": "#6F638F",
        rule: "#7A6BA8", // dark bevel
        "bevel-mid": "#C7BCE4",
        rec: "#FF3D8B", // hot pink
        "rec-deep": "#C4105E", // pink that passes contrast as text
        tape: "#6D28C9", // purple, link-safe
        purple: "#9B5DE5",
        cyan: "#45D9E8",
        kodak: "#FFE034",
        shell: "#241C3D",
      },
      fontFamily: {
        // Chunky poster face for headings, system UI face for the chrome —
        // the mix is the point.
        display: ["var(--font-display)", "Arial Black", "sans-serif"],
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
