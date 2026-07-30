---
title: 'Customer Experience'
showTitle: true
hideAnchor: false
---


## What is the job to be done?

"When a customer tells us something is broken, we see the whole story in one place, fix it, and ship the fix, without bouncing between multiple tools or wasting engineering time trying to reproduce it."

- Give support one inbox for every customer conversation, with the sender's session, events, and errors already attached
- Build a repeatable debugging workflow where support, product, and engineering share the same context
- Give support teams the ability to see what actually happened, not just what the user reported
- Connect technical debugging (errors, logs) to user behavior (replay, analytics) and satisfaction signals (NPS, CSAT)
- Trace AI-powered workflows end to end when things go wrong
- Turn recurring tickets into shipped fixes instead of a growing backlog

Most companies don't have a customer experience system. They have tickets in one place, errors in another, logs somewhere else, analytics owned by product, and engineers manually trying to reproduce bugs. The goal of this use case is to collapse that into one workflow, where the conversation, the evidence, and the fix live in the same platform.

[Support](/docs/support) is what makes this a system rather than a collection of tools. It's our customer support product — a chat widget, a shared inbox, and email, Slack, and GitHub channels — and because PostHog already captured what happened in the product, each ticket arrives with the sender's session replay, recent events, and exceptions attached.

**Support is the anchor, not a prerequisite.** Plenty of good-fit accounts have a helpdesk they aren't replacing this quarter, and the use case still works: they keep tickets in Zendesk or Intercom, and PostHog becomes the context and debugging layer their agents open alongside it. Their helpdesk is also already a [self-driving signal source](/docs/self-driving/inbox/sources), so recurring tickets can become PRs without moving the inbox at all. Lead with Support where the helpdesk is in play, and lead with Session Replay where it isn't.

## What PostHog products are relevant?

- **[Support](/docs/support) (core)** — One inbox for every customer conversation, whether it arrives from the in-app widget, email, Slack, or GitHub issues. Each ticket carries the sender's session replay, recent events, exceptions, and previous tickets. Statuses, priorities, assignment, tags, private notes, and saved views. The core — widget, inbox, all channels, [workflow automation](/docs/support/workflows), and imports — is free with no per-seat charge.
- **[Session Replay](/docs/session-replay)** — See exactly what the user did, not what they think they did. Capture console logs and network calls alongside the visual recording. Widget tickets attach the customer's session automatically, so replay is one click from the conversation.
- **[Error Tracking](/docs/error-tracking)** — Capture frontend and backend exceptions tied to users and releases. Exceptions from the customer's session surface directly on the ticket, and you can see whether other users hit the same issue.
- **[Product Analytics](/docs/product-analytics)** — Understand what a user was trying to do before something broke. Identify patterns in drop-offs, error frequency, and issue clustering across users or accounts. Support emits `$conversation_ticket_created` and related events, so ticket volume is queryable next to product behavior.
- **[Group Analytics](/docs/product-analytics/group-analytics) + [Person Profiles](/docs/data/persons)** — Give support and CS a clean, holistic view of a user or account. Tickets link by distinct ID, so a ticket, a person, and an organization are the same object across products.
- **[Workflows](/docs/support/workflows)** — Rules the customer controls, with no autonomous AI involved: set SLAs by channel or priority, auto-assign by customer email domain, auto-tag, reopen on customer reply, escalate. This is how a growing support team keeps the inbox sane.
- **[Logs](/docs/logs)** — Inspect structured backend logs connected to the same user session. When replay and error tracking show what happened on the frontend, logs show what happened on the server, and a log line [links straight back to the replay](/docs/logs/link-session-replay) it came from.
- **[AI Observability](/docs/ai-observability)** — See prompts, outputs, latency, and token usage for AI-powered workflows. When an AI feature misbehaves, trace it back to the specific generation.
- **[Surveys](/docs/surveys)** — Capture frustration signals (NPS, CSAT) and tie them directly to broken flows. When someone leaves a low score, you can click through to their session and see what went wrong.
- **[Experiments](/docs/experiments)** — Validate that fixes actually improved the experience. After resolving a class of issues, measure whether user satisfaction and completion rates improved.
- **[Replay Vision](/docs/replay-vision)** *closed beta* — The support-scale version of session replay. Instead of a human watching recordings one at a time, a scanner reads all of them and tags what happened: task completed, abandoned, blocked by an error. For a support team, that turns "we think a few customers hit this" into a number. Findings land as queryable events. [Waitlist](/replay-vision).
- **[self-driving](/docs/self-driving)** — Support conversations, error tracking, session replay, and logs are all [signal sources](/docs/self-driving/inbox/sources), and external helpdesks (Zendesk, Front, Intercom-likes, Gorgias, Plain) can feed the same inbox. A recurring ticket theme becomes an investigated report with a pull request, so the fix happens instead of the ticket being closed with a workaround.

