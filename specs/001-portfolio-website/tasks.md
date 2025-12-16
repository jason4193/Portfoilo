# Tasks: Portfolio Website

**Input**: Design documents from `/specs/001-portfolio-website/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Vite + React + TypeScript project (create package.json, vite.config.ts) at repo root
- [x] T002 [P] Add Tailwind config and PostCSS setup in `tailwind.config.cjs` and `postcss.config.cjs`
- [x] T003 [P] Add global Tailwind entry `src/styles/tailwind.css` with base/components/utilities imports
- [x] T004 [P] Create seed content file `src/assets/content.json` matching data-model fields
- [x] T005 [P] Add GitHub-like typography tokens and spacing in `src/styles/theme.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T006 Implement content types and loader hook in `src/hooks/useContent.ts`
- [x] T007 Add slug/id utility for headings in `src/utils/anchors.ts`
- [x] T008 Create layout shell with header/footer slots in `src/components/Layout.tsx`
- [x] T009 Implement markdown-like content renderer for sections in `src/components/ContentSection.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - View Portfolio Content (Priority: P1) 🎯 MVP

**Goal**: Render portfolio content in a GitHub-like markdown style from the JSON source.
**Independent Test**: Load the page and verify headings, paragraphs, lists, code blocks, and links render with correct hierarchy and styling.

### Implementation for User Story 1

- [x] T010 [US1] Wire content renderer into `src/main.tsx` using `Layout` and `ContentSection`
- [x] T011 [P] [US1] Style code blocks and inline code to GitHub-like appearance in `src/styles/theme.css`
- [x] T012 [P] [US1] Add unit test for content rendering fallback in `tests/unit/content.test.tsx`

**Checkpoint**: User Story 1 independently testable.

---

## Phase 4: User Story 2 - Responsive Layout Across Devices (Priority: P2)

**Goal**: Ensure layout adapts across desktop/tablet/mobile with readable widths and accessible navigation.
**Independent Test**: Resize viewport (320–2560px) and verify layout reflows without horizontal scroll; navigation remains accessible.

### Implementation for User Story 2

- [x] T013 [US2] Implement responsive container widths and spacing in `src/components/Layout.tsx` and `src/styles/theme.css`
- [x] T014 [P] [US2] Add viewport-based typography scaling in `src/styles/theme.css`
- [x] T015 [P] [US2] Adjust TOC/nav positioning breakpoints in `src/components/Layout.tsx`

**Checkpoint**: User Story 1 + 2 independently testable.

---

## Phase 5: User Story 3 - Toggle Dark and Light Mode (Priority: P3)

**Goal**: Allow users to switch themes; persist preference and respect system default.
**Independent Test**: Toggle updates UI immediately; preference saved; first visit respects system preference.

### Implementation for User Story 3

- [x] T016 [US3] Implement theme provider with system default and persistence in `src/hooks/useTheme.ts`
- [x] T017 [US3] Add theme toggle control and wire to layout in `src/components/ThemeToggle.tsx`
- [x] T018 [P] [US3] Add unit test for theme persistence and system default in `tests/unit/theme.test.ts`

**Checkpoint**: User Story 1 + 2 + 3 independently testable.

---

## Phase 6: User Story 4 - Navigate with Table of Contents and Progress Indicator (Priority: P4)

**Goal**: Provide a Notion-like right-edge rail that shows current section inline, reveals full list on hover, and supports click-to-jump with scroll progress.
**Independent Test**: Hover reveals sections; click jumps to anchors; rail highlights current section during scroll; hides/repositions on small screens.

### Implementation for User Story 4

- [x] T019 [US4] Build heading extraction and TOC data builder in `src/hooks/useToc.ts`
- [x] T020 [US4] Implement right-edge progress rail with hover reveal in `src/components/TocRail.tsx`
- [x] T021 [P] [US4] Wire scroll spy/highlight behavior in `src/hooks/useScrollSpy.ts`
- [x] T022 [P] [US4] Implement smooth click-to-jump handling in `src/components/TocRail.tsx`
- [x] T023 [P] [US4] Add unit test for scroll spy highlighting in `tests/unit/scrollspy.test.ts`

**Checkpoint**: All user stories independently testable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements and quality checks.

- [x] T024 [P] Run accessibility/contrast pass and adjust tokens in `src/styles/theme.css`
- [x] T025 [P] Verify bundle size/purge config and trim unused CSS in `tailwind.config.cjs`
- [x] T026 Update quickstart with any final steps or notes in `specs/001-portfolio-website/quickstart.md`
- [x] T027 [P] Measure page load/build output and tune assets to meet 2s load goal (SC-006)
- [x] T028 [P] Validate rail hover reveal timing (<200ms) and adjust CSS/JS in `src/components/TocRail.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1) → Foundational (Phase 2) → US1 → US2 → US3 → US4 → Polish
- User stories can run in parallel after Phase 2 if staffing allows, but priority order is P1→P2→P3→P4.

### User Story Dependencies

- US1: none (first MVP)
- US2: depends on foundational only
- US3: depends on foundational; can start after US1 UI shell exists
- US4: depends on foundational and anchors/utilities; integrates with layout/sections

### Parallel Opportunities

- [P] tasks in Setup and Foundational can run concurrently.
- Within each story, styling/tests marked [P] can run in parallel with other story tasks.
- Different stories can be developed in parallel after Phase 2 if resourced.

## Implementation Strategy

- Deliver MVP with US1 after Phases 1–3; validate rendering and typography.
- Add responsiveness (US2), then theme toggle (US3), then TOC/progress (US4).
- Keep bundle lean; avoid adding dependencies beyond Vite/React/Tailwind.
- Run unit tests for content/theme/scroll as they are added.
