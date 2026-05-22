---
title: New starter onboarding
sidebar: Handbook
showTitle: true
---

Welcome to the PostHog Customer Success team! We only hire about 1 in 400 applicants, so you've done well to make it here!

Onboarding here is mostly self-serve - we won't sit you in a room for training for two weeks, and unlike a lot of companies, we'd prefer you get up and running with your book of customers quickly. If you're not sure who's supposed to make something below happen, the person responsible is almost certainly you.

What follows is a rough plan for your first month - use it as a guide, not a contract. The handbook itself is a work in progress, so you'll find gaps as you ramp, things you needed to know that weren't written down. That's normal, and when you find a gap your job is to fill it in so the next person has it easier.

## Week 1 – systems, demo, immersion

Week 1 is about getting set up and immersed in how we work with customers. Don't worry about being productive yet.

**Focus on:**

- Setting up the day-to-day tools you'll be using - Vitally, Gong, Slack, Metabase. See [sales and CS tools](/handbook/growth/sales/sales-and-cs-tools).
- Preparing your PostHog demo.
- Picking a recent customer call on BuildBetter to watch, and asking team members to add you to as many of their live calls as you can - the goal is exposure to how PostHog CSMs talk to customers.
- Nailing the product fundamentals - work through the [curriculum](#posthog-curriculum) further down this page and [getting started with customers](/handbook/cs-and-onboarding/getting-started-with-customers).

**How to think about each product.** As you go through the fundamentals, here's a framework for what you're trying to understand about each one:

- The value add - why a customer would care
- How it's implemented
- Implementation quirks worth knowing
- Signs of poor implementation
- How it works alongside other PostHog products
- How to actually get value out of it
- What you can do with the MCP

This framework gets more depth in *[structuring product learning when published]*.

## Week 2 – in-person onboarding, your accounts

In-person onboarding typically happens this week (3-4 days with the team), where you'll work through systems together and dig into the accounts you'll be receiving.

**Focus on:**

- In-person sessions: demo practice, hands-on Vitally and PostHog data, no-stupid-questions.
- Walking through your book of business with Dana.
- Getting comfortable in Vitally with people who can answer questions in real time.
- First exposure to signals - what Vitally tags and alerts are, how the team uses them. You won't be confidently responding to them yet, but that comes over the rest of the month.

## Weeks 3–4 – reach out to your book, learn by doing

This is when you start actively working with your accounts. The aim is to make first contact across your whole book, and to use each conversation to deepen your product knowledge and sharpen your demo.

**Focus on:**

- Reaching out to every account in your book to establish contact. For accounts coming from existing owners, schedule a handover.
- Using every customer touchpoint as fuel for product learning - what are they doing, what isn't working, what should they be doing differently?
- Refining your demo with each conversation.
- Starting to respond to Vitally signals on your book - what triggers your attention, what's the right next move? You'll feel confused at first, and that's fine, the goal is to start building a feel for it. *[link: responding-to-signals.md when written]*

**Ship your first handbook PR.** Somewhere in here you'll hit something that wasn't documented, or that's documented wrong. Write it up and open a PR. The point isn't the PR itself, it's that the handbook only stays useful if everyone adds to it. Not knowing something isn't a failing, but leaving it undocumented for the next person is.

## What good looks like at the end of week 4

This is the bar for end of month 1.

**You have a clear read on your book:**

- Who's responsive and who isn't
- Who you'd build a strong relationship with
- Who knows you're there
- Where the expansion opportunities sit

**You've nailed the fundamentals:**

- How customers implement PostHog and how to evaluate their setup
- How to optimise a setup once you can see it
- The key tools we use day-to-day, especially Vitally

**You're starting to read signals:**

- You know what the Vitally signals are
- You have a sense of what to do when each one fires

## Month 2 and beyond

*Still being worked out. Broadly: independent customer work, first save attempts, first cross-sell. We'll guide you as you grow.*

## PostHog curriculum

PostHog has a lot of products! To help you figure out how to start and continue building your knowledge, here's a recommended list of topics to work through. Do not feel as though you need to learn all the products through your first few weeks. Learning is best done working through customer use cases and requests.

Add and modify this list as you work through it! Products are added frequently, likely making this list outdated.

### Fundamental

#### Product analytics
1. [Quick primer on Product analytics](https://www.loom.com/share/645de3987e4947ba8164b4d7b7cc719b?sid=ae5f8a50-dc56-4cc4-93d5-d398b398d5a0)
2. [Creating insights](/docs/product-analytics/insights):
   - Trends, Funnels
   - User Paths
        - Wildcard groups
        - Path cleaning Rules
   - Retention, Stickiness, Lifecycle
   - How to [filter out test users](/docs/product-analytics/trends/filters#filtering-internal-and-test-users)?
3. Persons
   - What are [persons](/docs/data/persons) and how are they created?
   - [Identify()](/docs/product-analytics/identify)
   - [identified vs anonymous events](/docs/data/anonymous-vs-identified-events)
   - Pricing
4. [Groups](/docs/product-analytics/group-analytics) – what is it? what is the use case? how is it charged?
5. [Session replay](/docs/session-replay) – masking, cutting costs, filtering
6. [Toolbar](/docs/toolbar) – [heatmaps](/docs/toolbar/heatmaps), [actions](/docs/toolbar/create-toolbar-actions)

#### Implementation
1. How is PostHog implemented?
2. [Autocapture](/docs/product-analytics/autocapture) – how do you customize autocapture? How do you leverage autocapture?
3. What are [custom events](/tutorials/event-tracking-guide#setting-up-custom-events)? How do you set [custom properties](/tutorials/event-tracking-guide#2-properties)?
4. What is identify? How do you set custom [person properties](/docs/product-analytics/person-properties)? How do you [merge users](/docs/product-analytics/identify#how-to-merge-users)? What is alias?
5. What are groups? How do you set group properties?
6. What are cohorts? How do you [create cohorts](/docs/data/cohorts#how-to-create-a-cohort) ([static and dynamic](/docs/data/cohorts#static-and-dynamic-cohorts))? How are they different from groups?
7. Projects, organizations and access controls
8. More advanced use cases:
    - [Cross-domain tracking](/tutorials/cross-domain-tracking)
    - [reverse proxy](/docs/advanced/proxy)
    - cookie consent (EU)

#### Billing
1. [How to estimate costs](/docs/billing/estimating-usage-costs)
2. [Pre-paid credits](/docs/billing/pre-paid-plans)
3. [Billing Limits](/docs/billing/limits-alerts)

### Intermediate

#### Feature flags
1. [Creating](/docs/feature-flags/creating-feature-flags) and using them in code
    - How do I ensure flags are loaded before capturing any events?
    - Can you evaluate feature flags using properties that haven't been ingested yet?
2. Locally testing feature flags [using toolbar](/docs/feature-flags/testing#method-3-use-the-posthog-toolbar)
3. Insights based on feature flags:
    - Some users have access to a beta feature. How do I filter insights for these users?
4. [Local evaluation](/docs/feature-flags/local-evaluation)
5. Client-side bootstrapping
6. [Troubleshooting](/docs/feature-flags/common-questions)

#### Experiments
1. [Creating an experiment](/docs/experiments/creating-an-experiment) from PostHog UI
2. Understanding MDE, primary metrics, secondary metrics, interpreting results
3. [Traffic allocation](/docs/experiments/traffic-allocation) - configuring it and validating it. What are some reasons why 80/20 split may not be an 80/20 split?
4. Returning users: user sees variant A in session 1, does not convert; user sees variant B in session 2, does convert
    - Does this happen? Can the same user see different variants in different sessions? If so, how does this affect the results?
5. [No-code web experiments](/docs/experiments/no-code-web-experiments)
    - Implementation requirements
    - Landing page experiments – how to deal with flickering of content when page is first loaded?

#### AI Observability
1. [Implementing with your LLM SDK](/docs/ai-observability/basics)
    - Privacy options
2. Generations vs traces vs spans vs sessions
3. [LLM Cost Analysis](/docs/ai-observability/calculating-costs)
    - How do we accommodate custom LLM pricing?
4. [Insight analysis](/docs/ai-observability/dashboard)

#### Error Tracking
1. [Implementing error tracking](/docs/error-tracking/installation)
3. [Stack traces](/docs/error-tracking/stack-traces)
    - Uploading source maps
    - Releases
4. [Exceptions vs issues](/docs/error-tracking/issues-and-exceptions)
    - What is a fingerprint?

#### Other Products and Features
1. Platform add-ons (Boost/Scale/Enterprise/Teams)
2. [Data pipelines](/docs/cdp)
    - Sources
    - Destinations
    - Transformations
3. [Surveys](/docs/surveys)
    - How surveys works with feature flags/experiments
4. [Workflows](/docs/workflows)
5. [Logs](/docs/logs)

### Advanced

1. SPA (single page apps)
2. API

## Alerting setup (for team leads)

We have certain automations in Vitally that your team lead needs to add you to. Please ask your team lead to add you.

- <PrivateLink url="https://posthog.vitally-eu.io/settings/playbooks/170c8d04-db4c-4036-997c-8967946a1fd8">Vitally name trait playbook</PrivateLink>: create a new branch that matches assigned CSM to new team member. In this branch, add action to update account trait `CSM name` to name of the new team member. This is used to populate account owner info in tickets created by customers we own, so support knows who to reach out to.
