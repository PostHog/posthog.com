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

The sprint planning works like this:
- During the week of the sprint planning, teams (with the help of the product managers) define one or two big ambitious goals for this sprint that fit in with our roadmap.
- On Wednesday we get together. We use Zoom's breakout rooms to split into the small teams, and each team finalizes the one or two big ambitious goals that they want to tackle as a team.
- We come back in the same room, where
  - We do a quick retrospective on the goals for the last sprint (did we get everything done? Should we have prioritized other things?)
  - Each team lead presents the main goals for their team. We have an open discussion about whether the goals are the right goals for this sprint and whether they are ambitious enough

Each goal should have a single owner.

This meeting is also a chance to coordinate any cross-team dependencies. These should be the exception, not the rule. 

After the sprint planning, each team should have their own session (can be async!) where they
- Do a retrospective
- Divide up the big ambitious goals between the members of the team
- Prioritize any other work (smaller features, bug fixes, refactoring etc)

## 2. Sizing a task and reducing WIP

Efficient engineering organizations actively [reduce Work In Progress](https://loom.com/share/5efceb288b634a449041918bdba08202) (WIP) to avoid negative feedback loops that drive down productivity. Hence a PR should be optimised for two things: 1) quality of implementation, and 2) the speed with which we can merge it in.

Your PRs should ideally be sized to be doable in one day, including code review and QA. If it's not, you should break it down into smaller chunks until it fits into a day. Tasks of this size are easy to test, easy to deploy, easy to review and less likely to cause merge conflicts. 

Sometimes, tasks need a few review cycles to get resolved, and PRs remain open for days. This is not ideal, but it happens. What else can you do to make sure your code gets merged quickly? 

- First, start your own day by responding to review requests from colleagues, and unblocking their work. This builds goodwill and encourages them to also review your code in priority. Otherwise, if everybody jumps to implement new features before reviewing WIP, we will end up with [three](https://github.com/PostHog/posthog/pull/6717), [different](https://github.com/PostHog/posthog/pull/6722), [PRs](https://github.com/PostHog/posthog/pull/6766), all for the same thing.
- Test your code. Always read through your PR's changed lines, and test everything yourself, before handing it over for review. Remember that your colleagues are busy people, and you must do what you can to save their time. There's nothing more annoying than an extra 30min review cycle that starts with *"Almost there, just it's all black now, and remove that console.log please"*.
- Help your reviewer by leaving comments that help them review trickier bits. Better yet, write these directly into the code, either as comments or by clearly labelling your variables.
- It's always good to put new features behind [feature flags](https://posthog.com/docs/user-guides/feature-flags). It's even better to develop partial features behind feature flags. As long as it's clear what needs to be done before a flag can be lifted, you can usually get the smallest bit of any new feature out in a day this way.
- Don't be afraid to restart from scratch if the PR gets out of hand. It's a bit of time lost for you, but a lot of time saved for the reviewer, if they get a clean PR to review.
- Push your code out as a Draft PR early on, so everyone can see the work in progress, and comment on the validity of the general approach when needed.
- Remember that PRs can be reverted as easily as they can be merged. Don't be afraid to get stuff in early if it makes things better. [Bias for action](https://posthog.com/handbook/company/values#bias-for-action) after all.
- Most importantly, [really understand why it's paramount to reduce WIP](https://loom.com/share/5efceb288b634a449041918bdba08202), until you feel it in your bones.


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
