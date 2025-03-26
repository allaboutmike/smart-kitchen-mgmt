import type { Config } from "tailwindcss";
import daisyui from "daisyui";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens:{
      'tablet': {'min': '0', 'max': '850px'},
      'mobile': {'min': '0px', 'max': '450px'},
      'mobile-m': {'min': '450px', 'max': '550px'}
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
