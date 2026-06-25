---
title: Feature flags
sidebar: Handbook
showTitle: true
---

## Elevator pitch

PostHog Feature Flags support boolean flags, multivariate variants, JSON payloads for config changes without deploys, and local evaluation for <50ms latency. Every flag is queryable alongside your analytics and session replay — filter any insight by which flag variant a user saw. And every flag PostHog Code ships is automatically wired into the analytics that measures whether it worked.

LaunchDarkly manages flags. PostHog manages flags *and* shows you the impact of every rollout.

## The unique belief (in terms of feature flags)

Feature flags started as deployment safety nets — a way to ship code slowly without exposing too much to users. In the [product autonomy loop](/blog/self-driving-product), they're the mechanism through which agents ship code safely. PostHog Code's `instrument-feature-flags` skill wraps relevant changes it opens in a flag by default. The enricher shows stale flags inline in your editor. When an agent ships a fix, the flag is the rollout control.

**Flags aren't just for humans anymore. They're the guardrails that let agents work autonomously and safely.**

Without flags, agents can't ship incrementally. Without incremental shipping, agents can't evaluate safely. 

## Who this is for

- **Engineering teams who want safer deployments** without adding ops overhead or per-developer seat costs.
- **Teams replacing LaunchDarkly** who are tired of paying $10-20/developer/month for a tool that doesn't connect to their analytics.
- **B2B SaaS companies** who need account/group-level targeting (flag this feature for Enterprise plan customers only).
- **Teams building AI products** who want to gate model versions, prompt variants, or experimental features.
- **Anyone using PostHog analytics** who wants to filter session replay and metrics by flag variant.

### Who this isn't for

- Enterprises with complex governance requirements — multi-stage approvals, change management workflows, compliance-grade audit trails — LaunchDarkly Enterprise is more mature here.
- Marketing teams who need non-technical flag management with visual editors and no-code targeting.
- Teams who need experimentation without product analytics — Optimizely or VWO handle that use case more simply.

## Messaging

### Message 1: Flags that agents write and the enricher can read

**Problem:** Coding agents that ship without feature flags are unsafe. A bad change rolls out to 100% of users with no kill switch. Evaluating whether the change worked requires manually querying separate analytics.

**Solution:** PostHog Code can add flags automatically to every PR it opens. The enricher detects existing flags in your codebase and shows rollout percentage, staleness status, and flag evaluation inline — without leaving your editor. Close the loop: agent ships with flag → analytics measures impact → agent evaluates → agent removes stale flag.

**Supporting features:**
- PostHog Code `instrument-feature-flags` skill: adds flags to PRs automatically
- Enricher: detects `isFeatureEnabled` calls and shows live rollout data inline
- Stale flag detection built into the enricher
- MCP exposes flag state to any connected agent runtime

### Message 2: No per-developer pricing

**Problem:** LaunchDarkly charges $10-20/developer/month. For a 50-person engineering team, that's $6,000-12,000/year before you've run a single experiment. Seat pricing punishes team growth.

**Solution:** PostHog charges per flag evaluation, not per developer. The first 1 million evaluations per month are free. A team of 50 engineers pays the same price as a team of 5.

**Supporting features:**
- 1M flag evaluations/month free forever
- No seat limits — every engineer, every service, every agent gets full access
- Same billing model as the rest of PostHog — pay for what you use
- Pricing published publicly, no "contact sales" for a number

### Message 3: From flag to experiment in one step

**Problem:** Flags and experiments are managed in separate tools. You gate a feature with LaunchDarkly, then measure it in Amplitude, then run the A/B test in Optimizely. Three tools, three integrations, three contracts, three data models that don't talk to each other.

**Solution:** PostHog Experiments are built on top of Feature Flags. Every experiment starts as a flag. Every flag can become an experiment. The same evaluation infrastructure serves both — both connect to the same analytics and session replay data, and both end up available to the MCP and PostHog Code. 

**Supporting features:**
- Experiments and flags share the same 1M/month free tier
- Jump from flag targeting to experiment setup in the same UI
- Watch session replays filtered by flag variant or experiment arm
- Group analytics: measure experiment impact at the account level, not just the user level

## Battle cards

### vs LaunchDarkly

**Their approach:** Strong governance, mature SDKs, deep integrations (GitHub, Jira, PagerDuty, DataDog). Per-developer seat pricing.

**Where PostHog wins:**
- No per-developer pricing — typically 80-90% cheaper for equal team sizes
- Native analytics and session replay — LaunchDarkly requires separate tools for impact measurement
- PostHog Code integration — LaunchDarkly has no agent loop equivalent
- Sources are free in PostHog; every PostHog tool shares the same event stream

### vs GrowthBook

**Their approach:** Open source feature flags and A/B testing. Self-hostable. Requires your own data infrastructure for analytics.

**Where PostHog wins:**
- Fully managed — no infrastructure to run (this is better, trust us)
- Replay, analytics, error tracking included
- PostHog Code integration
- Still open source (MIT)

## Objections

### "LaunchDarkly has better governance"

**Follow-up:** What specific governance features are you using today — approval workflows, change requests, audit logs?

**Answer:** LaunchDarkly Enterprise's governance is more mature. PostHog has flag history, audit trails, and access controls that satisfy most teams. If the requirement comes from a compliance checklist rather than active daily use, it's worth checking whether those features are actually being used or just required on paper. The cost delta between PostHog and LaunchDarkly is typically large enough to justify a closer look.

### "We need local evaluation"

**Answer:** PostHog supports local evaluation natively. Flags evaluate in under 50ms without a network call. SDK downloads the full ruleset on init; evaluation is in-process.

### "We're already using flags in our codebase — migration is painful"

**Answer:** PostHog Code's enricher detects existing `isFeatureEnabled` patterns in your codebase and surfaces flag data inline. You don't need to migrate on day one. Start by connecting PostHog analytics to measure flag impact, then migrate flags incrementally as they come up for review. The enricher makes the transition visible without forcing a flag-by-flag rewrite.

## Selling to enterprise

Enterprise flag customers get volume discounts, SSO, advanced access controls, audit logging, EU data residency, SOC 2, and dedicated support. Contracts follow [the four-lever framework](/handbook/growth/sales/contract-rules).

The LaunchDarkly displacement motion is strong at contract renewal time. LaunchDarkly's per-seat pricing means costs balloon as engineering teams grow. Present the total cost comparison — seat pricing vs PostHog usage-based — before the renewal window opens. Contract buyout available for customers locked into LaunchDarkly with $20k+/year annual PostHog commitment.
