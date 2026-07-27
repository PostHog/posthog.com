---
date: "2026-07-24"
title: "10,000 PRs a month is easy: How devex is evolving at PostHog"
author:
  - paul-dambra
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: Engineering
tags:
  - AI
  - Engineering
---

Shipping cadence is accelerating at PostHog. In the last 6 months, we've gone from shipping 1,441 PRs in January to 4,725 PRs in June while increasing engineering headcount only 10%.

![More PRs](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_07_23_at_15_27_38_2x_1a2d8df53b.png)

This is heading towards our north star for internal developer experience: "10,000 PRs a month is easy." We thought we'd have until December, but this might come as soon as September.

We don't think more PRs is a good thing in and of itself. It is a consequence of hiring talented, driven people and investing in agentic automation. Even if we don't hit these numbers, devex work still makes local dev, CI, and validation faster and better.

We're sharing how we've been able to increase the volume of engineering work while still delivering reliable systems, and the changes we're making to make sure this remains the case.

## What being AI-pilled looks like

There's no token budget at PostHog. We want people to figure out how we _make use of new tools_ and _create new tools_. It's up to them to use the right amount of tokens and we're not pretending we know what that amount is. 

At PostHog, we value trust and feedback over process. If we get to the point where we're uncomfortable with someone's spend, we'll dig into that with them and figure out if the spend is reasonable. Everyone else can learn from that too.

Everybody's using agents and writing skills, but our [self-driving loop](/newsletter/loops) is further fueling the accelerated cadence. Over the last 4 months, we've moved from around 20% of our monorepo PRs being opened by agent to 70%. [Self-driving](/blog/self-driving-product) is around 4% of our PRs right now but growing very fast.

Speeding up the rate we create PRs doesn't necessarily mean speeding up the rate we can handle them. For that, we're relying on agentic loops getting those PRs ready for human attention. Things like: 

- Keeping up to date with trunk
- Making sure that CI is passing
- Making sure that reviews have been acted on

