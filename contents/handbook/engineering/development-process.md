---
title: Development process
sidebar: Handbook
showTitle: true
---

> _**Note:** This guide is aimed at people who work for PostHog. If you want to contribute, [see our Contributing Guide](/docs/contributing)._

<br />

Any process is a balance between speed and control. If we have a long process that requires extensive QA and 10 approvals, we will never make mistakes because we will never release anything.

However, if we have no checks in place, we will release quickly but everything will be broken.


## 1. How to decide what to build

There are 3 places that work comes from.

- Issues/bugs (raised by the community or us)
- [Roadmap](/handbook/strategy/roadmap)
- "This should be better"


## 2. Sizing a task

When picking up a task, it should be doable in a day, including code review and QA. If it's not, you need to break it down into smaller chunks until it is. Tasks of this size are easy to test, easy to deploy, less likely to cause merge conflicts, and should still deliver some kind of value.

Even if you're contributing, this is helpful as it means you'll be able to contribute to PostHog faster.

## 3. Writing code

We're big fans of Test Driven Development (TDD). We've tried to create test infrastructure that helps you rather than annoys you. If that isn't the case, please raise an issue! Keeping tests on point is a high priority to keep developer productivity high.

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

Things we do not care about during review:
- Syntax. If we're arguing about syntax, that means we should install a code formatter

See: [How we review](/handbook/engineering/how-we-review).

## 6. Merging

Merge anytime. Friday afternoon? Merge.

Our testing, reviewing and building process should be good enough that we're comfortable merging any time.

## 7. Documenting

If you built it, please [document it](https://posthog.com/docs). You're in the best position to do this, and it forces you to think things through from a user perspective.

## How to test

See: [How to test](/docs/contributing#testing).

## How we review

See: [How we review](/handbook/engineering/how-we-review).

## How to release a new version 

See: [Release new version](/handbook/engineering/release-new-version).
