import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: "2rem",
  		screens: {
  			"2xl": "1400px",
  		},
  	},
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: "#3a0ca3",
  				50: "#f3f1fc",
  				100: "#e9e4f9",
  				200: "#d5cdf3",
  				300: "#b7a7ea",
  				400: "#957cde",
  				500: "#7855d1",
  				600: "#633ac0",
  				700: "#3a0ca3",
  				800: "#380b9a",
  				900: "#2f0980",
  				950: "#1c0554",
  			},
  			secondary: {
  				DEFAULT: "#4cc9f0",
  				50: "#f0fbff",
  				100: "#e0f7fe",
  				200: "#baeffe",
  				300: "#7de4fd",
  				400: "#4cc9f0",
  				500: "#14b1e7",
  				600: "#0a8ec4",
  				700: "#0b719f",
  				800: "#0f5d83",
  				900: "#134e6d",
  				950: "#0c324a",
  			},
  		},
  		borderRadius: {
  			lg: "0.5rem",
  			md: "0.375rem",
  			sm: "0.25rem",
  		},
  		keyframes: {
  			"accordion-down": {
  				from: { height: "0" },
  				to: { height: "var(--radix-accordion-content-height)" },
  			},
  			"accordion-up": {
  				from: { height: "var(--radix-accordion-content-height)" },
  				to: { height: "0" },
  			},
  		},
  		animation: {
  			"accordion-down": "accordion-down 0.2s ease-out",
  			"accordion-up": "accordion-up 0.2s ease-out",
  		},
  	},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default withUt(config);