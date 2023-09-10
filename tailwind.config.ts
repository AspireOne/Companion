import { type Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBg: "#1E1E1E",
      },
    },
  },
  /*darkMode: "class",*/
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    nextui(),
  ],
} satisfies Config;
