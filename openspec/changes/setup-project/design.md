# Design: Project Setup

## Context

The "Expenses Coming" project is a new initiative to provide a mobile-focused view of recurring expenses. The initial phase involves setting up the core infrastructure, styling, and local storage mechanisms.

## Goals / Non-Goals

**Goals:**

- Establish a consistent tech stack (React, Vite, TypeScript).
- Implement a mobile-first design system using Konsta UI.
- Use IndexedDB for offline-first data persistence.
- Set up automated deployment to GitHub Pages.

**Non-Goals:**

- Backend development (at this stage).
- User authentication.
- Complex data synchronization.

## Decisions

- **UI Framework**: Konsta UI was chosen for its mobile-native look and feel on top of Tailwind CSS.
- **Storage**: IndexedDB (via `sklad`) is used to ensure data persists across sessions without a backend.
- **Routing**: Client-side routing with React Router for a seamless SPA experience.
- **Deployment**: Leverages GitHub Actions for building and pushing to GitHub Pages.

## Risks / Trade-offs

- **Offline Sync**: Relying solely on IndexedDB means data is local to the device until sync is implemented.
- **Learning Curve**: Team members need to be familiar with Konsta UI's specific component patterns.
