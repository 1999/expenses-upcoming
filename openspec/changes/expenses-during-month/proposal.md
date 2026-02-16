## Why

Transition from a fixed HomePage view range to dynamic monthly expense views. This allows users to navigate through history and future expenses by month, providing a clearer organizational structure and easier access to specific timeframes.

## What Changes

- Replace the current HomePage with dynamic monthly pages located at `/:year/:month` (e.g., `/2026/01`).
- Implement a 302 redirect from the root URL (`/`) to the current year and month page (e.g., `/2026/02`).
- Update the NavBar to reflect the viewing month and year.
- Add monthly navigation controls (Previous/Next Month arrows) to the NavBar.
- Reposition the "Add expense" functionality from the NavBar to a button at the bottom of the list.

## Capabilities

### New Capabilities

- `monthly-expense-views`: Implementation of the monthly routing structure and page layout.
- `monthly-navigation`: Functionality for navigating between consecutive months.

### Modified Capabilities

- `expense-listing`: Update the expense listing logic to filter strictly by the selected month.
- `navigation-bar`: Modify the NavBar to support the new monthly context and navigation.

## Impact

- `src/pages/HomePage.tsx`: Refactor or replace with a dynamic monthly view.
- `src/utils/date.ts`: Add utilities for month-based date range calculations.
- `App.tsx` (or routing config): Update routes to support `/:year/:month` and root redirect.
- `src/components/NavBar.tsx`: Update UI for month/year display and navigation arrows.
