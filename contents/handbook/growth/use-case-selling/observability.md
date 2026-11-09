---
title: 'Observability'
showTitle: true
hideAnchor: false
---

> This page is about cross-selling. For the basics, read [observability foundations](/handbook/growth/sales/observability-foundations). For positioning, messaging, and pricing, read [observability positioning](/handbook/growth/sales/observability-positioning).

> **Customers who switched to PostHog.** <PrivateLink url="https://docs.google.com/document/d/1Rswft51xDkYtkldt5BZXNYQewNjQCGMQ5V80MAvwQmg/edit?tab=t.0">See the list</PrivateLink> of customers who moved to PostHog from another tool, with their quotes, why they moved, and what to watch out for.

## What is the job to be done?

"Help me know when things break, understand why, and fix them fast."

- Catch exceptions and regressions before users report them
- See the user's actual experience when an error occurred, not just a stack trace
- Understand the *business impact* of incidents: which users were affected, what revenue was at risk
- Centralize log collection and search alongside error data, and follow a slow request across services
- Triage incidents faster with natural language queries

This is where a lot of our recent shipping has gone, and where significant market opportunity exists. The pitch is a stack that competes with Datadog and Sentry on their home turf, with two advantages neither has: our observability data is connected to product analytics data, and it feeds agents that can open the fix. No other vendor can tell you "this API endpoint is slow, here's the business impact in user drop-off and revenue, and here's the pull request."

Separating this from Release Engineering is important because the buyer is often different (SRE/platform team vs. product engineering), the competitive landscape is different (Datadog/Sentry vs. LaunchDarkly), and the expansion path is different.

## What PostHog products are relevant?

- **[Error Tracking](/docs/error-tracking) (core)** — Track exceptions, get alerts, resolve issues. Automatic grouping of similar errors, stack traces, affected user counts. The starting point for most Observability adoption.
- **[Session Replay](/docs/session-replay)** — User impact of errors, visual reproduction. When an error fires, click through to the user's session and see exactly what happened. This is the killer differentiation vs. Sentry: you don't just see the stack trace, you see the user's actual experience.
- **[Product Analytics](/docs/product-analytics)** — Error correlation with user behavior and business impact. Answer "how many users hit this error?" and "did this error cause drop-off in our conversion funnel?" Connect technical incidents to business outcomes.
- **[PostHog AI](/docs/posthog-ai/allow-access)** — Natural language incident triage. "What errors spiked in the last hour and which users were affected?" without writing a query. Faster mean time to understanding during incidents. ([Example prompts](/docs/posthog-ai/example-prompts))
- **[Logs](/docs/logs)** — Centralized log collection and search over OpenTelemetry (OTLP). Full-text search, severity and service filters, [pattern mining](/docs/logs/patterns) that collapses millions of lines into templates, [log alerts](/docs/logs/alerts), and [links from a log line to the session replay](/docs/logs/link-session-replay) it came from. Billed per GB ingested with 10GB/month free and 14-day retention (custom retention is available). ([Pricing](/docs/logs/pricing) · [Best practices](/docs/logs/best-practices))
- **[Distributed tracing](/docs/distributed-tracing)** — Follow a request across services over OpenTelemetry (OTLP). Trace waterfalls, span search by service/status/duration/attribute, latency percentiles and error rates per operation, and correlated logs inside the span inspector. No proprietary SDK: point your existing OTel exporter at PostHog. Billed with Logs on one per-GB ingestion meter, so the 10GB/month free tier is shared across both. 14-day retention by default (custom retention is available). ([Pricing](/tracing/pricing) · [Start here](/docs/distributed-tracing/start-here) · [Why you need it](/docs/distributed-tracing/basics))
- **[Metrics](/docs/metrics)** *alpha* — Application and infrastructure metrics (counters, gauges, histograms) over the same OTLP pipeline, or recorded directly with `posthog.metrics` if the PostHog SDK is already installed. The third OTel pillar alongside logs and traces.
- **[Web vitals](/docs/web-analytics/web-vitals)** — Core Web Vitals (LCP, INP, CLS, FCP) captured automatically by the JS SDK. The frontend-performance half of the story, which the OTel pillars don't cover.

**A naming note:** "APM" is our internal team name, not a product. Customer-facing, the pillars are **Logs**, **Distributed tracing**, and **Metrics**, sitting alongside Error Tracking and Web vitals. Don't tell a customer "APM is coming" — tell them which pillar ships today and at what maturity.

