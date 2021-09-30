---
title: Contribute to PostHog
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---

👋 Welcome! We love contributions, big or small. 

This overview covers important topics for getting started as a contributor. However, if you'd like to jump right in:

- Review our [Development workflow](/docs/contribute/development-workflow) guidelines
- Setup your [Local development](/docs/contribute/developing-locally) environment
- Browse ideas for [Deciding what to work on](#deciding-what-to-work-on)

## Code of conduct

We treasure our diverse, inclusive, and growing community. 

Please review our [Code of conduct](/docs/contribute/code-of-conduct) which includes our shared pledge to maintain a welcoming atmophere for all.

## Security vulnerability disclosure

Please report any suspected security vulnerabilities privately to [hey@posthog.com](mailto:hey@posthog.com). 

> ⚠️ **Important**: Do not create a public issue for suspected vulnerabilities.

We do not operate a bug bounty program at the moment, but we will generously reward you with merch for any actionable security vulnerabilities found.

## Reporting bugs or issues

Bug reports are an important part of improving PostHog. If you encounter a bug, please:

- Search existing issues on GitHub before creating a new one. 
- Report a new bug by creating a new issue and completing the provided template. 

We want you to be heard. If you have encountered a bug that already has an issue, please add a comment with:

- How the bug impacted you.
- What additional details you have that could help resolve the issue.

> **Note:** Reference our [Security vulnerability disclosure](contribute#security-vulnerability-disclosure) section for special instructions on reporting a suspected vulnerability.

## Writing code 

### How to get started if you're new to Kea, Python, Django, or a new employee

Working in a new codebase can be overwhelming, especially if you're rusty/new to the tech stack. 
You may find additional help, advice, and exercises by using our [Beginner's Guide](/handbook/engineering/beginners-guide/introduction).

### Deciding what to work on

#### Existing issues

If you're just getting started, we maintain [a list of good first issues](https://github.com/PostHog/posthog/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

You can pick up any other open ticket, though it may be more challenging to complete. Don't let that discourage you! 

When in doubt, just leave a comment for the author of the issue.

#### New issues

If you see opportunity for a small improvement to the product such as in layout, text, or functionality, feel free to raise a pull request.

If you're planning to work on a bigger feature that is not on the list of issues, please create an issue first. This way, we can first discuss and help shape the idea before you invest your time. 

#### Updating documentation

Alternatively, you can [update PostHog's documentation](/docs/contribute/updating-documentation). We value clear documentation and consider writing [part of our culture](/handbook/company/culture).

Be sure you read through our [Styleguide](https://github.com/PostHog/posthog.com/blob/master/STYLEGUIDE.md) before getting started.

### Setting up your local development

Our [Developing locally](/docs/contribute/developing-locally) docs include setup instructions for two primary local dev environments:

- [Develop using `virtualenv`](http://localhost:8001/docs/contribute/developing-locally#using-virtualenv)
   - Required for development using an Apple Silicon (M1) computer. 
   - Runs fast compared with Docker option
   
- [Develop using Docker](http://localhost:8001/docs/contribute/developing-locally#using-docker)

> **Note:** In some cases, you may choose to run some services using Docker and others using a local environment.


### Testing

#### Backend
We expect all backend code to have corresponding tests. You can run the tests with the command `./bin/tests` from the project's root directory. To specify a specific test (rather than running all tests) you can run `./bin/tests posthog.api.test.test_action` for example.

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

We mainly license PostHog's code under the MIT License, (alternatively known as the Expat License), as outlined in the [PostHog repo](https://github.com/PostHog/posthog/blob/master/LICENSE) on GitHub. 

There are a couple of exceptions:
- Enterprise users are covered by an additional [license agreement](https://github.com/PostHog/posthog/blob/master/ee/LICENSE)
- Any third party components incorporated into our code are licensed under the original license provided by the owner of the applicable component

Any components that use the GNU Lesser General Public License (LGPL), such as `flake8-import-order@0.18.1` and `psycopg2-binary@2.8.4`. The terms of the LGPL license mean that any changes we make to these libraries need to be shared under LGPL as well.