The folk who are pushing the limits of what they can achieve have written their own applications, like review and PR management tools or [`qa-swarm`](https://github.com/pauldambra/dotfiles/tree/main/ai/skills/qa-swarm) and [`babysit-prs`](https://github.com/haacked/dotfiles/blob/main/ai/skills/babysit-prs/SKILL.md) skills. They have maybe 40 PRs open at the same time, but we want to push this further and get more people onboard. Something like 60% of my token spend is burned automating the toil of handling CI and review and I don't regret a single dollar.

## Getting off local machines

The PostHog stack is very heavy for local development. That's always meant that we've needed powerful dev machines. This is fine until people want to run multiple copies test PRs. We're hitting the limits of what's possible; there's only so much RAM and disk you can put into a Macbook.

So we're building out cloud dev machines. They're skill-driven so you just ask your agent to start a dev machine with a prompt like: 

> Start a dev box, run this PR in it, and record me a video of the changes that we're making so I can see the output of the test

Powering this is our [internal developer CLI `hogli`](https://github.com/PostHog/posthog/tree/master/tools/hogli). Along with managing cloud dev machines, it pushes CI checks down into local dev by helping agents better test code locally. It also includes a tool to send feedback to our devex team when something is difficult (for people or agents), helping our devex team make specific improvements fast.

## Battling the bottleneck of CI

Like many companies, CI has always been a challenge at PostHog. We've always had a big CI suite due to the breadth of our product. Increasing PRs created 50% month-over-month is like spraying a house fire with gasoline. 

[Depot](https://depot.dev/customers/posthog), the compute infrastructure for our CI, has handled this incredibly well given that in June 2026, we used 21,643,653 minutes of CI time. That's 41 _years_ of CI time in June.

The key part of making our CI more efficient is the work **not** done. Basically, we want to skip the CI more, but not too much. We need it to be in the Goldilocks zone. This means working on:

- Ways of quarantining flaky tests. We can mark tests so they run and report, but can't fail the CI, blocking everyone.

![Quarantining](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_07_24_at_10_46_19_2x_75584c1e76.png)

- Building out the abstract syntax tree (AST) for changes so we can more selectively run tests. Right now, we have too many PRs where the whole test suite is running unnecessarily because the CI can't tell a change is contained from the static analysis of paths.

- Merge queues as we're increasingly seeing passing PRs break main when merged together. 

- Increasing the speed of CI jobs like using a pre-migrated database schema (which decreased backend CI times from ~23 to ~15 minutes). 

Alongside all this, we're streaming [GitHub data](/docs/data-warehouse/sources/github) into PostHog. This lets us have engineering analytics set up for ourselves and look at it with [PostHog AI](/ai):

- What workflow jobs cost the most money?
- Which take the most time?
- Which fail most frequently?

This lets us make targeted improvements on the CI and get PRs to green faster.

## How we validate it isn't breaking

We've always been more interested in being able to quickly fix things over avoiding breaking things in the first place. In areas like UI, charts, access, and filters, it's much more important that we find out if the change is useful than getting it perfect first time. 

But we know there's a lot of stuff that can't break. Accepting and displaying your data is the core use case of PostHog for many users. Failing at this is catastrophic, so we rely on a lot of automated testing and validation. We've written a quarter of a million Python tests for our backend. They're paying off even more now because they mean we have higher confidence in agent driven work where validation says it's safe.

Safety is not quality though, so we have some measures to help us see how things are changing. 

The first is size. Line count is a rough proxy. Past some threshold people stop reviewing carefully and quality drops. Agents are writing bigger PRs but not hugely bigger. Partly that is our engineers driving quality.

| Percentile | Wk of May 25 (lines) | Wk of Jul 13 (lines) | Change |
| ---------- | -------------------- | -------------------- | ------ |
| p50        | 120                  | 144                  | +20%   |
| p75        | 398                  | 760                  | +91%   |
| p90        | 1,004                | 1,432                | +43%   |
| p99        | 7,718                | 14,023               | +82%   |

Another way is PR titles since we use conventional commits like `fix`, `feat`, and `revert` to signal the type of work in the PR.

| Prefix              | May 2025 (count/share) | Nov 2025    | Jun 2026      |
| ------------------- | ---------------------- | ----------- | ------------- |
| Total merged PRs/mo | 755                    | 1,126       | 4,868         |
| fix                 | 309 / 40.9%            | 430 / 38.2% | 1,997 / 41.0% |
| feat                | 259 / 34.3%            | 397 / 35.3% | 1,782 / 36.6% |
| chore               | 154 / 20.4%            | 250 / 22.2% | 823 / 16.9%   |
| refactor            | 15 / 2.0%              | 28 / 2.5%   | 130 / 2.7%    |
| perf                | 4 / 0.5%               | 5 / 0.4%    | 68 / 1.4%     |
| revert              | 1 / 0.1%               | 5 / 0.4%    | 9 / 0.2%      |

The composition is stable across the last year or so. Importantly reverts as a proportion of PRs has barely changed. And we are eager to revert whenever we see a need to. So, that's a good signal that production is not breaking more under the load of agentic PRs.

The ultimate goal is reliability for all of PostHog which has remained solid. 

| Service                      | Uptime (90d, Apr 26–Jul 24 2026) |
| ---------------------------- | -------------------------------- |
| Event ingestion (success)    | 100.00%                          |
| Session replay ingestion     | 100.00%                          |
| Feature Flags API            | 100.00%                          |
| App                          | 99.993%                          |
| REST API query endpoints     | 99.985%                          |
| All other REST API endpoints | 99.951%                          |
| PostHog AI                   | 99.927%                          |

## Humans don't need to review every PR

With agents creating more and more of the PRs, [code review](/newsletter/code-review-tips) becomes a bigger part of the work. Engineers spend less time on each review, so we need to find ways of making that safe while maintaining momentum.

We require approvals on all our PRs, but an increasing number of those approvals are coming from StampHog. It runs deterministic safety checks then reviews with an LLM for showstoppers. If it's happy, it approves. If not, it escalates to human review. 

We put it together by looking at:

- The open history of PRs in PostHog and asking "what does a PR look like when it's approved without any further changes?" 
- How safe the area of the application is to change 
- How familiar with that part of the system the engineer opening the PR is

20% of our PRs are approved by StampHog and it only costs us about $300 per month in tokens. This is an incredibly efficient investment for the speed up it gives engineers who can now deliver small safe steps very quickly. 

For more complicated reviews, we're also building out ReviewHog which we'll eventually offer as part of self-driving product. It gives us the top-down, thorough review by a fleet of agents.

These let engineers concentrate on the genuinely important stuff: 

- Do they understand this change?
- Does the author understand the change?
- Is it safe?
- Is it valuable?

Simple reviews have become like linting. You shouldn't have humans be doing either.

12 months ago, if someone told you a line should be wrapped at a particular character, you would say "hey, I've updated the linter, you can ignore this." Similarly now, agents can spot logic problems and laziness faster, more effectively, and more consistently than a human.

This means we can have a world where humans review code less and the ones they do are more effective as a result. We're doing a lot of work on tools and agentic flows we can use in CI to make it safe to operate at this new, increased speed.

## What's next

The next horizon, which I think is something that needs to be solved across the industry and we're really excited to work on, is having agents test as much of the code as possible. 

We're not in the old world of writing some Playwright code by hand to assess a change then running that slow test every time. Instead, we can do a subset of what a human would do: 

- Click around in the application
- See if it still works
- See if it does what it claims to do

<TeamMember name="Pawel Cebula" photo /> built an early version of this with a [`qa-frontend` skill](https://github.com/PostHog/posthog/pull/72523) that checks out a PR, design test cases, and drives the actual UI in a browser. Evidence lands as annotated screenshots, an animated reel inline, and even an optional recorded video.

This makes reviews easier, but also gives agents a way to escalate and say "I need a human! I don't like it, it doesn't make sense to me, it needs further thought, it isn't good enough, or doesn't work." The agent can also say "hey, I wrote a Playwright test for this because I think it should stay in the application." 

A human could do this if they choose, but when we're going to be reviewing 2-4x as many PRs, we have to reduce the amount of work we do per PR. If we don't, we will hit a ceiling in what's possible, not because we're at the limit of the system, but because humans physically don't have the time. All our efforts here are working to avoid this.