---
title: Logs
sidebar: Handbook
showTitle: true
---

> **Owner:** Sara Miteva

## Elevator pitch

PostHog Logs is a centralized log search built on OpenTelemetry. Send logs from any OTLP-compatible source (including your existing Datadog Agent) and they're searchable inside the same platform that runs your analytics, session replays, errors, and feature flags. Generous free tier, usage-priced per GB, no per-host or per-user fees.

Datadog and New Relic are mature but expensive and built for infrastructure teams. Grafana Loki is open source but logs sit apart from your product data. PostHog Logs is OpenTelemetry-native, predictably priced at a fraction of Datadog's per-GB cost, and the only one where every log already knows who hit it.

## The unique belief

PostHog's vision is a self-driving product: software that watches itself for bugs and conversion drops, then ships the fix while you sleep. Most observability tools generate a lot of data (events, errors, latency, logs) without the product context that makes them actionable.

Every PostHog log already knows the user. Click any log to jump to the user who hit it – their session replay, their plan, their journey. From there, filter on any attribute you attached at ingest. See which logs hit your top 1% of customers and which hit anonymous bots.

## Who this is for

- **Teams already on PostHog who pay separately for Datadog, Splunk, or Loki.** They're paying twice for storage and stitching identity by hand.
- **Customers on Datadog, Splunk, or Elastic today.** Cost is the most cited switching reason. We'll buy out the contract on an annual commit.
- **Teams standardized on OpenTelemetry.** Ingest via OTLP-HTTP from any OTel source, no proprietary agent required.
- **Engineers (or product-led teams) who want logs linked to user behavior.** Backend errors become useful when they're tied to the user who hit them.
- **Startups consolidating their observability stack.** $50k credits via the startup program.
- **Teams using the Datadog Agent for log forwarding.** Point it at PostHog with one env variable. No log pipeline rewrite.

### Who this isn't for

- Teams with massive log volumes needing enterprise-grade indexing, ML-driven log clustering, or year-plus retention. Datadog, Splunk, and Elastic are more mature here.
- Teams whose primary problem is Kubernetes-level infrastructure observability – PostHog is built for product-led engineering, not infra-first teams.

## Messaging

### Message 1: Logs that already know your user

**Problem:** Backend errors, slow requests, and rate-limited calls only become useful when you know who hit them and what they were trying to do. Most observability tools store logs in their own identity layer, so you stitch user data across Datadog, Sentry, and your analytics tool to figure out what actually broke for whom.

**Solution:** Every PostHog log ingests with the same user, session, and event identity as the rest of your product data. Click a log to open the user's session replay. Filter by feature flag variant, plan tier, or revenue cohort. Surface related errors from the same session.

**Supporting features:**
- Shared `distinct_id` and `session_id` across logs, errors, replays, and analytics
- Click any log to open the user's session replay
- "Related errors" tab in log details surfaces issues from the same session within ±6 hours (when `sessionId` is attached)
- Filter logs by any user property, cohort, or feature flag variant
- PostHog AI summaries highlight patterns across logs and recommend next steps

### Message 2: One tool for your entire debugging flow

**Problem:** When something breaks in production, the investigation usually spans five separate tools: Datadog for logs, Sentry for errors, FullStory for replays, LaunchDarkly for flag context, an analytics tool for user history. None of them know each other. Engineers correlate identity by hand every time something breaks.

**Solution:** PostHog Logs lives in the same platform as your error tracking, session replays, feature flags, and product analytics. Logs auto-link to the session they came from, the errors they triggered, and the flags the user was on. The side tools you kept only for connecting these dots can go.

**Supporting features:**
- **Logs + Session Replay:** click any log to watch the user's session
- **Logs + Error Tracking:** "Related errors" tab in log details surfaces issues from the same session (when `sessionId` is attached)
- **Logs + Feature Flags:** filter logs by flag variant the user was on
- **Logs + Product Analytics:** log patterns become trends, funnels, retention insights
- Browser console logs auto-captured by PostHog JS, no extra SDK to install

### Message 3: Pay for what you ingest, not per host

**Problem:** Datadog, New Relic, and Splunk price logs by host, GB, retention tier, and indexing rate. Bills are unpredictable and grow faster than usage. Customers in our research consistently cite cost as the sharpest switching reason: Datadog's "sudden cost increases" and "commit to events, pay on demand if you don't hit the mark" framing keeps coming up in user interviews.

**Solution:** PostHog Logs is per-GB only. 50 GB free per month, $0.25/GB after, with volume discounts. No per-host fees. No per-retention-tier surcharges. No per-user pricing. And because ingest runs on OpenTelemetry, your setup stays portable if you ever decide to leave.

**Supporting features:**
- 50 GB/month free across log ingest; $0.25/GB after with volume discounts
- No per-host, per-user, or per-retention-tier surcharges
- Hard billing limits per product
- OpenTelemetry-native ingest – migrate in and out without proprietary lock-in
- Datadog Agent drop-in: change one env variable to start sending logs to PostHog

## Battle cards

### vs Datadog (and New Relic)

**Their approach:** Datadog is the dominant enterprise cloud observability platform, meaning it has mature features across logs, APM, metrics, RUM, and infrastructure monitoring. Pricing is layered by host + GB + retention tier + indexing rate and famously hard to predict. New Relic positions on simpler pricing with 100 GB/month free ingest and unlimited basic users, but is still infrastructure-first. Both are built for SRE and platform teams.

