---
date: "2026-07-28"
title: "10,000 PRs a month is easy: How devex is evolving at PostHog"
author:
  - paul-dambra
rootPage: /blog
sidebar: Blog
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1783662227/stop_being_the_code_review_bottleneck_hero_a734a37558.png
featuredImageType: full
showTitle: true
hideAnchor: true
category: Engineering
tags:
  - AI
  - Engineering
---

Shipping cadence is accelerating at PostHog. In the last 6 months, we've gone from shipping 1,441 PRs in January to 4,725 PRs in June while increasing engineering headcount by only 10%.

![More PRs](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_07_23_at_15_27_38_2x_1a2d8df53b.png)

This is heading towards our north star for internal developer experience: "10,000 PRs a month is easy." We thought we would have until December to hit this number, but we might get there as early as September.

More PRs isn't a good thing in and of itself. It happens as a result of hiring talented, driven people and investing in agentic automation. Even if we don't hit these numbers, working toward our goals means making local dev, CI, and validation faster and better.

Here's how we've increased the volume of engineering work while still delivering reliable systems, and the changes we're making to make sure this remains the case.

## Where has this acceleration come from?

The simple answer: people using AI a lot more.

There's no token budget set by some higher-ups at PostHog. We want people to figure out how we _make use of new tools_ and _create new tools_. It's up to them as individuals to use the right amount of tokens, and none of us are going to pretend we know what that amount is. 

This works because it's a big part of our culture to value trust and feedback over process. If we get to the point where we're uncomfortable with someone's spend, we'll dig into that with them and figure out if the spend is reasonable. Everyone else can learn from that too.

Everybody's using agents and writing skills, but our [self-driving loop](/newsletter/loops) is further fueling the accelerated cadence. Over the last 4 months, we moved from around 20% of our monorepo PRs being opened by agent to 70%. [Self-driving](/blog/self-driving-product) is around 4% of our PRs right now but growing fast.

Speeding up the rate we create PRs doesn't necessarily mean speeding up the rate we can handle them. For that, we're relying on agentic loops getting those PRs ready for human attention. Things like: 

- Keeping up to date with [trunk](/product-engineers/trunk-based-development)
- Making sure that CI is passing
- Making sure that reviews have been acted on

