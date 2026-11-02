/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#050811",
          card: "#0b1120",
          cyan: "#00f3ff",
          magenta: "#ff007f",
          amber: "#ffb700",
          green: "#00ff66",
          border: "#1e293b",
          muted: "#64748b",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace', 'ui-monospace'],
      },
    },
  },
  plugins: [],
};