**Where PostHog wins:**
- Customer is product-led, not infra-led. PostHog Logs sits next to product analytics, funnels, retention, cohorts, and experiments. Datadog and New Relic don't have any of those.
- Customer wants logs tied to user behavior, not just hostname and pod – every log shares identity with the rest of the product data.
- Customer can't justify the bill at their volume – simple $0.25/GB after 50 GB free, no per-host fees, no per-retention-tier surcharges, published pricing not quote-locked.
- Datadog Agent drop-in lets the customer migrate with one env variable.

### vs Grafana Loki and Grafana Cloud Logs

**Their approach:** Grafana Loki is open-source log aggregation, the L in the LGTM+ stack (paired with Prometheus/Mimir for metrics and Tempo for traces). Grafana Cloud Logs is the managed tier – 50 GB free, AI/ML insights, Adaptive Logs for cost control, a queryless Explore Logs app, and pricing across three dimensions (process + write + retain) plus a $19/month platform fee. Sells to platform engineers running the LGTM+ stack.

**Where PostHog wins:**
- Customer's team is product engineering, not platform engineering. Grafana's mental model is metrics-and-infrastructure-shaped; PostHog's is product-shaped.
- Customer wants logs connected to *real* product analytics (funnels, retention, cohorts, paths) and feature flags – Grafana has none of those products.
- Customer doesn't want to manage three pricing dimensions or self-host Loki.
- OpenTelemetry-native ingest works either way – no proprietary lock-in in either direction.

### vs Better Stack

**Their approach:** Modern OpenTelemetry-native observability bundle – logs, traces (eBPF + OTel), metrics, RUM (session replay + web vitals), error tracking, incident management, status pages, on-call. Has an MCP server and an AI SRE that brings "Claude Code with the knowledge of your infrastructure." Headline pricing claim: 30x cheaper than Datadog ($687/month for 3 TB). Offers contract buyouts for Datadog migrations. Going hard after the same buyer we are.

**Where PostHog wins:**
- Customer wants the *full* product analytics layer – funnels, retention, cohorts, paths, journeys, experiments. Better Stack has web vitals and RUM, not the product behavior stack.
- Customer needs feature flags and experiments as first-class trigger and audience sources – Better Stack doesn't have flags or experiments.
- Customer's team is product engineering, not SRE. Better Stack's AI SRE is explicitly framed for infrastructure workflows; PostHog AI is product-context-aware.
- PostHog runs analytics, replay, errors, flags, experiments, surveys, *and* logs as one connected platform – Better Stack is observability + IRM, not product-led growth.

## Objections

### "You don't have distributed tracing or metrics. We need full observability."

**Follow-up:** What's your current tracing setup, and is it integrated with your logs already, or are they separate tools?

**Answer:** Honest – PostHog doesn't ship distributed tracing or metrics today. Both are on the roadmap, coming this summer. If full observability with traces + metrics + logs in one tool is non-negotiable today, Datadog or Grafana's LGTM+ stack is the right pick and we should say so. What PostHog *does* offer is logs connected to product analytics, session replay, error tracking, and feature flags – context layers no other observability tool ships. Many teams adopt PostHog Logs alongside an existing tracing solution and consolidate later.

**Proof point:** Logs ingest via OpenTelemetry, so an OTel-instrumented backend can send logs to PostHog and traces wherever – the standards make hybrid setups easy.

### "Better Stack claims 30x cheaper than Datadog and has MCP, AI SRE, and a full observability + IRM bundle. What makes PostHog different?"

**Follow-up:** Who would own this, platform engineering and SRE, or product engineering? And is the pitch landing on infrastructure observability or product behavior?

**Answer:** Better Stack is OTel-native, MCP-capable, does contract buyouts for Datadog migrations, and has a fuller observability bundle than ours (traces, status pages, on-call). If the team is platform/SRE-led and the work is infrastructure observability + incident response, Better Stack is the more direct fit. Where PostHog wins is when the team is *product*-led, meaning they need logs connected to funnels, retention, cohorts, experiments, and feature flag exposures. Better Stack has web vitals and RUM; PostHog has the full product behavior stack and feature flags as first-class triggers. The differentiation isn't observability features, it's the product data layer those features connect to.

### "How does PostHog handle terabytes of logs per day?"

**Follow-up:** What's your current daily volume, and where does the cost get painful – ingest, indexing, or retention?

**Answer:** PostHog Logs is per-GB ingest only, with volume discounts past the 50 GB free tier. At terabyte-per-day volume the bill is predictable but real – customers usually pair PostHog with sampling (drop debug-level logs in production) or use the OpenTelemetry collector to route only the logs that need product context to PostHog. For pure-volume use cases without that need (security audit, raw archival), self-hosted Loki or an enterprise platform may make more sense for bulk volume, and PostHog Logs for the *product-relevant* slice. The product integration matters most when the log is debugging a user-facing issue, not when it's part of a compliance archive.

**Proof point:** OpenTelemetry-native ingest lets you route logs by severity, service, or attribute to multiple destinations, PostHog for product-context logs, your existing tool for the rest.

### "PostHog feels like a web/frontend/analytics company. Can you handle our backend logs?"

**Follow-up:** What languages and services is the backend running, and what's the daily log volume?

**Answer:** Analytics roots make the company look web-shaped from the outside, but Logs is actually the most backend-focused product in the bundle: OTLP/HTTP ingest works from Node, Python, Go, Java, your existing Datadog Agent, or any HTTP client. Browser console capture via PostHog JS is an *additional* feature, not the primary one. Most of the "web-focused" customer feedback in our research was about historic instrumentation maturity (web SDK shipped first), not about backend logs – the ingest infrastructure is OpenTelemetry-standard and works from any backend.

**Proof point:** PostHog uses its own Logs product internally for backend services. The Datadog Agent drop-in means existing backend log pipelines work without rewriting.
