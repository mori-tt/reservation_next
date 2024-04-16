import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("@tailwindcss/container-queries"), require("daisyui")],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        accent: colors.pink,
        danger: colors.red,
        error: colors.rose,
        info: colors.cyan,
        primary: colors.indigo,
        secondary: colors.slate,
        success: colors.emerald,
        warning: colors.amber,
      },
    },
  },
};
export default config;
