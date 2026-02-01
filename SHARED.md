# Shared Components & Utilities Documentation

This document explains the purpose and functionality of shared code used by both TLDR and animated versions of the portfolio.

## Directory Structure

```
src/shared/
├── assets/         # Images and content data
├── components/    # Shared React components
├── hooks/         # Shared React hooks
├── utils/         # Shared utility functions
├── types/         # TypeScript type definitions
├── config/        # Configuration files
└── styles/         # Global stylesheets
```

## Assets

### content.json
**Location**: `src/shared/assets/content.json`

**Purpose**: Single source of truth for all portfolio content.

**Structure**:
```typescript
{
  header: string              // Portfolio owner's name
  intro: string               // Introduction text
  projects: Project[]         // Array of projects
  competitions: CompetitionExperience[]
  communityContributions: CommunityContributionExperience[]
  workingExperience: WorkingExperience[]
  academic: AcademicExperience[]
  contact: Contact           // Email and social links
  footer: string             // Footer text
}
```

**Used By**: Both TLDR and animated versions via `useContent` hook.

---

## Components

### Avatar.tsx
**Location**: `src/shared/components/Avatar.tsx`

**Purpose**: Interactive profile picture component with flip animation.

**Features**:
- Displays front and back profile images
- Click to flip between images
- Keyboard accessible (Enter/Space)
- 3D flip animation using CSS transforms
- Responsive sizing

**Props**:
- `className?: string` - Custom CSS classes (default: "w-20 h-20 sm:w-26 sm:h-26")

**Assets Used**:
- `shared/assets/Jason_1.JPG` - Front image
- `shared/assets/Jason_2.JPG` - Back image

---

### ThemeToggle.tsx
**Location**: `src/shared/components/ThemeToggle.tsx`

**Purpose**: Button to toggle between light and dark themes.

**Features**:
- Animated sun/moon icon transition
- Persists theme preference in localStorage
- Respects system preference on first visit
- Smooth icon rotation and scaling
- Accessible with ARIA labels

**Dependencies**:
- `shared/hooks/useTheme` - Theme state management
- `shared/components/icons` - SunIcon, MoonIcon

---

### MediaCollection.tsx
**Location**: `src/shared/components/MediaCollection.tsx`

**Purpose**: Displays a collection of images, videos, and GIFs with navigation.

**Features**:
- **Desktop**: Infinite horizontal scroll for 3+ items, centered for 1-2 items
- **Mobile**: Swipeable single-item view with navigation dots
- YouTube video support with react-youtube
- Dominant color extraction for image backgrounds
- Lazy loading for images
- Navigation dots for multiple items

**Props**:
- `media?: Media[]` - Array of media items

**Media Types Supported**:
- `image` - Regular images
- `video` - Video files and YouTube URLs
- `gif` - Animated GIFs

**Dependencies**:
- `shared/types/content` - Media type definition
- `shared/utils/media` - Media URL resolution
- `shared/utils/colorExtraction` - Dominant color extraction
- `shared/utils/youtube` - YouTube video ID extraction
- `react-youtube` - YouTube player component

---

### Icons
**Location**: `src/shared/components/icons/`

**Purpose**: SVG icon components for consistent iconography.

**Icons Available**:
- `EmailIcon.tsx` - Email icon
- `GitHubIcon.tsx` - GitHub logo
- `LinkedInIcon.tsx` - LinkedIn logo
- `LinkIcon.tsx` - Generic link icon
- `SunIcon.tsx` - Sun icon (light mode)
- `MoonIcon.tsx` - Moon icon (dark mode)
- `MobileNavIcons.tsx` - Section navigation icons (Projects, Competitions, Community, Work, Education)

**Common Props** (via `IconProps.ts`):
- `className?: string` - CSS classes
- `aria-label?: string` - Accessibility label
- `aria-hidden?: boolean` - Hide from screen readers

**Export**: All icons exported via `index.ts`

---

## Hooks

### useContent.ts
**Location**: `src/shared/hooks/useContent.ts`

**Purpose**: Loads and processes portfolio content from content.json.

**Returns**:
```typescript
{
  content: PortfolioContent | null    // Full content object
  sections: ContentSection[]          // Processed sections for navigation
  loading: boolean                     // Loading state
  error: string | null                 // Error message if any
}
```

**Features**:
- Loads content.json on mount
- Generates sections using configuration-driven approach
- Handles loading and error states
- Processes all content types (projects, competitions, etc.)

**Dependencies**:
- `shared/assets/content.json` - Content source
- `shared/types/content` - Type definitions
- `shared/config/sections` - Section generation config

**Used By**: Both TLDR and animated versions

---

### useTheme.ts
**Location**: `src/shared/hooks/useTheme.ts`

**Purpose**: Manages application theme (light/dark mode).

**Returns**:
```typescript
{
  theme: ThemeMode                    // "light" | "dark"
  setTheme: (theme: ThemeMode) => void // Set theme function
}
```

**Features**:
- Persists theme in localStorage
- Respects system preference on first visit
- Applies theme to document root via `data-theme` attribute
- Defaults to light mode

**Used By**: `ThemeToggle` component

---

## Utils

### anchors.ts
**Location**: `src/shared/utils/anchors.ts`

**Purpose**: Generates URL-friendly anchor IDs for sections.

**Functions**:
- `slugify(text: string, index?: number): string` - Converts text to URL-friendly slug
- `generateAnchorId(title: string, index?: number): string` - Generates anchor ID
- `getSectionAnchorId(sectionId: string, title?: string): string` - Gets anchor ID from section

