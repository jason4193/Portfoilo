# Implementation Plan: Portfolio Website

**Branch**: `001-portfolio-website` | **Date**: 2025-01-27 | **Spec**: `/specs/001-portfolio-website/spec.md`  
**Input**: Feature specification from `/specs/001-portfolio-website/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command.

## Summary

Single-page, static portfolio that renders markdown-like content from one JSON asset. Minimal GitHub-like styling, responsive layout, dark/light themes, and a Notion-like right-edge rail for ToC + progress with hover-revealed section list and click-to-jump. Frontend-only, lightweight build (no backend).

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (ESNext)  
**Primary Dependencies**: Vite + React + TailwindCSS (lightweight build, easy theming)  
**Storage**: None (static JSON asset served with site)  
**Testing**: Vitest + Testing Library (smoke/UI), Playwright optional for scroll/TOC checks  
**Target Platform**: Modern evergreen browsers (desktop/tablet/mobile)  
**Project Type**: Single-page web app (static export)  
**Performance Goals**: Initial load < 2s on broadband; interactions (theme toggle, click-to-jump) < 100ms/500ms as per spec  
**Constraints**: Frontend-only; minimal bundle size; WCAG AA contrast; responsive 320–2560px; Notion-like rail hover reveal < 200ms  
**Scale/Scope**: Single author portfolio, content up to ~10k words, no auth/backends

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- Principles (v1.0.0): minimal, clear delivery; good practices without bloat; comments only when needed.
- Delivery constraints: static-only, lightweight bundle, accessibility and responsiveness honored.
- Status: No violations; chosen stack (Vite/React/Tailwind, static JSON) complies. Keep changes small and avoid over-engineering.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── assets/content.json        # Single JSON content source
├── components/                # UI components (content renderer, TOC rail, theme toggle)
├── hooks/                     # Theme + scroll/TOC sync logic
├── styles/                    # Tailwind config / globals
└── main.tsx                   # App entry

tests/
├── unit/                      # Component logic tests (Vitest)
└── e2e/                       # Optional Playwright for scroll/TOC/toggle
```

**Structure Decision**: Single frontend project using Vite + React + Tailwind; no backend directories.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
