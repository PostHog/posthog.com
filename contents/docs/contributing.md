---
title: Contributing to PostHog
sidebar: Docs
showTitle: true
---

We love contributions to PostHog, big or small.


## Reporting bugs or issues

Bug reports help us make PostHog better for everyone. When you create a big, the description will automatically be filled with a template that makes is very clear what we'd like you to add.

Please search within our issues before raising a new one to make sure you're not raising a duplicate.

*Important:* If you've found a security issue, please email us directly at [hey@posthog.com](mailto:hey@posthog.com) instead of raising an issue.

## Writing code 

### Deciding what to work on

We maintain [a list of good first issues](https://github.com/PostHog/posthog/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) that are a great way to get started contributing to PostHog. You can also pick up any other open tickets, though they may be more or less scoped.

Outside of tickets, if there are small improvements to layout, text or functionality, feel free to raise a PR directly.

Alternatively, you can also [update PostHog's documentation](/../updating-documentation).

If you're planning to work on a bigger feature, and it's not in the list of issues, please raise an issue first so we can check whether that feature makes sense for PostHog as a whole.

### Setting up your local environment

[See this doc for more](/docs/developing-locally)

### Testing

#### Backend
We expect all backend code to have corresponding tests. You can run the tests by running `bin/tests`. To specify a specific test (rather than running all tests) you can run `bin/tests posthog.api.test.test_action` for example.

#### Frontend
We use [cypress](https://www.cypress.io/) for functional frontend tests. Cypress is used to mock user interface interactions on a demo instance. We've currently targeted test coverage for the most used areas of posthog and are working to increase coverage. 

We follow the given, when, then framework. Each test should provide a given (initial setup for the flow or feature being tested), when (an action performed), and then (an assertion that verifies resulting behavior). To keep our components flexible and easily maintainable within tests, we use a `data-attr` pattern where we add a page-unique identifier prop to react components for testing purposes. Then, to identify an element in a cypress tests we use `cy.get('[dataattr=some-identifier]')...`. 

#### Cypress usage for local development

1. Ensure that you either `yarn install` in the root directory
2. Run `./bin/frontend-test-runner`. This will open the cypress test runner which organizes the tests that are written inside the `cypress/integration` directory.
3. Click on any of the testing files. Cypress will open an automated browser that runs the file. 

This is a quick start guide for using cypress in our environment. Any further questions regarding how to use cypress can be answered with cypress [docs](https://docs.cypress.io/). 

## Branch and commit message

If your pull request is related to an issue, please mention that issue in the pull request: `git checkout -b 263-logout-button`

In your initial commit message, mention the issue number again: `git commit -m "Closes #263 adds logout button"`. This way the corresponding ticket will automatically be closed once your pull request gets merged.

## Review process

When we review a PR, we'll look at the following things:
- Does the PR actually solve the issue?
- Does the solution make sense?
- Will the code perform with millions of events/users/actions?
- Are there tests and do they test the right things?
- Are there any security flaws?

Things we do not care about during review
- Syntax. If we're arguing about syntax, that means we should install a code formatter

Once that's done, we'll also QA your pull request.

## 🎉

You're done! Your code will be included in the next release of PostHog.
