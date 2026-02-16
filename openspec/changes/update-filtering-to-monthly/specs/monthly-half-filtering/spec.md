## ADDED Requirements

### Requirement: monthly-navigator-header

The system SHALL display the full name of the current month in the Home Page header.

#### Scenario: Display current month

- **WHEN** user loads the home page in February
- **THEN** system displays "February" in the Navbar title

### Requirement: bi-monthly-filter-ranges

The system SHALL provide a filter allowing users to toggle between two ranges: the 1st to 14th of the month, and the 15th to the last day of the month.

#### Scenario: Display range labels

- **WHEN** today is January 7th
- **THEN** system displays two filter items: "Jan 1-14" and "Jan 15-31"

#### Scenario: Auto-select current range (first half)

- **WHEN** today is the 10th of the month
- **THEN** system automatically activates the "1-14" filter item on load

#### Scenario: Auto-select current range (second half)

- **WHEN** today is the 20th of the month
- **THEN** system automatically activates the "15-X" filter item on load

### Requirement: strict-calendar-filtering

The system SHALL only display expense occurrences that fall within the selected calendar range.

#### Scenario: Filter occurrences

- **WHEN** "Jan 1-14" is selected
- **THEN** system displays expenses scheduled between Jan 1st and Jan 14th inclusively
- **AND** system does NOT display expenses scheduled on Jan 15th

## REMOVED Requirements

### Requirement: rolling-window-filtering

**Reason**: Replaced by calendar-based half-month ranges.
**Migration**: Update `HomePage.tsx` to remove "Week", "2 Weeks", and "Month" options.

### Requirement: url-filter-sync

**Reason**: Simplify state management and focus on local session interaction.
**Migration**: Remove `searchParams` logic related to the `filter` key.
