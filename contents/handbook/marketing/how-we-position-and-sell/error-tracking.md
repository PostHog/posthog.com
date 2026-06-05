---
title: Error tracking
sidebar: Handbook
showTitle: true
---

> **Owner:** Sara Miteva

## Elevator pitch

PostHog Error Tracking captures unhandled exceptions from web, mobile, and backend code, groups them into issues, and surfaces them alongside session replays, logs, feature flags, and product analytics in the same platform. Source maps, auto-assignment, spike detection, "Fix with AI" prompts, and Slack / Linear / Jira / GitHub alerts all come built-in. Generous free tier, then usage-priced per exception.

Sentry has deeper error tracking features, more battle-tested SDKs, and more granular grouping. PostHog wins on *context*: every exception ties to the user who hit it, the session replay of the moment it broke, and the feature flag they were on. Customers pick PostHog when they want errors linked to product behavior, not when they want pure error-tracking depth.

## The unique belief

PostHog's vision is a self-driving product: software that watches itself for bugs, ships the fixes, and prioritizes work by user impact, not error volume. That loop needs every error to know which user hit it.

Most error tracking tools give you a stack trace, a frequency count, and a release tag. They don't tell you which user hit the error, what they were trying to do, or whether it matters to the business. So engineers triage by error count instead of by user impact, and waste cycles on noisy errors that don't affect anyone real.

Every PostHog exception is a product event with the user attached. Click an error to watch the user's session replay. Filter exceptions by feature flag variant, plan tier, or revenue cohort. See the business impact next to the stack trace. PostHog Error Tracking is the only place where every error already knows who hit it, what they were doing, and whether it matters.

## Who this is for

- **Teams already on PostHog who pay separately for Sentry, Bugsnag, or Rollbar.** They're paying twice and stitching user identity by hand.
- **Customers on Sentry today who want errors connected to product behavior.** We'll cover up to 6 months of free PostHog usage during the overlap when you commit to a $20k+/year annual contract.
- **Engineering teams who want to triage by user impact, not error volume.** "This exception is breaking checkout for your top-paying customers" beats "this exception happened 200 times in 5 minutes."
- **Multi-language stacks running web + mobile + backend.** Native SDKs for Node, Python, Go, Ruby, Rails, Elixir, NestJS; iOS, Android, React Native, Flutter; plus every major frontend framework.
- **Founders and small engineering teams shipping production code.** Generous free tier; no contract negotiation to start.

### Who this isn't for

- Teams that need full feature parity with Sentry – Sentry has deeper SDK coverage, more mature grouping, and a longer track record.
- Teams whose primary need is iOS error tracking at full fidelity – the iOS implementation doesn't symbolicate system frames yet
- Compliance-driven teams needing on-prem deployment, SOC 2 audit trails on every exception, or SIEM-grade indexing – Sentry's enterprise tier and dedicated SIEM tools are more mature here.

## Messaging

### Message 1: Every error already knows the user

**Problem:** Most error tracking tools give you a stack trace, a frequency count, and a release tag. They don't tell you which user hit the error, what they were trying to do, or whether it matters to the business. Engineers end up triaging by error volume instead of user impact.

**Solution:** Every PostHog exception is a product event with the user attached. Click an error to watch the user's session replay. Filter exceptions by feature flag variant, plan tier, or revenue cohort. See the business impact next to the stack trace.

**Supporting features:**
- Shared `distinct_id` and `session_id` with the rest of your product data
- Click any error to open the user's session replay
- Filter exceptions by feature flag variant, cohort, or plan tier
- "Fix with AI" prompts; MCP server lets agents query exceptions from Claude Code, Cursor
- Source maps, auto-assignment, suppression rules, spike detection all built-in

### Message 2: Drop Sentry, Bugsnag, or Rollbar

**Problem:** Most teams pay for a standalone error tracker (Sentry, Bugsnag, Rollbar) and separate tools for everything else – analytics, replays, feature flags, logs. The error tracker sees the stack trace; the other tools have the user context. Engineers stitch them by hand every time something breaks.

