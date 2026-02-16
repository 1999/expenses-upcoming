# Proposal: Update Filtering System to Monthly Ranges

## Motivation and Context

The current "rolling window" filtering (Week, 2 Weeks, Month) is being replaced with a calendar-aligned monthly view. Users want to see expenses split into the first and second halves of the current month (1-14 and 15-end). This provides a more predictable budgeting view aligned with typical monthly cycles.

## What Changes

1.  **Header Update**: The `HomePage` Navbar title will change from "Upcoming Expenses" to the name of the current month (e.g., "February").
2.  **Filter UI**: Replace the "Week", "2 Weeks", "Month" segmented controls with two buttons:
    - First half: `1-14`
    - Second half: `15-<Last Day>`
3.  **Default Range**: On load, the app will automatically select the half-month range that includes the current calendar day.
4.  **URL Sync Removal**: Remove the `filter` query parameter from the URL; filtering state will be purely local.
5.  **Filtering Logic**: Update the data fetching to fetch expense occurrences strictly within the defined calendar boundaries (e.g., Feb 1st to Feb 14th) rather than relative to "now".

## Capabilities

### New Capabilities

- `calendar-half-filtering`: Logic to calculate start/end dates for the current month's halves and fetch occurrences within those bounds.

### Modified Capabilities

- `expense-views`: Updated `HomePage` to use calendar-based ranges instead of rolling periods.
- `expense-storage`: `StorageService.listExpenses` updated to support arbitrary date ranges.

## Impact

- **src/pages/HomePage.tsx**: UI overhaul for the Navbar and Segmented controls; state logic update.
- **src/services/storage.ts**: Change `listExpenses` signature to accept `startDate` and `endDate`.
- **src/pages/AddExpensePage.tsx**: Navigation back to Home might need check (removing query param logic).