## Adoption path and expansion path

### Entry point

Usually **Support** or **Session Replay**. Common entry scenarios:

1. **"We pay per seat for a helpdesk and our agents still can't see anything":** They have a helpdesk but no product context, so every technical ticket becomes an engineering escalation. Support is the direct answer, and the consolidation math is easy.
2. **"We can't reproduce bugs":** Support needs to see what happened instead of relying on screenshots and user descriptions. Session Replay is the direct answer, whether or not tickets move.
3. **"We don't have a support tool yet":** Early-stage teams running support out of a shared Gmail inbox or a Slack channel. Support's widget plus the email and Slack channels replaces the mess, for free.
4. **"Something is breaking but we don't know why":** Product notices drop-offs or support volume spikes and needs visibility into what's causing them. Product Analytics surfaces the pattern, Session Replay provides the detail.

### Primary expansion path

**Support → + Session Replay → + Error Tracking → + Logs / AI Observability → + Surveys → + self-driving**

**The logic of each step:**

- Support → Session Replay: The ticket tells them what the customer *said*. Replay shows what actually happened. This is the highest-value connection in the use case, and it's the reason Support is worth switching to.
- Session Replay → Error Tracking: Seeing something break visually isn't enough. They want structured, queryable errors tied to users and releases, surfaced on the ticket. Error Tracking makes debugging systematic instead of ad hoc.
- Error Tracking → Logs / AI Observability: Now they want to see what happened server-side or inside AI workflows. Logs provide backend context. AI Observability traces AI-specific issues (hallucinations, prompt regressions, latency spikes).
- Logs / AI Observability → Surveys: After stabilizing debugging, they want to detect frustration from users who never file a ticket, and measure whether reliability improvements are being felt. Surveys close the feedback loop.
- Surveys → self-driving: They're resolving tickets fast but seeing the same issues recur. Recurring conversations become investigated reports with pull requests, so the fix ships instead of the ticket being closed with a workaround.

This expansion happens naturally because each step removes a layer of uncertainty, then removes a layer of work.

### Alternate expansion paths

**The helpdesk stays where it is (the complement motion).** They aren't replacing Zendesk, Intercom, or Front this year. Sell the context layer instead: Session Replay, Error Tracking, Group Analytics, and Person Profiles, with agents pasting replay links into their existing tickets, plus their helpdesk wired up as a [self-driving signal source](/docs/self-driving/inbox/sources). Land it, prove the resolution-time win, and revisit Support when their helpdesk contract comes up. Note that the [Zendesk import](/docs/support/imports/zendesk) is a one-time historical backfill in open beta, not live two-way sync — don't promise a hybrid steady state for the Support inbox itself.

**Starting from Session Replay as a replacement for another session recording tool.** They adopt Session Replay to replace Hotjar, FullStory, or LogRocket. Expand by introducing autocapture (Product Analytics), Error Tracking for structured bug data, Group Analytics for account-level views, and then Support once support is already living in PostHog day to day.

**Starting from GitHub issues.** Dev-tool and infra companies where "support" is really an issue tracker. The [GitHub channel](/docs/support/github) turns issues into tickets with two-way comment sync, which gets Support adopted without changing anything for their users.

## Business impact of solving the problem

**Engineering time savings.** If bug reproduction drops from 2 hours to 30-60 minutes, teams get fewer context switches, fewer escalations, and more roadmap velocity. Even modest improvements here can justify the cost of the PostHog contract.

**Escalation reduction.** When support can view replay, check errors, and inspect logs from inside the ticket, they resolve more issues without pulling in engineering. That means the roadmap doesn't stall and customer response times improve.

**Helpdesk cost consolidation.** Per-seat helpdesk pricing is one of the easier line items to attack. Support's core is free with no per-seat charge, so a growing support team stops paying more every time it hires. Combined with replacing a separate replay tool and a separate error tracker, this is often the clearest hard-dollar case in any use case we sell.

**Fixes actually ship.** The usual failure mode isn't slow triage, it's the same ticket coming back because nobody prioritized the underlying bug. Recurring conversations become investigated reports with PRs, which converts support volume into product improvement.

**Revenue protection.** When enterprise customers report issues, speed and clarity matter. Being able to say "here's exactly what happened and here's the fix" builds trust. Slow, unclear debugging erodes it.

