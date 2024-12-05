import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "gradient-radial" : "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic" :  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dwiSky: "#C3EBFA",
        dwiSkyLight: "#EDF9FD",
        dwiPurple: "#CFCEFF",
        dwiPurpleLight: "#F1F0FF",
        dwiYellow: "#FAE27C",
        dwiYellowLight: "#FEFCE8",
      },
    },
  },
  plugins: [],
} satisfies Config;
