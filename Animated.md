# Animated Version Documentation

This document explains the purpose and functionality of each file in the animated (3D) version of the portfolio.

## Directory Structure

```
src/animated/
├── components/     # Animated-specific React components
├── hooks/          # Animated-specific React hooks
├── constants/      # Animated-specific constants
├── utils/          # Animated-specific utilities
└── assets/         # GLB and related assets
```

## Components

### Layout.tsx
**Location**: `src/animated/components/Layout.tsx`

**Purpose**: Wrapper component that provides the overall page structure for the animated version.

**Key Features**:
- Background color specific to animated mode
- Floating mode toggle + theme toggle
- Loading overlay wiring (delegated to props)
- Renders children (scene container)

---

### AnimatedScene.tsx
**Location**: `src/animated/components/AnimatedScene.tsx`

**Purpose**: Canvas container and scene composition.

**Key Features**:
- Wraps `<Canvas>` with camera and renderer config
- Mounts transition progress controller
- Renders `SceneRig`, `SectionFocusController`, and `Card`
- Handles WebGL context cleanup on unmount

---

### SceneRig.tsx
**Location**: `src/animated/components/SceneRig.tsx`

**Purpose**: Scene setup for lights, camera controls, and pose tracking.

**Key Features**:
- Ambient + directional lighting
- OrbitControls
- Camera pose tracking via `useCameraPoseTracker`
- Optional debug helpers (toggle via `window.setDebugLights`)

---

### Card.tsx
**Location**: `src/animated/components/Card.tsx`

**Purpose**: Renders the 3D business card and GSAP animation.

**Key Features**:
- Loads GLB model via `PortfolioCardModel`
- Applies base rotation/position
- Runs tilt-in and subtle flow animation

---

### SectionFocusController.tsx
**Location**: `src/animated/components/SectionFocusController.tsx`

**Purpose**: Bridges camera focus state with GSAP focus/restore animations.

**Key Features**:
- Reads focus target + active state from `useSectionSelectionStore`
- Orchestrates modal and dim overlay refs
- Delegates animation logic to `useSectionFocusAnimation`

---

### SectionModal.tsx
**Location**: `src/animated/components/SectionModal.tsx`

**Purpose**: Modal overlay container for section content.

**Key Features**:
- Renders section title + close actions
- Hosts section-specific content (e.g., About Me layout)
- Supports accent background colors per section

---

### AboutMeModalContent.tsx
**Location**: `src/animated/components/section-modals/AboutMeModalContent.tsx`

**Purpose**: Custom layout for the About Me modal section.

**Key Features**:
- Inline 3D avatar icon using an embedded `<Canvas>`
- Pulls intro content from `content.json` (`introAnimated`)
- Displays photo frame using `Jason_2.webp`

---

### ClickableGroup.tsx
**Location**: `src/animated/components/ClickableGroup.tsx`

**Purpose**: Wrapper for pointer interactions on 3D meshes.

**Key Features**:
- Unified hover/press/click handling
- Optional click callback passing world position
- Pointer event normalization for 3D objects

---

### TransitionProgressController.tsx
**Location**: `src/animated/components/TransitionProgressController.tsx`

**Purpose**: Coordinates transition progress updates and completion timing.

**Key Features**:
- Calls `useTransitionLoadProgress` + `useTransitionCleanup`
- Enforces minimum transition duration
- Triggers `completeTransition` safely with cleanup
- Updates shared loading progress store

---

## Hooks

### useTransitionLoadProgress.ts
**Location**: `src/animated/hooks/useTransitionLoadProgress.ts`

**Purpose**: Tracks real asset loading progress during transitions.

**Key Features**:
- Uses `useProgress` from drei
- Clamps progress to a minimum 2s display
- Configures renderer output color space and tone mapping

---

### useTransitionCleanup.ts
**Location**: `src/animated/hooks/useTransitionCleanup.ts`

**Purpose**: Runs timed progress, then disposes WebGL context.

**Key Features**:
- 2s progress animation before cleanup
- Disposes renderer and loses context safely

---

### useSectionFocusAnimation.ts
**Location**: `src/animated/hooks/useSectionFocusAnimation.ts`

**Purpose**: Handles focus/restore camera animation and modal overlay timing.

**Key Features**:
- GSAP timelines for focus + reset sequences
- Overlay and modal fade coordination
- Cleanup guards to prevent unmounted callbacks

---

### useCameraPoseTracker.ts
**Location**: `src/animated/hooks/useCameraPoseTracker.ts`

**Purpose**: Tracks camera position and writes to store at a throttled rate.

**Key Features**:
- Uses `useFrame` for throttled updates
- Epsilon check to avoid redundant writes
- Feeds `useCameraPoseStore` for focus guard logic

---

## Model Components

### PortfolioCardModel.tsx
**Location**: `src/animated/components/model/PortfolioCardModel.tsx`

**Purpose**: Assembles the GLTF card model with interactive back sections.

**Key Features**:
- Loads `PortfolioCard.glb` via `?url`
- Provides typed nodes/materials
- Wires section selection callbacks to back-face components

---

## Constants

### transition.ts
**Location**: `src/animated/constants/transition.ts`

**Purpose**: Shared constants for transition timing.

---

### card.ts
**Location**: `src/animated/constants/card.ts`

**Purpose**: Base rotation constants for the 3D card model.

---

### scene.ts
**Location**: `src/animated/constants/scene.ts`

**Purpose**: Focus animation offsets and timing values.

---

## Utils

### focusGuard.ts
**Location**: `src/animated/utils/focusGuard.ts`

**Purpose**: Guards focus activation based on camera position.

**Key Features**:
- Simple z-threshold check for "behind card" validation
- Used before triggering section focus animations

---

## Data Flow

```
main.tsx
  └── AnimatedApp
      └── Layout (animated shell)
          └── AnimatedScene
              ├── TransitionProgressController
              ├── SceneRig (lights + controls)
              ├── SectionFocusController (focus + modal overlays)
              └── Card (GLB + GSAP)

State Management:
  usePortfolioModeStore (shared/stores) → Mode switching
  useLoadingProgressStore (shared/stores) → Loading UI
  useSectionSelectionStore (shared/stores) → Focus target + selection
  useCameraPoseStore (shared/stores) → Camera pose for focus guard
```

## Key Design Patterns

1. **Component Composition**: Layout composes the page shell and scene container.
2. **Hooks for Logic**: Transition and cleanup logic lives in hooks.
3. **Canvas Boundary**: All 3D nodes render within `<Canvas>`.
4. **Explicit Transitions**: Minimum duration for loading/cleanup for smooth UX.

## Styling

All components use:
- Tailwind CSS utility classes
- CSS custom properties from `src/shared/styles/theme.css`
- Light/dark theme support via CSS variables

## Accessibility

- Uses semantic HTML for controls
- Buttons include `aria-label`
- Loading overlay disables pointer events after completion
