# Design: Monthly Half-Month Filtering

## Context

The application currently uses relative windows (next 7, 14, 30 days) for expense viewing. We are moving to a calendar-based system where users view expenses in two discrete halves of the current month.

## Goals / Non-Goals

**Goals:**

- Provide a clear, calendar-aligned view of monthly expenses.
- Simplify UI by removing URL state for filtering.
- Update data layer to support arbitrary date range filtering.

**Non-Goals:**

- Viewing previous or future months (out of scope for this change).
- Custom range selection.

## Decisions

- **Range Definitions**:
  - Range A: Day 1 to 14 (inclusive).
  - Range B: Day 15 to the last day of the month (inclusive).
- **Storage Layer Interface**: Refactor `StorageService.listExpenses` to accept `startDate: Date` and `endDate: Date`. This allows the UI to define the calendar boundaries.
- **Header Logic**: Dynamically calculate the month name (e.g., "February") for the Navbar title based on the system date.
- **Default State**: At runtime, check the current day of the month. If `<= 14`, default to Range A; otherwise, default to Range B.
- **URL Management**: Remove `useSearchParams` logic for filtering to simplify the component and focus on direct user interaction.

## Risks / Trade-offs

- **Month Boundaries**: Must correctly handle 28, 29, 30, and 31-day months.
- **Timezone Safety**: Ensure date calculations are consistent with the user's local calendar view.
