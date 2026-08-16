import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Sampled from their own channel art, podcast cover and logo:
        // Memphis pop — hot pink, cyan, purple, yellow, on charcoal or pastel.
        paper: "#F6F2FC", // soft lilac page ground
        card: "#FFFFFF",
        kraft: "#EAFBF5", // mint tint for alternating sections
        ink: "#17161C",
        "ink-soft": "#4A4653",
        "ink-faint": "#7B7688",
        rule: "#DCD5EA",
        rec: "#FF3D8B", // the hot pink from the logo blocks
        tape: "#7B3FD4", // purple, dark enough to read as a link on white
        kodak: "#FFE034", // the yellow X
        cyan: "#45D9E8",
        shell: "#2E2C31", // the charcoal from the main banner
        "shell-deep": "#1C1B20",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Black", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        label: ["var(--font-label)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // The logo sits letters on hard colour blocks. Cards do the same.
        card: "5px 5px 0 #17161C",
        lift: "9px 9px 0 #17161C",
        pop: "5px 5px 0 #FF3D8B",
      },
      backgroundImage: {
        // The holographic wash from the podcast cover.
        holo: "linear-gradient(115deg,#C8F5E4 0%,#FFD9EC 28%,#E2D2FF 55%,#FFE9CC 78%,#C9F0FF 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
