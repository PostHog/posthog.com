---
title: Shipping & releasing
sidebar: Handbook
showTitle: true
---

Any process is a balance between speed and control. If we have a long process that requires extensive QA and 10 approvals, we will never make mistakes because we will never release anything.

However, if we have no checks in place, we will release quickly but everything will be broken. For this reason we have some best practices for releasing things, and guidelines on how to ship.

## How to decide what to build

### Set milestones

To start, Product and Engineering should align on major milestones (e.g. Collaboration) which we have strong conviction will drive our success metrics for a feature.

There are two types of goals.

* **Moonshots:** These are big, scary goals where we expect to fail 50% of the time. If we fail we expect to learn something equally as valuable as if we succeed. Just scraping the goal counts as a success.
* **Roofshots:** These might also be big, but we expect to achieve them 100% of the time. These can be goals where we cannot afford to fail (e.g. Launch feature to keep us compliant with new regulation), or where we are confident in our approach and don’t foresee unexpected risks or issues.

Goals should be time-bound, but since we primarily use goals for our two-weekly sprint planning we should consider them generally timebound to two weeks. 

Use the following principles:

* **Clear:** Anyone with general context can read it and instantly know what specifically it means to achieve it (i.e. NOT “refactor components”)
* **Finite:** There should be an obvious end to the goal and cannot go on forever (i.e. NOT “improve dashboards”)
* **Assessable:** You can validate whether or not you’ve achieved the goal - it doesn’t need to be a metric (e.g. Increased signups by 20% or Events can be ingested in any order)
* **Meaningful:** If we achieve this goal it will make our solve a real need for our customers (i.e. a 10x improvement in performance sounds great as a goal - but its not meaningful if our customers are happy with the current performance)
* **Challenging:** It should too big for one person to solve on their own and require creativity or brute force to achieve in the proposed time-frame (e.g. ship correlation analysis with a killer feature no one else has)
* **Homogenous:** The goal should be all about achieving a single meaningful thing and not a collection of unconnected things (i.e. NOT ‘Improve query performance and launch collaboration MVP’)

### Assign an owner

A single engineer should be accountable for a milestone partnering closely other functions to ensure it’s successful.

### Think about other teams

