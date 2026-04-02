---
title: 'Customer Experience'
showTitle: true
hideAnchor: false
---


## What is the job to be done?

"When a customer runs into an issue, we're able to quickly understand exactly what happened, identify the problem, and verify a fix, without bouncing between multiple tools or wasting engineering time trying to reproduce it."

- Build a repeatable debugging workflow where support, product, and engineering share the same context
- Give support teams the ability to see what actually happened, not just what the user reported
- Connect technical debugging (errors, logs) to user behavior (replay, analytics) and satisfaction signals (NPS, CSAT)
- Trace AI-powered workflows end to end when things go wrong

Most companies don't have a customer experience system. They have tickets in one place, errors in another, logs somewhere else, analytics owned by product, and engineers manually trying to reproduce bugs. The goal of this use case is to help a company build a unified debugging workflow where support, product, and engineering share the same context.

## What PostHog products are relevant?

- **[Product Analytics](https://posthog.com/docs/product-analytics) (core)** — Understand what a user was trying to do before something broke. Identify patterns in drop-offs, error frequency, and issue clustering across users or accounts.
- **[Session Replay](https://posthog.com/docs/session-replay)** — See exactly what the user did, not what they think they did. Capture console logs and network calls alongside the visual recording. The single most impactful product for support and debugging workflows.
- **[Error Tracking](https://posthog.com/docs/error-tracking)** — Capture frontend and backend exceptions tied to users and releases. See whether other users have been experiencing the same issue. Structured, queryable error data instead of ad hoc log searches.
- **[Group Analytics](https://posthog.com/docs/product-analytics/group-analytics) + [Person Profiles](https://posthog.com/docs/data/persons)** — Give support and CS a clean, holistic view of a user or account. See all events, replays, errors, and properties for a specific person or organization.
- **Logging** *beta* — Inspect structured backend logs connected to the same user session. When replay and error tracking show what happened on the frontend, logs show what happened on the server.
- **[LLM Observability](https://posthog.com/docs/ai-engineering)** — See prompts, outputs, latency, and token usage for AI-powered workflows. When an AI feature misbehaves, trace it back to the specific generation.
- **[Surveys](https://posthog.com/docs/surveys)** — Capture frustration signals (NPS, CSAT) and tie them directly to broken flows. When someone leaves a low score, you can click through to their session and see what went wrong.
- **[Experiments](https://posthog.com/docs/experiments)** — Validate that fixes actually improved the experience. After resolving a class of issues, measure whether user satisfaction and completion rates improved.

## Adoption path and expansion path

### Entry point

Usually **Session Replay** or **Product Analytics**. Common entry scenarios:

1. **"We can't reproduce bugs":** Support needs to see what happened instead of relying on screenshots and user descriptions. Session Replay is the direct answer.
2. **"Something is breaking but we don't know why":** Product notices drop-offs or support volume spikes and needs visibility into what's causing them. Product Analytics surfaces the pattern, Session Replay provides the detail.

### Primary expansion path

**Product Analytics → + Session Replay → + Error Tracking → + Logs / LLM Observability → + Surveys**

**The logic of each step:**

- Product Analytics → Session Replay: They know *what* happened (drop-offs, error rates). They need to see *why*. Session Replay provides the qualitative context behind the quantitative signal.
- Session Replay → Error Tracking: Seeing something break visually isn't enough. They want structured, queryable errors tied to users and releases. Error Tracking makes debugging systematic instead of ad hoc.
- Error Tracking → Logs / LLM Observability: Now they want to see what happened server-side or inside AI workflows. Logs provide backend context. LLM Observability traces AI-specific issues (hallucinations, prompt regressions, latency spikes).
- Logs / LLM Observability → Surveys: After stabilizing debugging, they want a simple way to detect frustration and measure whether reliability improvements are being felt by users. Surveys close the feedback loop.

This expansion happens naturally because each step removes a layer of uncertainty.

### Alternate expansion paths

**Starting from Session Replay as a replacement for another session recording tool.** They adopt Session Replay to replace Hotjar, FullStory, or LogRocket. Expand by introducing autocapture (Product Analytics), Error Tracking for structured bug data, and Group Analytics for account-level views.

## Business impact of solving the problem

**Engineering time savings.** If bug reproduction drops from 2 hours to 30-60 minutes, teams get fewer context switches, fewer escalations, and more roadmap velocity. Even modest improvements here can easily justify the cost of the entire PostHog contract.

**Escalation reduction.** When support can view replay, check errors, and inspect logs, they resolve more issues without pulling in engineering. That means the roadmap doesn't stall and customer response times improve.

**Revenue protection.** When enterprise customers report issues, speed and clarity matter. Being able to say "here's exactly what happened and here's the fix" builds trust. Slow, unclear debugging erodes it.

**AI risk mitigation.** For AI-powered products, LLM Observability catches the things that would otherwise go unnoticed: hallucinations that are hard to trace, prompt regressions, and latency spikes. Without it, product credibility degrades quietly.

## Personas to target

| Persona | Role Examples | What They Care About | How They Evaluate |
| --- | --- | --- | --- |
| Support Leader | Head of Support, Support Ops | Faster resolution, fewer escalations | MTTR, escalation rate |
| Engineering Lead | EM, Staff Eng | Reproducible bugs, fewer interruptions | Debugging time, context switches |
| Product Manager | PM, Product Lead | Understanding friction, user-reported issues | Drop-off rates, issue frequency |
| AI Lead | Head of AI, Applied AI Eng | Model reliability, output quality | Output quality, latency, trace coverage |
| CS Leader | VP CS, Head of CS | Customer trust, proactive issue resolution | NPS trends tied to product issues |

## Signals in Vitally & PostHog

### Vitally indicators this use case is relevant

| Signal | Where to Find It | What It Means |
| --- | --- | --- |
| Users with a support title | User list in Vitally | They're already bringing support folks into PostHog. CX workflow is emerging organically. |
| High session replay spend / volume | Product spend breakdown, usage metrics | They're investing heavily in replay. This use case helps them get more value from that spend by connecting replay to errors, logs, and surveys. |
| High support ticket volume | `vitally.custom.supportTickets` | They're dealing with a lot of customer issues. PostHog can help them debug faster. |
| Multiple user roles in PostHog (eng + support + product) | User list, admin emails | Cross-functional usage signals that CX workflows are already forming. |

### PostHog usage signals

| Signal | How to Check | What It Means |
| --- | --- | --- |
| Session Replay filtered by error events | Replay usage patterns | They're connecting replay to debugging. The CX workflow is clicking. |
| Person profile lookups increasing | Product Analytics usage | Support or CS is investigating individual users. Group Analytics could formalize this. |
| Error Tracking adoption alongside replay | Product spend data | They're building the debugging stack. Logs and surveys are natural next steps. |
| Console log / network tab usage in replays | Replay engagement metrics | They're using replay for technical debugging, not just UX review. Strong CX signal. |

### Health score implications

- **Event volume:** Should stay relatively similar (this use case doesn't fundamentally change event instrumentation)
- **User engagement:** More users spending more time in PostHog (support, CS, and product teams joining engineering)
- **Product count:** Should drive adoption of Error Tracking, Group Analytics, Logs, Surveys, and more

## Command of the Message

### Discovery questions

- How do you currently investigate a reported issue? Walk me through the workflow.
- How long does it take to reproduce a bug reported by a customer?
- How many tools do you open to debug one ticket?
- Can support see backend errors or do they escalate everything to engineering?
- Can you trace an AI output back to its prompt and context?
- When someone leaves a low NPS score, can you see what went wrong in their session?
- How do you confirm that a fix actually worked for the users who were affected?

### Negative consequences (of not solving this)

- Engineering time wasted on reproduction instead of shipping
- Constant escalations and interruptions from support to engineering
- Enterprise deals slowed or lost due to reliability concerns and slow issue resolution
- AI features degrading silently with no visibility into output quality
- Customer frustration that shows up only at churn, not when it's actionable

### Desired state

- Support shares one link (replay + errors + logs) and engineering has full context in seconds
- Engineers see replay + errors + logs without switching tools or asking "can you try that again?"
- AI output is traceable end to end: prompt, context, output, user reaction
- Fixes are validated against real user behavior, not just "it works on my machine"
- Frustration signals (low NPS, rage clicks) are visible immediately and tied to specific sessions
- Debugging becomes fast, predictable, and systematized

### Positive outcomes

- 30-70% reduction in debugging time (reproduction to resolution)
- Fewer escalations from support to engineering
- More roadmap velocity (engineering spends time building, not debugging)
- Higher customer trust through faster, more transparent issue resolution
- Clear signal when users are frustrated, tied to exactly what went wrong

### Success metrics

**Customer-facing:**

- CSAT/NPS improvement tied to faster issue resolution
- Mean time to resolution (MTTR) decrease
- Reduction in support-to-engineering escalation rate

**TAM-facing:**

- More active users in PostHog (support, CS, product teams joining engineering)
- Multi-product adoption growth (Session Replay + Error Tracking + Logs + Surveys)
- Session Replay usage increasing as debugging workflows mature

## Competitive positioning

### Our positioning

- **Unified visibility stack.** Behavior, replay, errors, logs, AI observability, and surveys tied to the same user. Click from an NPS score to a session replay to an error to a log line. No other platform connects all of these.
- **Developer-first tooling.** Built for teams that want control, not black-box dashboards. HogQL, API access, and transparent data model.
- **Consolidation play.** Replace multiple tools (Hotjar + Sentry + separate logging + survey tool) and cut integration overhead. One SDK, one data model, one platform.

**Where we are strongest:** We win when teams want behavioral and technical context in one place, engineering and product collaborate closely, AI is part of the product, and speed and simplicity matter more than enterprise ceremony.

**Where we are weaker:** We're not the right fit when deep distributed tracing or advanced APM is required, enterprise ITSM workflows (ServiceNow, Jira Service Management) dominate the support stack, or security policies prohibit session replay. In those cases, we complement rather than replace.

### Competitor quick reference

| Competitor | What They Do | Our Advantage | Their Advantage |
| --- | --- | --- | --- |
| FullStory | Session replay + digital experience analytics | Error tracking, logs, AI observability, experiments all in one platform; developer-first; better pricing | More mature DXP features; enterprise CX tooling; dedicated support workflow integrations |
| LogRocket | Session replay + error tracking + performance monitoring | Broader product suite (analytics, flags, experiments, surveys); AI observability; consolidation story | Purpose-built for debugging workflows; tighter Jira/Zendesk integrations out of the box |
| Hotjar | Session replay + heatmaps + surveys | Full analytics platform; error tracking; feature flags; engineering-grade tooling | Simpler UX for non-technical users; lower barrier to entry for marketing/UX teams |
| Sentry | Error tracking + performance monitoring + session replay | Deeper product analytics; session replay tied to behavior data; AI observability; surveys | More mature error tracking; broader language/framework support; larger install base |
| Datadog | Full observability: APM, logs, metrics, errors, RUM | Product analytics integration; session replay depth; significantly cheaper | Complete observability stack (APM, traces, metrics); enterprise-grade; massive ecosystem |

**Honest assessment:** Our strongest position is against teams already using PostHog for analytics or feature flags who are paying separately for a replay/debugging tool. The consolidation pitch is concrete and saves money. We're weaker against teams with deeply embedded ITSM workflows (ServiceNow, PagerDuty integrations) or teams that need enterprise-grade distributed tracing. Our sweet spot is product-led companies where engineering, product, and support are closely aligned and want one platform for the full debugging loop.

### Pain points & known limitations

| Pain Point | Impact | Workaround / Solution |
| --- | --- | --- |
| No native ticketing system integration | Support teams using Zendesk/Intercom can't auto-link replays to tickets | Share replay URLs manually in tickets. Data Pipelines can push events to external tools. Webhook integrations available for some platforms. |
| Logging is beta | Teams expecting production-grade centralized logging may find gaps | Set expectations on maturity. For teams with existing logging (ELK, Papertrail), PostHog logging complements rather than replaces initially. |
| Session replay privacy controls require configuration | Sensitive data in replays may block adoption for regulated industries | PostHog has extensive [privacy controls](https://posthog.com/docs/session-replay/privacy) including masking, blocking, and network payload filtering. Requires upfront configuration. |
| No APM or distributed tracing | Can't replace backend performance monitoring for complex microservice architectures | Be honest about the roadmap. Position PostHog as the user-facing debugging layer. Backend APM stays in their existing tool (Datadog, New Relic) for now. |
| Mobile replay limitations | Mobile session replay is newer and less mature than web | Check [mobile replay docs](https://posthog.com/docs/session-replay) for current platform support. Set expectations on feature parity with web replay. |

**Exceptions / edge cases:**

- **Healthcare/regulated with strict PHI requirements:** Session replay may require significant masking configuration or may not be feasible. Recommend focusing on Error Tracking + Logs + Analytics without replay, or ensure their compliance team reviews PostHog's [privacy controls](https://posthog.com/docs/session-replay/privacy) and HIPAA BAA (available with Boost package).
- **Large enterprise with ServiceNow-centric workflows:** If their entire support operation routes through ServiceNow with complex escalation rules, PostHog is a complement (providing the debugging context), not a replacement for their ITSM platform.

## Getting a customer started

### What does an evaluation look like?

- **Scope:** Enable Session Replay on their primary application. Connect Error Tracking. Set up Person Profiles so support can look up individual users.
- **Timeline:** 1-2 days to start capturing replays and errors. 1 week to have enough data for support to start using it in real ticket workflows.
- **Success criteria:** Can support find a user's session when a bug is reported? Can they see errors tied to that session? Can they share a replay link with engineering that includes full context? Can they do this without escalating?
- **PostHog investment:** Session Replay free tier covers 5K recordings/month. Error Tracking free tier covers 100K exceptions/month. Product Analytics free tier covers 1M events/month.
- **Key requirement:** They need the PostHog SDK integrated with user identification so replays and errors are tied to specific users. If they're already using PostHog, this may just require enabling replay and error tracking.

### Onboarding checklist

- [ ] Enable [Session Replay](https://posthog.com/docs/session-replay) with user identification configured
- [ ] Enable [Error Tracking](https://posthog.com/docs/error-tracking) in the SDK configuration
- [ ] Set up [Person Profiles](https://posthog.com/docs/data/persons) so support can search for individual users
- [ ] Configure [privacy controls](https://posthog.com/docs/session-replay/privacy) for any sensitive fields (forms, PII)
- [ ] Walk support through finding a user's session and errors (training session)
- [ ] Build a "Customer Health" dashboard: error trends by account, replay volume, NPS scores
- [ ] Set up alerts for error spikes or new error types
- [ ] If applicable, enable Logging (beta) for backend context alongside replays
- [ ] If applicable, connect [Surveys](https://posthog.com/docs/surveys) (NPS/CSAT) and tie responses to session data

### Objection handling

| Objection | Response |
| --- | --- |
| "We already have a session replay tool (Hotjar/FullStory/LogRocket)" | PostHog connects replay to errors, logs, analytics, and surveys in one platform. With separate tools, your support team still has to switch between 3-4 tabs to debug one issue. Consolidating also saves on vendor costs. |
| "Our support team isn't technical enough for PostHog" | The replay viewer is visual and intuitive. Support doesn't need to write queries. They search for a user, watch the session, and share the link. We can do a training session to get them comfortable. |
| "We need this integrated with Zendesk/Intercom" | You can paste replay links directly into tickets today. For automated workflows, Data Pipelines can push events to external tools via webhooks. |
| "Session replay has privacy concerns" | PostHog has extensive privacy controls: input masking, DOM element blocking, network payload filtering, and more. We can configure these during onboarding. HIPAA BAA is available with the Boost package. |
| "We're not sure this justifies adding another tool" | If you're already on PostHog for analytics or flags, this isn't another tool. It's enabling more of the platform you already pay for. If you're not on PostHog yet, the free tiers let you evaluate without financial risk. |

## Cross-sell pathways from this use case

| If Using... | They Might Need... | Why | Conversation Starter |
| --- | --- | --- | --- |
| Session Replay only | Error Tracking | They're watching replays to find bugs. Structured error data makes this systematic instead of manual. | "You're watching sessions to find bugs. What if errors were automatically captured and grouped so you could see which ones affect the most users?" |
| Session Replay + Error Tracking | Logging | They have frontend context but need backend visibility when debugging server-side issues. | "You can see the user's session and the error. But what was happening on the server at the same time?" |
| Session Replay + Error Tracking | Product Intelligence (for the product team) | Support and engineering are in PostHog for debugging. The product team would benefit from the same analytics for feature development. | "Your support team is using PostHog to debug issues. Has your product team seen what they can do with funnels and retention in the same platform?" |
| Replay + Errors + Analytics | Surveys (NPS/CSAT) | They're debugging reactively. Surveys let them detect frustration proactively and tie it to specific sessions. | "You're great at debugging reported issues. But how do you find the frustrated users who never file a ticket?" |
| Replay + Errors (debugging AI features) | LLM Observability | Traditional debugging misses AI-specific issues: prompt quality, hallucinations, latency. | "You're catching errors in your AI features. But are you seeing when the model gives a bad answer that isn't technically an error?" |
| Replay + Errors (engineering in PostHog) | Release Engineering (Feature Flags) | Engineering is in PostHog for debugging. Feature flags for safe releases is a natural add. | "You're tracking bugs after releases. What if you could gate features behind flags and roll back without a deploy?" |
| Group Analytics + Person Profiles | Data Infrastructure (Data Warehouse) | They want to combine PostHog user/account data with CRM or billing data for a complete customer view. | "You're looking at users in PostHog. What if you could see their Stripe revenue and HubSpot status alongside their product behavior?" |

## Internal resources

- **Session Replay docs:** [Session Replay](https://posthog.com/docs/session-replay)
- **Error Tracking docs:** [Error Tracking](https://posthog.com/docs/error-tracking)
- **Product Analytics docs:** [Product Analytics](https://posthog.com/docs/product-analytics)
- **Person Profiles docs:** [Persons](https://posthog.com/docs/data/persons)
- **Group Analytics docs:** [Group Analytics](https://posthog.com/docs/product-analytics/group-analytics)
- **Surveys docs:** [Surveys](https://posthog.com/docs/surveys)
- **LLM Observability docs:** [AI Engineering](https://posthog.com/docs/ai-engineering)
- **Privacy controls:** [Session Replay Privacy](https://posthog.com/docs/session-replay/privacy)
- **PostHog AI docs:** [Enable PostHog AI](https://posthog.com/docs/posthog-ai/allow-access) · [Example prompts](https://posthog.com/docs/posthog-ai/example-prompts)
- **Competitive battlecard:** *To be added: FullStory / LogRocket / Hotjar competitive positioning*

## Appendix: Company archetype considerations

| Archetype + Stage | Framing | Key Products | Buyer |
| --- | --- | --- | --- |
| AI Native — Early | "Your AI features will break in ways that aren't exceptions. PostHog lets support see the user's session, engineering sees the error, and you can trace the LLM call that caused it. All in one place, free tier included." | Session Replay, Error Tracking, LLM Observability | CTO, founding engineer |
| AI Native — Scaled | "Support escalates AI issues to engineering because they can't see what the model did. PostHog gives support replay + LLM traces so they can triage without pulling engineers off the roadmap." Bridge to AI/LLM Observability and Product Intelligence. | Session Replay, Error Tracking, LLM Observability, Logging, Surveys | VP Eng, Head of Support, AI Lead |
| Cloud Native — Early | "Stop asking users to send screenshots. Session Replay shows you exactly what happened. Error Tracking catches it automatically. Support and engineering share the same context." | Session Replay, Error Tracking, Person Profiles | CTO, Head of Support, founding engineer |
| Cloud Native — Scaled | "Your support team escalates everything because they can't see errors or logs. PostHog gives them replay + errors + backend logs so they can resolve more issues without pulling in engineering." Consolidation pitch: replace FullStory/LogRocket + Sentry with one platform. | Session Replay, Error Tracking, Logging, Group Analytics, Surveys | VP Eng, Head of Support, VP CS |
| Cloud Native — Enterprise | "Multiple teams, multiple products, and debugging context spread across 5 tools. PostHog gives support, engineering, and product a shared view: replay, errors, logs, and satisfaction data tied to the same user and account. Fewer escalations, faster resolution, better customer trust." | Full CX stack + Enterprise package (RBAC, SSO, dedicated support) | VP Eng, VP CS, Director of Support, CTO |
