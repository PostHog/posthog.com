---
title: Testing
sidebar: Docs
showTitle: true
---

## Backend
We expect all backend code to have corresponding tests. You can run the tests with the command `./bin/tests` from the project's root directory. 

To specify a specific test (rather than running all tests) you can run `./bin/tests posthog.api.test.test_action` for example.

## Frontend
We use [Cypress](https://www.cypress.io/) for functional frontend tests. Cypress is used to mock user interface interactions on a demo instance. 

We've currently targeted test coverage for the most used areas of PostHog and are working to increase coverage. 

We follow the "given, when, then" framework. Each test should provide a given (initial setup for the flow or feature being tested), when (an action performed), and then (an assertion that verifies resulting behavior). 

To keep our components flexible and easily maintainable within tests, we use a `data-attr` pattern where we add a page-unique identifier prop to react components for testing purposes. Then, to identify an element in a Cypress tests we use `cy.get('[dataattr=some-identifier]')`. 

This is a quick start guide for using Cypress in our environment. Any further questions regarding how to use cypress can be answered on the [Cypress Docs](https://docs.cypress.io/). 

### Cypress component tests

0. Run `yarn install`, `yarn global add cypress`
1. Run `npx cypress open`. This will open cypress test runner, component tests are bundled together with source under `frontend/src`.
2. Click on any of the testing files. Cypress will open an automated browser that runs the file. 
3. (Optional) run `npm install -g cypress` to avoid installing Cypress on every run

### Cypress E2E tests

0. Run `yarn install` in the root directory.
1. Run `./bin/e2e-test-runner`. This will open the Cypress test runner which organizes the tests that are written inside the `cypress/integration` directory.
2. Click on any of the testing files. Cypress will open an automated browser that runs the file. 
3. (Optional) run `npm install -g cypress` to avoid installing Cypress on every run