Most things won't cause issues for other teams. However, if it will - don't "align teams" or write a huge RFC (unless that'd help you). Do a quick 1/1 with the most relevant person on another team. 

Consider:
* The scale of the customer you're building for
* If you can get from your hacky MVP to production-ready easily. It's OK to start with basic, but be mindful of making it harder to fully roll something out in future.
* If you know what you're doing or need someone from another team's expertise to get the right architecture or overall approach. We have lots of experienced people, get their help if you would benefit from it.

If this is a big feature which will need an announcement, content, or other marketing support then it's _never_ too early for [the owner](/handbook/engineering/development-process#assign-an-owner) to let the Marketing team know. Drop a post in their Slack channel or tagging them on an issue. 

### Break up goals

The owner turns the ambiguous milestone into a roadmap of ambitious, meaningful, sprint-sized goals, thinking 2 - 3 sprints ahead to give other functions time. [Goal principles](/handbook/engineering/development-process#set-some-milestones) still apply.

### Execute on goals

Our sprint planning session is where the high-level goals for the next sprint get decided. Each team takes these, breaks them down, and adds their own smaller items, like bugfixes.

Sprint planning works like this:
* During the week of the sprint planning, teams (with the help of the product managers) define one or two big ambitious goals for this sprint that align with major milestones.
* On Wednesday we get together. We use breakout rooms to split into the small teams, and each team finalizes the ambitious goals that they want to tackle.
* We come back in the same room, where
* We do a quick retrospective on the goals for the last sprint (did we get everything done? Should we have prioritized other things?)
* Each team lead presents the main goals for their team. We have an open discussion about whether the goals are the right goals for this sprint and whether they are ambitious enough.
* Each goal should have a single owner.

This meeting is also a chance to coordinate any cross-team dependencies. These should be the exception, not the rule. 

As one of our values is [stepping on toes](/handbook/company/values#step-on-toes), during the sprint you might come across something that should be much higher priority than what was already planned. It's up to you to then decide to work on that as opposed to what was agreed in the sprint planning session.

After the sprint planning, each team should have their own session (can be async!) where they:

* Do a detailed retrospective.
* Divide up goals between members of the team.
* Prioritize any other work (Support Hero, smaller features, bug fixes, refactoring, etc.).
  - The split between big ambitious goals and 'other work' should very roughly be about 2/3 to 1/3
  - If we only 'scrape' the previous goal, we should split 1/2 on a new big goal and 1/2 on finishing off the previous goal and other work

### Evaluate success 

Review impact of each major milestone and feedback into the planning process.

When we review the status of goals we classify them as follows:

* **Nailed it:** We hit the goal spectacularly. High fives all round.
* **Scraped it:** We _almost_ hit the goal, but we'll need to do a little bit more next sprint to tidy up. We should adjust our workload to have fewer resources on big goals during the next sprint to comfortable get this finished.
* **Failed it:** We were nowhere near hitting the goal, but we learned some valuable lessons. We're going to go back to the drawing board. Maybe the goal wasn't right or maybe there's a different way to approach it?

## What about the small stuff?

Not everything directly contributes to a company level goal. It’s important that the small stuff also gets done for us to succeed. Use the following principles:

* **Yes, and**: Be encouraging and helpful with others who are innovating. All of our biggest wins have looked like bad ideas early on.
* **Dogfooding**: Use the product yourself. When you see something that annoys you, fix it.
* **Side quests:** Smaller projects you are passionate about but may not shoot up our metrics (e.g. turbo mode).
* **Support hero:** Support hero dedicates all of their time to customers, solving the wild and wonderful issues our customers find each week.

## Sizing tasks and reducing WIP

Efficient engineering organizations actively [reduce Work In Progress](https://loom.com/share/5efceb288b634a449041918bdba08202) (WIP) to avoid negative feedback loops that drive down productivity. 

Hence, a PR should be optimized for two things: 

1. Quality of implementation.
2. The speed with which we can merge it in.

PRs should ideally be sized to be doable in one day, including code review and QA. If it's not, you should break it down into smaller chunks until it fits into a day. Tasks of this size are easy to test, easy to deploy, easy to review and less likely to cause merge conflicts. 

Sometimes, tasks need a few review cycles to get resolved, and PRs remain open for days. This is not ideal, but it happens. What else can you do to make sure your code gets merged quickly? 

- First, start your own day by responding to review requests from colleagues, and unblocking their work. This builds goodwill and encourages them to also review your code in priority. Otherwise, if everybody jumps to implement new features before reviewing WIP, we will end up with [three](https://github.com/PostHog/posthog/pull/6717), [different](https://github.com/PostHog/posthog/pull/6722), [PRs](https://github.com/PostHog/posthog/pull/6766), all for the same thing.
- Test your code. Always read through your PR's changed lines, and test everything yourself, before handing it over for review. Remember that your colleagues are busy people, and you must do what you can to save their time. There's nothing more annoying than an extra 30min review cycle that starts with *"Almost there, just it's all black now, and remove that console.log please"*.
- Help your reviewer by leaving comments that help them review trickier bits. Better yet, write these directly into the code, either as comments or by clearly labelling your variables.
- It's always good to put new features behind [feature flags](https://posthog.com/docs/user-guides/feature-flags). It's even better to develop partial features behind feature flags. As long as it's clear what needs to be done before a flag can be lifted, you can usually get the smallest bit of any new feature out in a day this way.
- Don't be afraid to restart from scratch if the PR gets out of hand. It's a bit of time lost for you, but a lot of time saved for the reviewer if they get a clean PR to review.
- Push your code out as a draft PR early on, so everyone can see the work in progress, and comment on the validity of the general approach when needed.
- Remember that PRs can be reverted as easily as they can be merged. Don't be afraid to get stuff in early if it makes things better. [Bias for action](https://posthog.com/handbook/company/values#bias-for-action).
- Most importantly, [really understand why it's paramount to reduce WIP](https://loom.com/share/5efceb288b634a449041918bdba08202), until you feel it in your bones.

## Writing code

We're big fans of [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD). We've tried to create test infrastructure that helps you rather than annoys you. If that isn't the case, please raise an issue! Keeping tests on point is a high priority to keep developer productivity high.

Other than that, you know what to do.

## Creating PRs

To make sure our issues are linked correctly to the PRs, you can tag the issue in your commit.

```bash
git commit -m "Closes #289 add posthog logo to website"
```

## Testing code

See: [How to test](/docs/contributing#testing).

## Reviewing code

When we review a PR, we'll look at the following things:

- Does the PR actually solve the issue?
- Does the solution make sense?
- Will the code perform with millions of events/users/actions?
- Are there tests and do they test the right things?
- Are there any security flaws?
- Is the code in line with our [coding conventions](/docs/contribute/coding-conventions)?

Things we do not care about during review:

- Syntax. If we're arguing about syntax, that means we should install a code formatter.

See: [How we review](/handbook/engineering/how-we-review).

## Merging

Merge anytime. Friday afternoon? Merge.

Our testing, reviewing and building process should be good enough that we're comfortable merging any time.

Always request a review on your pull request by a fellow team member (or leave unassigned for anyone to pick up when available). We avoid self-merge PRs unless it's an emergency fix and no one else is available (especially for posthog.com).

## Documenting

If you build it, [document it](https://posthog.com/docs). You're in the best position to do this, and it forces you to think things through from a user perspective.

It's not the responsibility of either [Website & Docs](/handbook/small-teams/website-docs) or [Marketing](/handbook/small-teams/marketing) to document features.

## Releasing

### Best practices for full releases

Opt-in betas can have rough edges, but public betas and full releases should be more polished and user friendly. 

Engineers should apply the following best practices for _all_ new releases:

* Ensure Marketing is aware of the launch, so [a launch plan](/handbook/growth/marketing/product-announcements) can be created.
* Ensure docs are updated to reflect the new release.
* Ensure all new features include at least one pre-made template (or equivalent) for users.

### Self-hosted and hobby versions

We have [sunset support for our kubernetes and helm chart managed self-hosted offering](https://posthog.com/blog/sunsetting-helm-support-posthog). This means we no longer offer support for fixing to specific versions of PostHog. A [docker image is pushed for each commit to master](https://hub.docker.com/r/posthog/posthog). Each of those versions is immediately deployed to PostHog Cloud.

The [deploy-hobby script](https://github.com/PostHog/posthog/blob/master/bin/deploy-hobby) allows you to set a `POSTHOG_APP_TAG` environment variable and fix your docker-compose deployed version of PostHog. Or you can edit your docker-compose file to replace each instance of `image: posthog/posthog:$POSTHOG_APP_TAG` with a specific tag e.g. `image: posthog/posthog:9c68581779c78489cfe737cfa965b73f7fc5503c`

### Releasing as a beta

We can release betas both as publicly available, or opt-in. See: [Releasing a feature as beta](/handbook/product/releasing-as-beta). 

It's always worth letting Marketing know about new betas so they can help raise awareness. [The owner](/handbook/engineering/development-process#assign-an-owner) should tag them on an issue, or drop a message in the Marketing Slack channel. 

Betas are usually announced as milestones on the public roadmap and included in the changelog by Marketing.

### Product announcements

Announcements, whether for beta or final updates, are a Marketing responsibility. See: [Product announcements](/handbook/growth/marketing/product-announcements).

In order to ensure a smooth launch [the owner](/handbook/engineering/development-process#assign-an-owner) should tell Marketing about upcoming updates as soon as possible, or include them in an All-Hands update. 

It's _never_ too early to give Marketing a heads-up about something by tagging them in an issue or via the Marketing Slack channel.


