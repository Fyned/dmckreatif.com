import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          bg: "#FFFDF5",
          "bg-alt": "#F5F0E8",
          black: "#121212",
          white: "#FFFFFF",
          lime: "#CDFF50",
          yellow: "#FBFF48",
          pink: "#FF70A6",
          blue: "#3B82F6",
          green: "#33FF57",
          purple: "#A855F7",
          orange: "#FF9F1C",
          red: "#FF2A2A",
        },
      },
      fontFamily: {
        space: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        hero: "clamp(3rem, 8vw + 1rem, 8rem)",
        h1: "clamp(2.25rem, 3.5vw + 1rem, 4rem)",
        h2: "clamp(1.75rem, 2.5vw + 0.5rem, 2.75rem)",
        h3: "clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)",
      },
      boxShadow: {
        "hard-sm": "2px 2px 0px 0px #121212",
        hard: "4px 4px 0px 0px #121212",
        "hard-lg": "8px 8px 0px 0px #121212",
        "hard-xl": "12px 12px 0px 0px #121212",
        "hard-lime": "4px 4px 0px 0px #CDFF50",
        "hard-pink": "4px 4px 0px 0px #FF70A6",
        "hard-blue": "4px 4px 0px 0px #3B82F6",
        "hard-yellow": "4px 4px 0px 0px #FBFF48",
        "hard-green": "4px 4px 0px 0px #33FF57",
        "hard-purple": "4px 4px 0px 0px #A855F7",
        "hard-orange": "4px 4px 0px 0px #FF9F1C",
      },
      borderWidth: {
        "3": "3px",
        "6": "6px",
      },
      maxWidth: {
        container: "1280px",
      },
      spacing: {
        "section-sm": "80px",
        section: "120px",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
