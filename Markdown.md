# Markdown Version Documentation

This document explains the purpose and functionality of each file in the Markdown version of the portfolio.

## Directory Structure

```
src/markdown/
├── components/     # Markdown-specific React components
├── hooks/         # Markdown-specific React hooks
└── utils/         # Markdown-specific utility functions
```

## Components

### Header.tsx
**Location**: `src/markdown/components/Header.tsx`

**Purpose**: The main header component for the Markdown version. Displays the portfolio owner's name, avatar, social links, theme toggle, and introduction text.

**Key Features**:
- Uses shared `Avatar` component for profile picture
- Uses shared `ThemeToggle` component
- Displays social media icons (Email, GitHub, LinkedIn)
- Shows introduction text from content.json
- Loading state with skeleton UI

**Dependencies**:
- `shared/data/content` - Portfolio content data
- `shared/components/Avatar` - Profile picture
- `shared/components/ThemeToggle` - Theme switcher
- `shared/components/icons` - Social media icons

---

### Layout.tsx
**Location**: `src/markdown/components/Layout.tsx`

**Purpose**: Wrapper component that provides the overall page structure for the Markdown version.

**Key Features**:
- Includes Header component
- Main content area with max-width constraint
- Footer support (optional)
- Responsive padding and spacing

**Structure**:
- Header at top
- Main content area (flex-1)
- Optional footer at bottom

---

### ContentSection.tsx
**Location**: `src/markdown/components/ContentSection.tsx`

**Purpose**: Router component that renders different section types based on the section type.

**Handles**:
- Parent sections (projects, competitions, etc.) → Renders `SectionHeader`
- Project items → Renders `ProjectItem`
- Experience items (competitions, community, work) → Renders `ExperienceItem`
- Academic items → Renders `AcademicItem`
- Footer → Renders footer text

**Dependencies**:
- `SectionHeader` - For parent section headers
- `ProjectItem` - For project details
- `ExperienceItem` - For experience details
- `AcademicItem` - For academic details

---

### ProjectItem.tsx
**Location**: `src/markdown/components/ProjectItem.tsx`

**Purpose**: Displays individual project information with expandable details.

**Features**:
- Project title, date, tech stack
- Description
- Expandable section for:
  - Media gallery (images, videos)
  - Achievements list
- External links (GitHub, demo, etc.)
- Click to expand/collapse

**Dependencies**:
- `shared/components/MediaCollection` - Media gallery
- `shared/components/icons` - Link icons
- `shared/utils/anchors` - Anchor ID generation

---

### ExperienceItem.tsx
**Location**: `src/markdown/components/ExperienceItem.tsx`

**Purpose**: Displays competition, community contribution, or work experience entries.

**Features**:
- Title, date, role (if applicable)
- Description
- Expandable section for:
  - Media gallery
  - Achievements list
- External links
- Click to expand/collapse

**Handles**:
- Competition experiences
- Community contribution experiences
- Working experiences

**Dependencies**:
- `shared/components/MediaCollection` - Media gallery
- `shared/components/icons` - Link icons
- `shared/utils/anchors` - Anchor ID generation

---

### AcademicItem.tsx
**Location**: `src/markdown/components/AcademicItem.tsx`

**Purpose**: Displays academic/education information.

**Features**:
- Institution name
- Program/degree
- Summary
- Expandable achievements list
- Media gallery support

**Dependencies**:
- `shared/components/MediaCollection` - Media gallery
- `shared/utils/anchors` - Anchor ID generation

---

### SectionHeader.tsx
**Location**: `src/markdown/components/SectionHeader.tsx`

**Purpose**: Renders section headers (e.g., "Projects", "Competitions") with visual separators.

**Features**:
- Large, bold section title
- Top and bottom borders for visual separation
- Anchor ID for navigation

**Dependencies**:
- `shared/utils/anchors` - Anchor ID generation

---

### TocRail.tsx
**Location**: `src/markdown/components/TocRail.tsx`

**Purpose**: Desktop table of contents navigation rail on the right side of the screen.

**Features**:
- Fixed position on right side
- Hover to reveal full TOC list
- Horizontal bars when not hovering
- Active section highlighting
- Parent section highlighting for subsections
- Smooth scrolling to sections
- Auto-scrolls to active section on hover

