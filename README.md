# Portfolio Website

A modern, dual-mode portfolio website showcasing projects, competitions, community contributions, work experience, and academic achievements.

## Overview

This portfolio is designed with two distinct versions:

1. **Markdown Version** - A clean, text-focused portfolio optimized for quick information consumption without animations
2. **Animated 3D Version** (In Development) - An interactive 3D business card experience using Three.js

Both versions share the same content source and can be toggled seamlessly.

## Project Structure

```
src/
├── shared/              # Shared code used by both versions
│   ├── assets/         # Images and content.json
│   ├── components/     # Shared components (Avatar, ThemeToggle, MediaCollection, ModeToggle, icons)
│   ├── data/           # Shared data exports (content, sections)
│   ├── stores/         # Zustand stores (mode, theme, loading, selection, camera pose)
│   ├── utils/          # Shared utilities (anchors, colorExtraction, media, youtube)
│   ├── types/          # TypeScript type definitions
│   ├── config/         # Configuration (sections)
│   └── styles/         # Global styles (Tailwind, theme)
│
├── markdown/           # Markdown version specific code
│   ├── components/     # Markdown components (Header, Layout, ContentSection, etc.)
│   ├── hooks/          # Markdown hooks (useScrollSpy, useToc)
│   └── utils/          # Markdown utilities (scroll)
│
├── animated/            # Animated 3D version
│   ├── assets/         # GLB assets
│   ├── components/     # 3D scene components + section modals + model parts
│   ├── constants/      # Scene/card/transition constants
│   ├── hooks/          # 3D interaction + animation hooks
│   └── utils/          # 3D utilities
│
└── main.tsx            # Entry point with mode routing
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management (mode, theme, loading, selection, camera pose)
- **Three.js** - 3D graphics for animated version
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers
- **GSAP** - Animation library with ScrollTrigger

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Content Management

Portfolio content is managed through `src/shared/assets/content.json`. This single source of truth is used by both markdown and animated versions.

### Content Structure

- **Header** - Name and introduction (markdown + animated variants)
- **Projects** - Personal and academic projects
- **Competitions** - CTF competitions and hackathons
- **Community Contributions** - Open source and volunteering
- **Working Experience** - Professional work history
- **Academic** - Education and academic achievements
- **Contact** - Email and social links

## Features

### Markdown Version

- Clean, readable layout
- Scroll spy navigation
- Table of contents (desktop sidebar, mobile bottom bar)
- Expandable sections for detailed information
- Media galleries with infinite scroll
- Dark/light theme toggle
- Responsive design
- Markdown intro supports **bold** keywords and mobile "Read more"

### Animated Version

- Mode switching with loading screen transitions
- Interactive 3D business card with tilt/flow animation
- Section focus animation with modal overlay + dim/blur
- Section-specific modal content (About Me layout)
- Camera pose tracking to guard focus direction

## Documentation

- **[Markdown.md](./Markdown.md)** - Detailed documentation for Markdown version files
- **[Animated.md](./Animated.md)** - Detailed documentation for Animated version files
- **[SHARED.md](./SHARED.md)** - Documentation for shared components and utilities

## Contributing

This is a personal portfolio project. For questions or suggestions, please open an issue.

## License

© 2026 Jason Poon. All rights reserved.
