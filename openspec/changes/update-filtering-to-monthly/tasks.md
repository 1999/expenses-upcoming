## 1. Data Layer Refactor

- [x] 1.1 Update `StorageService.listExpenses` signature to accept `startDate` and `endDate`
- [x] 1.2 Update `listExpenses` implementation to filter `rrule` occurrences within the provided range
- [x] 1.3 Update occurrence generation to handle strict date boundaries

## 2. Date Utilities & Logic

- [x] 2.1 Implement helper function to get current month name
- [x] 2.2 Implement helper function to get range boundaries (1-14, 15-LastDay) for the current month
- [x] 2.3 Implement logic to determine which range is active based on the current system date

## 3. UI Implementation (HomePage)

- [x] 3.1 Update Navbar title to display the current month name dynamically
- [x] 3.2 Replace SegmentedButtons with the two half-month range options
- [x] 3.3 Remove `useSearchParams` and URL sync logic for filtering
- [x] 3.4 Update `loadExpenses` to pass the calculated date ranges to `StorageService`
- [x] 3.5 Update the hero text ("scheduled for the...") to reflect the new timeframes

## 4. Verification & Cleanup

- [x] 4.1 Verify month-end logic handles February (leap years) and 30/31 day months correctly
- [x] 4.2 Ensure "Add" button navigation and return still works without query param sync
