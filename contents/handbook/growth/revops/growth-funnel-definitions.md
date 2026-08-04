---
title: Growth funnel definitions
sidebar: Handbook
showTitle: true
---

Growth tracks self-serve signup-to-revenue performance on the ["Growth self serve funnel health"](https://us.posthog.com/project/2/dashboard/1849743) dashboard. Several terms on it (like "activated" or "engaged") are used in more than one way depending on what question we're answering, so this page is the source of truth other teams can link to instead of guessing what a chart means.

If you're building a report, a Slack update, or another dashboard that references setup, activation, or engagement numbers for self-serve orgs, use the definitions below and link back to this page.

## The two clocks: signup-anchored vs. own-clock

Almost every definition here is measured on one of two clocks, and mixing them up is the most common way to misread these metrics.

**Signup-anchored** metrics measure time relative to when an org signed up. They answer "how fast/well does onboarding work?" and are used for setup rate, time to activate, and the north star metric.

**Own-clock** metrics measure time relative to when an org itself activated, regardless of how long that took. They answer "once an org is up and running, how does it behave next?" and are used for engagement, teammate invites, and quick-start task completion.

These two are deliberately **not** chained into a single funnel. Forcing engagement to only count orgs that activated within 14 days of signup would drop every legitimate slower activator and conflate onboarding speed with engagement quality, two different problems with different fixes.

## Core definitions

### Intent
An org showed a setup-intent signal: onboarding started, an SDK selected, the setup wizard started, a quick-start task completed, or similar. This is the population used for "of the people who showed they meant to set up PostHog, how many succeeded" questions, and it excludes signups that never showed any real intent (a large chunk of which is spam or abandoned accounts).

### Activated (≤14 days, signup-anchored)
An intent org that sent real product data (non-zero usage) within 14 days of **signup**. This is the speed/quality-of-onboarding gate, cohorted by signup week. It's the canonical "activated" definition used by the north star metric, setup rate, time to activate, and the onboarding wizard comparison.

### Activated (own clock)
An org that has sent real product data at all, cohorted and measured relative to **its own** activation date rather than signup date. This answers "once an org activates, how does it behave in the following weeks," independent of how long onboarding took to get there. It's used by meaningful platform usage (engagement), teammate invited, and quick-start tasks.

## Funnel metrics

### New orgs (signup volume baseline)
Weekly count of distinct organizations with a `user signed up` event. This is a volume baseline and includes all signups, spam included.

### Signup → intent rate
% of all raw signups (spam included) that show any setup-intent signal within the maturity window. This is the top-of-funnel signal, unconditional on intent — it's the step that "setup rate" below filters out by starting from intent orgs only.

### Setup rate
% of intent orgs hitting the canonical "activated" bar (data flowing within 14 days of signup). This is a **setup signal, not an engagement signal**: a drop here means broken or confusing onboarding, not disinterested users. Population is intent orgs with spam excluded; cohorts younger than 14 days are excluded so the number doesn't move as a week fills in.

### Time to activate
Among intent orgs that activate within 60 days, the p75 and p90 number of days from signup to activation, by signup week. Median is typically 0 (same-day activation is common), so p75/p90 are the more informative percentiles here.

### North star: new orgs activated within 14 days, per week
Orgs per signup week reaching non-zero product usage within 14 days of signup. This combines acquisition volume and activation quality in one spam-resistant number and is the team's single north star metric. Only mature weeks (14+ days old) are shown so history doesn't quietly redraw itself.

## Engagement & leading indicators

### Meaningful platform usage (engagement)
Among orgs that have activated (own clock), the % taking a customer-initiated product action (viewing an insight or dashboard, watching a recording, running a query from web/API/CLI/MCP, using PostHog AI, etc.) in days 22–28 after **their own** activation date. This is the primary engagement metric, cohorted by activation week, with a minimum cohort size of 20 orgs.

### Teammate invited
Among orgs that have activated, % that invited a teammate within 28 days of their own activation date. Multi-player orgs retain and pay better, so this is tracked as a leading indicator, independent of how fast setup was.

### Quick-start tasks
Among orgs that have activated, % completing 6 or more distinct quick-start tasks within 28 days of their own activation date. Completing roughly 6 tasks correlates with meaningfully longer retention, so this is tracked as a leading indicator alongside the average number of tasks completed.

## Revenue conversion

### Day-120 paying conversion
Of intent orgs, % paying (MRR > 0) by day 120 after signup, plus a separate % that converted via startup credits (joined the startup plan and exceeded a standard free-tier usage allowance within the window, without yet paying). Day 120 is used because it roughly matches the median time-to-pay for self-serve orgs. This is a fixed maturity window, so cohorts younger than 120 days are excluded.

### Day-120 MRR per 1,000 signups
Revenue yield: MRR held at day 120 after signup, normalized per 1,000 intent signups, by signup month. This combines conversion rate and deal size into a single volume-normalized revenue number. Credit-covered usage bills at $0 and isn't counted as revenue here.

### Compound yield
% of a given week's signups that both fast-activated (≤14 days) **and** were still engaging in week 4 after activation. This composes the two independently-anchored metrics (setup speed and engagement quality) into one end-to-end yield number — it's a useful summary metric, but it isn't a replacement for tracking setup rate and engagement separately, since a drop in the compound number doesn't tell you which stage regressed.

## Metrics to use with caution

A couple of tiles on the dashboard use different underlying signals and **aren't directly comparable** to the definitions above. If you're citing a number, check which definition it's using:

- **Product-tagged activation funnel**: uses the manually product-tagged event `product intent marked activated` rather than the billing-usage "data flowing within 14 days" definition used everywhere else.
- **First-event ingestion funnel**: uses a single-event signal (`first team event ingested`), which is narrower than the "non-zero usage" definition used elsewhere.

## Source

These definitions live alongside the live charts on the [Growth self serve funnel health dashboard](https://us.posthog.com/project/2/dashboard/1849743) in PostHog. If the dashboard's glossary tile changes, update this page to match.
