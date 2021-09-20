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

Deciding what we work on happens in our sprint planning session, where the high level themes for the next sprint get decided. Each team then takes those high level priorities and breaks them down, plus adds their own smaller items like bugfixes, smaller features or other improvements.

As one of our values is [stepping on toes](/handbook/company/values#step-on-toes), during the sprint you might come across something that should be much higher priority than what was already planned. It's up to you to then decide to work on that as opposed to what was agreed in the sprint planning session.

## 2. Sizing a task (or 1-day tasks)

When picking up a task, it should be doable in one day, including code review and QA. If it's not, you need to break it down into smaller chunks until it fits into a day. Tasks of this size are easy to test, easy to deploy, less likely to cause merge conflicts, and should still deliver a slice of value.

| The wrong way to do this | The right way to do this |
| --- | --- |
| Do backend code in one PR, then frontend in the next | Create the smallest version of the feature/bug fix that adds value |
| The design and usability has to be perfect in one PR | Release it behind a feature flag, iterate on the design in the next PR |
| Lots of back and forth on whether the code will perform | Release it behind a feature flag, test it and watch the metrics |

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
