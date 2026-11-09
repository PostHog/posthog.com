---
title: Analytics has changed. Here's what to do about it
date: 2026-11-02
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/analytics_changed_hero_12b81c9788.png
featuredImageType: full
tags:
  - Product engineers
  - Engineering
crosspost:
  - Blog
seo:
  metaTitle: Analytics has changed. Here's what to do about it
  metaDescription: >-
    Everything builders need to know about analytics now – proactive AI agents,
    connecting product and business data, treating agents as users, and shared,
    verified context.
---

In the last few years, analytics has changed as much as coding has, but with nearly none of the fanfare.

Products now take in more data, scale faster, and have higher costs. Doing analytics the old way will leave you overwhelmed and underinformed.

To help you update your knowledge, here are the things you need to know about how analytics has changed, and the best practices for doing analytics now.

## 1. Let AI make your analytics proactive

Humans can’t handle all the analytics data coming their way. For example, the median company records [9 hours of session replays per month](/blog/nobody-watches-session-replays), which leads to 99.8% of [session recordings](/session-replay) going unopened.

AI and automations might do a worse job than humans, but they can do analytics more proactively. This can squeeze more value out of your analytics data that currently goes unused and wasted.

Getting AI to do proactive analytics [requires giving it direction](/blog/a-scanner-that-watches-everything-sees-nothing). It’s not enough to just let AI loose on your analytics data and say “find some fixes.” When given free rein over all your data, agents often get lost or confused.

Our proactive analytics agents (we call them [Scouts](/blog/what-is-a-scout)) always have skills to guide them and a clear output format. Examples include:

- **404 fixer.** The skill tells it to “keep posthog.com free of dead URLs. Each run: find 404s that real people actually hit, work out *why* the URL is dead, and file a report carrying the exact fix so a draft PR opens against `posthog.com`.” In the 2 months it has run, it has changed 377 files and saved 3000+ broken link requests per week.
- **Customers struggle scanner.** Turns “the last 24 hours of observations from one [Replay Vision scanner](/blog/session-replays-opening-pull-requests) into one Slack message for a customer success manager. The scanner judges one recording at a time. Your job is the cross-session work: refresh the scanner’s account scope, group its findings by account, and write the digest.” Has found query failures as well as customers “repeatedly clicking the recording summary control with no visible output, then abandoning” that led to outreach to those specific customers.
- **Dashboard maintainer.** This has “four jobs: surface interesting changes, close what’s missing, maintain the dashboards, and discover dashboards to watch.” One finding was noticing 3,401 skipped evaluations that no insight covered. It built a new chart breaking down the reason that was then added to their main dashboard.

