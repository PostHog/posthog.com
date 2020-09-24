---
title: Contributing to PostHog
sidebar: Docs
showTitle: true
---

<br>

We love contributions to PostHog, big or small.


## Reporting Bugs or Issues

Bug reports help us make PostHog better for everyone. When you create a bug, the description will automatically be filled with a template that makes is very clear what we'd like you to add.

Please search within our issues before raising a new one to make sure you're not raising a duplicate.

**Important:** If you've found a security issue, please email us directly at [hey@posthog.com](mailto:hey@posthog.com) instead of raising an issue.

<br>

## Writing Code 

### Deciding what to work on

We maintain [a list of good first issues](https://github.com/PostHog/posthog/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) that are a great way to get started contributing to PostHog. You can also pick up any other open tickets, though they may be more complicated to work with. If in doubt, just leave a comment for the author of the issue!

Outside of tickets, if there are small improvements to layout, text, or functionality, feel free to raise a PR directly.

Alternatively, you can also [update PostHog's documentation](/docs/updating-documentation). To do so, take a look at our [Styleguide](https://github.com/PostHog/posthog.com/blob/master/STYLEGUIDE.md) before getting started.

If you're planning to work on a bigger feature that is not on the list of issues, please raise an issue first so we can check whether that feature makes sense for PostHog as a whole.

### Setting up your local environment

[See this page for information](/docs/developing-locally).

### Testing

#### Backend
We expect all backend code to have corresponding tests. You can run the tests with the command `./bin/tests` from the project's root directory. To specify a specific test (rather than running all tests) you can run `./bin/tests posthog.api.test.test_action` for example.

#### Frontend
We use [Cypress](https://www.cypress.io/) for functional frontend tests. Cypress is used to mock user interface interactions on a demo instance. We've currently targeted test coverage for the most used areas of PostHog and are working to increase coverage. 

We follow the "given, when, then" framework. Each test should provide a given (initial setup for the flow or feature being tested), when (an action performed), and then (an assertion that verifies resulting behavior). To keep our components flexible and easily maintainable within tests, we use a `data-attr` pattern where we add a page-unique identifier prop to react components for testing purposes. Then, to identify an element in a Cypress tests we use `cy.get('[dataattr=some-identifier]')`. 

#### Cypress usage for local development

0. Run `yarn install` in the root directory.
1. Run `./bin/frontend-test-runner`. This will open the Cypress test runner which organizes the tests that are written inside the `cypress/integration` directory.
2. Click on any of the testing files. Cypress will open an automated browser that runs the file. 

This is a quick start guide for using Cypress in our environment. Any further questions regarding how to use cypress can be answered on the [Cypress Docs](https://docs.cypress.io/). 

## Branch and Commit Message

If your pull request is related to an issue, please mention that issue in the pull request: `git checkout -b 263-logout-button`.

In your initial commit message, mention the issue number again: `git commit -m "Closes #263 adds logout button"`. This way the corresponding ticket will automatically be closed once your pull request gets merged.

## Review Process

When we review a PR, we'll look at the following things:
- Does the PR actually solve the issue?
- Does the solution make sense?
- Will the code perform with millions of events/users/actions?
- Are there tests and do they test the right things?
- Are there any security flaws?

Things we do not care about during review:
- Syntax. If we're arguing about syntax, that means we should install a code formatter

Once that's done, we'll also QA your pull request.

## 🎉

You're done! Your code will be included in the next release of PostHog.
