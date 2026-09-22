import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#26261f", // body text — warm near-black, not literal black
        cobalt: {
          DEFAULT: "#4a5a2e", // olive-grove green — primary brand colour (token name kept as "cobalt" so no component needs touching)
          light: "#8b9c5e", // hover states, lighter accents
          dark: "#2b3419", // deep overlay tone, gradients
        },
        mist: {
          DEFAULT: "#f0efe4", // pale warm limestone — alternating sections
          deep: "#e1dfcc",
        },
        sand: {
          DEFAULT: "#fbf8f0", // warm off-white body background, replaces stark white
        },
        // Antique brass, taken from the Spartan helmets on the shopfront
        // sign. The palette was blue-and-white only, which left nothing to
        // accent with — every highlight had to be the same cobalt, which is
        // why the old pages felt flat and repetitive.
        brass: {
          DEFAULT: "#b4532a", // terracotta accent (token name kept as "brass")
          light: "#d98a62",
          deep: "#8a3b1a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"], // Playfair Display — high-contrast serif, headings
        script: ["var(--font-script)"], // Playfair Display italic — accent taglines
        body: ["var(--font-body)"], // DM Sans — clean sans, body/UI
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(38,38,31,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
