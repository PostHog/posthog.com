---
title: Contribute to PostHog
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---

We love contributions to PostHog, big or small.

## Code of conduct

We have an awesome, diverse, and inclusive community. In order to maintain and grow this, all community members must adhere to our [Code of conduct](/docs/contribute/code-of-conduct).

## Reporting bugs or issues

Bug reports help us make PostHog better for everyone. When you create a bug, the description will automatically be filled with a template that makes is very clear what we'd like you to add.

Please search within our issues before raising a new one to make sure you're not raising a duplicate.

<blockquote class='warning-note'>

**Note:** If you find a security issue, please email us directly at [hey@posthog.com](mailto:hey@posthog.com) instead of raising an issue.

</blockquote>

## Deciding what to work on

We maintain [a list of good first issues](https://github.com/PostHog/posthog/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) that are a great way to get started contributing to the PostHog open-source product analytics platform. You can also pick up any other open tickets, though they may be more complicated to work with. If in doubt, just leave a comment for the author of the issue! Outside of tickets, if there are small improvements to layout, text, or functionality, feel free to raise a PR directly.

You can also [update PostHog's documentation, handbook, or write a blog post](/docs/contribute/contribute-to-website). We maintain [a list of good first issues](https://github.com/PostHog/posthog.com/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) here too. Take a look at our [styleguide](https://github.com/PostHog/posthog.com/blob/master/STYLEGUIDE.md) before getting started.

If you're planning to work on a bigger feature that is not on the list of issues, please raise an issue first so we can check whether that feature makes sense for PostHog as a whole.

## Writing code 

### How to get started if you're new to Kea, Python, Django, or a new employee

Working in a new codebase can be overwhelming, especially if you're rusty/new to the tech stack. 
You may find additional help, advice, and exercises by using our [Beginner's Guide](/handbook/engineering/beginners-guide/introduction).

### Setting up your local PostHog environment

[See this page for information](/docs/contribute/developing-locally).

### Testing

#### Backend
We expect all backend code to have corresponding tests. You can run the tests with the command `./bin/tests` from the project's root directory. To specify a specific test (rather than running all tests) you can run `./bin/tests posthog.api.test.test_action` for example.

Tests in the `posthog` folder and those in the `ee` folder need different environment variables to run. 

You can run `posthog` tests with `DEBUG=1 ./bin/tests posthog` and `ee` tests with `DEBUG=1 PRIMARY_DB=clickhouse ./bin/tests ee`. Those tests perform their own database setup and teardown. So the only database setup is to install and run PostgreSQL and Clickhouse ([See this page for setup instructions](/docs/contribute/developing-locally)). 

#### Frontend
We use [Cypress](https://www.cypress.io/) for functional frontend tests. Cypress is used to mock user interface interactions on a demo instance. We've currently targeted test coverage for the most used areas of PostHog and are working to increase coverage. 

We follow the "given, when, then" framework. Each test should provide a given (initial setup for the flow or feature being tested), when (an action performed), and then (an assertion that verifies resulting behavior). To keep our components flexible and easily maintainable within tests, we use a `data-attr` pattern where we add a page-unique identifier prop to react components for testing purposes. Then, to identify an element in a Cypress tests we use `cy.get('[dataattr=some-identifier]')`. 

### Cypress component tests

0. Run `yarn install`, `yarn global add cypress`
1. Run `npx cypress open`. This will open cypress test runner, component tests are bundled together with source under `frontend/src`.
2. Click on any of the testing files. Cypress will open an automated browser that runs the file. 
3. (Optional) run `npm install -g cypress` to avoid installing Cypress on every run

#### Cypress E2E tests

0. Run `yarn install` in the root directory.
1. Run `./bin/e2e-test-runner`. This will open the Cypress test runner which organizes the tests that are written inside the `cypress/integration` directory.
2. Click on any of the testing files. Cypress will open an automated browser that runs the file. 
3. (Optional) run `npm install -g cypress` to avoid installing Cypress on every run

This is a quick start guide for using Cypress in our environment. Any further questions regarding how to use cypress can be answered on the [Cypress Docs](https://docs.cypress.io/). 

## Branch and commit message

If your pull request is related to an issue, please mention that issue in the pull request: `git checkout -b 263-logout-button`.

In your initial commit message, mention the issue number again: `git commit -m "Closes #263 adds logout button"`. This way the corresponding ticket will automatically be closed once your pull request gets merged.

## Review process

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

## Licensing

We mainly license PostHog's code under the MIT Expat license, as outlined in the [PostHog repo](https://github.com/PostHog/posthog/blob/master/LICENSE) on GitHub. 

There are a couple of exceptions:
- Enterprise users are covered by an additional [license agreement](https://github.com/PostHog/posthog/blob/master/ee/LICENSE)
- Any third party components incorporated into our code are licensed under the original license provided by the owner of the applicable component

It is worth specifically mentioning any components that use LGPL, such as _flake8-import-order@0.18.1_ and _psycopg2-binary@2.8.4_. The terms of the LGPL license mean that any changes we make to these libraries need to be shared under LGPL as well.