**AI risk mitigation.** For AI-powered products, AI Observability catches the things that would otherwise go unnoticed: hallucinations that are hard to trace, prompt regressions, and latency spikes. Without it, product credibility degrades quietly.

## Personas to target

| Persona | Role Examples | What They Care About | How They Evaluate |
| --- | --- | --- | --- |
| Support Leader | Head of Support, Support Ops | Faster resolution, fewer escalations, agent tooling and seat costs | MTTR, first-response time, escalation rate, cost per seat |
| Engineering Lead | EM, Staff Eng | Reproducible bugs, fewer interruptions | Debugging time, context switches |
| Product Manager | PM, Product Lead | Understanding friction, user-reported issues | Drop-off rates, issue frequency |
| AI Lead | Head of AI, Applied AI Eng | Model reliability, output quality | Output quality, latency, trace coverage |
| CS Leader | VP CS, Head of CS | Customer trust, proactive issue resolution | NPS trends tied to product issues |
| Founder / CTO (early stage) | Founder, CTO | Handling support without hiring for it, one platform | Time spent on support, tool count, cost |

## Signals in Vitally & PostHog

### Vitally indicators this use case is relevant

| Signal | Where to Find It | What It Means |
| --- | --- | --- |
| Users with a support title | User list in Vitally | They're already bringing support folks into PostHog. CX workflow is emerging organically. |
| High session replay spend / volume | Product spend breakdown, usage metrics | They're investing heavily in replay. This use case helps them get more value from that spend by connecting replay to errors, logs, and surveys. |
| High support ticket volume | `vitally.custom.supportTickets` | They're dealing with a lot of customer issues. PostHog can help them debug faster, and the volume makes self-driving relevant. |
| Known helpdesk in their stack (Zendesk, Intercom, Front) | Account notes, tech stack fields, discovery notes | Direct Support opportunity. Find out when the contract renews and what they pay per seat. |
| Multiple user roles in PostHog (eng + support + product) | User list, admin emails | Cross-functional usage signals that CX workflows are already forming. |

### PostHog usage signals

| Signal | How to Check | What It Means |
| --- | --- | --- |
| Support tickets being created | `$conversation_ticket_created` volume | They've adopted Support. Check whether replay and error tracking are enabled — that's where the value actually lands. |
| Support enabled but no replay attached to tickets | Support usage vs replay config | They're using Support as a plain inbox and getting a fraction of the value. Highest-leverage conversation in this use case. |
| Widget loaded but few tickets | `$conversations_widget_loaded` vs `$conversation_ticket_created` | The widget is installed but hard to find, or identification isn't configured. Worth a config review. |
| Session Replay filtered by error events | Replay usage patterns | They're connecting replay to debugging. The CX workflow is clicking. |
| Person profile lookups increasing | Product Analytics usage | Support or CS is investigating individual users. Group Analytics could formalize this. |
| Error Tracking adoption alongside replay | Product spend data | They're building the debugging stack. Support, logs, and surveys are natural next steps. |
| Console log / network tab usage in replays | Replay engagement metrics | They're using replay for technical debugging, not just UX review. Strong CX signal. |

### Health score implications

