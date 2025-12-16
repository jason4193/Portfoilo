# Research

## Decisions

- **Stack**: Vite + React + TypeScript + TailwindCSS
- **Reason**: Lightweight dev/build, fast HMR, minimal runtime, easy theming and responsive utilities, familiar stack for author.
- **Alternatives Considered**:
  - Plain HTML/CSS/JS: minimal but more manual state/DOM handling for TOC/progress; less scalable for future tweaks.
  - Next.js: unnecessary for a static single page; adds routing/server features not needed.
  - Gatsby/astro: heavier or more opinionated; overkill for one-page static site.

- **Content Source**: Single JSON asset served statically
- **Reason**: Keeps content decoupled from code, enables easy updates, predictable ToC generation.
- **Alternatives**: Multiple JSON files (more complexity), markdown parsing at runtime (extra dependency/size).

- **Styling**: Tailwind with minimal custom CSS tokens for GitHub-like typography and Notion-like rail
- **Reason**: Rapid iteration, small bundle with purge, easy dark/light theming.
- **Alternatives**: Hand-rolled CSS (more time), component libraries (heavier).

- **Testing**: Vitest + Testing Library for components; optional Playwright for scroll/ToC hover/click
- **Reason**: Fast unit tests; e2e only if needed for interactions.
- **Alternatives**: Cypress (heavier); no tests (riskier).

## Open Questions

None – current scope is clear for a static single-page site.
