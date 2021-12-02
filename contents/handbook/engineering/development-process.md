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

* **Major Milestones:** Product + eng align on major milestones (e.g. Collaboration) which we have strong conviction will drive our success metrics 
* **Assign Owner:** A single engineer will be accountable for a milestone partnering closely other functions to ensure it’s successful
* **Break into goals:** The owner turns this ambiguous milestone into a roadmap of ambitious meaningful sprint sized goals, thinking 2 - 3 sprints ahead to give other functions time
* **Execute on goals:** Our sprint planning session is where the high level goals for the next sprint get decided. Each team takes these and breaks them down and adds their own smaller items like bugfixes.
  The sprint planning works like this:
     * During the week of the sprint planning, teams (with the help of the product managers) define one or two big ambitious goals for this sprint that align with major milestones.
     * On Wednesday we get together. We use Zoom's breakout rooms to split into the small teams, and each team finalizes the ambitious goals that they want to tackle.
     * We come back in the same room, where
        * We do a quick retrospective on the goals for the last sprint (did we get everything done? Should we have prioritized other things?)
        * Each team lead presents the main goals for their team. We have an open discussion about whether the goals are the right goals for this sprint and whether they are ambitious enough.
        * Each goal should have a single owner.
    * This meeting is also a chance to coordinate any cross-team dependencies. These should be the exception, not the rule. 
* **Evaluate success:** Review impact of each major milestone and feedback into the planning process

**What about the small stuff?**

Everything can’t directly contribute to a company level goal, it’s important that the small stuff also gets done for us to succeed.

* **Dogfooding**: Use the product yourself, when you see something that annoys you, fix it
* **Sidequests:** Smaller projects you are passionate about but may not shoot up our metrics (e.g. turbo mode)
* **Support hero:** Support hero dedicates all of their time to customers, solving the wild and wonderful issues our customers find each week

**What happens after sprint planning?**

After the sprint planning, each team should have their own session (can be async!) where they
- Do a detailed retrospective.
- Divide up the big ambitious goals between the members of the team
- Prioritize any other work (Support Hero, smaller features, bug fixes, refactoring, etc.).
  - The split between big ambitious goals and 'other work' should very roughly be about 2/3 to 1/3

### What does an awesome big ambitious goal look like?

* **Clear:** Anyone with general context can read it and instantly know what specifically it means to achieve it (i.e. NOT “refactor components”)
* **Finite:** There should be an obvious end to the goal and cannot go on forever (i.e. NOT “improve dashboards”)
* **Assessable:** You can validate whether or not you’ve achieved the goal - it doesn’t need to be a metric (e.g. Increased signups by 20% or Events can be ingested in any order)
* **Meaningful:** If we achieve this goal it will make our solve a real need for our customers (i.e. a 10x improvement in performance sounds great as a goal - but its not meaningful if our customers are happy with the current performance)
* **Challenging:** It should too big for one person to solve on their own and require creativity or brute force to achieve in the proposed time-frame (e.g. ship correlation analysis with a killer feature no one else has)
* **Homogenous:** The goal should be all about achieving a single meaningful thing and not a collection of unconnected things (i.e. NOT ‘Improve query performance and launch collaboration MVP’)

Goals should be time-bound, but since we primarily use goals for our two-weekly sprint planning we should consider them generally timebound to two weeks.

### Types of big ambitious goals

* **Moonshots:** These are big scary goals, we expect to fail to achieve them 50% of the time, if we fail we expect to learn something equally as valuable as if we succeed (just scraping the goal counts as a success)
* **Roofshots:** These might also be big but we expect to achieve them 100% of the time, these can be goals where we cannot afford to fail (e.g. Launch feature to keep us compliant with new regulation) or where we are confident in our approach and don’t foresee unexpected risks / issues.

### Outcomes of goals

When we review the status of the goals from the previous sprint, we'll classify them as follows:
* **Nailed it:** We hit the goal spectacularly (high fives all round)
* **Scraped it:** We almost hit the goal - but we'll need to do a little bit more next sprint to tidy up (we should adjust our workload to have fewer resources on big goals during the next sprint to comfortable get this finished)
* **Failed it:** We were no-where near hitting the goal, but we learned some valuable lessons - we're going to go back to the drawing board - maybe the goal wasn't right or maybe there's a different way to approach it

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
