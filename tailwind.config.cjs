/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Surface colors (backgrounds)
        surface: {
          primary: "var(--color-surface-primary)",
          secondary: "var(--color-surface-secondary)",
          animated: "var(--color-surface-animated)",
          panel: "var(--color-surface-panel)",
          code: "var(--color-surface-code)",
          pre: "var(--color-surface-pre)",
          infocard: "var(--color-surface-infocard)",
        },
        // Text colors
        text: {
          base: "var(--color-text-base)",
          muted: "var(--color-text-muted)",
          panel: "var(--color-text-panel)",
          "panel-muted": "var(--color-text-panel-muted)",
          "panel-subtle": "var(--color-text-panel-subtle)",
          code: "var(--color-text-code)",
        },
        // Border colors
        stroke: {
          DEFAULT: "var(--color-stroke)",
          panel: "var(--color-stroke-panel)",
          pre: "var(--color-stroke-pre)",
        },
        // Interactive colors
        link: {
          DEFAULT: "var(--color-link)",
          hover: "var(--color-link-hover)",
        },
        accent: "var(--color-accent)",
        interactive: {
          btn: "var(--color-interactive-btn)",
        },
        // 3D Card material colors
        card: {
          navy: "var(--color-card-navy)",
          yellow: "var(--color-card-yellow)",
          coral: "var(--color-card-coral)",
          "accent-cyan": "var(--color-card-accent-cyan)",
          "accent-purple": "var(--color-card-accent-purple)",
        },
        // Legacy aliases (for backward compatibility during migration)
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        bg: "var(--color-bg)",
        "bg-muted": "var(--color-bg-muted)",
      },
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
