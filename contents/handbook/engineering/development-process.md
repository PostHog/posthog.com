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

## 2. Sizing a task and reducing WIP

Efficient engineering organizations actively [reduce Work In Progress](https://loom.com/share/5efceb288b634a449041918bdba08202) (WIP) to avoid negative feedback loops that drive down productivity. Hence a PR should be optimised for two things: 1) quality of implementation, and 2) the speed with which we can merge it in.

Your PRs should ideally be sized to be doable in one day, including code review and QA. If it's not, you should break it down into smaller chunks until it fits into a day. Tasks of this size are easy to test, easy to deploy, easy to review and less likely to cause merge conflicts. 

Sometimes, tasks need a few review cycles to get resolved, and PRs remain open for days. This is not ideal, but it happens. What else can you do to make sure your code gets merged quickly? 

- First, start your own day by responding to review requests from colleagues, and unblocking their work. This builds goodwill and encourages them to also review your code in priority. Otherwise, if everybody jumps to implement new features before reviewing WIP, we will end up with [three](https://github.com/PostHog/posthog/pull/6717), [different](https://github.com/PostHog/posthog/pull/6722), [PRs](https://github.com/PostHog/posthog/pull/6766), all for the same thing.
- Test your code. Always read through your PR's changed lines, and test everything yourself, before handing it over for review. Remember that your colleagues are busy people, and you must do what you can to save their time. There's nothing more annoying than an extra review cycle that starts with *"Almost there, just this one new bug, and remove that console.log please"*.
- Help your reviewer by leaving comments that help them review trickier bits. Better yet, write these directly into the code.
- Release behind a feature flag, iterate on improving the features or the design in a follow up PR, after more people have had time to test.
- Chunk your PRs down. Implement just the MVP, and leave the rest for later.
- Push your code out as a Draft PR early on, so everyone can see the work in progress, and comment on the validity of the general approach when needed.


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