**Features**:
- Removes special characters
- Converts to lowercase
- Replaces spaces with hyphens
- Optional index for uniqueness

**Used By**: TOC generation, section headers, navigation

---

### colorExtraction.ts
**Location**: `src/shared/utils/colorExtraction.ts`

**Purpose**: Extracts dominant color from images for use as background colors.

**Functions**:
- `getDominantColor(imageUrl: string, quality?: number): Promise<string>` - Returns hex color

**Features**:
- Uses Canvas API for image analysis
- Downsampling for performance (configurable quality)
- Color quantization for grouping
- Skips transparent pixels
- Returns hex color string (e.g., "#ff5733")

**Used By**: `MediaCollection` component for image backgrounds

**Performance**: Optimized with downsampling and quantization to handle many images efficiently

---

### media.ts
**Location**: `src/shared/utils/media.ts`

**Purpose**: Resolves media asset URLs from content.json paths.

**Functions**:
- `getMediaUrl(src: string): string` - Returns resolved URL for media asset

**Features**:
- Handles absolute URLs (external links)
- Extracts filename from various path formats
- Uses Vite's `new URL()` with `import.meta.url` for dynamic imports
- Falls back to original src on error

**Used By**: `MediaCollection` component

---

### youtube.ts
**Location**: `src/shared/utils/youtube.ts`

**Purpose**: Extracts YouTube video IDs from various URL formats.

**Functions**:
- `extractYouTubeVideoId(url: string): string | null` - Returns video ID or null

**Supported Formats**:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://youtube.com/shorts/VIDEO_ID`
- Direct video ID string

**Used By**: `MediaCollection` component for YouTube video rendering

---

## Types

### content.ts
**Location**: `src/shared/types/content.ts`

**Purpose**: TypeScript type definitions for portfolio content structure.

**Main Types**:
- `PortfolioContent` - Root content structure
- `Project` - Project information
- `CompetitionExperience` - Competition entry
- `CommunityContributionExperience` - Community contribution
- `WorkingExperience` - Work experience
- `AcademicExperience` - Education/academic
- `ContentSection` - Section for navigation/TOC
- `Media` - Media item (image, video, gif)
- `Link` - External link

**Used By**: All components and hooks that work with content

---

## Config

### sections.ts
**Location**: `src/shared/config/sections.ts`

**Purpose**: Configuration for generating sections from content data.

**Functions**:
- `generateSectionGroup<T>(config: SectionConfig<T>, items: T[]): ContentSection[]` - Generates parent + item sections

**Section Configs**:
- `communityContributions` - Community contributions config
- `competitions` - Competitions config
- `projects` - Projects config
- `workingExperience` - Work experience config
- `academic` - Academic/education config

**Features**:
- Configuration-driven section generation
- Consistent structure across content types
- Parent section + item sections pattern

**Used By**: `useContent` hook for section generation

---

## Styles

### tailwind.css
**Location**: `src/shared/styles/tailwind.css`

**Purpose**: Tailwind CSS import and configuration.

**Content**: `@import "tailwindcss";`

**Used By**: Both versions via main.tsx

---

### theme.css
**Location**: `src/shared/styles/theme.css`

**Purpose**: Global theme variables and base styles.

**Features**:
- CSS custom properties for colors, typography, spacing
- Light and dark theme definitions
- GitHub-like color scheme
- WCAG AA compliant contrast ratios
- Responsive typography scaling
- Base typography styles (headings, paragraphs, links, code)

**Color Variables**:
- `--color-bg-primary` - Main background
- `--color-bg-secondary` - Secondary background
- `--color-text-primary` - Main text
- `--color-text-secondary` - Secondary text
- `--color-border` - Border color
- `--color-link` - Link color
- `--color-link-hover` - Link hover color

**Typography Variables**:
- Font sizes (xs, sm, base, lg, xl, 2xl, 3xl, 4xl)
- Line heights (tight, normal, relaxed)
- Font weights (normal, medium, semibold, bold)
- Spacing scale

**Theme Application**: Applied via `data-theme="light"` or `data-theme="dark"` on document root

---

## Data Flow

```
content.json (shared/assets)
    ↓
useContent (shared/hooks)
    ↓
    ├── content → Components
    └── sections → Navigation/TOC
        ↓
    useToc (tldr/hooks) → TOC items
```

## Reusability Strategy

1. **Single Source of Truth**: `content.json` is the only content source
2. **Shared Types**: Type definitions ensure consistency
3. **Shared Hooks**: Business logic reused across versions
4. **Shared Components**: UI components reused where applicable
5. **Shared Utils**: Common functionality centralized
6. **Shared Styles**: Consistent theming and design system

## Usage in Versions

### TLDR Version Uses:
- All shared components (Avatar, ThemeToggle, MediaCollection, icons)
- All shared hooks (useContent, useTheme)
- All shared utils (anchors, colorExtraction, media, youtube)
- All shared types
- All shared config
- All shared styles

### Animated Version Will Use:
- Shared hooks (useContent, useTheme)
- Shared utils (media, youtube, colorExtraction)
- Shared types
- Shared config
- Shared styles
- Shared components (MediaCollection, icons) - in card modals
- Shared assets (content.json)

## Best Practices

1. **Keep Shared Code Generic**: Avoid version-specific logic in shared code
2. **Type Safety**: Use shared types consistently
3. **Content Updates**: Only update `content.json` for content changes
4. **Theme Consistency**: Use CSS variables from theme.css
5. **Icon Consistency**: Use shared icon components
