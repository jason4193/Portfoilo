# Portfolio Website

A modern, dual-mode portfolio website showcasing projects, competitions, community contributions, work experience, and academic achievements.

## Overview

This portfolio is designed with two distinct versions:

1. **TLDR Version** - A clean, text-focused portfolio optimized for quick information consumption without animations
2. **Animated 3D Version** (In Development) - An interactive 3D business card experience using Three.js

Both versions share the same content source and can be toggled seamlessly.

## Project Structure

```
src/
├── shared/              # Shared code used by both versions
│   ├── assets/         # Images and content.json
│   ├── components/     # Shared components (Avatar, ThemeToggle, MediaCollection, icons)
│   ├── data/           # Shared data exports (content, sections)
│   ├── stores/         # Zustand stores (portfolio mode, theme)
│   ├── utils/          # Shared utilities (anchors, colorExtraction, media, youtube)
│   ├── types/          # TypeScript type definitions
│   ├── config/         # Configuration (sections)
│   └── styles/         # Global styles (Tailwind, theme)
│
├── tldr/               # TLDR version specific code
│   ├── components/     # TLDR components (Header, Layout, ContentSection, etc.)
│   ├── hooks/          # TLDR hooks (useScrollSpy, useToc)
│   └── utils/           # TLDR utilities (scroll)
│
├── animated/            # Animated 3D version (to be implemented)
│   ├── components/     # 3D scene components
│   ├── hooks/          # 3D interaction hooks
│   └── utils/          # 3D utilities
│
└── main.tsx            # Entry point with mode routing
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management (mode, theme)
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

Portfolio content is managed through `src/shared/assets/content.json`. This single source of truth is used by both TLDR and animated versions.

### Content Structure

- **Header** - Name and introduction
- **Projects** - Personal and academic projects
- **Competitions** - CTF competitions and hackathons
- **Community Contributions** - Open source and volunteering
- **Working Experience** - Professional work history
- **Academic** - Education and academic achievements
- **Contact** - Email and social links

## Features

### TLDR Version

- Clean, readable layout
- Scroll spy navigation
- Table of contents (desktop sidebar, mobile bottom bar)
- Expandable sections for detailed information
- Media galleries with infinite scroll
- Dark/light theme toggle
- Responsive design

### Animated Version (In Development)

- Mode switching with loading screen transitions
- Foundation for 3D business card experience
- Interactive 3D business cards (planned)
- Scroll-based card flip animations (planned)
- Mobile-optimized 3D experience (planned)

## Documentation

- **[TLDR.md](./TLDR.md)** - Detailed documentation for TLDR version files
- **[SHARED.md](./SHARED.md)** - Documentation for shared components and utilities

## Contributing

This is a personal portfolio project. For questions or suggestions, please open an issue.

## License

© 2026 Jason Poon. All rights reserved.
