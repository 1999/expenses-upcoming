## ADDED Requirements

### Requirement: strict-monthly-filter

The expense list must filter items so only those falling within the selected month's range are shown.

#### Scenario: date-range-calculation

- **WHEN** a year (e.g., 2026) and month (e.g., 2) are selected
- **THEN** the filter range is calculated as `2026-02-01 00:00:00` to `2026-02-28 23:59:59` (or `29` for leap years)
- **AND** only expenses within this range are retrieved from storage