**Solution:** PostHog Error Tracking replaces standalone error trackers – same SDK coverage on the languages that matter, with the user, session, replay, and flag context already attached. No CDP middleware, no identity stitching.

**Supporting features:**
- Native SDKs for Node, Python, PHP, Go, Ruby, Rails, Elixir, NestJS; iOS, Android, React Native, Flutter; plus every major frontend framework
- Source map upload via posthog-cli or bundlers plugin (support for nextjs, vite, rollup, webpack) and @posthog/nextjs-config
- Contract buyout for Sentry, Bugsnag, or Rollbar on annual commit
- Alerts route to Slack, Discord, Linear, Jira, or GitHub with the user context attached
- Issue management with auto-assignment, suppression rules, and burst protection

### Message 3: Triage errors by who they hit

**Problem:** Every error tracking tool surfaces errors by volume – the loudest exception wins the engineer's attention. But the loudest isn't always the most important. A high-volume bug in a free trial flow might matter less than a single exception breaking checkout for your top-paying customer.

**Solution:** Filter exceptions by user cohort, revenue, plan, or feature flag. See which issues are hitting your most valuable customers and fix those first. Roll back the flag that caused the spike from the same view.

**Supporting features:**
- Filter exceptions by any user property, cohort, or feature flag variant
- See the customer behind every issue – plan tier, lifetime value, journey
- Spike detection with rolling baselines (5-minute buckets, configurable thresholds)
- Roll back a feature flag affecting a user cohort from the same dashboard
- Issue assignment and suppression rules to manage signal-to-noise

## Battle cards

### vs Sentry

**Their approach:** The 800-pound gorilla. Sentry is no longer just an error tracker; it now ships Error Monitoring, Logs, Session Replay, Metrics, Tracing, Profiling, Uptime Monitoring, and Cron Monitoring on one platform. AI suite "Seer": debugging agent, Autofix, AI Code Review, plus a Sentry MCP server. Event-based pricing with steep volume discounts – errors drop from $0.000363 to $0.000150 per event at 20M+. Free Developer plan (5K errors, 50 replays); Team starts at $26/mo + pay-as-you-go.

**Where PostHog wins:**
- Customer wants errors connected to **product analytics, feature flags, and experiments**. Sentry has none of these, despite their platform expansion into logs, replay, and tracing (which we also have). 
- Customer triages by user value, not error volume – PostHog filters by cohort, plan tier, revenue. Sentry's user context is thinner.
- Customer is product-led, not infra/SRE-led. Sentry's expansion is toward Application Observability and Real User Monitoring; PostHog's is toward product engineering and growth.
- Customer wants feature flag rollback workflows from the error view – Sentry doesn't have feature flags.

**Honest concession:** Sentry has deeper SDK coverage, more mature grouping, a longer mobile track record, and steep volume discounts that make them cheaper at 10M+ errors. We win on context, not coverage or cost-at-scale.

