## 1. Preparation & Utilities

- [x] 1.1 Add `getYearRange(year: number)` to `src/utils/date.ts` to return start and end dates for a full year.
- [x] 1.2 Add `getAllMonthsForYear(year: number)` to `src/utils/date.ts` to return an array of month titles and their respective date ranges.

## 2. Yearly Page Component

- [x] 2.1 Create `src/pages/YearlyExpensePage.tsx` using Konsta UI components.
- [x] 2.2 Implement the NavBar with the year title and a back button.
- [x] 2.3 Implement the yearly expense calculation logic (fetching year-long data and grouping by month).
- [x] 2.4 Render the vertical list of months showing names and scheduled totals.

## 3. Routing & Integration

- [x] 3.1 Add the `/:year` route to `src/App.tsx` mapping to `YearlyExpensePage`.
- [x] 3.2 Modify `MonthlyExpensePage.tsx` to make the year portion of the Navbar title a link to `/:year`.
- [x] 3.3 Ensure clicking a month in `YearlyExpensePage` navigates to the corresponding `/:year/:month`.

## 4. Verification

- [x] 4.1 Verify that the yearly total matches the sum of monthly totals.
- [x] 4.2 Check that the back button in the yearly view correctly returns to the previous page.