## Adoption path and expansion path

### Entry point

Usually **Error Tracking**. Team wants to catch exceptions and regressions. Common entry scenarios:

1. **Sentry replacement:** They're paying for Sentry and want to consolidate into PostHog (which they're already using for analytics or flags). Error Tracking is the direct replacement.
2. **First observability tool:** Early-stage company that hasn't invested in error tracking yet. PostHog's free tier (100K exceptions/month) lets them start without a new vendor relationship.
3. **Session Replay → Error Tracking:** They're already using Session Replay for debugging and discover that errors surfaced in replays could be tracked systematically with Error Tracking.

### Primary expansion path

**Product Analytics → Session Replay → Error Tracking → full APM (Logs, Distributed tracing, and Metrics)**

This is the ideal path for an existing PostHog customer. Use the value of the product they already have to sell the next one.

**1. Product Analytics → Session Replay**

The hook is "why." Funnels and trends show where users drop off, and every funnel, trend, or retention chart links to the recordings of the users behind it.

- **Listen for:** They see where users drop off, but not why.
- **Ask:** "When conversion drops, how do you find out why?"

**2. Session Replay → Error Tracking**

If they watch replays to find bugs, Error Tracking finds those bugs first. Every issue comes with the affected user's replay, and an alert fires when a new issue appears. An issue only has a replay if that session was recorded, so teams that sample replays won't have one for every error.

- **Listen for:** They use replays to hunt for bugs.
- **Ask:** "How do you find out when something breaks?"

**3. Error Tracking → full APM**

Error Tracking tells you what's wrong. Logs show what the system was doing when it happened, and traces follow the request through every service. Log lines link to the error, person, and replay, and a slow span links to the replay of the user who waited.

- **Listen for:** They see the error, then open another tool to find out why.
- **Ask:** "After you see an error, where do you go next?"

**Sell APM as one package.** Pitch Logs, Distributed tracing, and Metrics together. Customers don't leave their current provider for only one of the three. Metrics is still alpha, so push the full package once it's GA, and don't move large managed customers onto alpha products.

**If they start from Error Tracking:** a team that comes in through Error Tracking, such as a Sentry replacement, can follow **Error Tracking → Session Replay → Logs → Product Analytics** instead. Session Replay shows what the user did when the error fired. Logs add what the server was doing at that moment, and log lines link back to the replay. Product Analytics then shows the impact: how many users hit the error, and whether it caused drop-off in a funnel.

### Alternate expansion paths

**Logs → Distributed tracing → Metrics (the OpenTelemetry path):** Once a team is exporting logs over OTLP, traces and metrics are a config change, not a new integration. The same collector, the same project token, three different endpoints. This is the cheapest expansion in the whole playbook to *describe* — but be honest that metrics is still alpha, and check they're not depending on the gaps listed under pain points.

**Observability → self-driving:** This is the strongest expansion in the playbook. Error tracking, logs, and session replay are all [signal sources](/docs/self-driving/inbox/sources) for [self-driving](/docs/self-driving), and there are scouts watching traces, logs, error tracking, web vitals, and observability gaps. An SRE team that has already instrumented for observability has, without meaning to, done all the setup work self-driving needs. See [how to pitch self-driving](/handbook/growth/sales/how-to-pitch-self-driving).

## Business impact of solving the problem

**Observability data connected to product analytics is a moat.** Every other observability tool (Datadog, Sentry, New Relic) can tell you "this endpoint threw an error." Only PostHog can tell you "this error affected 500 users, 30 of whom were in the middle of checkout, resulting in an estimated $15k in lost revenue this week." That's a fundamentally different conversation with engineering leadership.

**Session Replay as error context is a killer feature.** Sentry shows you a stack trace. PostHog shows you the user's actual experience. For frontend and full-stack debugging, this is dramatically faster for reproduction and resolution.

**Consolidation play for accounts already using PostHog.** If they're already on PostHog for analytics or flags, adding Error Tracking and Logs means one fewer vendor (Sentry, Datadog) to manage. The consolidation saves money and reduces context-switching.

**This use case has the highest growth ceiling.** The observability market is enormous (Datadog alone is $25B+). Our story gets stronger with every product we ship in this space.

## Personas to target