The folks who are pushing the limits of what they can achieve have written their own applications, like [review](/newsletter/code-review-tips) and PR management tools or [`qa-swarm`](https://github.com/pauldambra/dotfiles/tree/main/ai/skills/qa-swarm) and [`babysit-prs`](https://github.com/haacked/dotfiles/blob/main/ai/skills/babysit-prs/SKILL.md) skills. They have maybe 40 PRs open at the same time, but we want to push this further and get more people on board. Something like 60% of my token spend is burned automating the toil of handling CI and review and I don't regret a single dollar.

## Getting off local machines

The PostHog stack is very heavy for local development, so we've always needed powerful dev machines. This was fine until people started wanting to run multiple copies of the stack to test PRs. We're hitting the limits of what's possible now; there's only so much RAM and disk you can put into a MacBook.

So, we're building out cloud dev machines. They're skill-driven so you just ask your agent to start a dev machine with a prompt like: 

> Start a dev box, run this PR in it, and record me a video of the changes that we're making so I can see the output of the test.

This is powered by our internal developer CLI [`hogli`](https://github.com/PostHog/posthog/tree/master/tools/hogli), which also pushes CI checks down into local dev by helping agents better test code locally. It also includes a tool to quickly send feedback to our devex team when something is difficult (for people or agents), which helps [our devex team](/teams/developer-experience) make specific improvements fast.

## Battling the bottleneck of CI

Like many companies, CI has always been a challenge at PostHog because of the breadth of our product. That means increasing the number of PRs created by 50% month over month was like spraying a house fire with gasoline. 

[Depot](https://depot.dev/customers/posthog), the compute infrastructure for our CI, has handled this incredibly well – in June 2026, we used 21,643,653 minutes of CI time. That's 41 _years_ of CI time in a single month.

The key to making our CI more efficient is defining the work that does **not** get done. Basically, we want to skip the CI more, but not too much; we need it to be in the Goldilocks zone. This means working on:

- Ways of quarantining flaky tests. We can mark tests so they run and report, but can't fail the CI, blocking everyone.

![Quarantining](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_07_24_at_10_46_19_2x_75584c1e76.png)

- Building out the abstract syntax tree (AST) for changes so we can more selectively run tests. Right now, we have too many PRs where the whole test suite is running unnecessarily because the CI can't tell when a change is contained from the static analysis of paths.

- Merge queues, since we're increasingly seeing passing PRs break main when merged together. 

- Increasing the speed of CI jobs like using a pre-migrated database schema (which decreased backend CI times from ~23 to ~15 minutes). 

Alongside all this, we're streaming [GitHub data](/docs/data-warehouse/sources/github) into PostHog. This gives us engineering analytics that we can look at using [PostHog AI](/ai):

- What workflow jobs cost the most money?
- Which take the most time?
- Which fail most frequently?

This lets us make targeted improvements on the CI and get PRs to green faster.

## How we validate PostHog isn't breaking

We've always cared more about making it easy to quickly fix things rather than avoiding breaking them in the first place. This is especially true when dealing with UI, charts, access, and filters. It's much more important that we find out if the change is actually useful instead of wasting time getting it perfect on the first try.

But in reality, there are many services we can't break. For example, accepting and displaying your data – it's the core reason many users come to PostHog. Failing at this would be catastrophic, so we rely on a lot of automated testing and validation, including a quarter of a million Python tests for our backend. They're paying off even more now because they give us higher confidence in agent-driven work where validation says it's safe.

Safety is not quality though, so we have some measures to help us see how things are changing. 

The first is size. Line count is a rough proxy for quality. Less is better as past some threshold people stop reviewing carefully and quality drops. Agents are writing bigger PRs, especially at the extreme, but the average PR is not hugely bigger. Partly that is our engineers driving quality.

| Percentile | Wk of May 25 (lines) | Wk of Jul 13 (lines) | Change |
| ---------- | -------------------- | -------------------- | ------ |
| p50        | 120                  | 144                  | +20%   |
| p75        | 398                  | 760                  | +91%   |
| p90        | 1,004                | 1,432                | +43%   |
| p99        | 7,718                | 14,023               | +82%   |

Another way to judge quality is through PR titles. We use conventional commits like `fix`, `feat`, and `revert` to signal the type of work in the PR.

| Prefix              | May 2025 (count/share) | Nov 2025    | Jun 2026      |
| ------------------- | ---------------------- | ----------- | ------------- |
| Total merged PRs/mo | 755                    | 1,126       | 4,868         |
| fix                 | 309 / 40.9%            | 430 / 38.2% | 1,997 / 41.0% |
| feat                | 259 / 34.3%            | 397 / 35.3% | 1,782 / 36.6% |
| chore               | 154 / 20.4%            | 250 / 22.2% | 823 / 16.9%   |
| refactor            | 15 / 2.0%              | 28 / 2.5%   | 130 / 2.7%    |
| perf                | 4 / 0.5%               | 5 / 0.4%    | 68 / 1.4%     |
| revert              | 1 / 0.1%               | 5 / 0.4%    | 9 / 0.2%      |

The distribution of PR types is stable across the last year. AI isn't just creating more fixes or refactors. More importantly, the percentage of reverts has barely changed, and we are eager to revert whenever we need to. This is a sign production isn't breaking more under the load of agentic PRs. 

The ultimate goal is [reliability for all of PostHog](https://www.posthogstatus.com/us), which has remained solid:

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

We require approvals on all our PRs. An increasing number of these approvals are coming from StampHog, an agent that runs deterministic safety checks then reviews with an LLM for showstoppers. If it's happy, it approves. If not, it escalates to human review. 

We built StampHog by looking at:

- The open history of PRs in PostHog and asking "what does a PR look like when it's approved without any further changes?" 
- How safe the area of the application is to change 
- How familiar with that part of the system the engineer opening the PR is

20% of our PRs are approved by StampHog and it only costs us about $300 per month in tokens. This is an incredibly efficient investment for the speed up it gives engineers who can now deliver small safe steps very quickly. 

For more complicated reviews, we're also building out ReviewHog which we'll eventually offer as part of self-driving product. It gives us the top-down, thorough review by a fleet of agents.

Combined, these agentic tools let our engineers concentrate on the genuinely important questions that need human attention, like: 

- "Do I understand this change?"
- "Does the author understand the change?"
- "Is this change safe?"
- "Is this change valuable?"

Simple reviews have become like linting. Humans shouldn't be doing either.

For example, if someone told you 12 months ago that a line should be wrapped at a particular character, you would say, "Hey, I've updated the linter, you can ignore this." Agents can basically do this for logic problems and laziness faster, more effectively, and more consistently than a human.

This means we can have a world where humans review code less. And the code reviews they do are more effective as a result. We're continuing to work on tools and agentic flows we can use in CI to make it safe to operate at this new, increased speed.

## Agents need to test more of the code

The next horizon – which I think is something that needs to be solved across the industry and we're really excited to work on – is having agents test as much of the code as possible. 

We're not in the old world of writing some Playwright code by hand to assess a change, and then running that slow test every time. Instead, we can make an agent do a subset of what a human would do: 

- Click around in the application
- See if it still works
- See if it does what it claims to do

[Pawel](/community/profiles/33209) built an early version of this with a [`qa-frontend`](https://github.com/PostHog/posthog/pull/72523) skill that checks out a PR, designs test cases, and drives the actual UI in a browser. The agent's output lands as annotated screenshots, an animated reel inline, and even an optional recorded video.

This makes reviews easier, but it also gives agents a way to escalate and say "I need a human! I don't like it, it doesn't make sense to me, it needs further thought, it isn't good enough, or doesn't work, etc." The agent can also say "hey, I wrote a Playwright test for this because I think it should stay in the application." 

Agents are doing tasks that humans could do themselves, but the point is to reduce the amount of work we do per PR if we're reviewing 2-4x as many as before. If we don't, we'll hit a ceiling – not because we're at the limit of the system, but because humans physically don't have the time. All our efforts here are working to avoid this. That's what we believe makes for good devex in the age of agents.