---
title: Signup enrichment pipeline
sidebar: Handbook
showTitle: true
---

When someone signs up to PostHog, we enrich them (figure out the company, its size, the person's role, and so on), score them against our ICP, and push that data into our sales systems. This page explains how that pipeline works and, more importantly, what to do when it stops.

## How it works

1. A PostHog destination fires on every signup and sends it to [Clay](https://www.clay.com).
2. Clay enriches the signup, running cheaper sources first for cost: Clearbit (better on larger companies), then Harmonic (better on startups, richer industry tags), then Clay-native fallbacks only when a field is still missing.
3. The result is mapped to a consistent set of ICP fields and an ICP score, which are written back onto the PostHog organization and person as properties.
4. The same signup also creates a contact and account in Salesforce, and a weekend job re-enriches Salesforce accounts. Everything syncs into Vitally, where playbooks turn it into sales tasks.

The single most common failure is **Clay running out of credits or hitting its row limit**, which silently leaves a window of signups un-enriched. This has happened multiple times, and historically nobody noticed until it surfaced downstream days later. The alert below exists to catch it.

## Monitoring

There is a PostHog alert that watches the enrichment write rate:

- **Insight:** <PrivateLink url="https://us.posthog.com/project/2/insights/GTCPV5hq">Org enrichment write rate (Clay → icp_company_type)</PrivateLink> — the daily count of enrichment writes landing on organizations.
- **Healthy:** roughly 460–1,500 writes per day, with mild weekend dips.
- **A gap:** the rate collapses to near zero.
- **Alert:** fires when the daily rate drops below 250, checked once a day.

## What to do when the alert fires

1. **Confirm it's real.** Open the insight. Is the most recent complete day near zero, while signups are still coming in normally? If signups dropped too, it's a traffic issue, not an enrichment one.
2. **Check whether enrichment was turned off on purpose.** Sometimes the Clay enrichment is paused deliberately (for example, to conserve credits). If so, that is expected. Snooze the alert and move on.
3. **Find the cause.** In order of likelihood:
   - Clay is out of credits.
   - Clay hit its per-table row limit and needs a new table with the destination repointed.
   - The signup destination in PostHog stopped firing.
4. **Fix it.** Top up Clay credits, create and repoint a new table, or fix the destination. Clay credit top-ups are owned by RevOps.
5. **Backfill the gap.** The organizations created during the outage stay un-enriched unless they are re-run through Clay. Identify the organizations created between the first and last firing day that are missing ICP fields, and re-enqueue them. Without this step the gap is a permanent hole in our data, which is what happened in past incidents. Confirm the write rate climbs back above 250 the next day, and the alert resolves on its own.

## Ownership

RevOps owns this pipeline end to end, including Clay credit top-ups and the enrichment configuration. Questions go to the RevOps team.
