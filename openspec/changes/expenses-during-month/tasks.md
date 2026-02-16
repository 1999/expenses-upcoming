## 1. Date Utility Upgrades

- [x] 1.1 Add `getFullMonthRange(year: number, month: number)` and `getMonthRanges(year: number, month: number)` to `src/utils/date.ts`.
- [x] 1.2 Add `getSiblingMonth(year: number, month: number, offset: number)` to `src/utils/date.ts` for navigating between months.
- [x] 1.3 Add `formatMonthlyTitle(year: number, month: number)` to `src/utils/date.ts` for the NavBar title.
- [x] 1.4 Add `getCurrentMonthContext()` to return `{ year, month }` for the initial redirect.

## 2. Routing and Redirection

- [x] 2.1 Update `src/App.tsx` to define the route `/:year/:month`.
- [x] 2.2 Implement a redirect component or logic in `src/App.tsx` that navigates from `/` to the current year/month.
- [x] 2.3 Ensure the `NotFoundPage` is shown for invalid years or month names.

## 3. Monthly Page Implementation

- [x] 3.1 Rename `HomePage.tsx` to `MonthlyExpensePage.tsx` (or refactor `HomePage.tsx` to handle route params).
- [x] 3.2 Update the component to use `useParams` and manage `rangeIndex` for bi-weekly filtering.
- [x] 3.3 Integrate `getMonthRanges` utility for fetching expenses by range.
- [x] 3.4 Move the "Add Expense" action from the NavBar to a new Button at the bottom of the expense list.
- [x] 3.5 Restore the bi-weekly/range-based segmented control logic and UI.

## 4. Navigation UI

- [x] 4.1 Update the `Navbar` `title` to use `formatMonthlyTitle`.
- [x] 4.2 Add a left arrow button to the `Navbar` `left` slot that navigates to the previous month.
- [x] 4.3 Add a right arrow button to the `Navbar` `right` slot that navigates to the next month.
- [x] 4.4 Ensure navigation handles year transitions (e.g., January 2026 -> December 2025).

## 5. Verification and Cleanup

- [x] 5.1 Verify that deleting an expense still works correctly in the new view.
- [x] 5.2 Test navigation through multiple months.
- [x] 5.3 Verify that the "Add" button correctly navigates to `/add`.
- [x] 5.4 Remove any unused bi-weekly date utilities from `src/utils/date.ts`.
