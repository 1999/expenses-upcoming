# Proposal: Setup Project

## Motivation and Context

The goal is to initialize the "Expenses Coming" project, a mobile-first web application for tracking upcoming expenses. This proposal migrates the initial project requirements from the legacy `vibe/setup-project.md` into the OpenSpec workflow.

## What Changes

- Initialize the core application structure using React, TypeScript, and Vite.
- Set up a mobile-first UI using Konsta UI and Tailwind CSS.
- Implement a data layer using IndexedDB (with the `sklad` library).
- Configure routing, error handling (404/500), and deployment to GitHub Pages.

## Capabilities

### New Capabilities

- `app-shell`: React + Vite + Konsta UI base structure with mobile-first design.
- `expense-storage`: Local data persistence using IndexedDB and `sklad`.
- `expense-views`: UI for viewing upcoming expenses (week/2 weeks/month) and adding new ones.
- `navigation-routing`: React Router integration for page navigation.
- `error-safety`: Generic 404 and 500 error pages.

### Modified Capabilities

- None (Initial setup)

## Impact

- **Frontend**: New React application structure.
- **Styling**: Tailwind CSS and Konsta UI for components.
- **Data**: IndexedDB for local storage.
- **Deployment**: GitHub Actions and GitHub Pages configuration.
