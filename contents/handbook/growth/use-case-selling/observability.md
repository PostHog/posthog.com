---
title: 'Observability'
showTitle: true
hideAnchor: false
---


## What is the job to be done?

"Help me know when things break, understand why, and fix them fast."

- Catch exceptions and regressions before users report them
- See the user's actual experience when an error occurred, not just a stack trace
- Understand the *business impact* of incidents (which users were affected, what revenue was at risk), not just the technical impact
- Centralize log collection and search alongside error data
- Triage incidents faster with natural language queries

This is where our roadmap is heading and where significant market opportunity exists. The long-term vision is a full observability stack that competes with Datadog and Sentry on their home turf, but with the massive advantage that our observability data is connected to product analytics data. No other vendor can tell you "this API endpoint is slow AND here's the business impact in terms of user drop-off and revenue loss."

Separating this from Release Engineering is important because the buyer is often different (SRE/platform team vs. product engineering), the competitive landscape is different (Datadog/Sentry vs. LaunchDarkly), and the expansion path is different.

## What PostHog products are relevant?

- **[Error Tracking](/docs/error-tracking) (core)** — Track exceptions, get alerts, resolve issues. Automatic grouping of similar errors, stack traces, affected user counts. The starting point for most Observability adoption.
- **[Session Replay](/docs/session-replay)** — User impact of errors, visual reproduction. When an error fires, click through to the user's session and see exactly what happened. This is the killer differentiation vs. Sentry: you don't just see the stack trace, you see the user's actual experience.
- **[Product Analytics](/docs/product-analytics)** — Error correlation with user behavior and business impact. Answer "how many users hit this error?" and "did this error cause drop-off in our conversion funnel?" Connect technical incidents to business outcomes.
- **[PostHog AI](/docs/posthog-ai/allow-access)** — Natural language incident triage. "What errors spiked in the last hour and which users were affected?" without writing a query. Faster mean time to understanding during incidents. ([Example prompts](/docs/posthog-ai/example-prompts))
- **Logging** *beta* — Centralized log collection and search. Logs are table stakes for any observability stack. Having logs alongside errors, replays, and analytics means the full debugging context lives in one place.
- *Roadmap: APM, API tracing* — Not shipped yet. When these arrive, the observability story becomes complete: errors + logs + traces + replay + analytics in one platform.

## Adoption path and expansion path

### Entry point

Usually **Error Tracking**. Team wants to catch exceptions and regressions. Common entry scenarios:

1. **Sentry replacement:** They're paying for Sentry and want to consolidate into PostHog (which they're already using for analytics or flags). Error Tracking is the direct replacement.
2. **First observability tool:** Early-stage company that hasn't invested in error tracking yet. PostHog's free tier (100K exceptions/month) lets them start without a new vendor relationship.
3. **Session Replay → Error Tracking:** They're already using Session Replay for debugging and discover that errors surfaced in replays could be tracked systematically with Error Tracking.

### Primary expansion path

**Error Tracking → + Session Replay (error context) → + Logging → + Product Analytics (impact analysis)**

**The logic of each step:**

- Error Tracking → Session Replay: They can see the error and the stack trace. But they can't see what the user was doing when it happened. Session Replay lets them click from an error event directly to the user's session and watch the full context. This is the single most differentiated feature in our Observability story.
- Session Replay → Logging: They're seeing errors and user sessions. They need the backend context: what was the server doing when this error fired? Centralized logs complete the debugging picture.
- Logging → Product Analytics: They're debugging individual errors. Now they want to understand the aggregate impact: how many users are hitting this error? Is it correlated with a specific funnel step? Did this bug cause a revenue drop? Product Analytics connects technical incidents to business outcomes.

### Future expansion (roadmap dependent)

As APM and tracing ship, the path extends: Logging → APM → Tracing, completing the full observability stack. Position this honestly: name the vision, be transparent about what's available today vs. what's coming.

## Business impact of solving the problem

**Observability data connected to product analytics is a moat.** Every other observability tool (Datadog, Sentry, New Relic) can tell you "this endpoint threw an error." Only PostHog can tell you "this error affected 500 users, 30 of whom were in the middle of checkout, resulting in an estimated $15k in lost revenue this week." That's a fundamentally different conversation with engineering leadership.

**Session Replay as error context is a killer feature.** Sentry shows you a stack trace. PostHog shows you the user's actual experience. For frontend and full-stack debugging, this is dramatically faster for reproduction and resolution.

**Consolidation play for accounts already using PostHog.** If they're already on PostHog for analytics or flags, adding Error Tracking and Logging means one fewer vendor (Sentry, Datadog) to manage. The consolidation saves money and reduces context-switching.

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
- Better incident prioritization based on business impact, not just error count
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
- Logging adoption starts (filling out the observability stack)
- Product Analytics queries reference error data (connecting to business impact)

## Competitive positioning

### Our positioning

- **Errors + replay in one platform.** See the stack trace and the user's actual session. No other error tracking tool offers this depth of user context. Sentry shows you the error. PostHog shows you the experience.
- **Business impact, not just error count.** Connect errors to user behavior and revenue with Product Analytics. "This error caused 200 users to abandon checkout" is a different conversation than "this error fired 500 times."
- **Consolidation for existing PostHog users.** If they're already using PostHog for analytics or flags, adding Error Tracking means one fewer vendor. Same data platform, one less tool to manage.
- **Logging completes the picture.** Errors, user sessions, and backend logs in one place. No switching between Sentry, Papertrail, and Amplitude to understand an incident.

