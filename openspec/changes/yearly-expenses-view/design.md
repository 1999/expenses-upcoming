## Context

The application currently only supports monthly and bi-weekly views of upcoming expenses. Users lack a high-level overview of their yearly financial plan.

## Goals / Non-Goals

**Goals:**

- Provide a summary of each month's total scheduled expenses for a given year.
- Enable easy navigation between the monthly view and the yearly overview.
- Maintain consistency with the existing Material theme and UI components (Konsta UI).

**Non-Goals:**

- Interactive charts or graphs (at this stage).
- Ability to edit expenses directly from the yearly view.
- Support for multiple years on a single page.

## Decisions

- **Routing**: Use `:year` as a param in the URL (e.g., `/2026`).
- **Component**: Create `YearlyExpensePage.tsx` using Konsta UI `Page`, `Navbar`, and `List`.
- **Data Fetching**:
  - The `YearlyExpensePage` will fetch all expenses for the entire year using `StorageService.listExpenses(yearStart, yearEnd)`.
  - It will then aggregate these expenses by month on the client side.
- **Navigation**:
  - `NavBar` in `MonthlyExpensePage`: Wrap the year part of the title (e.g., "2026" in "January 2026") in a clickable element or customize the `Navbar` title component.
  - `NavBar` in `YearlyExpensePage`: Use a back button in the `left` slot that uses `window.history.back()` or `navigate(-1)`.

## Risks / Trade-offs

- **Performance**: Fetching a whole year of repeating expenses might be slow if there are many. However, since they are calculated based on RRule in memory/storage, it should be manageable for typical personal use.
- **UI Density**: A list of 12 months might be long on small screens, which is fine for a vertical list.

## Infrastructure Changes

- **App.tsx**: Register `/:year`.
- **date.ts**: Add `getYearRange(year)` utility.
- **StorageService**: No changes needed if `listExpenses` already handles date ranges correctly.