| Persona | Role Examples | What They Care About | How They Evaluate |
|---|---|---|---|
| SRE / Platform Engineer | SRE, Platform Eng, Infrastructure Eng | Reliability, alerting, mean time to resolution, not getting paged at 3am | "Will this catch issues before users report them? How fast can I triage?" |
| Backend Engineer | Backend Eng, API Engineer, Server-side Eng | Stack traces, log correlation, reproducing bugs efficiently | "Can I see what happened on the server when this error fired?" |
| Product Engineer | Full-stack Eng, Frontend Eng | User-facing bugs, reproduction, understanding the user impact of errors | "Can I see the user's session when this error happened?" |
| Engineering Manager | EM, VP Eng, Director of Eng | Team velocity, incident metrics (MTTR, error rates), cost of observability tooling | "How does this reduce our incident response time? What does it cost vs. Sentry/Datadog?" |
| Founder (early stage) | CTO, first engineer | Catching bugs before users complain, not paying Datadog prices | "Does this work out of the box and is it affordable?" |

## Signals in Vitally & PostHog

### Vitally indicators this use case is relevant

| Signal | Where to Find It | What It Means |
|---|---|---|
| Error Tracking is active but low product count | Product spend breakdown | They've started with errors. Full Observability expansion path available. |
| Customer mentions Sentry or Datadog in notes | Vitally notes / conversations | Competitive displacement opportunity. Consolidation pitch. |
| High Session Replay usage with error-related viewing patterns | Product usage data | They're using replay for debugging already. Error Tracking formalizes this. |
| Engineering-heavy user base, no PM users | User list in Vitally | Engineering-first account. Observability and Release Engineering are the primary use cases. |

### PostHog usage signals

| Signal | How to Check | What It Means |
|---|---|---|
| Error tracking exceptions growing week over week | Product usage metrics | They're instrumenting more of their stack. Good adoption signal. |
| Session Replay filtered by error events | Replay usage patterns | They're connecting replay to error debugging. The integration is clicking. |
| High error volume but no alerting configured | Error tracking settings | They're collecting errors but not acting on them. Help them set up alerts. |
| Product Analytics queries referencing error events | Saved insights | They're starting to connect errors to business impact. Encourage this. |

### Signals heard on calls

