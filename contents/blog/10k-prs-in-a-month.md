---
date: "2026-07-22"
title: "10k PRs in a month? easy!"
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

The north star for internal developer experience at PostHog is "10,000 PRs in a month is easy". As agent workflows accelerate what is possible. We're sharing what we're changing and how we've been able to increase the volume of engineering work and keep delivering reliable systems

## AI pilled

*Covers:*

- No token budget — trust and feedback over process
- Individuals building their own review and PR management tools
- Folk at the edges: 20–40 PRs open, agentic flows managing them
- 20% → 70% of monorepo PRs with agent involvement in 4 months; self-driving ~4% and growing fast

There's no token budget at PostHog. We can see that the world of product engineering is changing rapidly. And we want people to figure out what that means for us... how we make the best use of the new tools and create new tools with them. So we want people to use the right amount of tokens for their work. And we're not going to pretend we know what that amount is right now. 

The most important thing being that we're not putting a budget in front of people. In all the things we do at PostHog, we value trust and feedback over process. So if we find we get to the point where we're uncomfortable with someone's spend, we'll dig into that with them and figure out if the spend is reasonable. And what we can learn from that for everyone else.

At the individual level, we have people writing their own review tools and their own PR management tools. We've found that being able to speed up the rate at which we can create PR's doesn't mean we've been able to speed up the rate at which we can deal with PR's. 

The folk who are really pushing the limits of what they can achieve have written their own applications. They have maybe 40 prs open at the same time. The only way to make that work is to have agentic loops getting those PRs ready for human attention. Things like keeping up to date with trunk, making sure that ci is passing, making sure that reviews have been acted on

$$$ something about skills and scouts $$$

Over the last 4 months we've moved from around 20% of our monorepo PRs being opened with agent involvement to 70% (that's not PRs with no human involvement :)). Self-driving  product is around 4% of our PRs right now but growing very fast.

## Local dev

*Covers:*

- Heavy stack vs. agents wanting multiple copies running — macbooks can't keep up
- Skill-driven dev machines: ask your agent to start a dev box, test, record a video
- Cloud runners — for our stack and anybody's
- hogli custom CLI; pushing CI down into local development

The PostHog stack is very heavy for local development. that's always meant that we've needed very powerful dev machines and that was fine up until the point where people want to run multiple copies of the system to test multiple prs their agents are working on. and there's only so much ram and disk you can put into a macbook.

So we're building out literal dev machines. they're skill driven so you just ask your agent to start a dev machine and test the work that you're doing. a prompt like: "start a dev box, run this PR in it, record me a video of the changes that we're making so i can see the output of the test"

We also have a custom CLI we call `hogli`. it advertises a tool so that agents send feedback to our devex team when something is difficult for them. And gives us an easy way to push a bunch of our CI checks down into local development machines.

## CI

*Covers:*

- 10–50% MoM growth in PRs merged; 10,000 PRs/month north star, maybe a September problem
- Scale: 21.6M CI minutes in June — 41 years of compute
- Work not done: flaky test quarantine, merge queues, AST-based test selection (Goldilocks skipping)
- Dogfooding: GitHub data streamed into PostHog, engineering analytics on cost/time/failure

And the next step in the chain is ci we run a phenomenal amount of ci due to it was always a very big ci suite and now we see 10% - 50% month-on-month growth in PRs merged

| Month (2026) | PRs merged |
|---|---|
| January | 521 |
| February | 2,126 |
| March | 2,478 |
| April | 2,785 |
| May | 2,302 |
| June | 4,725 |
| July (projected) | ~5,200 (3,506 through Jul 21) |

We thought that 10,000 PRs in a month was a problem we had until at least December to solve. But getting self-driving running here at PostHog and our engineers getting agent- and skills- pilled means it's maybe a September problem. So the focus another focus of the developer experience team is "10 000 prs in a month is easy" that's our north star for developer experience.

depot, their infrastructure, is handling this incredibly well. In June 2026 we used 21,643,653 minutes of CI time. That's 41 _years_ of CI time in June.

we have to make this gigantically easier for the developers here. so that we can keep the same pace of work the same quality of work or even a increased pace and quality of work

So the work not done becomes super important. 

- We're trying out ways of quarantining flaky tests 

- We're trying out merge queues to make sure that you know the speed at which we can generate PRss. We're starting to see not having a merge queue be a problem. 

- We're going to start looking into building out the AST for the changes that are made so that we can run only tests that could be impacted by the changes being made. At the minute, we still have too many PRs where the change is very contained but the computer can't tell that just from static analysis of paths and we run the whole test suite unnecessarily.

- A lot of investment going into how fast the CI jobs are 

- How much were able to skip in CI and that's tricky work because we can't skip too much we have to skip just the right amount it needs to be Goldilocks work not done

- Alongside that we dog food PostHog all the time so we're now streaming github data into PostHog we have engineering analytics set up for ourselves so we can start to look really directly with PostHog AI what workflow jobs cost the most money take the most time fail most frequently really dig into very targeted improvements to see I flow for users that's getting to green on the PR

## Validation

*Covers:*

- A quarter of a million python tests — safety that lets agentic work move fast
- Measuring quality is hard (maybe pointless); fix fast over never break
- PR sizes growing but not hugely (percentile table)
- PR title composition stable, reverts flat — production isn't breaking under the load
- Reliability going up overall

We've always been very keen on automated testing and automated validation. We've got a quarter of a million python tests for our back end largely because know that we can accept your data and know that we can show you your data are super super important. We've always made sure that that's incredibly safe so that we can move fast and still be safe and that's really paying off now because it means we can have agentic driven work and have high confidence in the prs where it's safe to have high confidence.

