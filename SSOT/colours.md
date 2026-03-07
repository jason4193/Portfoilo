# Colour System — Single Source of Truth

> **All colour values live in one file only:**  
> [`src/shared/styles/tokens.css`](file:///Users/jp/Portfoilo/src/shared/styles/tokens.css)  
> Never define colour hex values anywhere else.

## Rules

1. **Define** colours only in `tokens.css` (`:root` for light, `[data-theme="dark"]` for dark)
2. **Alias** them in `tailwind.css` `@theme` block only if you need a Tailwind utility class
3. **Consume** them in components via:
   - Tailwind classes: `text-text-panel`, `bg-surface-infocard`, `border-detail-border`
   - CSS `var()` in inline styles: `style={{ color: "var(--color-panel-text)" }}`
4. **Never** hardcode hex values like `#0B2B4C` or Tailwind built-in colours like `bg-amber-50` in components
5. **Never** create a parallel TS/JS colour file — tokens.css is the only source

## File Roles

| File | Role | What belongs here |
|---|---|---|
| `tokens.css` | **Source of truth** — all raw values | CSS custom properties with hex/rgba values |
| `tailwind.css` | **Alias layer** — maps tokens → Tailwind utilities | `--color-surface-panel: var(--color-panel-bg)` |
| `theme.css` | **Base styles** — consumes tokens via `var()` | Typography resets, component patterns, layout |

## Variable Naming Convention

```
--color-{context}-{role}
```

- **context**: `bg`, `text`, `panel`, `card`, `section`, `detail`, `code`, `pre`, `infocard`
- **role**: `primary`, `secondary`, `muted`, `subtle`, `border`, `bg`, `text`, etc.

## Colour Token Reference

### Markdown Mode (used in the markdown/static version)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-bg-primary` | `#ffffff` | `#0d1117` | Page background |
| `--color-bg-secondary` | `#f6f8fa` | `#161b22` | Muted backgrounds, code blocks |
| `--color-text-primary` | `#24292f` | `#c9d1d9` | Body text |
| `--color-text-secondary` | `#57606a` | `#8b949e` | Secondary/muted text |
| `--color-border` | `#d0d7de` | `#30363d` | General borders |
| `--color-link` | `#0969da` | `#58a6ff` | Link text |
| `--color-link-hover` | `#0860ca` | `#79c0ff` | Link hover state |
| `--color-accent` | `#0969da` | `#58a6ff` | Accent highlights (spinners, etc.) |
| `--color-code-bg` | `rgba(175,184,193,0.2)` | `rgba(110,118,129,0.4)` | Inline code background |
| `--color-code-text` | `#24292f` | `#c9d1d9` | Inline code text |
| `--color-pre-bg` | `#f6f8fa` | `#161b22` | Code block background |
| `--color-pre-border` | `#d0d7de` | `#30363d` | Code block border |

### Animated Mode — Canvas & 3D

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-animated-bg-light` | `#ededed` | `#0a2136` | 3D canvas background, loading screen bg |
| `--color-card-primary` | `#b4bf9b` | `#048abf` | Card Primary material colour |
| `--color-card-secondary` | `#f2a679` | `#0e3a73` | Card Secondary material colour, InfoCard header pills, loading bar |
| `--color-card-accent` | `#d98162` | `#0a2740` | Card Accent material colour, loading bar gradient |

### Animated Mode — Panel/Modal

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-panel-bg` | `#f2dac4` | `rgba(14,68,115,0.95)` | Modal body background |
| `--color-panel-text` | `#4b433f` | `#72e5f2` | Modal body text, card stack dots (active) |
| `--color-panel-text-muted` | `rgba(75,67,63,0.8)` | `rgba(114,229,242,0.8)` | Muted text inside modals |
| `--color-panel-text-subtle` | `rgba(75,67,63,0.95)` | `rgba(114,229,242,0.95)` | Slightly muted text, intro paragraphs |
| `--color-panel-border` | `rgba(75,67,63,0.1)` | `rgba(4,138,191,0.3)` | Panel borders, card stack dots (inactive) |
| `--color-panel-btn` | `#4b433f` | `#72e5f2` | Close/back button background |

### Section Accent Colours (Modal Headers)

In light mode these match the card material base colours. In dark mode they use the **neon emissive glow** colours so the headers are visible and match what you see on the 3D card:

| Token | Light | Dark (neon) | Used by |
|---|---|---|---|
| `--color-section-aboutMe` | `#f2a679` | `#ff006e` (neon red) | About Me modal header |
| `--color-section-community` | `#d98162` | `#8b00ff` (neon purple) | Community modal header |
| `--color-section-awards` | `#b4bf9b` | `#048abf` (cyan) | Awards modal header |
| `--color-section-projects` | `#f2a679` | `#ff006e` (neon red) | Projects modal header |
| `--color-section-working` | `#d98162` | `#8b00ff` (neon purple) | Working modal header |
| `--color-section-education` | `#b4bf9b` | `#048abf` (cyan) | Education modal header |

### InfoCard & Detail Panel

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-infocard-content-bg` | `rgba(255,251,235,0.9)` | `rgba(20,30,45,0.95)` | InfoCard content section background |
| `--color-detail-bg` | `rgba(255,251,235,0.95)` | `rgba(14,68,115,0.95)` | Detail panel scrolled-down section bg |
| `--color-detail-text` | `#4b433f` | `#72e5f2` | Detail panel text |
| `--color-detail-pill-bg` | `rgba(242,166,121,0.25)` | `rgba(4,138,191,0.3)` | Link pill background |
| `--color-detail-pill-bg-hover` | `rgba(242,166,121,0.45)` | `rgba(4,138,191,0.5)` | Link pill hover background |
| `--color-detail-border` | `rgba(75,67,63,0.12)` | `rgba(4,138,191,0.2)` | Detail section top border |

## Tailwind Utility Mapping

The `@theme` block in `tailwind.css` creates these utility classes:

| Tailwind class prefix | Maps to |
|---|---|
| `bg-surface-*` | `--color-bg-*`, `--color-animated-bg-*`, `--color-panel-bg`, `--color-infocard-*` |
| `text-text-*` | `--color-text-*`, `--color-panel-text-*` |
| `border-stroke*` | `--color-border`, `--color-panel-border`, `--color-pre-border` |
| `text-link` / `bg-accent` | `--color-link`, `--color-accent` |
| `bg-card-*` | `--color-card-primary`, `--color-card-secondary`, `--color-card-accent` |
| `bg-detail-*` / `text-detail-*` | `--color-detail-*` |

## How to Add a New Colour

1. Add the CSS variable to `:root` (light) **and** `[data-theme="dark"]` in `tokens.css`
2. If you need a Tailwind utility, add an alias in `tailwind.css` `@theme` block
3. Use the Tailwind class or `var(--color-...)` in your component — nothing else
