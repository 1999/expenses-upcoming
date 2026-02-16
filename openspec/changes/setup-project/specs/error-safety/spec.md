## ADDED Requirements

### Requirement: global-error-boundaries

The system SHALL display user-friendly error messages for missing pages and unexpected failures.

#### Scenario: Navigate to non-existent page

- **WHEN** user visits an invalid URL
- **THEN** system displays a "Not found" message with status description

#### Scenario: Unexpected runtime error

- **WHEN** an unhandled exception occurs
- **THEN** system displays an "Unexpected error" page