Measuring quality is a very difficult (maybe pointless) task. We've always been more interested in being able to quickly fix things over avoiding breaking things in the first place. That's not true as much in a CI checks house, where the quality of the code and the safety of the change are much more important. In areas like the UI, how we're presenting information, how we're letting you have access, and how we let you filter things, we've always believed it's much more important that we find out if the change is useful than that we get the change perfect first time.

But we can have some measures of quality to help us see how things are changing

agents are writing bigger PRs but not hugely bigger. partly that is our engineers driving quality,

| Percentile | Start (wk of May 25) | End (wk of Jul 13) | Change |
|---|---|---|---|
| p50 | 120 | 144 | +20% |
| p75 | 398 | 760 | +91% |
| p90 | 1,004 | 1,432 | +43% |
| p99 | 7,718 | 14,023 | +82% |

It's not a great measure of quality to look at line count... but I'd expect that over some arbitrary number of lines. People just stop reviewing and the quality of the change isn't as high.

Then we can look at PR titles, since we use conventional commits to signal the type of work in the PR.

| Prefix | May 2025 (count / share) | Nov 2025 | Jun 2026 |
|---|---|---|---|
| Total PRs/mo (all PRs, not just merged) | 755 | 1,126 | 4,868 |
| fix | 309 / 40.9% | 430 / 38.2% | 1,997 / 41.0% |
| feat | 259 / 34.3% | 397 / 35.3% | 1,782 / 36.6% |
| chore | 154 / 20.4% | 250 / 22.2% | 823 / 16.9% |
| refactor | 15 / 2.0% | 28 / 2.5% | 130 / 2.7% |
| perf | 4 / 0.5% | 5 / 0.4% | 68 / 1.4% |
| revert | 1 / 0.1% | 5 / 0.4% | 9 / 0.2% |

We see that composition is very stable across the last year or so. Importantly reverts as a proportion of PRs is very stable. And we are super eager to revert whenever we see a need to. So, that's a good signal that production is not breaking more under the load of agentic PRs

An aside that reliability of PostHog overall is going up too, $$$some reliability fact here$$$

flakey test suites are the biggest problem we face here. $$$ and so we've done $$$

## Review

*Covers:*

- StampHog: $300/month in tokens, auto-approves ~20% of PRs based on safety + familiarity
- ReviewHog: fleet-of-agents thorough review for anything not simple
- Humans review way less, reviews way more effective — focus on understanding, safety, value
- The linting analogy: agents catch logic laziness like linters caught formatting

### StampHog

The next step then is approving the PR we have a tool called StampHog which costs us about 300 dollars in tokens a month. It's an incredibly efficient investment in token for the speed up it gives engineers

What we've done is we've looked at: 

- The open history of PRs in PostHog and said "what does a PR look like when it's approved without any further changes?" 
- How safe the area of the application is to change 
- How familiar with that part of the system the engineer opening the PR is

If StampHog is happy, it approves the PR. It's about 20% of our PRs are being approved that way right now. It's a huge speed increase for engineers who can now deliver small safe steps very quickly 

### ReviewHog

We're also building out ReviewHog which will offer as part of self-driving product. It gives us the top-down review by fleet of agents doing really thorough review.

We have the simple PRs that can get just a "let's get this merged." Anything that's not simple then automatically gets ReviewHog running and gets a really thorough agentic review so that by the time you come to actually needing a human review there's very little for the human to do. They can concentrate on the genuinely important stuff 

- Do they understand this change 
- Does the author understand the change 
- Is it safe 
- Is it valuable 

### It's just linting

You know, 12 months ago, if you had someone telling you that a line should be wrapped at a particular character or not wrapped at a particular character, you would say "hey, I've updated the linter, you can ignore this." 

It's just linting. We shouldn't have humans doing linting of code and the same is true now where an agent can be doing a simple review. 

You know you've said a string beginning with the character `O` is a good enough test that someone's name is `owen`. Well, it's not. It's gonna match `oscar` and `oliver` and so you need a better test or better code there. An agent can do that way faster, more effectively, and more consistently than a human. Agents will spot that kind of logic problem and laziness. 

So in the same way you wouldn't have humans linting code, we now can have a world where humans review code way less. The reviews are way more effective as a result. We're doing a lot of work into what tools we can use in CI and what agentic flows we can use in CI in order to make it really safe to operate at this new increased speed of ten percent month on month.

## What's next

*Covers:*

- Agents testing code in CI: "look at this PR, record a video, assess whether it works"
- Agents escalating to humans — or codifying their testing as playwright tests
- Reducing human work per PR so review volume doesn't become the ceiling

The next horizon after that, which I think is something that has to be solved across the industry and we're really excited to work on, is having agents test as much of the code as possible. 

I'm interested in getting to a point where we can run an agent in the CI, give it the prompt to look at the changes, record a video, and assess whether it works or not. We're not in the old world of writing some Playwright code by hand to assess a change and having to run that slow test every time there's a change. We can do a subset of what a human would do: 

- Click around in the application
- See if it still works
- See if it does what it claims to do

The agent can escalate "hey I need a human, I don't like it. Either this doesn't make sense to me, I think this needs further thought, it isn't good enough, or doesn't work." The agent can also escalate say "hey, I wrote a Playwright test for this, I didn't just record the video, I also codified that testing because I think it should stay in the application." 

All this stuff a human could still do if they choose, but in a world where we're going to be reviewing two or three or four times as many PRs, we have to reduce the amount of work we do per PR. We will hit some ceiling in what we can achieve just because humans are involved and not because the value of the system is better after that. Just because we physically can't spend the time.
