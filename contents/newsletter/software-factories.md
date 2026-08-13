---
title: Can software factories actually work?
date: 2026-08-11
author:
  - jina-yoon
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/software_factories_hero_f6716d0726.png
featuredImageType: full
tags:
  - Product engineers
  - Engineering
crosspost:
  - Blog
seo:
  metaTitle: Can software factories actually work?
  metaDescription: >-
    Software factories let agents ship code with little human review. What they
    are, why Dex Horthy says they fail, and the context they're missing.
---

Agents write code faster than any human can review.

To keep from [becoming the bottleneck](/newsletter/code-review-tips), engineers everywhere have been building **software factories**: automated systems and guardrails that let agents ship and test on their own.

But the hype came to a sudden halt when HumanLayer CEO Dex Horthy went viral with a three-part series on [Why Software Factories Fail](https://x.com/dexhorthy/status/2080697380379427275) last month. He argues that no amount of harness engineering can ever make them work at scale.

So, will we always be stuck reading the code, or can software factories actually work?

## What is a software factory?

The idea is simple. With the right pipeline in place, you can automate most (if not all) of software development, much like an industrial assembly line.

It involves several [loops](/newsletter/loops) scaffolded with tools like version control, CI/CD, and monitoring that make it easy for anyone – human or agent – to ship code in a standardized, repeatable process.

Current software factories that incorporate agents look something like this:

![A flowchart of the software factory pipeline: decide, build and test, review, deploy, use, with most stages being replaced by agents](https://res.cloudinary.com/dmukukwp6/image/upload/software_factories_pipeline_1518a5af30.png)

1. Humans **decide** what to build and put it into a ticketing system.
2. Agents pull tickets, **build and test** PRs that satisfy the requirements, then submit them for CI and review.
3. If the PR is approved, the code is **deployed** to production via CD.
4. If it’s rejected, it goes back to an agent for further **iteration** until it gets approved.
5. Once the code is in production, **users** engage with it and emit data, feedback, and signals that inform what gets built next.

Since it’s just a metaphor, there’s no actual criteria for what counts as a software factory. It’s easier to think about it as a spectrum based on **how much of the code is produced by agents**, and **how closely humans still read the code**:

![A chart plotting Uber, Ramp, Cursor, PostHog, OpenAI, and StrongDM by how much of their code is produced by agents against how closely humans read it](https://res.cloudinary.com/dmukukwp6/image/upload/software_factories_spectrum_da79730796.png)

<Caption>(These are estimates based on what companies have published.)</Caption>

[Ramp](https://builders.ramp.com/post/why-we-built-our-background-agent), [Cursor](https://cursor.com/blog/third-era), and [Uber](https://www.uber.com/us/en/blog/ureview/) land near the middle today. They’ve posted about using autonomous background agents without explicitly calling them software factories. PostHog is just a little further than that with [agents writing about 70% of our PRs](/blog/10k-prs-a-month), but humans still [skim at least 80%](/newsletter/code-review-tips#3-add-a-pr-auto-stamper) of those.

The top right corner is where it gets controversial with [“lights-off” software factories](https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/), or “dark” software factories. In these, agents write all of the code while humans read none. This requires:

- **A high degree of AI adoption** in a team. Just having access to coding agents doesn’t mean anything if no one is using them.
- A system where **agent output gets validated to the point of mergeability**, such as with peer reviews, local testing, or browser clickthroughs; writing unit tests or reasoning about their own code is not enough.
- **Guardrails that assume failure,** such as sandboxes, permissions, and deterministic checks. Humans only act as decision makers on high risk PRs.

Only a few companies like [StrongDM](https://factory.strongdm.ai/) have publicly written about going fully lights-off, and [many developers are skeptical](https://news.ycombinator.com/item?id=46924426) about the approach.

<NewsletterForm />

## Why is everyone talking about them now?

As humans shifted from writing code to orchestrating agents that write code for them, code review has become the new bottleneck.

At the same time, models keep getting better, so people are building loops, systems, and tools where agents review and/or merge PRs instead of humans – a.k.a., software factories.

But the discussion *really* heated up when Dex Horthy went viral with his three-part piece on [Why Software Factories Fail](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md) a few weeks ago.

He argues that no amount of harness engineering makes lights-off software factories viable because the problem lies in the models.

He specifically highlights how coding agents are rewarded for one-off code correctness during RL training:

> How the model got to a correct answer doesn’t matter. If the tests pass, we win, but there is no penalty for eroding codebase maintainability.

This happens because there simply aren’t many benchmarks that can detect quality and maintainability in the first place. The paper behind one recently published benchmark, [SlopCodeBench](https://arxiv.org/html/2603.24755v1), describes the challenge well:

> Every design decision in software engineering is a compromise with unknown future requirements.

In other words, whether a design is good or not depends on what an agent will get asked to build next. That rubric is unique to every codebase and impossible to know in advance.

So, until there are better benchmarks in place, Dex’s recommendation is to either keep reading the code, or front-load human effort in the planning phase.

## What software factories are missing

The problem with most software factories today is that they enforce a clean separation between “deciding what to build” and “building it.”

This is evident in every blog about software factories we’ve seen so far. The pipeline always begins with a step where a human does all the planning and decision-making first, stuffs the requirements in a ticket, then hands it off to an agent with zero prior context on the problem.

Dex’s argument follows this pattern, too. In [part 3](https://x.com/dexhorthy/status/2081797628552270027), he says a better oracle for code quality would be whether the output “passes all verifiers for an incrementally-divulged spec.” Again, it’s assumed that the agent that writes the code must receive a spec written by a human.

In the real world, **that’s not how good [product engineering](/product-engineer/what-is-a-product-engineer) works.**

Every engineer knows that to design a system well, you need both the technical constraints as well as a deep understanding of the problem. This is why product engineers need to [talk to users](/newsletter/talk-to-users), [measure product-market fit](/newsletter/what-weve-learned-about-product-market-fit), and [validate product ideas](/newsletter/validating-product-ideas). It’s also why our [engineers decide what to build](/newsletter/product-management-is-broken#2-engineers-make-product-decisions), not PMs.

The same applies to coding agents. An agent makes better architectural choices if they have access to relevant information, such as how your product is currently being used, your [ideal customer profile](/newsletter/ideal-customer-profile-framework), what users are complaining about, or what else is going on in your company:

![The same software factory pipeline, with product context from the decide and use stages feeding into software design decisions](https://res.cloudinary.com/dmukukwp6/image/upload/software_factories_product_context_56c6397db5.png)

Looking at signals from prod is especially valuable for enabling code *maintainability* since most software changes happen in response to actual usage. At PostHog, for example, 63% of changed lines are in files that already exist, and fix is [our largest commit type](/blog/10k-prs-a-month#how-we-validate-posthog-isnt-breaking) at 40%.

And if you think about the last time you addressed an incident in prod or a piece of user feedback, you probably relied more on [logs](/logs) and [traces](/traces) to figure out a fix instead of trusting someone else’s secondhand account of the problem.

These are the kinds of problems we’re working on at PostHog to make [self-driving products](/blog/what-if-your-product-built-itself) a reality: giving agents the same context that human engineers would use to make better design decisions.

Once you have that, turning off the lights might not be so crazy after all.

<NewsletterForm />
