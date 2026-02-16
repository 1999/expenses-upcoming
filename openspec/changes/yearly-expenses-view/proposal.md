# Proposal: Yearly Expense View

Introduce a new yearly overview page that displays total scheduled expenses for each month of a specific year. This provides users with a high-level summary of their financial outlook for the entire year.

## What Changes

- **New Route**: Add `/:year` route to `App.tsx` mapping to `YearlyExpensePage`.
- **New Page**: `YearlyExpensePage` component to display the monthly breakdown for the selected year.
- **Enhanced Navigation**:
  - Update `MonthlyExpensePage` Navbar title to make the year portion a link to the yearly overview.
  - Add back navigation from `YearlyExpensePage` to the previous view (or previous month).
- **Service Layer**: Add or update storage methods to calculate monthly totals for a given year.

## Capabilities

### New Capabilities

- `yearly-view`: A new page that displays a vertical list of months for a specific year, showing the total scheduled amount for each month.
- `yearly-navigation`: Navigation between the monthly view and the yearly summary.

### Modified Capabilities

- `navigation-bar`: The existing Navbar in `MonthlyExpensePage` will now support navigation to the yearly view by clicking on the year.

## Impact

- **Frontend**: New page `src/pages/YearlyExpensePage.tsx`, modified `src/pages/MonthlyExpensePage.tsx`, and updated routes in `src/App.tsx`.
- **Utilities**: Potential updates to `src/utils/date.ts` for year-based ranges.
- **Services**: `StorageService` may need a simplified method for monthly aggregations if not already supported.