Also useful: [PostHog vs. Sentry](https://posthog.com/blog/posthog-vs-sentry)

### vs Bugsnag and Rollbar

**Their approach:** Mid-market error tracking specialists. Rollbar positions as *"code-first observability that connects errors, replays, and releases in one place"* – session replay shipped, MCP integration, RQL query language, Root Cause Analysis AI shipped, Rollbar Resolve AI agent (opens PRs with fixes) coming soon. Free tier: 5K occurrences + 1K replays. SOC2 + ISO27001 certified. Bugsnag (SmartBear-owned) follows a similar mid-market specialist playbook, historically strong on mobile crash reporting.

**Where PostHog wins:**
- Customer wants errors connected to the **full product behavior stack** – funnels, retention, cohorts, experiments, surveys. Rollbar and Bugsnag are error trackers plus replay, not product platforms.
- Customer is consolidating multiple tools (error tracking + analytics + flags + experiments) into one platform – Bugsnag/Rollbar are one-or-two-product solutions.
- Customer wants feature flags as a first-class capability for rollback workflows – neither has flags.
- Customer values published, transparent pricing without quote-locked enterprise contracts.

### vs Datadog

**Their approach:** Part of the broader Datadog observability platform – auto-grouping, real-time alerts, AI-powered insights, suspect commits. Session Replay (15 seconds before/after frontend errors) and Exception Replay (local variable capture on backend exceptions). Jira integration, Datadog On-Call. Built for SRE and platform engineering teams already invested in Datadog APM. Scales with Datadog's per-host platform pricing.

**Where PostHog wins:**
- Customer is product-led, not infra-led. Datadog Error Tracking sits inside a stack built for SREs; PostHog sits inside a stack built for product engineers.
- Customer wants errors connected to product analytics (funnels, retention, experiments) – Datadog has RUM and Session Replay but no product analytics layer.
- Customer can't justify the broader Datadog bill at their scale – PostHog Error Tracking ships standalone with a generous free tier.
- Customer wants feature flag rollback workflows in the same dashboard – Datadog doesn't have feature flags.

## Objections

### "Sentry has deeper SDK coverage, more mature grouping, and now ships session replay, logs, tracing, AI, and MCP too. What's actually different?"

**Follow-up:** Who would own this – platform/SRE engineering or product engineering? And is the use case pure error-tracking depth, or errors tied to user behavior?

**Answer:** Sentry has expanded dramatically beyond pure error tracking – replay, logs, metrics, tracing, profiling, AI/MCP. They've moved into Application Observability territory. If the team is platform-led and the use case is full-stack engineering observability with deep error coverage as the anchor, Sentry is the more direct fit and we should say so. PostHog's wedge is different: we don't try to win on observability features. We win on **product analytics depth** – funnels, retention, cohorts, paths, experiments, feature flags. Sentry has none of these despite their expansion. The comparison isn't "PostHog vs Sentry on error tracking" – it's "errors connected to engineering telemetry (Sentry's path) vs errors connected to product behavior (PostHog's)."

### "We're a mobile-first app. PostHog's iOS error tracking has documented gaps."

**Follow-up:** What's the mobile breakdown – pure iOS, pure Android, or both? Which mobile crash features are non-negotiable?

**Answer:** Our iOS implementation has documented gaps. System frames aren't symbolicated, and Swift crashes appear as SIGTRAP without messages. The PostHog product page acknowledges it directly: *"Even our team thinks Sentry is better if you need mobile support. For now!"* Active development. If mobile crash reporting is the primary need, Sentry is the right tool today. Worth flagging: if the customer also needs product analytics on the same mobile app (session replay, feature flags, experiments, cohorts), PostHog still wins on that side – many teams run PostHog for product behavior and Sentry for mobile crashes today, then consolidate as our iOS support matures.

### "Sentry is cheaper than PostHog at high volume – their volume discounts drop errors to $0.000150 each at 20M+."

**Follow-up:** What's your projected error volume next quarter and next year? Is error volume the primary cost driver, or do you need replay, analytics, and flags too?

**Answer:** True at very high volumes – Sentry's volume discounts are aggressive past 10M errors per month. If error volume is the primary cost concern and the customer doesn't care about the cross-product context, Sentry wins on price at scale. PostHog's value strengthens as the customer uses more of the platform. A useful reframe in the room: **PostHog Error Tracking standalone vs Sentry standalone** – Sentry wins on price at scale. **PostHog Error Tracking bundled with replay + analytics + flags vs Sentry + LogRocket + Mixpanel + LaunchDarkly** – PostHog wins on total stack cost easily.

### "Customers say PostHog has noisy errors and false captures. Sentry's grouping is cleaner out of the box."

**Follow-up:** Is the concern signal quality (too many duplicates) or quantity (too many low-priority events)?

**Answer:** Honest: this came up in our customer research. PostHog's autocapture is broader than Sentry's, which gives more raw data but more noise. The grouping algorithm is still being improved, and the docs say so. Mitigations available today: custom fingerprinting rules, ingestion-time grouping rules, suppression rules, burst protection, `before_send` hooks for filtering, and spike detection with rolling baselines to separate real spikes from noise. If the team needs zero-tuning-required out-of-the-box quality, Sentry's grouping is more mature. If they want broader capture with manual tuning to get to signal, PostHog gets there with some setup work.
