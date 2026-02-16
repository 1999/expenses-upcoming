## ADDED Requirements

### Requirement: Yearly Expense Page

The system SHALL provide a page at `/:year` that displays a summary of expenses for the specified year.

#### Scenario: Displaying monthly totals

- **WHEN** the user navigates to `/:year` (e.g., `/2026`)
- **THEN** the system SHALL display a list of all 12 months.
- **AND** for each month, it SHALL show the month name on the left and the total sum of scheduled expenses for that month on the right.

#### Scenario: Yearly Page NavBar

- **WHEN** on the yearly expense page
- **THEN** the NavBar title SHALL be the year (e.g., "2026").
- **AND** the NavBar left item SHALL be a back arrow that navigates to the previous page.
- **AND** there SHALL be no right menu item.

#### Scenario: Navigate to month from year view

- **WHEN** the user clicks on a month in the yearly list
- **THEN** the system SHALL navigate to the monthly view for that month (`/:year/:month`).
