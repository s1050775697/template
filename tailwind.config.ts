import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        1200: { max: "1200px" },
        1024: { max: "1024px" },
        992: { max: "992px" },
        768: { max: "768px" },
        500: { max: "500px" },
        400: { max: "400px" },
      },
      keyframes: {
        "anm-SL-3-move": {
          "0%": { top: "0" },
          "50%": { top: "-5px" },
          "100%": { top: "0" },
        },
      },
      animation: {
        "anm-SL-3-move": "anm-SL-3-move 1s linear infinite",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "travel-black": "var(--travel-black)",
        "travel-gray": "var(--travel-gray)",
        "travel-gray-2": "var(--travel-gray-2)",
        "travel-gray-3": "var(--travel-gray-3)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        ".scrollbar-hide": {
          /* Hide scrollbar for all browsers */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* Chrome, Safari, Opera */,
          },
        },
      });
    },
  ],
} satisfies Config;
