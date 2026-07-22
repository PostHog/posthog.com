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

At the individual level, we have people writing their own review tools and their own PR management tools. We've found that being able to speed up the rate at which we can create PR's doesn't mean we've been able to speed up the rate at which we can deal with PR's. So building and testing and validating in production still have to happen even where we can speed up the work that we're doing.

and that's not all we're doing at dev x at posthog but those are the really top level things then you see the folk who are out at their edges really pushing the limits of what they can achieve have written their own applications they have you know the 20 30 40 prs open at a time they have agentic flows keeping those prs up to date with trunk making sure that ci is passing making sure that reviews have been requested and that's all stuff that we're not we're happy for folk to spend the time learning that and it means we can fold it back into either what we offer to everyone at PostHog internally or what we offer to our customers as we let their products build themselves

Over the last 4 months we've moved from around 20% of our monorepo PRs being opened with agent involvement to 70% (that's not PRs with no human involvement :)). Self-driving  product is around 4% of our PRs right now but growing very fast.

## Local dev

*Covers:*

- Heavy stack vs. agents wanting multiple copies running — macbooks can't keep up
- Skill-driven dev machines: ask your agent to start a dev box, test, record a video
- Cloud runners — for our stack and anybody's
- hogli custom CLI; pushing CI down into local development

We've been working on local dev machines the PostHog stack is very heavy that's always meant that we've needed very powerful dev machines and that was fine up until the point now where people want to run multiple copies of the system test multiple prs that they're working on if they're being really leaning into agentic development and there's only so much ram and disk you can put into a macbook so we're building out literal dev machines they're skill driven so you just ask your agent to start a dev machine and test the work that you're doing quite frequently instead of driving the site myself i just tell an agent session start a dev box, run this copy of the site in it, record me a video of the changes that we're making so i can see the output of the test rather than do the test myself in PostHog desktop we're also building cloud runners so we're making a way for cloud runners to run not just our stack but anybody's stack so you can do the same type of work in there so for local dev the reaction is mostly no limits on tokens and strong local dev flow we have a custom cli we call hog li or hogli which does gives us a way to help people out so we've pushed a bunch of ci down into local development

## CI

*Covers:*

- 10–50% MoM growth in PRs merged; 10,000 PRs/month north star, maybe a September problem
- Scale: 21.6M CI minutes in June — 41 years of compute
- Work not done: flaky test quarantine, merge queues, AST-based test selection (Goldilocks skipping)
- Dogfooding: GitHub data streamed into PostHog, engineering analytics on cost/time/failure

and the next step in the chain is ci we run a phenomenal amount of ci due to it was always a very big ci suite and now we see 10% - 50% month-on-month growth in PRs merged

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

so the work not done becomes super important we're trying out ways of quarantining flaky tests we're trying out merge queues to make sure that you know the speed at which we can generate prs we're starting to see not having a merge queue be a problem we're going to start looking into building out the ast for the changes that are made so that we can run only tests that could be impacted by the changes being made at the minute we still have too many prs where the change is very contained but the computer can't tell that just from static analysis of paths and we run the whole test suite unnecessarily so a lot of investment going into how fast the CI jobs are how much were able to skip in CI and that's tricky work because we can't skip too much we have to skip just the right amount it needs to be Goldilocks work not done alongside that we dog food PostHog all the time so we're now streaming github data into PostHog we have engineering analytics set up for ourselves so we can start to look really directly with PostHog AI what workflow jobs cost the most money take the most time fail most frequently really dig into very targeted improvements to see I flow for users that's getting to green on the PR

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

## Review

*Covers:*

- StampHog: $300/month in tokens, auto-approves ~20% of PRs based on safety + familiarity
- ReviewHog: fleet-of-agents thorough review for anything not simple
- Humans review way less, reviews way more effective — focus on understanding, safety, value
- The linting analogy: agents catch logic laziness like linters caught formatting

the next step then is approving the PR we have a tool called stampog which costs us about 300 dollars in tokens a month it's an incredibly efficient investment in token for the speed up that it gives engineers and what we've done is we've looked at the the open history of PRs in PostHog and said what does a PR look like when it's approved without any further changes we look at how safe the area of the application is to change we look at how familiar with that part of the system the engineer opening the PR is and if stamp hog is happy it approves the PR it's about 20% of our PRs are being approved that way right now it's a huge speed increase for engineers who can now deliver small safe steps very quickly we're also building out review hog which will offer as part of self-driving product but it gives us then the top-down review by fleet of agents doing really thorough review so we have the simple PRs can get just a you know let's get this merged and then anything that's not simple then automatically gets review hog running and gets a really thorough agentic review so that by the time you come to actually needing a human review there's very little for the human to do they can concentrate on the genuinely important stuff do they understand this change does the author understand the change is it safe is it valuable you know 12 months ago if you had someone telling you that a line should be wrapped at a particular character or not wrapped at a particular character you would say hey i've updated the linter you can ignore this it's just linting we shouldn't have humans doing linting of code and i think the same is true now where an agent can be doing a simple review like you know you've said a string beginning with the character O is a good enough test that someone's name is owen well it's not you know that's uh it's gonna match it's gonna match oscar and oliver and so you need a better test there or you need a better code there or an agent can do that way faster way more effectively way more consistently than a human will will spot that kind of you know logic problem and laziness so in the same way you wouldn't have humans linting code we now can have a world where humans review code way less but the reviews are way more effective as a result so we're doing a lot of work there into what tools we can use in ci and what agentic flows we can use in ci in order to make it really safe to operate at this new increased speed of ten percent month on month

## What's next

*Covers:*

- Agents testing code in CI: "look at this PR, record a video, assess whether it works"
- Agents escalating to humans — or codifying their testing as playwright tests
- Reducing human work per PR so review volume doesn't become the ceiling

the next horizon after that which I think is something that has to be solved across the industry and we're really excited to work on is is having agents test as much of the code as possible I'm really interested in just getting to a point where we can run in CI an agent and literally give it the prompt look at the changes in this PR and record a video and assess whether it works or not so we're not in the old world of writing some playwright code by hand to assess a change and then you know having to run that slow test every time there's a change in the application we can just do a subset of what a human would do and click around in the application and see if it still works, see if it does what it claims to do and then that agent can escalate hey I need a human, I don't like it, either this doesn't make sense to me or I do think this needs further thought you know isn't good enough or doesn't work and the agent can also escalate say hey this is, I wrote a playwright test for this I didn't just record the video, I also codified that testing because I think it should stay in the application all stuff that a human could still do if they choose to but in a world where we're going to be reviewing two or three or four times as many PRs we have to reduce the amount of work we do per PR otherwise we hit some ceiling in what we can achieve just because humans are involved and and not because the value of the system is better after that but just because we physically can't spend the time
