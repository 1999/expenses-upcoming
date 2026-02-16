## Context

Currently, the application has a single `HomePage` that displays expenses in fixed bi-weekly ranges for the current month. The user wants to transition to a more flexible, month-by-month navigation system where each month has its own dedicated URL.

## Goals / Non-Goals

**Goals:**

- Implement dynamic routing for monthly expense pages (`/:year/:month`).
- Provide navigation controls to move between months.
- Automatically redirect the root URL to the current month's page.
- Standardize the monthly view UI across all timeframes.
- Relocate the "Add Expense" action to the bottom of the expense list.

**Non-Goals:**

- Supporting custom date ranges outside of full months.
- Modifying the underlying storage service logic (database remains the same).
- Implementing multi-year views or "year at a glance".

## Decisions

### 1. URL Structure and Routing

- Monthly pages will use the format `/:year/:month` (e.g., `/2026/01`).
- Months in URLs will be prepended by "0" (e.g., `01`, `02`, `03`, etc.).
- The root path `/` will trigger a logic that identifies the current year and month, then performs a `302-equivalent` client-side redirect (using `Navigate` from `react-router-dom`).

### 2. Page Component Refactoring

- `HomePage.tsx` will be refactored into `MonthlyExpensePage.tsx`.
- The component will use `useParams` to retrieve the `year` and `month`.
- It will calculate the start and end of the specified month to fetch expenses.

### 3. Navigation Controls

- The `NavBar` will explicitly show the "Month Year" title.
- `left` slot of `NavBar`: Icon button (arrow-left) navigating to the previous month.
- `right` slot of `NavBar`: Icon button (arrow-right) navigating to the next month.
- The "Add" button will be removed from the `NavBar`.

### 4. Add Expense Button Position

- A new "Add Expense" button will be appended at the end of the `List` component in `MonthlyExpensePage.tsx`.
- This ensures the primary action is always visible after reviewing the current month's items.

### 5. Date Utilities Expansion

- `src/utils/date.ts` will be updated to include:
  - `getFullMonthRange(year: number, monthName: string)`: Returns `{ start, end }`.
  - `getSiblingMonth(year: number, monthName: string, offset: number)`: Returns `{ year, monthName }` for navigating left/right.
  - `formatMonthlyTitle(year: number, monthName: string)`: Returns `Month Year` (e.g., "January 2026").

## Risks / Trade-offs

- **Invalid Months**: Need to handle cases where a user types `/2026/13` in the URL. We'll redirect to the `NotFoundPage`.
- **Performance**: Fetching expenses for a whole month might be slower than bi-weekly, but given the current data volume, this is negligible.
