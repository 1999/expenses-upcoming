# Goal

Build a web app (no backend, only frontend) showing upcoming expenses.

## Top-level instructions

- We're building a frontend app using React and TypeScript.
- We're using Vite as our build tool.
- We're using TypeScript for type safety and better code organization.
- We're using React Router for routing and navigation (no bundle splitting for now)
- We're using IndexedDB for data storage. As a library for IndexedDB, we're using "sklad" in "src/utils/sklad"
- We're using Fetch API for making and handling HTTP requests.
- We're using Tailwind CSS for styling and layout.
- We're using ESLint for code linting and formatting.
- We're using Prettier for code formatting.
- We're using "rrule" package as a library for working with recurrence rules for calendar dates.
- We're building mobile only UI for now.
- We're using Konsta UI for for component library.
- We're using Sentry for error tracking and monitoring.
- We're not using any unit or integration testing.
- We're not adding service workers at this stage.

## Data layer

All recurring expenses should be stored inside IndexedDB.
Synchronisation of the local IndexedDB with some remote server will be done later.

## UI

The user interface should be designed using Konsta UI components and styled using Tailwind CSS.
The UI should be responsive and accessible.
The index page should display the upcoming expenses in the next 2 weeks with an option to change it to week and month.
There should be a button to add expense navigating to a new page for adding expense.

## 404 UI

Special generic UI for specific cases.
Display a large "Not found" heading with a message "The page you are looking for does not exist."

## 500 UI

Special generic UI for specific cases.
Display a large "Unexpected error" heading with a message "An unexpected error occurred."

## Deployment

The project will be deployed using Github Pages.
Assume that the index URL will look like https://1999.github.io/expenses-coming/
