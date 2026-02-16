## ADDED Requirements

### Requirement: monthly-route-params

The application must support year and month parameters in the URL to determine which expenses to display.

#### Scenario: viewing-specific-month

- **WHEN** the user navigates to `/:year/:month` (e.g., `/2026/01`)
- **THEN** the page fetches and displays expenses for the entire month of January 2026

### Requirement: root-redirect

Accessing the base URL must automatically take the user to the current month's view.

#### Scenario: base-url-access

- **WHEN** the user navigates to `/`
- **THEN** the application performs a 302-equivalent redirect to the current `/:year/:month` page

### Requirement: bottom-add-button

The action to add a new expense must be located at the end of the expense list rather than in the header.

#### Scenario: adding-expense-from-list

- **WHEN** the user scrolls to the end of the current month's expense list
- **THEN** they see an "Add Expense" button that navigates to the add page
