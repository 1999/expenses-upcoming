## ADDED Requirements

### Requirement: expense-home-page

The system SHALL display an index page showing upcoming expenses within a configurable timeframe.

#### Scenario: View expenses for 2 weeks

- **WHEN** user loads the home page
- **THEN** system displays expenses for the next 2 weeks by default

#### Scenario: Change timeframe

- **WHEN** user selects "Week" or "Month" in the timeframe selector
- **THEN** system updates the list to show expenses for the selected range