**Dependencies**:
- `markdown/hooks/useScrollSpy` - Tracks current section
- `markdown/hooks/useToc` - TOC items
- `markdown/utils/scroll` - Scroll utilities

---

### MobileProgressIndicator.tsx
**Location**: `src/markdown/components/MobileProgressIndicator.tsx`

**Purpose**: Mobile navigation bar at the bottom showing top-level sections with icons.

**Features**:
- Fixed bottom position
- Icon-based navigation
- Active section highlighting
- Smooth scrolling to sections
- Responsive (only visible on mobile)

**Sections Mapped**:
- Projects → Projects icon
- Competitions → Awards icon
- Community Contributions → Community icon
- Working Experience → Work icon
- Education → Education icon

**Dependencies**:
- `markdown/hooks/useScrollSpy` - Tracks current section
- `markdown/hooks/useToc` - TOC items
- `shared/components/icons/MobileNavIcons` - Section icons

---

## Hooks

### useScrollSpy.ts
**Location**: `src/markdown/hooks/useScrollSpy.ts`

**Purpose**: Tracks which section is currently in view based on scroll position.

**Returns**:
- `currentSectionId` - ID of the currently visible section
- `progressPercent` - Scroll progress percentage (0-100)

**Features**:
- Throttled scroll event handling (requestAnimationFrame)
- Viewport-based detection
- Prefers sections in top third of viewport
- Handles window resize

**Used By**:
- `TocRail` - Highlights active section
- `MobileProgressIndicator` - Highlights active section

---

### useToc.ts
**Location**: `src/markdown/hooks/useToc.ts`

**Purpose**: Generates table of contents items from content sections.

**Returns**:
- `tocItems` - Array of TOC items with id, title, level, and DOM element reference

**Features**:
- Filters sections with titles
- Supports up to level 3 headings
- Attaches DOM element references for scrolling
- Generates anchor IDs using slugify

**Dependencies**:
- `shared/types/content` - ContentSection type
- `shared/utils/anchors` - Anchor ID generation

**Used By**:
- `TocRail` - Renders TOC navigation
- `MobileProgressIndicator` - Renders mobile navigation

---

## Utils

### scroll.ts
**Location**: `src/markdown/utils/scroll.ts`

**Purpose**: Utility functions for scrolling operations in the TOC navigation.

**Functions**:
- `scrollToActiveSection(container, activeSectionId)` - Scrolls a scrollable container to center the active section button

**Features**:
- Calculates scroll position to center active item
- Only scrolls if item is not fully visible
- Smooth scrolling behavior

**Used By**:
- `TocRail` - Auto-scrolls TOC list to active section

---

## Data Flow

```
main.tsx
  ├── usePortfolioModeStore (shared/stores) → Manages markdown/animated mode
  ├── useThemeStore (shared/stores) → Manages theme
  │
  └── MarkdownApp
      ├── content, sections (shared/data) → Portfolio content
      ├── useToc (markdown) → Generates TOC from sections
      │
      └── Layout
          ├── Header → Displays name, avatar, intro
          └── Main Content
              └── ContentSection (for each section)
                  ├── SectionHeader (parent sections)
                  ├── ProjectItem (project items)
                  ├── ExperienceItem (experience items)
                  └── AcademicItem (academic items)
          │
          ├── TocRail (desktop) → Right sidebar navigation
          └── MobileProgressIndicator (mobile) → Bottom navigation
```

## Key Design Patterns

1. **Component Composition**: Layout composes Header and content sections
2. **Hooks for Logic**: Business logic separated into custom hooks
3. **Shared Utilities**: Common functionality in shared/ directory
4. **Expandable Sections**: Collapsible details for better UX
5. **Scroll Spy**: Active section tracking for navigation
6. **Responsive Design**: Different navigation for desktop (TocRail) and mobile (MobileProgressIndicator)

## Styling

All components use:
- Tailwind CSS utility classes
- CSS custom properties from `shared/styles/theme.css`
- Responsive breakpoints (sm, md, lg)
- Dark/light theme support via CSS variables

## Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader friendly