### Competitor quick reference

| Competitor | What They Do | Our Advantage | Their Advantage |
|---|---|---|---|
| Sentry | Error tracking, performance monitoring, session replay | Deeper product analytics integration; business impact context; flag/experiment connection; better pricing | More mature error tracking features; broader language support; larger install base; dedicated performance monitoring |
| Datadog | Full observability: APM, logs, metrics, errors | Product analytics integration; session replay depth; much cheaper | Complete observability stack (APM, traces, metrics); enterprise-grade; massive ecosystem |
| New Relic | Full observability: APM, logs, errors, distributed tracing | Product analytics integration; session replay; simpler pricing | Complete observability stack; mature enterprise features |

**Honest assessment:** Our Observability story is credible but incomplete. Error Tracking + Session Replay + Logging is a meaningful starting point, and the connection to product analytics is genuinely differentiated. But we don't have APM or tracing yet. We can't position PostHog as a full Datadog replacement today. The honest pitch is: "For error tracking, we're better than Sentry because of the user context. For full observability, we're building toward it, and in the meantime, the product analytics connection gives you something no other observability tool offers." Be transparent about what's available today vs. what's on the roadmap.

## Pain points & known limitations

| Pain Point | Impact | Workaround / Solution |
|---|---|---|
| No APM or tracing yet | Can't replace Datadog for teams that need full backend observability | Be honest about the roadmap. Position PostHog as complementary for now: errors + replay + analytics in PostHog, APM in their existing tool. The consolidation play gets stronger as we ship more. |
| Logging is beta | Teams expecting production-grade centralized logging may find gaps | Set expectations on maturity. For teams with existing logging (ELK, Papertrail), PostHog logging complements rather than replaces initially. |
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
- [ ] If applicable, enable Logging (beta) for backend log context
- [ ] Create a Product Analytics query that correlates errors with funnel drop-off or business metrics

## Cross-sell pathways from this use case

| If Using... | They Might Need... | Why | Conversation Starter |
|---|---|---|---|
| Error Tracking only | Session Replay | They see stack traces but can't reproduce the user experience | "You can see the error. Want to see exactly what the user was doing when it happened?" |
| Error Tracking + Session Replay | Logging | They have frontend error context but need backend logs | "You can see the user's session. But what was happening on the server at the same time?" |
| Error Tracking + analytics correlation | Product Intelligence (for the product team) | They're connecting errors to user impact. The product team would benefit from the same analytics. | "You're measuring error impact on users. Has your product team seen what they can do with funnels and retention in the same platform?" |
| Error Tracking (engineering in PostHog) | Release Engineering (same engineering team) | Engineering is in PostHog for errors. Feature flags for safe releases is a natural add. | "You're tracking errors after releases. What if you could gate features behind flags and roll back without a deploy?" |
| Error Tracking for AI features | AI/LLM Observability | Traditional error tracking misses AI quality regressions | "You're catching exceptions, but are you catching when your model starts giving worse answers? That's a different kind of 'error.'" |

## Internal resources

- **Error Tracking docs:** [Error Tracking](/docs/error-tracking)
- **Session Replay docs:** [Session Replay](/docs/session-replay)
- **Product Analytics docs:** [Product Analytics](/docs/product-analytics)
- **PostHog AI docs:** [Enable PostHog AI](/docs/posthog-ai/allow-access) · [Example prompts](/docs/posthog-ai/example-prompts)
- **Competitive battlecard:** *To be added: Sentry / Datadog competitive positioning*

## Appendix: Company archetype considerations

| Archetype + Stage | Framing | Key Products | Buyer |
|---|---|---|---|
| AI Native — Early | "You're shipping fast and breaking things. PostHog catches errors and shows you the user's experience when they hit a bug. No Sentry bill required." Error Tracking + Session Replay is the sweet spot. | Error Tracking, Session Replay | CTO, founding engineer |
| AI Native — Scaled | "Your AI features have failure modes that traditional error tracking misses: hallucinations, slow responses, quality regressions. PostHog catches the technical errors AND lets you evaluate output quality." Bridge to AI/LLM Observability. | Error Tracking, Session Replay, Logging, AI Evals | VP Eng, Platform Lead, SRE |
| Cloud Native — Early | "Stop finding bugs from user complaints. Error Tracking catches exceptions automatically, and Session Replay lets you see exactly what happened. 100K exceptions/month free." | Error Tracking, Session Replay | CTO, founding engineer |
| Cloud Native — Scaled | "Your team is juggling Sentry, Papertrail, and Datadog. PostHog consolidates error tracking, logging, and user context into the platform you already use for analytics." Consolidation pitch. | Error Tracking, Session Replay, Logging, Product Analytics | VP Eng, SRE Lead, Platform team |
| Cloud Native — Enterprise | "Multiple teams, multiple services, and incident context spread across 5 tools. PostHog gives you errors + logs + user sessions + business impact in one platform. No more switching between Sentry, Datadog, and Amplitude during an incident." | Full Observability stack + Enterprise package | VP Eng, Director of SRE, Platform leadership |