| Signal | What you hear | What to pitch |
|---|---|---|
| They cap what they capture because of cost | "Sentry pretty much priced us out." | Error Tracking and Session Replay on usage-based pricing, with 100K exceptions and 5K recordings free each month. |
| They want to see what the user did when it broke | "I would like to correlate a session playback with an obvious error message." | Error Tracking + Session Replay. Open an issue and play the replay attached to it. |
| They pay for a tool nobody uses | "We're paying for Sentry and we're just not using it." | Consolidation. If they already use PostHog, Error Tracking means one fewer vendor. |
| A renewal is coming up | "Their pricing keeps going up year after year." | Move one signal to PostHog first. A full switch can come later. |
| A huge volume of one non-behavioral event | Events like "API successfully completed" in their usage data | Logs. See the system data row under [cross-sell pathways](#cross-sell-pathways-from-this-use-case). |

## Command of the Message

### Discovery questions

- When something breaks in production, how long does it take your team to find out? From users? From monitoring?
- How do you currently track and prioritize errors? Do you have a tool for this, or is it ad hoc?
- When you see an error, how do you reproduce it? How long does reproduction typically take?
- Can you tell which users were affected by a specific error? Do you know the business impact?
- What does your current observability stack look like? (Sentry? Datadog? New Relic? How many tools?)
- How much are you spending on observability tooling today?
- When an incident happens, how many tools does your team switch between to understand what happened?
- Do you have centralized logging? Where do your logs live today?

### Negative consequences (of not solving this)

- Errors are discovered through user complaints, not proactive monitoring
- Stack traces exist but reproduction is guesswork because there's no user session context
- Engineering can quantify "how many errors" but not "how many users affected" or "what revenue was lost"
- Multiple observability tools (Sentry for errors, Datadog for APM, separate logging) with no connection between them
- Incident triage is slow because context is spread across 3+ tools
- Observability costs are high and growing (Datadog pricing, Sentry pricing) without clear ROI

### Desired state

- Errors are caught proactively with alerts before users report them
- Every error links to the user's actual session, so reproduction takes seconds, not hours
- Error impact is measured in business terms: affected users, affected revenue, affected funnels
- Errors, logs, and user sessions live in one platform alongside product analytics
- Incident triage is faster because all context is in one place

### Positive outcomes

- Reduced MTTR (mean time to resolution) from instant session replay access on errors
- Fewer user-reported bugs (proactive error detection + alerting)
- Better incident prioritization based on business impact
- Observability cost reduction through consolidation (replace Sentry + separate logging)
- Engineering leadership gets business-impact reporting on reliability, not just technical metrics

### Success metrics

**Customer-facing:**

- Mean time to resolution for user-facing bugs decreases
- Percentage of errors caught proactively (via alerting) vs. user-reported increases
- Error rate trends downward as bugs are prioritized by impact and fixed systematically

**TAM-facing:**

- Error Tracking exception volume grows (instrumenting more of their stack)
- Session Replay usage increases with error-filtered viewing (integration is working)
- Logs adoption starts, then traces (filling out the observability stack over one OTel pipeline)
- Product Analytics queries reference error data (connecting to business impact)

## Competitive positioning

### Our positioning

- **Errors + replay in one platform.** See the stack trace and the user's actual session. No other error tracking tool offers this depth of user context. Sentry shows you the error. PostHog shows you the experience.
- **Errors tied to revenue and user behavior.** Connect errors to user behavior and revenue with Product Analytics. "This error caused 200 users to abandon checkout" is a different conversation than "this error fired 500 times."
- **Consolidation for existing PostHog users.** If they're already using PostHog for analytics or flags, adding Error Tracking means one fewer vendor. Same data platform, one less tool to manage.
- **Logs completes the picture.** Errors, user sessions, and backend logs in one place. No switching between Sentry, Papertrail, and Amplitude to understand an incident.
- **OpenTelemetry-native, no proprietary SDK.** Logs, traces, and metrics all ingest over standard OTLP. There's nothing to rip out if they leave, which matters to a platform team that's been locked into an agent-based vendor. One OTel setup covers all three pillars.
- **A signal doesn't stop at the alert.** Every other tool on this list tells you something broke and hands you the triage. Errors, logs, and traces are all [self-driving](/docs/self-driving) signal sources, so a regression can arrive as an investigated report with a pull request attached. Datadog's Bits AI and Sentry's Seer are the only competitors moving in this direction at all.

### Competitor quick reference

| Competitor | What They Do | Our Advantage | Their Advantage |
|---|---|---|---|
| Sentry | Error tracking, performance monitoring, session replay | Deeper product analytics integration; business impact context; flag/experiment connection; better pricing | More mature error tracking features; broader language support; larger install base; code-level profiling |
| Datadog | Full observability: APM, logs, metrics, infrastructure | Product analytics integration; session replay depth; OTel-native with no agent; usage-based instead of per-host | Service maps, profiling, infra and k8s monitoring, synthetic monitoring; enterprise-grade; massive ecosystem |
| New Relic | Full observability: APM, logs, errors, distributed tracing | Product analytics integration; session replay; simpler pricing | Far more mature APM; complete infra coverage |
| Better Stack | OTel-native logs, traces, uptime | Product analytics and session replay alongside; self-driving loop | Service map; more mature tracing; uptime/status pages |
| Grafana (Loki/Tempo) | Open-source logs and traces you run yourself | Managed, no infra to operate; user context and business impact | Self-hostable at any scale; huge dashboarding ecosystem |

**Where PostHog stands:** Our Observability story is narrower than Datadog's. Error Tracking, Logs, Distributed tracing, and Web vitals are production-ready; Metrics is alpha; there's no service map, no profiling, no infrastructure or Kubernetes monitoring, and no synthetic monitoring. So we are not a Datadog replacement for a team whose job is infrastructure. We *are* a credible replacement for Sentry, and increasingly for a logs vendor, and the honest frame is: "we cover the application and the user; we don't cover your hosts." Where we're differentiated rather than just cheaper is the two ends nobody else joins up — the business impact of an incident on one side, and an agent that opens the fix on the other.

## Pain points & known limitations

| Pain Point | Impact | Workaround / Solution |
|---|---|---|
| Metrics is alpha | Setup details, including the ingestion endpoint, may change before GA. Don't build a migration plan around it yet. | Be honest that metrics is alpha and free during alpha. It's usable today and a real reason to start exporting OTel to PostHog, but a team mid-migration off Datadog should keep their existing tool running. |
| No service map | Platform teams evaluating against Datadog or Better Stack will ask for this by name | We expose call-tree aggregates per parent/child edge, which answers "what calls what and how often" for a known path, but there's no rendered topology view. Say so plainly — it's on our own public comparison table as a gap. |
| No code-level profiling or flame graphs | Teams chasing CPU/memory hotspots inside a process won't find it | Tracing localizes the slow *span*; profiling localizes the slow *line*. We do the first, not the second. Datadog and Sentry both do profiling. |
| No infrastructure, container, or Kubernetes monitoring | This is the single biggest gap vs Datadog and the fastest way to lose an SRE-led deal | Don't fight it. PostHog is application and user observability. If their primary pain is host and cluster health, we're complementary, not a replacement. |
| No alerting on spans | Alerts cover insights (trends, funnels, SQL) and logs, but not trace data | Route around it: alert on an error-tracking issue or a log pattern that correlates with the latency you care about. The APM scout also watches p95 and error rate per service on a schedule and files a report — that's proactive coverage, just not a pager. |
| Sampling control is limited | No server-side tail sampling; you sample head-side in your own OTel exporter | Set the expectation during setup. Trace retention is 14 days by default, with custom retention billed per month and set per service or per source. The Logs billing limit doesn't cap custom retention. |
| Tracing SDK coverage is backend-only | Node, Python, Go, Java, .NET, PHP, Ruby. No browser or mobile tracing. | Frontend performance is covered by Web vitals and Session Replay instead — a different shape of answer, but not a gap in coverage of the user experience. |
| Error Tracking language/framework support may lag Sentry | Sentry supports a very wide range of languages and frameworks | Check [Error Tracking docs](/docs/error-tracking) for current support. For unsupported frameworks, generic exception capture via the API may work. |
| No built-in on-call/incident management | Teams wanting PagerDuty-style incident workflows won't find it here | PostHog alerts can trigger webhooks to PagerDuty, Slack, etc. Error Tracking is about detection and context, not incident management workflows. |

## Getting a customer started

### What does an evaluation look like?

- **Scope:** Enable Error Tracking on their primary application. Connect Session Replay to error events. Set up alerts for critical error spikes.
- **Timeline:** 1 to 3 days to start capturing errors. 1 week to have meaningful error data and session replay context.
- **Success criteria:** Can you see errors grouped by type with affected user counts? Can you click from an error to the user's session replay? Can you get alerted when a new error type spikes?
- **PostHog investment:** Error Tracking free tier covers 100K exceptions/month. Session Replay free tier covers 5K recordings.
- **Key requirement:** They need to integrate the PostHog SDK or connect their existing error capture to PostHog's Error Tracking. If they're already using PostHog's SDK, Error Tracking may just need to be enabled.

### Onboarding checklist

- [ ] Enable [Error Tracking](/docs/error-tracking) in the PostHog SDK configuration
- [ ] Verify errors are being captured and grouped correctly
- [ ] Connect [Session Replay](/docs/session-replay) to error events (verify you can click from error → replay)
- [ ] Set up alerts for critical error types or spike detection
- [ ] Build an "Error Health" dashboard: error trends, top errors by affected users, error rate by release
- [ ] Review the top 5 errors with the team, using session replay context to prioritize fixes
- [ ] Enable [Logs](/docs/logs/start-here) for backend context, and link a log line back to its session replay
- [ ] If they already run OpenTelemetry, point a trace exporter at PostHog ([start here](/docs/distributed-tracing/start-here))
- [ ] Connect error tracking and logs as [self-driving signal sources](/docs/self-driving/inbox/sources) so regressions arrive investigated
- [ ] Create a Product Analytics query that correlates errors with funnel drop-off or business metrics

## Cross-sell pathways from this use case

| If Using... | They Might Need... | Why | Conversation Starter |
|---|---|---|---|
| Product Analytics, with errors sent as custom events | Error Tracking | Error events are only a chart, with no stack traces or alerts. One account went from $50K to $20K ARR by switching (internal). | "What happens to those error events today?" |
| Error Tracking only | Session Replay | They see stack traces but can't reproduce the user experience | "You can see the error. Want to see exactly what the user was doing when it happened?" |
| Error Tracking + Session Replay | Logs | They have frontend error context but need backend logs | "You can see the user's session. But what was happening on the server at the same time?" |
| Product Analytics, with system data sent as events | Logs | Events like "API successfully completed" are system data, and logs bill per GB. See [events vs. logs](/docs/logs/best-practices#centralize-your-logs). | "Who reads that event? If it's only for debugging, that's system data, and logs are built for it." |
| Session Replay or Error Tracking | [Replay Vision](/docs/replay-vision) | Some bugs never throw an error, and not every error reaches the user | "See the bug, then watch the user hit it, or have Replay Vision watch for you." |
| Logs over OpenTelemetry | Distributed tracing + Metrics (*alpha*) | The hard part (an OTel pipeline) is already done; the other two pillars are a config change | "You're already exporting OTel to us. Traces and metrics are the same collector and a different endpoint. Traces bill on the same meter as your logs, and metrics are free while they're in alpha." |
| Error Tracking or Logs active | self-driving | Both of these are already a signal source; the account has done the setup without meaning to | "You've got the signals. Want an agent to investigate them and open the PR, instead of you triaging every alert?" |
| Error Tracking + analytics correlation | Product Intelligence (for the product team) | They're connecting errors to user impact. The product team would benefit from the same analytics. | "You're measuring error impact on users. Has your product team seen what they can do with funnels and retention in the same platform?" |
| Error Tracking (engineering in PostHog) | Release Engineering (same engineering team) | Engineering is in PostHog for errors. Feature flags for safe releases is a natural add. | "You're tracking errors after releases. What if you could gate features behind flags and roll back without a deploy?" |
| Error Tracking for AI features | AI/LLM Observability | Traditional error tracking misses AI quality regressions | "You're catching exceptions, but are you catching when your model starts giving worse answers? That's a different kind of 'error.'" |

## Internal resources

- **Error Tracking docs:** [Error Tracking](/docs/error-tracking)
- **Logs docs:** [Start here](/docs/logs/start-here) · [Pricing](/docs/logs/pricing) · [Alerts](/docs/logs/alerts) · [Link to session replay](/docs/logs/link-session-replay)
- **Distributed tracing docs:** [Start here](/docs/distributed-tracing/start-here) · [Why you need it](/docs/distributed-tracing/basics) · [Installation](/docs/distributed-tracing/installation)
- **Metrics docs:** [Metrics](/docs/metrics)
- **self-driving:** [How to pitch self-driving](/handbook/growth/sales/how-to-pitch-self-driving) · [Signal sources](/docs/self-driving/inbox/sources)
- **Session Replay docs:** [Session Replay](/docs/session-replay)
- **Product Analytics docs:** [Product Analytics](/docs/product-analytics)
- **PostHog AI docs:** [Enable PostHog AI](/docs/posthog-ai/allow-access) · [Example prompts](/docs/posthog-ai/example-prompts)
- **Competitive battlecard:** *To be added: Sentry / Datadog competitive positioning*

## Appendix: Company archetype considerations

| Archetype + Stage | Framing | Key Products | Buyer |
|---|---|---|---|
| AI Native — Early | "You're shipping fast and breaking things. PostHog catches errors and shows you the user's experience when they hit a bug. No Sentry bill required." Error Tracking + Session Replay is the sweet spot. | Error Tracking, Session Replay | CTO, founding engineer |
| AI Native — Scaled | "Your AI features have failure modes that traditional error tracking misses: hallucinations, slow responses, quality regressions. PostHog catches the technical errors AND lets you evaluate output quality." Bridge to AI/LLM Observability. | Error Tracking, Session Replay, Logs, AI Evals | VP Eng, Platform Lead, SRE |
| Cloud Native — Early | "Stop finding bugs from user complaints. Error Tracking catches exceptions automatically, and Session Replay lets you see exactly what happened. 100K exceptions/month free." | Error Tracking, Session Replay | CTO, founding engineer |
| Cloud Native — Scaled | "Your team is juggling Sentry, Papertrail, and Datadog. PostHog consolidates error tracking, logs, and user context into the platform you already use for analytics." Consolidation pitch. | Error Tracking, Session Replay, Logs, Product Analytics | VP Eng, SRE Lead, Platform team |
| Cloud Native — Enterprise | "Multiple teams, multiple services, and incident context spread across 5 tools. PostHog gives you errors + logs + user sessions + business impact in one platform. No more switching between Sentry, Datadog, and Amplitude during an incident." | Full Observability stack + Enterprise package | VP Eng, Director of SRE, Platform leadership |
