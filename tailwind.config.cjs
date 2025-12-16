/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "inherit",
            a: {
              color: "inherit",
              textDecoration: "underline",
              "&:hover": {
                opacity: 0.8,
              },
            },
            code: {
              color: "inherit",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontSize: "0.9em",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              color: "inherit",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