- **Event volume:** Should stay relatively similar (this use case doesn't fundamentally change event instrumentation)
- **User engagement:** More users spending more time in PostHog (support, CS, and product teams joining engineering). Support is a daily-active surface for agents, which makes it one of the stickiest things we can land.
- **Product count:** Should drive adoption of Support, Error Tracking, Group Analytics, Logs, Surveys, and more

## Command of the Message

### Discovery questions

- Where do customer conversations land today, and what does that tool cost you per seat?
- How do you currently investigate a reported issue? Walk me through the workflow.
- When a ticket comes in, what does your agent already know about that customer, and what do they have to go ask for?
- How long does it take to reproduce a bug reported by a customer?
- How many tools do you open to debug one ticket?
- Can support see backend errors or do they escalate everything to engineering?
- What percentage of your tickets are the same handful of issues coming back?
- Can you trace an AI output back to its prompt and context?
- When someone leaves a low NPS score, can you see what went wrong in their session?
- How do you confirm that a fix actually worked for the users who were affected?

### Negative consequences (of not solving this)

- Paying per seat for a helpdesk that can't tell agents anything about what the customer was doing
- Engineering time wasted on reproduction instead of shipping
- Constant escalations and interruptions from support to engineering
- The same bugs generating tickets month after month because nobody closed the loop back to code
- Enterprise deals slowed or lost due to reliability concerns and slow issue resolution
- AI features degrading silently with no visibility into output quality
- Customer frustration that shows up only at churn, not when it's actionable

### Desired state

- Every conversation lands in one inbox, with the customer's replay, events, and errors already attached
- Support shares one link (replay + errors + logs) and engineering has full context in seconds
- Engineers see replay + errors + logs without switching tools or asking "can you try that again?"
- Support resolves technical tickets without escalating, because the evidence is already in the ticket
- SLAs, routing, and tagging are handled by rules the team controls, not by manual triage
- AI output is traceable end to end: prompt, context, output, user reaction
- Recurring issues turn into reviewed pull requests instead of a backlog nobody grooms
- Fixes are validated against real user behavior, not just "it works on my machine"
- Frustration signals (low NPS, rage clicks) are visible immediately and tied to specific sessions
- Debugging becomes fast, predictable, and systematized

### Positive outcomes

- 30-70% reduction in debugging time (reproduction to resolution)
- Fewer escalations from support to engineering
- Helpdesk seat costs removed from the stack
- More roadmap velocity (engineering spends time building, not debugging)
- Recurring issues actually get fixed, so ticket volume trends down
- Higher customer trust through faster, more transparent issue resolution
- Clear signal when users are frustrated, tied to exactly what went wrong

### Success metrics

**Customer-facing:**

- CSAT/NPS improvement tied to faster issue resolution
- Mean time to resolution (MTTR) and first-response time decrease
- Reduction in support-to-engineering escalation rate
- Reduction in repeat tickets for the same root cause
- Helpdesk seat spend eliminated

**TAM-facing:**

- More active users in PostHog (support, CS, product teams joining engineering)
- Multi-product adoption growth (Support + Session Replay + Error Tracking + Logs + Surveys)
- Ticket volume in Support growing, with replay and error context attached
- Session Replay usage increasing as debugging workflows mature

## Competitive positioning

### Our positioning

- **The conversation and the evidence in one place.** Every other helpdesk is a text box with a CRM attached. Support ships with the customer's session replay, events, and exceptions on the ticket, because the same platform captured them. No integration to configure, no sampling gaps, no "can you send a screenshot?"
- **Unified visibility stack.** Tickets, behavior, replay, errors, logs, AI observability, and surveys tied to the same user. Click from an NPS score to a session replay to an error to a log line to the conversation. No other platform connects all of these.
- **The loop closes in code.** Recurring conversations become investigated reports with pull requests the team reviews and merges. Helpdesks generate tickets; we generate fixes.
- **Developer-first tooling.** Built for teams that want control, not black-box dashboards. HogQL, API access, a [JS API](/docs/support/javascript-api) for building a fully custom widget, and a transparent data model.
- **Consolidation play, with real dollars.** Replace a helpdesk + Hotjar + Sentry + separate logging + survey tool. Support's core is free with no per-seat charge, so the savings grow as their support team grows.

**Where we are strongest:** We win when teams want the conversation and the technical context in one place, when engineering and product work closely with support, when their helpdesk is priced per seat and their team is growing, when AI is part of the product, and when speed and simplicity matter more than enterprise ceremony.

**Where we are weaker:** We're not the right fit when they need a mature enterprise CX suite (advanced routing, omnichannel voice, a knowledge base and self-serve help center, CSAT surveying built into the ticket flow), when mature distributed tracing, profiling, or infrastructure monitoring is required, when enterprise ITSM workflows (ServiceNow, Jira Service Management) dominate the support stack, or when security policies prohibit session replay. In those cases, sell the complement motion: keep their helpdesk, add PostHog as the context layer.

### Competitor quick reference

| Competitor | What They Do | Our Advantage | Their Advantage |
| --- | --- | --- | --- |
| Zendesk | Enterprise helpdesk: ticketing, routing, help center, CSAT, voice | Session replay, errors, logs, and analytics on every ticket; free core with no per-seat pricing; recurring tickets become PRs | Mature enterprise CX suite; help center and knowledge base; advanced routing and omnichannel; huge integration ecosystem |
| Intercom | Chat-first support with AI agent (Fin) and product tours | Full product context on tickets; developer-first; no per-seat or per-resolution pricing on the core | Mature AI resolution agent; polished messenger and campaign tooling; established help center |
| Front | Shared inbox for email-heavy support teams | Product context, replay, errors, and analytics in the same platform; free core | Excellent email collaboration UX; deep email workflow features |
| FullStory | Session replay + digital experience analytics | Error tracking, logs, AI observability, experiments all in one platform; developer-first; better pricing | More mature DXP features; enterprise CX tooling; dedicated support workflow integrations |
| LogRocket | Session replay + error tracking + performance monitoring | Broader product suite (analytics, flags, experiments, surveys); AI observability; consolidation story | Purpose-built for debugging workflows; tighter Jira/Zendesk integrations out of the box |
| Hotjar | Session replay + heatmaps + surveys | Full analytics platform; error tracking; feature flags; engineering-grade tooling; we ship [heatmaps](/docs/toolbar/heatmaps) too | Simpler UX for non-technical users; lower barrier to entry for marketing/UX teams |
| Sentry | Error tracking + performance monitoring + session replay | Deeper product analytics; session replay tied to behavior data; AI observability; surveys | More mature error tracking; broader language/framework support; larger install base |
| Datadog | Full observability: APM, logs, metrics, errors, RUM | Product analytics integration; session replay depth; significantly cheaper | Complete observability stack (APM, traces, metrics); enterprise-grade; massive ecosystem |

**Where PostHog stands:** Our strongest position is against product-led companies already using PostHog for analytics or feature flags who are paying separately for a helpdesk *and* a replay/debugging tool. Consolidating removes two line items, and Support's free core removes the usual "another line item" objection. We're weaker against teams who bought Zendesk or Intercom for the parts we don't have yet — help center, advanced omnichannel routing, a mature AI resolution agent — and against teams with deeply embedded ITSM workflows (ServiceNow, PagerDuty integrations) or teams that need enterprise-grade distributed tracing. Our sweet spot is companies where engineering, product, and support are closely aligned and want one platform for the full loop from conversation to fix.

## Pain points & known limitations

| Pain Point | Impact | Workaround / Solution |
| --- | --- | --- |
| No help center or knowledge base | Teams relying on self-serve deflection can't move that part of their stack | Support handles the conversation, not the docs site. They keep their existing help center, or host docs themselves. Be clear this isn't on the near-term plan. |
| No live two-way sync with Zendesk/Intercom | Can't run a hybrid steady state with tickets in both tools | The [Zendesk import](/docs/support/imports/zendesk) is a one-time historical backfill and is in open beta. Position the move as a switchover, not coexistence. For accounts that won't switch, sell the context layer and wire their helpdesk in as a [self-driving signal source](/docs/self-driving/inbox/sources). |
| AI reply agent isn't available yet | Teams comparing against Intercom's Fin won't find a like-for-like answer | It's coming and will be opt-in and separately billed, so nobody gets surprised on their bill. In the meantime, position [Workflows](/docs/support/workflows) (rules they control) plus self-driving (recurring issues become PRs) — a different answer to ticket volume. |
| Ticket routing is manual, plus Workflows | No advanced skills-based or omnichannel routing engine | Manual assignment to a user or role, with [Workflows](/docs/support/workflows) for rule-based auto-assignment (for example by customer email domain), tagging, SLAs, and escalation. Enough for most teams under a few dozen agents; not a Zendesk routing replacement. |
| SLAs are derived state, not a status | Teams expecting formal SLA policy management will find it lighter | SLAs are set via Workflows and reported as on track / at risk / breached. Set expectations, and check whether they need contractual SLA reporting or just want to avoid dropping tickets. |
| No CSAT built into the ticket flow | Can't auto-send a satisfaction survey on resolution | Use [Surveys](/docs/surveys) for CSAT/NPS and tie responses back to sessions. It isn't yet wired into ticket resolution, so it's a parallel motion rather than one flow. |
| Log retention is 14 days by default | Teams with compliance-driven long-tail retention needs will ask | [Logs](/docs/logs) is generally available and billed per GB, with a 30-day retention add-on. There's no multi-month archival tier — for that, batch export to their own storage. |
| Session replay privacy controls require configuration | Sensitive data in replays may block adoption for regulated industries | PostHog has extensive [privacy controls](/docs/session-replay/privacy) including masking, blocking, and network payload filtering. Requires upfront configuration. |
| Distributed tracing and metrics are alpha | Can't fully replace backend performance monitoring for complex microservice architectures | Be honest: [tracing](/docs/distributed-tracing) and [metrics](/docs/metrics) are alpha and free during alpha, with no service map and no profiling. Position PostHog as the user-facing debugging layer; heavy backend monitoring stays in their existing tool for now. See the [Observability playbook](/handbook/growth/use-case-selling/observability) for the full gap list. |
| Mobile replay limitations | Mobile session replay is newer and less mature than web | Check [mobile replay docs](/docs/session-replay) for current platform support. Set expectations on feature parity with web replay. |

**Exceptions / edge cases:**

- **Healthcare/regulated with strict PHI requirements:** Session replay may require significant masking configuration or may not be feasible. Recommend focusing on Support + Error Tracking + Logs + Analytics without replay, or ensure their compliance team reviews PostHog's [privacy controls](/docs/session-replay/privacy) and HIPAA BAA (available with Boost package).
- **Large enterprise with ServiceNow-centric workflows:** If their entire support operation routes through ServiceNow with complex escalation rules, PostHog is a complement (providing the debugging context), not a replacement for their ITSM platform.
- **High-volume consumer support with omnichannel requirements:** If they need voice, SMS, and a large agent pool with skills-based routing, Support isn't there yet. Sell the context layer and keep the door open.

## Getting a customer started

### What does an evaluation look like?

- **Scope:** Turn on the Support widget on their primary application and connect one more channel (usually email). Enable Session Replay and Error Tracking so tickets arrive with context. Set up Person Profiles so support can look up individual users. Optionally run the Zendesk import to bring history across.
- **Timeline:** Under a day to have the widget live and tickets flowing. 1-2 days to start capturing replays and errors. 1 week to have enough data for support to work real tickets end to end in PostHog.
- **Success criteria:** When a ticket arrives, can the agent see the customer's session, recent events, and errors without leaving the ticket? Can they resolve a technical issue without escalating? Can engineering pick up an escalated ticket with full context? Is first-response time at least as good as their old tool?
- **PostHog investment:** Support's core (widget, inbox, all channels, workflow automation, imports) is free with no per-seat charge. Session Replay free tier covers 5K recordings/month. Error Tracking free tier covers 100K exceptions/month. Product Analytics free tier covers 1M events/month.
- **Key requirement:** They need the PostHog SDK integrated with user identification so tickets, replays, and errors are tied to specific users. If they're already using PostHog, this may just require enabling Support, replay, and error tracking. For logged-in users, walk them through Support's [identity verification](/docs/support/widget) so tickets persist across devices.

### Onboarding checklist

- [ ] Enable the [Support widget](/docs/support/widget) on the primary app, with identity verification configured for logged-in users
- [ ] Connect at least one more [channel](/docs/support/concepts/channels): [email](/docs/support/email), [Slack](/docs/support/slack), or [GitHub](/docs/support/github)
- [ ] Enable [Session Replay](/docs/session-replay) with user identification so tickets attach the customer's session
- [ ] Enable [Error Tracking](/docs/error-tracking) in the SDK configuration so exceptions surface on tickets
- [ ] Set up [Person Profiles](/docs/data/persons) so support can search for individual users
- [ ] Configure [privacy controls](/docs/session-replay/privacy) for any sensitive fields (forms, PII)
- [ ] Set up [Workflows](/docs/support/workflows) for SLAs, auto-assignment, tagging, and reopen-on-reply
- [ ] Agree on ticket statuses, priorities, and saved views with the support team
- [ ] Run the [Zendesk import](/docs/support/imports/zendesk) if they're migrating history (org admin required)
- [ ] Walk support through opening a ticket and using replay, events, and exceptions (training session)
- [ ] Build a "Customer Health" dashboard: ticket volume by account, error trends, replay volume, NPS scores
- [ ] Set up alerts for error spikes or new error types
- [ ] Enable [Logs](/docs/logs/start-here) for backend context alongside replays, and show the log-line-to-replay link
- [ ] If applicable, connect [Surveys](/docs/surveys) (NPS/CSAT) and tie responses to session data
- [ ] Once tickets are flowing, enable Support as a [self-driving signal source](/docs/self-driving/inbox/sources) and review the first reports together

## Objection handling

| Objection | Response |
| --- | --- |
| "We already have Zendesk/Intercom" | Two questions: what do you pay per seat, and when a ticket comes in, what does your agent already know? With PostHog the ticket arrives with the customer's session replay, their recent events, and any errors they hit, because we captured all of it. The core is free with no per-seat charge. And if you're not ready to switch, keep your helpdesk — we can wire it in as a signal source and still turn your recurring tickets into fixes. |
| "Is your helpdesk actually mature enough?" | Be honest. It handles the widget, email, Slack, and GitHub channels, statuses, priorities, assignment, tags, private notes, saved views, and rule-based automation. It doesn't have a help center, omnichannel voice, or an AI reply agent yet. If those are must-haves, we're a complement today rather than a replacement, and we'd rather tell you that now. |
| "We already have a session replay tool (Hotjar/FullStory/LogRocket)" | PostHog connects replay to your actual customer conversations, plus errors, logs, analytics, and surveys in one platform. With separate tools, your support team still has to switch between 3-4 tabs to debug one issue. Consolidating also saves on vendor costs. |
| "Migrating our support tool is too risky" | You don't have to cut over on day one. Start with the widget on one app or one channel while your existing helpdesk keeps running, and see whether your agents resolve those tickets faster. We can import your Zendesk history when you're ready to switch. |
| "Our support team isn't technical enough for PostHog" | The inbox is a normal support inbox and the replay viewer is visual. Support doesn't need to write queries. They open the ticket, watch the session, and read the exceptions panel. We can do a training session to get them comfortable. |
| "What about AI answering tickets for us?" | An opt-in AI reply agent is coming, and only teams who turn it on get billed for it. But the more interesting thing we do today is the opposite direction: recurring issues get investigated and come back as a pull request you review and merge. Deflecting a ticket is good; making it never happen again is better. |
| "Session replay has privacy concerns" | PostHog has extensive privacy controls: input masking, DOM element blocking, network payload filtering, and more. We can configure these during onboarding. HIPAA BAA is available with the Boost package. |
| "We're not sure this justifies adding another tool" | This is the opposite of adding a tool. If you're already on PostHog for analytics or flags, Support is enabling more of the platform you pay for, and it can remove your helpdesk and replay tool from the stack. If you're not on PostHog yet, the free tiers let you evaluate without financial risk. |

## Cross-sell pathways from this use case

| If Using... | They Might Need... | Why | Conversation Starter |
| --- | --- | --- | --- |
| Session Replay + Error Tracking (support team in PostHog daily) | Support | They're already debugging in PostHog, but the conversation lives in a per-seat helpdesk that knows nothing about the product. | "Your team is already in PostHog to figure out what happened. What if the ticket itself lived here, with the replay and the errors already attached?" |
| Support (inbox only) | Session Replay + Error Tracking | They adopted the inbox but tickets arrive without context, which is most of the value. | "Right now your tickets are just text. Turn on replay and error tracking and every ticket shows you exactly what the customer hit." |
| Support with growing ticket volume | Workflows | Manual triage is starting to hurt: tickets sit unassigned, SLAs slip. | "How much time does your team spend deciding who picks up what? You can set rules for assignment, SLAs, and tagging and stop triaging by hand." |
| Session Replay only | Error Tracking | They're watching replays to find bugs. Structured error data makes this systematic instead of manual. | "You're watching sessions to find bugs. What if errors were automatically captured and grouped so you could see which ones affect the most users?" |
| Session Replay + Error Tracking | Logs | They have frontend context but need backend visibility when debugging server-side issues. | "You can see the user's session and the error. But what was happening on the server at the same time?" |
| Session Replay + Error Tracking | Product Intelligence (for the product team) | Support and engineering are in PostHog for debugging. The product team would benefit from the same analytics for feature development. | "Your support team is using PostHog to debug issues. Has your product team seen what they can do with funnels and retention in the same platform?" |
| Replay + Errors + Analytics | Surveys (NPS/CSAT) | They're debugging reactively. Surveys let them detect frustration proactively and tie it to specific sessions. | "You're great at debugging reported issues. But how do you find the frustrated users who never file a ticket?" |
| Replay + Errors (debugging AI features) | AI Observability | Traditional debugging misses AI-specific issues: prompt quality, hallucinations, latency. | "You're catching errors in your AI features. But are you seeing when the model gives a bad answer that isn't technically an error?" |
| High ticket volume, support watching replays by hand | Replay Vision *closed beta* | Support can only watch a sample; a scanner reads every session | "How many tickets say 'it didn't work' with no detail? A scanner can read those sessions and tell you what actually happened in each one." |
| Zendesk/Front/Jira alongside PostHog | self-driving | Their helpdesk is already a supported signal source; recurring tickets can become PRs | "Your recurring tickets are a to-do list nobody has time for. What if each one arrived investigated, with a fix attached?" |
| Support with the same issues recurring | self-driving | Tickets are resolved fast but the underlying bugs never make the roadmap | "How many of your tickets are the same handful of problems? Those can come back investigated, with a PR you review — so they stop coming back." |
| Replay + Errors (engineering in PostHog) | Release Engineering (Feature Flags) | Engineering is in PostHog for debugging. Feature flags for safe releases is a natural add. | "You're tracking bugs after releases. What if you could gate features behind flags and roll back without a deploy?" |
| Group Analytics + Person Profiles | Data Infrastructure (Data Warehouse) | They want to combine PostHog user/account data with CRM or billing data for a complete customer view. | "You're looking at users in PostHog. What if you could see their Stripe revenue and HubSpot status alongside their product behavior?" |

## Internal resources

- **Support docs:** [Support](/docs/support) · [Get started](/docs/support/start-here) · [Inbox](/docs/support/inbox) · [Widget](/docs/support/widget) · [Channels](/docs/support/concepts/channels) · [Workflows](/docs/support/workflows) · [Pricing](/docs/support/pricing)
- **Support migration:** [Imports](/docs/support/imports) · [Zendesk import](/docs/support/imports/zendesk)
- **Session Replay docs:** [Session Replay](/docs/session-replay)
- **Error Tracking docs:** [Error Tracking](/docs/error-tracking)
- **Product Analytics docs:** [Product Analytics](/docs/product-analytics)
- **Person Profiles docs:** [Persons](/docs/data/persons)
- **Group Analytics docs:** [Group Analytics](/docs/product-analytics/group-analytics)
- **Surveys docs:** [Surveys](/docs/surveys)
- **AI Observability docs:** [AI Observability](/docs/ai-observability)
- **Logs docs:** [Start here](/docs/logs/start-here) · [Link to session replay](/docs/logs/link-session-replay)
- **Replay Vision docs:** [Overview](/docs/replay-vision) · [Waitlist](/replay-vision)
- **self-driving:** [How to pitch self-driving](/handbook/growth/sales/how-to-pitch-self-driving) · [Signal sources](/docs/self-driving/inbox/sources)
- **Privacy controls:** [Session Replay Privacy](/docs/session-replay/privacy)
- **PostHog AI docs:** [Enable PostHog AI](/docs/posthog-ai/allow-access) · [Example prompts](/docs/posthog-ai/example-prompts)
- **How we do support ourselves:** [Support team](/teams/support) — we're migrating off Zendesk onto this product, so our own experience is the reference story
- **Competitive battlecard:** *To be added: Zendesk / Intercom / Front / FullStory / LogRocket / Hotjar competitive positioning*

## Appendix: Company archetype considerations

| Archetype + Stage | Framing | Key Products | Buyer |
| --- | --- | --- | --- |
| AI Native — Early | "Your AI features will break in ways that aren't exceptions. Drop in the Support widget and every ticket arrives with the session replay and the LLM trace that caused it. All in one place, free tier included." | Support, Session Replay, Error Tracking, AI Observability | CTO, founding engineer |
| AI Native — Scaled | "Support escalates AI issues to engineering because they can't see what the model did. PostHog puts the conversation, the replay, and the LLM trace on one screen, then turns the ones that keep recurring into PRs." Bridge to AI/LLM Observability and Product Intelligence. | Support, Session Replay, Error Tracking, AI Observability, Logs, Surveys | VP Eng, Head of Support, AI Lead |
| Cloud Native — Early | "Stop asking users to send screenshots and stop paying per seat for a helpdesk. Support gives you one inbox, and each ticket comes with the session and the error already attached." | Support, Session Replay, Error Tracking, Person Profiles | CTO, Head of Support, founding engineer |
| Cloud Native — Scaled | "You're paying per seat for Zendesk and your agents still escalate everything because the ticket tells them nothing. PostHog puts replay, errors, and backend logs on the ticket, automates triage with Workflows, and turns recurring issues into merged fixes." Consolidation pitch: replace helpdesk + FullStory/LogRocket + Sentry with one platform. | Support, Session Replay, Error Tracking, Logs, Workflows, Group Analytics, Surveys | VP Eng, Head of Support, VP CS |
| Cloud Native — Enterprise | "Multiple teams, multiple products, and context spread across 5 tools. PostHog gives support, engineering, and product a shared view: conversation, replay, errors, logs, and satisfaction data tied to the same user and account. Fewer escalations, faster resolution, better customer trust." Expect a complement motion here if a mature CX suite or ITSM platform is entrenched — lead with the context layer and revisit Support later. | Full CX stack + Enterprise package (RBAC, SSO, dedicated support) | VP Eng, VP CS, Director of Support, CTO |
| Dev tool / infra — any stage | "Your users report problems as GitHub issues. Connect the repo and those become tickets with two-way comment sync, so your team works one inbox without changing anything for your users." | Support (GitHub channel), Error Tracking, Session Replay | CTO, DevRel lead, Head of Support |
