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
        ink: "#2a2224", // body text — warm near-black, not literal black
        cobalt: {
          DEFAULT: "#7a1f2e", // pomegranate red — primary brand colour (token name kept as "cobalt" so no component needs touching)
          light: "#a8505f", // hover states, lighter accents
          dark: "#4a121c", // deep overlay tone, gradients
        },
        mist: {
          DEFAULT: "#f6efee", // pale warm blush-stone — alternating sections
          deep: "#ebdedc",
        },
        sand: {
          DEFAULT: "#fcf8f4", // warm off-white body background, replaces stark white
        },
        // Antique brass, taken from the Spartan helmets on the shopfront
        // sign. The palette was blue-and-white only, which left nothing to
        // accent with — every highlight had to be the same cobalt, which is
        // why the old pages felt flat and repetitive.
        brass: {
          DEFAULT: "#c08a1e", // honey gold accent (token name kept as "brass")
          light: "#e0b04f",
          deep: "#8a5f0f",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"], // Lora — warm book serif, headings
        script: ["var(--font-script)"], // Lora italic — accent taglines
        body: ["var(--font-body)"], // Figtree — friendly geometric sans, body/UI
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(42,34,36,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