![Dashboard maintainer Scout report showing a chart of 3,401 automatic-work evaluations skipped, broken down by skip reason](https://res.cloudinary.com/dmukukwp6/image/upload/v1794209368/analytics_changed_tip1_skip_reasons_dashboard_13ad886bb7.png)

<NewsletterForm />

## 2. Connect your product and business analytics

Pre-AI, you could get away with focusing on [product analytics](/product-analytics). More users and usage was good because it didn’t cost you anything (or cost very little). Just making your product good was good enough, worrying about the business could come later.

This isn’t the case anymore. The primary reason for this is that AI costs a lot of money. Devs pay hundreds of dollars for coding agent subscriptions. [AI-powered features](/newsletter/building-ai-features) can cost a lot. Building AI into your product means it’s no longer possible to scale to hundreds of thousands of users with your only expenses being a $15/m server and Stripe fees.

Software doesn’t have zero marginal costs anymore. You’ll actually need to figure out what customers will pay for and how to charge them from the start. You can vibe code an app, but you can’t vibe code a business.

AI helps here (again) by:

1. **Reducing silos.** In the past, all your data would be in isolated platforms. Using either [PostHog](/context-warehouse) or a bunch of MCP servers enables you to have it all in one place.
2. **Reducing complexity.** Querying and combining multiple different sources require complex joins and identification. AI can handle them for you. Anyone can do complicated, cross-source investigations now.

With data like [revenue](/docs/data-pipelines/sources/stripe), subscriptions, account status, [ad spend](/docs/web-analytics/marketing-analytics), and [AI observability](/ai-observability) in one place, you can figure out things like:

- **Which features paying customers need, not just free users.** Only 15% of orgs over 250 people using PostHog pay for it, a lower rate than with 100-249 people. Improving that rate would increase ARR by many millions. We only know this because usage, company size, and billing are joined.
- **Which features bring in new customers.** 15% of [Replay Vision](/replay-vision) revenue is from orgs that don’t pay anything for Replays themselves.
- **Which features retain customers.** [Experiments](/experiments) retain customers better than [flags](/feature-flags) alone (86.6% vs 78.4%).
- **The difference between an AI-powered feature costs and what you sell it for.** Thousands of real AI sessions with cost inform our AI pricing, not just usage estimates.

These are all things that product engineers at PostHog look at when deciding what to build, and it’s only possible because the business analytics data is connected to the product data.

## 3. Treat agents like a new set of users

Analytics has not only expanded into new data sources, but whole new types of users: agents. Just like humans, being able to understand what agents are doing is critical to providing them a good experience.

Agent analytics is a nascent field, but here’s some tools at your disposal:

- Tagging key events with an agent or human source. At PostHog, backend events like `dashboard created` or `experiment created` get a `source` property with values like `web`, `mcp`, `slack`, and `cli`. This is how we know 50% of dashboards and 18% of experiments are created using AI.
- [MCP Analytics](/docs/mcp-analytics). Our SDK captures every tool call as an `$mcp_tool_call`. It provides clients, error rates, latency, and intent. Through this we’ve found many [missing capabilities](/docs/mcp-analytics/missing-capability) as well as broken ones, like agents telling us they couldn’t resolve or archive error tracking issues.
- Tracking AI crawlers and assistants through logs as they don’t run JavaScript. We [forward logs](/docs/web-analytics/sending-http-logs) from Vercel as `$http_log` events, and then classify them. This lets us see the requests AI crawlers, assistants, and search are making on our site.

![PostHog insight ranking posthog.com pages by requests from AI crawlers, search, and assistants, built from forwarded Vercel HTTP logs](https://res.cloudinary.com/dmukukwp6/image/upload/v1794209370/analytics_changed_tip3_ai_agent_http_logs_8cabd38c80.png)

This matters because agent usage is different from humans and is growing. A third of organizations that query PostHog do it through agents. Agents create about half of objects in PostHog like insights, dashboards, and feature flags. 1 in 5 new orgs signs up are through an agent.

It’s not implausible to think that [agents might be the primary user of PostHog](/newsletter/2030-shaped-software) in the near future. The same might be true for you.

## 4. Create shared, verified context (before it’s made up)

Analytics is mostly self-serve now. Anyone can ask anything and get plausible and confident answers.

The problem with these answers is that they’re not always correct. Even [Anthropic](https://claude.com/resources/articles/how-anthropic-enables-self-service-data-analytics-with-claude) found that 1/20 internal analytics queries are wrong. This is because agents often…

- **Use the wrong definition for a term like “sign ups” or “MRR.”** We asked Claude, Cursor, and [PostHog AI](/ai) “what’s our MRR last month?” and got three different queries and answers.
- **Do their own math and mess up the calculation.** An MCP-heavy user told us experiment numbers didn’t match the UI because the agent was writing its own query.
- **Use the wrong column or property.** A question about AI crawler errors returned an 0% error rate because it used `status_code` rather than `proxy_status_code` (which shows a 1% error rate).

You, your agents, your colleagues, and their agents will assume they are right and there’s no gatekeepers (like a data team) to say they’re wrong.

This is why shared, verified [context](/blog/wtf-is-context-engineering) matters. It’s how you prevent these inaccuracies from happening. What does this look like?

- **What are the events we actually care about?** We have collected 14 events and 72 sign up related actions, but only two are “approved” through [our semantic layer](/blog/semantic-layer).
- **Are they accurate?** Replay [activation](/newsletter/wtf-is-activation) is an event we care about, and we saw it falling over the last four months, when we realized it didn’t account for [MCP](/mcp) users, so it needed rewriting.
- **What does good look like?** A scorecard says gross revenue retention above 80% is healthy for mature products and monthly logo churn below 2.5% is green.
- **Codifying definitions and gotchas.** [Skills](/newsletter/writing-agent-skills) and [our semantic layer](/docs/semantic-layer) is how we do this. For example, our revenue analysis skill mentions that “upcoming” invoices are full-period projections, not settled revenue and credited startups read $0 until credits run out.
- **What to exclude.** Almost every internal query excludes PostHog’s own project and events carry a `was_impersonated` property so support sessions don’t count as customer usage.
- **Renamed or retired events.** `mcp_tool_call` was replaced by `$mcp_tool_call` and `tool_name` became `$mcp_tool_name` in June.

A lot of this isn’t new. Data teams have always maintained definitions. It’s just more important now that anyone can “do analytics” and that leads them to do it more.

AI might make analytics easier, but there’s still work to do to set context so you, your agents, your colleagues, and their agents can “do analytics” well in ways that are specific to your team, needs, and goals.

<NewsletterForm />
