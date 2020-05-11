---
title: Development process
sidebar: Handbook
showTitle: true
---

Any process is a balance between speed and control. If we have a huge process that requires lots of QA and 10 approvals, we will never make mistakes because we will never release anything.

If we have 0 process, we will release quickly but everything will be broken.

!> This guide is aimed at people who work for PostHog. If you want to contribute, [see our contributing guide](https://docs.posthog.com/#/contributing).

## 1. How to decide what to build

There are 3 places that work comes from.

- Issues/bugs (raised by the community or us)
- [Roadmap](/roadmap)
- "This should be better"


## 2. Sizing a task

When picking up a task, it should be do-able in a day, including code review and QA. If it's not, you need to break it down into smaller chunks until it is. Tasks of this size are easy to test, easy to deploy, won't often cause merge conflicts and should still deliver some kind of value.

Even if you're contributing, this is helpful as it means you'll be able to contribute to PostHog faster.

## 3. Writing code

We're big fans of TDD. We've tried to create test infrastructure that helps you rather than annoys you. If that isn't the case, please raise an issue! Keeping tests is a high priority to keep developer productivity high.

Other than that, you know what to do in this section.

## 4. Creating a PR

To make sure our issues are linked correctly to the PRs, you can tag the issue in your commit.

```bash
git commit -m "Closes #289 add posthog logo to website"
```

## 5. Code review

When we review a PR, we'll look at the following things:
- Does the PR actually solve the issue?
- Does the solution make sense?
- Will the code perform with millions of events/users/actions?
- Are there tests and do they test the right things?
- Are there any security flaws?

Things we do not care about during review
- Syntax. If we're arguing about syntax, that means we should install a code formatter

## 6. QA

See [How to QA](/dev/development-process/how-to-qa)

## 7. Merging

Merge anytime. Friday afternoon? Merge.

Our testing, reviewing and building process should be good enough we're comfortable merging any time.


# How to test

## Backend
At the moment, we have strong tests on the backend. We expect every backend function to have tests, and to be typed. Running `bin/tests` will run both tests and type-checking.

To run a specific subset of tests
```bash
bin/tests posthog.api.test.test_action
```

You can also pass failfast
```bash
bin/tests --failfast
```

### Frontend
At the moment we do not have good frontend tests. This is something we want, but haven't gotten round to.


# How to QA
[How to QA](/dev/development-process/how-to-qa)


# How to release a new version 
[Release new version](/dev/development-process/release-new-version)
