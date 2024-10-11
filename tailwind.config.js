/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        loader:
          "linear-gradient(135deg, transparent 48%, var(--text-primary) 50%, transparent 52%)",
      },
      backgroundSize: {
        loaderSize: "200% 100%",
      },
      keyframes: {
        wave: {
          "0%": {
            backgroundPosition: "150% 0",
          },
          "100%": {
            backgroundPosition: "-50% 0",
          },
        },
      },
      animation: {
        load: "wave 1s infinite",
      },
      boxShadow: {
        modal: "0px 10px 10px -5px var(--shadow-color);",
      },
      transition: {
        fade: "background 0.3s, color 0.3s !important",
      },
    },
  },
  plugins: [],
};
