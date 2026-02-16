## ADDED Requirements

### Requirement: monthly-context-title

The NavBar must clearly communicate the month and year being viewed.

#### Scenario: display-month-year

- **WHEN** the user is on the `/2026/01` page
- **THEN** the NavBar title displays "January 2026"

### Requirement: navigation-interface

The NavBar must provide buttons for sequential month navigation.

#### Scenario: navbar-elements

- **WHEN** the monthly page is rendered
- **THEN** the left side of the NavBar contains a back/left arrow
- **AND** the right side of the NavBar contains a forward/right arrow
- **AND** the central title is the formatted month and year
- **AND** no "Add" button is present in the NavBar
