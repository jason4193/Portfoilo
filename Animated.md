# Animated Version Documentation

This document explains the purpose and functionality of each file in the animated (3D) version of the portfolio.

## Directory Structure

```
src/animated/
├── components/     # Animated-specific React components
├── hooks/          # Animated-specific React hooks
├── constants/      # Animated-specific constants
├── models/         # GLTFJSX generated models
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
- Renders `SceneRig` and `Card`
- Handles WebGL context cleanup on unmount

---

### SceneRig (StudioLight.tsx)
**Location**: `src/animated/components/StudioLight.tsx`

**Purpose**: Scene setup for lights and camera controls.

**Key Features**:
- Ambient + directional lighting
- OrbitControls
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

### TransitionProgressController.tsx
**Location**: `src/animated/components/TransitionProgressController.tsx`

**Purpose**: Coordinates transition progress updates and completion timing.

**Key Features**:
- Calls `useTransitionLoadProgress` + `useTransitionCleanup`
- Enforces minimum transition duration
- Triggers `completeTransition` safely with cleanup

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

## Models

### PortfolioCardModel.tsx
**Location**: `src/animated/models/PortfolioCardModel.tsx`

**Purpose**: GLTFJSX-generated component for the card model.

**Key Features**:
- Loads `PortfolioCard.glb` via `?url`
- Provides typed nodes/materials

---

## Constants

### transition.ts
**Location**: `src/animated/constants/transition.ts`

**Purpose**: Shared constants for transition timing.

---

## Data Flow

```
main.tsx
  └── AnimatedApp
      └── Layout (animated shell)
          └── AnimatedScene
              ├── TransitionProgressController
              ├── SceneRig (lights + controls)
              └── Card (GLB + GSAP)
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
