# Quickstart

## Prereqs

- Node 18+

## Install

```sh
npm install
```

## Dev

```sh
npm run dev
```

## Build

```sh
npm run build
```

## Preview static build

```sh
npm run preview
```

## Content updates

- Edit `src/assets/content.json` (header, intro, projects, experience, contact, footer).
- Keep section order; ToC is generated from content order.

## Theme & ToC behavior

- Theme toggle persists preference; defaults to system.
- Right-edge rail shows current section; hover to see full list; click to jump.

## Tests

- Unit/component: `npm run test`
- (Optional) E2E Playwright for scroll/ToC/toggle if added later.

## Performance Notes

- Build output optimized with Tailwind CSS purging in production
- Target: Initial load < 2s on broadband (SC-006)
- Theme toggle responds within 100ms (SC-002)
- TOC hover reveal < 200ms (SC-011)
- Click-to-jump navigation < 500ms (SC-005)

## Accessibility

- WCAG AA contrast ratios verified for all text colors
- Theme toggle includes proper ARIA labels
- Keyboard navigation supported for TOC items
