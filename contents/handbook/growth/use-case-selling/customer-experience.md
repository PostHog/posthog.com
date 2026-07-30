---
title: 'Customer Experience'
showTitle: true
hideAnchor: false
---


## What is the job to be done?

"When a customer tells us something is broken, we see the whole story in one place, fix it, and ship the fix — without bouncing between tools, guessing at repro steps, or burning engineering time."

- Give support a single inbox for every customer conversation, with the customer's session, events, and errors already attached
- Give support teams the ability to see what actually happened, not just what the user reported
- Connect technical debugging (errors, logs) to user behavior (replay, analytics) and satisfaction signals (NPS, CSAT)
- Trace AI-powered workflows end to end when things go wrong
- Turn recurring tickets into shipped fixes instead of a growing backlog

Most companies don't have a customer experience system. They have tickets in one place, errors in another, logs somewhere else, analytics owned by product, and engineers manually trying to reproduce bugs. The goal of this use case is to help a company collapse that into one workflow: the conversation, the evidence, and the fix all live in the same platform.

[Support](/docs/support) is what makes this a system rather than a collection of tools. It's PostHog's customer support product — a chat widget, a shared inbox, and email, Slack, and GitHub channels — and because PostHog already knows what's happening in the product, every ticket arrives with the sender's session replay, recent events, and exceptions attached.

**Support is the anchor, not a prerequisite.** Plenty of good-fit accounts have a help desk they aren't going to replace this quarter. The use case still works: they keep tickets in Zendesk or Intercom, and PostHog becomes the context and debugging layer their agents open alongside it. Lead with Support where the help desk is in play, and lead with Session Replay where it isn't.

## What PostHog products are relevant?

- **[Support](/docs/support) (core)** — One inbox for every customer conversation, whether it arrives from the in-app widget, email, Slack, or GitHub issues. Each ticket carries the sender's session replay, recent events, exceptions, and previous tickets. Statuses, priorities, assignment, tags, private notes, and saved views. The core of Support — widget, inbox, all channels, and automation — is free with no per-seat charge.
- **[Session Replay](/docs/session-replay)** — See exactly what the user did, not what they think they did. Capture console logs and network calls alongside the visual recording. Widget tickets attach the customer's session automatically, so replay is one click from the conversation.
- **[Error Tracking](/docs/error-tracking)** — Capture frontend and backend exceptions tied to users and releases. Exceptions from the customer's session surface directly on the ticket, and you can see whether other users hit the same issue.
- **[Group Analytics](/docs/product-analytics/group-analytics) + [Person Profiles](/docs/data/persons)** — Give support and CS a clean, holistic view of a user or account. Tickets link by distinct ID, so a ticket, a person, and an organization are the same object across products.
- **[Product Analytics](/docs/product-analytics)** — Understand what a user was trying to do before something broke. Identify patterns in drop-offs, error frequency, and ticket clustering across users or accounts. Support emits `$conversation_ticket_created` and related events, so ticket volume is queryable next to product behavior.
- **[Workflows](/docs/workflows)** — Rules the customer controls (explicitly not autonomous AI): set SLAs by channel or priority, auto-assign by customer email domain, auto-tag, reopen on customer reply, escalate. This is how a growing support team keeps the inbox sane.
- **Logging** *beta* — Inspect structured backend logs connected to the same user session. When replay and error tracking show what happened on the frontend, logs show what happened on the server.
- **[LLM Observability](/docs/ai-engineering)** — See prompts, outputs, latency, and token usage for AI-powered workflows. When an AI feature misbehaves, trace it back to the specific generation.
- **[Surveys](/docs/surveys)** — Capture frustration signals (NPS, CSAT) and tie them directly to broken flows. When someone leaves a low score, you can click through to their session and see what went wrong.
- **[Self-driving](/docs/self-driving)** — Recurring issues in Support conversations become reports, and where there's a code fix, a pull request the customer reviews and merges. Nothing ships without a human. Billed per merged PR, not per ticket.
- **[Experiments](/docs/experiments)** — Validate that fixes actually improved the experience. After resolving a class of issues, measure whether user satisfaction and completion rates improved.

## Adoption path and expansion path

### Entry point

Usually **Support** or **Session Replay**. Common entry scenarios:

1. **"We're paying for Zendesk/Intercom and our agents still can't see anything":** They have a help desk but no product context, so every technical ticket becomes an engineering escalation. Support is the direct answer, and the consolidation math is easy.
2. **"We can't reproduce bugs":** Support needs to see what happened instead of relying on screenshots and user descriptions. Session Replay is the direct answer, whether or not tickets move.
3. **"We don't have a support tool yet":** Early-stage teams handling support in a shared Gmail inbox or a Slack channel. Support's widget plus the email and Slack channels replaces the mess, for free.
4. **"Something is breaking but we don't know why":** Product notices drop-offs or support volume spikes and needs visibility into what's causing them. Product Analytics surfaces the pattern, Session Replay provides the detail.

### Primary expansion path

**Support → + Session Replay → + Error Tracking → + Logs / LLM Observability → + Surveys → + Self-driving**

**The logic of each step:**

- Support → Session Replay: The ticket tells them what the customer *said*. Replay shows what actually happened. This is the single highest-value connection in the use case, and it's the reason Support is worth switching to.
- Session Replay → Error Tracking: Seeing something break visually isn't enough. They want structured, queryable errors tied to users and releases, surfaced on the ticket. Error Tracking makes debugging systematic instead of ad hoc.
- Error Tracking → Logs / LLM Observability: Now they want to see what happened server-side or inside AI workflows. Logs provide backend context. LLM Observability traces AI-specific issues (hallucinations, prompt regressions, latency spikes).
- Logs / LLM Observability → Surveys: After stabilizing debugging, they want to detect frustration from users who never file a ticket, and measure whether reliability improvements are being felt. Surveys close the feedback loop.
- Surveys → Self-driving: They're now resolving tickets fast but seeing the same issues recur. Self-driving groups those recurring conversations into reports and draft PRs, so the fix ships instead of sitting in a backlog.

This expansion happens naturally because each step removes a layer of uncertainty, then removes a layer of work.

### Alternate expansion paths

**Support stays elsewhere (the complement motion).** They aren't replacing Zendesk, Intercom, or Front this year. Sell the context layer instead: Session Replay, Error Tracking, Group Analytics, and Person Profiles, with agents pasting replay links into their existing tickets. Land it, prove the resolution-time win, and revisit Support at renewal when their help desk contract comes up. Note that PostHog's [Zendesk import](/docs/support/imports/zendesk) is a one-time historical backfill in open beta, not live two-way sync — don't promise a hybrid steady state.

**Starting from Session Replay as a replacement for another session recording tool.** They adopt Session Replay to replace Hotjar, FullStory, or LogRocket. Expand by introducing autocapture (Product Analytics), Error Tracking for structured bug data, Group Analytics for account-level views, and then Support once support is already living in PostHog day to day.

**Starting from GitHub issues.** Dev-tool and infra companies where "support" is really an issue tracker. The GitHub channel turns issues into tickets with two-way comment sync, which is a low-friction way to get Support adopted without changing how their users report problems.

## Business impact of solving the problem

**Engineering time savings.** If bug reproduction drops from 2 hours to 30-60 minutes, teams get fewer context switches, fewer escalations, and more roadmap velocity. Even modest improvements here can easily justify the cost of the entire PostHog contract.

**Escalation reduction.** When support can view replay, check errors, and inspect logs from inside the ticket, they resolve more issues without pulling in engineering. That means the roadmap doesn't stall and customer response times improve.

**Help desk cost consolidation.** Per-seat help desk pricing is one of the easier line items to attack. Support's core is free with no per-seat charge, so a growing support team stops paying more every time it hires. Combined with replacing a separate replay tool and a separate error tracker, this is often the clearest hard-dollar case in any use case we sell.

**Fixes actually ship.** The usual failure mode isn't slow triage, it's that the same ticket keeps coming back because nobody prioritized the underlying bug. Self-driving turns recurring conversations into reviewed PRs, which converts support volume into product improvement.

**Revenue protection.** When enterprise customers report issues, speed and clarity matter. Being able to say "here's exactly what happened and here's the fix" builds trust. Slow, unclear debugging erodes it.

**AI risk mitigation.** For AI-powered products, LLM Observability catches the things that would otherwise go unnoticed: hallucinations that are hard to trace, prompt regressions, and latency spikes. Without it, product credibility degrades quietly.

## Personas to target

| Persona | Role Examples | What They Care About | How They Evaluate |
| --- | --- | --- | --- |
| Support Leader | Head of Support, Support Ops | Faster resolution, fewer escalations, agent tooling and seat costs | MTTR, first-response time, escalation rate, cost per seat |
| Engineering Lead | EM, Staff Eng | Reproducible bugs, fewer interruptions | Debugging time, context switches |
| Product Manager | PM, Product Lead | Understanding friction, user-reported issues | Drop-off rates, issue frequency, recurring ticket themes |
| AI Lead | Head of AI, Applied AI Eng | Model reliability, output quality | Output quality, latency, trace coverage |
| CS Leader | VP CS, Head of CS | Customer trust, proactive issue resolution | NPS trends tied to product issues |
| Founder / CTO (early stage) | Founder, CTO | Handling support without hiring for it, one platform | Time spent on support, tool count, cost |

## Signals in Vitally & PostHog

### Vitally indicators this use case is relevant

| Signal | Where to Find It | What It Means |
| --- | --- | --- |
| Users with a support title | User list in Vitally | They're already bringing support folks into PostHog. CX workflow is emerging organically. |
| Known help desk in their stack (Zendesk, Intercom, Front) | Account notes, tech stack fields, discovery notes | Direct Support opportunity. Find out when the contract renews and what they pay per seat. |
| High session replay spend / volume | Product spend breakdown, usage metrics | They're investing heavily in replay. This use case helps them get more value from that spend by connecting replay to tickets, errors, logs, and surveys. |
| High support ticket volume | `vitally.custom.supportTickets` | They're dealing with a lot of customer issues. PostHog can help them debug faster, and the volume makes Self-driving relevant. |
| Multiple user roles in PostHog (eng + support + product) | User list, admin emails | Cross-functional usage signals that CX workflows are already forming. |

### PostHog usage signals

| Signal | How to Check | What It Means |
| --- | --- | --- |
| Support tickets being created | `$conversation_ticket_created` volume | They've adopted Support. Check whether replay and error tracking are enabled — that's where the value actually lands. |
| Support enabled but no replay attached to tickets | Support usage vs replay config | They're using Support as a plain inbox and getting a fraction of the value. Highest-leverage conversation in this use case. |
| Widget loaded but few tickets | `$conversations_widget_loaded` vs `$conversation_ticket_created` | Widget is installed but hard to find, or identification isn't configured. Worth a config review. |
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

- Paying per seat for a help desk that can't tell agents anything about what the customer was doing
- Engineering time wasted on reproduction instead of shipping
- Constant escalations and interruptions from support to engineering
- The same bugs generating tickets month after month because nobody closed the loop back to code
- Enterprise deals slowed or lost due to reliability concerns and slow issue resolution
- AI features degrading silently with no visibility into output quality
- Customer frustration that shows up only at churn, not when it's actionable

### Desired state

- Every conversation lands in one inbox, with the customer's replay, events, and errors already attached
- Engineers see replay + errors + logs without switching tools or asking "can you try that again?"
- Support resolves technical tickets without escalating, because the evidence is already in the ticket
- SLAs, routing, and tagging are handled by rules the team controls, not by manual triage
- AI output is traceable end to end: prompt, context, output, user reaction
- Recurring issues turn into reviewed pull requests instead of a backlog nobody grooms
- Fixes are validated against real user behavior, not just "it works on my machine"
- Frustration signals (low NPS, rage clicks) are visible immediately and tied to specific sessions

### Positive outcomes

- 30-70% reduction in debugging time (reproduction to resolution)
- Fewer escalations from support to engineering
- Help desk seat costs removed from the stack
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
- Help desk seat spend eliminated

**TAM-facing:**

- More active users in PostHog (support, CS, product teams joining engineering)
- Multi-product adoption growth (Support + Session Replay + Error Tracking + Logs + Surveys)
- Ticket volume in Support growing, with replay and error context attached
- Session Replay usage increasing as debugging workflows mature

## Competitive positioning

### Our positioning

- **The conversation and the evidence in one place.** Every other help desk is a text box with a CRM attached. Support ships with the customer's session replay, events, and exceptions on the ticket, because the same platform captured them. No integration to configure, no sampling gaps, no "can you send a screenshot?"
- **Unified visibility stack.** Tickets, behavior, replay, errors, logs, AI observability, and surveys tied to the same user. Click from an NPS score to a session replay to an error to a log line to the conversation. No other platform connects all of these.
- **The loop closes in code.** Support feeds Self-driving, which turns recurring conversations into pull requests the team reviews and merges. Help desks generate tickets; we generate fixes.
- **Developer-first tooling.** Built for teams that want control, not black-box dashboards. HogQL, API access, a JS API for building a fully custom widget, and a transparent data model.
- **Consolidation play, with real dollars.** Replace a help desk + Hotjar + Sentry + separate logging + survey tool. Support's core is free with no per-seat charge, so the savings grow as their support team grows.

**Where we are strongest:** We win when teams want the conversation and the technical context in one place, when engineering and product work closely with support, when their help desk is priced per seat and their team is growing, when AI is part of the product, and when speed and simplicity matter more than enterprise ceremony.

**Where we are weaker:** We're not the right fit when they need a mature enterprise CX suite (advanced routing, omnichannel voice, deep knowledge base and self-serve help center, CSAT surveying built into the ticket flow), when deep distributed tracing or advanced APM is required, when enterprise ITSM workflows (ServiceNow, Jira Service Management) dominate the support stack, or when security policies prohibit session replay. In those cases, sell the complement motion: keep their help desk, add PostHog as the context layer.

### Competitor quick reference

| Competitor | What They Do | Our Advantage | Their Advantage |
| --- | --- | --- | --- |
| Zendesk | Enterprise help desk: ticketing, routing, help center, CSAT, voice | Session replay, errors, logs, and analytics on every ticket; free core with no per-seat pricing; fixes ship via Self-driving | Mature enterprise CX suite; help center and knowledge base; advanced routing and omnichannel; huge integration ecosystem |
| Intercom | Chat-first support with AI agent (Fin) and product tours | Full product context on tickets; developer-first; no per-seat or per-resolution pricing on the core | Mature AI resolution agent; polished messenger and campaign tooling; established help center |
| Front | Shared inbox for email-heavy support teams | Product context, replay, errors, and analytics in the same platform; free core | Excellent email collaboration UX; deep email workflow features |
| FullStory | Session replay + digital experience analytics | Support inbox, error tracking, logs, AI observability, experiments all in one platform; developer-first; better pricing | More mature DXP features; enterprise CX tooling; dedicated support workflow integrations |
| LogRocket | Session replay + error tracking + performance monitoring | Broader product suite (support, analytics, flags, experiments, surveys); AI observability; consolidation story | Purpose-built for debugging workflows; tighter Jira/Zendesk integrations out of the box |
| Hotjar | Session replay + heatmaps + surveys | Full analytics platform; support inbox; error tracking; feature flags; engineering-grade tooling | Simpler UX for non-technical users; lower barrier to entry for marketing/UX teams |
| Sentry | Error tracking + performance monitoring + session replay | Deeper product analytics; support conversations tied to errors and behavior; AI observability; surveys | More mature error tracking; broader language/framework support; larger install base |
| Datadog | Full observability: APM, logs, metrics, errors, RUM | Product analytics integration; session replay depth; customer conversations in the same platform; significantly cheaper | Complete observability stack (APM, traces, metrics); enterprise-grade; massive ecosystem |

**Honest assessment:** Our strongest position is against product-led companies already using PostHog for analytics or flags who are paying separately for a help desk *and* a replay/debugging tool. The consolidation pitch is concrete and saves real money, and Support's free core removes the usual "another line item" objection. We're weaker against teams who bought Zendesk or Intercom for the parts we don't have yet — help center, advanced omnichannel routing, a mature AI resolution agent — and against teams with deeply embedded ITSM workflows (ServiceNow, PagerDuty integrations) or a need for enterprise-grade distributed tracing. Our sweet spot is companies where engineering, product, and support are closely aligned and want one platform for the full loop from conversation to fix.

### Pain points & known limitations

| Pain Point | Impact | Workaround / Solution |
| --- | --- | --- |
| No help center / knowledge base | Teams relying on self-serve deflection can't move that part of their stack | Support handles the conversation, not the docs site. They keep their existing help center, or host docs themselves. Be clear this isn't on the near-term plan. |
| No live two-way sync with Zendesk/Intercom | Can't run a hybrid steady state with tickets in both tools | The [Zendesk import](/docs/support/imports/zendesk) is a one-time historical backfill and is in open beta. Position the move as a switchover, not a coexistence. For accounts that won't switch, sell the context layer and let agents paste replay links into their existing tickets. |
| AI reply agent isn't available yet | Teams comparing against Intercom's Fin won't find a like-for-like answer | It's coming and will be opt-in and separately billed, so nobody gets surprised on their bill. In the meantime, position Workflows (rules they control) plus Self-driving (recurring issues become PRs) — a different and arguably better answer to ticket volume. |
| Ticket routing is manual, plus Workflows | No advanced skills-based or omnichannel routing engine | Manual assignment to a user or role, with [Workflows](/docs/support/workflows) for rule-based auto-assignment (for example by customer email domain), tagging, SLAs, and escalation. Enough for most teams under a few dozen agents; not a Zendesk routing replacement. |
| SLAs are derived state, not a status | Teams expecting formal SLA policy management will find it lighter | SLAs are set via Workflows and reported as on track / at risk / breached. Set expectations, and check whether they actually need contractual SLA reporting or just want to avoid dropping tickets. |
| No CSAT built into the ticket flow | Can't auto-send a satisfaction survey on resolution | Use [Surveys](/docs/surveys) for CSAT/NPS and tie responses back to sessions. It's not yet wired into ticket resolution, so it's a parallel motion rather than one flow. |
| Logging is beta | Teams expecting production-grade centralized logging may find gaps | Set expectations on maturity. For teams with existing logging (ELK, Papertrail), PostHog logging complements rather than replaces initially. |
| Session replay privacy controls require configuration | Sensitive data in replays may block adoption for regulated industries | PostHog has extensive [privacy controls](/docs/session-replay/privacy) including masking, blocking, and network payload filtering. Requires upfront configuration. |
| Distributed tracing is alpha; no full APM | Can't fully replace backend performance monitoring for complex microservice architectures | Be honest about the roadmap. Distributed tracing is in alpha (usable today, still maturing). Position PostHog as the user-facing debugging layer. Heavy backend APM stays in their existing tool (Datadog, New Relic) for now. |
| Mobile replay limitations | Mobile session replay is newer and less mature than web | Check [mobile replay docs](/docs/session-replay) for current platform support. Set expectations on feature parity with web replay. |

**Exceptions / edge cases:**

- **Healthcare/regulated with strict PHI requirements:** Session replay may require significant masking configuration or may not be feasible. Recommend focusing on Support + Error Tracking + Logs + Analytics without replay, or ensure their compliance team reviews PostHog's [privacy controls](/docs/session-replay/privacy) and HIPAA BAA (available with Boost package).
- **Large enterprise with ServiceNow-centric workflows:** If their entire support operation routes through ServiceNow with complex escalation rules, PostHog is a complement (providing the debugging context), not a replacement for their ITSM platform.
- **High-volume consumer support with omnichannel requirements:** If they need voice, SMS, and a large agent pool with skills-based routing, Support isn't there yet. Sell the context layer and keep the door open.

## Getting a customer started

### What does an evaluation look like?

- **Scope:** Turn on the Support widget on their primary application and connect one more channel (usually email). Enable Session Replay and Error Tracking so tickets arrive with context. Set up Person Profiles so support can look up individual users. Optionally run the Zendesk import to bring history across.
- **Timeline:** Under a day to have the widget live and tickets flowing. 1-2 days to start capturing replays and errors. 1 week to have enough data for support to work real tickets end to end in PostHog.
- **Success criteria:** When a ticket arrives, can the agent see the customer's session, recent events, and errors without leaving the ticket? Can they resolve a technical issue without escalating? Can engineering pick up an escalated ticket and have full context immediately? Is first-response time at least as good as their old tool?
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
- [ ] If applicable, enable Logging (beta) for backend context alongside tickets and replays
- [ ] If applicable, connect [Surveys](/docs/surveys) (NPS/CSAT) and tie responses to session data
- [ ] Once tickets are flowing, review [Self-driving](/docs/self-driving) reports for recurring issues

### Objection handling

| Objection | Response |
| --- | --- |
| "We already have Zendesk/Intercom" | Two questions: what do you pay per seat, and when a ticket comes in, what does your agent already know? With PostHog the ticket arrives with the customer's session replay, their recent events, and any errors they hit — because we captured all of it. The core is free with no per-seat charge. And if you're not ready to switch, keep your help desk and use PostHog as the context layer your agents open next to it. |
| "Is your help desk actually mature enough?" | Be honest. It handles the widget, email, Slack, and GitHub channels, statuses, priorities, assignment, tags, private notes, saved views, and rule-based automation. It doesn't have a help center, omnichannel voice, or an AI reply agent yet. If those are must-haves, we're a complement today rather than a replacement — and we'd rather tell you that now. |
| "We already have a session replay tool (Hotjar/FullStory/LogRocket)" | PostHog connects replay to your actual customer conversations, plus errors, logs, analytics, and surveys in one platform. With separate tools your support team still switches between 3-4 tabs to debug one issue. Consolidating also saves on vendor costs. |
| "Migrating our support tool is too risky" | You don't have to cut over on day one. Start with the widget on one app or one channel while your existing help desk keeps running, and see whether your agents resolve those tickets faster. We can import Zendesk history when you're ready to switch. |
| "Our support team isn't technical enough for PostHog" | The inbox is a normal support inbox and the replay viewer is visual. Support doesn't need to write queries — they open the ticket, watch the session, and read the exceptions panel. We can do a training session to get them comfortable. |
| "What about AI answering tickets for us?" | An opt-in AI reply agent is coming, and only teams who turn it on get billed for it. But the more interesting thing we do today is the opposite direction: Self-driving spots the issues that keep coming back and opens a pull request to fix them, which you review and merge. Deflecting a ticket is good; making it never happen again is better. |
| "Session replay has privacy concerns" | PostHog has extensive privacy controls: input masking, DOM element blocking, network payload filtering, and more. We can configure these during onboarding. HIPAA BAA is available with the Boost package. |
| "We're not sure this justifies adding another tool" | This is the opposite of adding a tool. If you're already on PostHog for analytics or flags, Support is enabling more of the platform you pay for, and it can remove your help desk and replay tool from the stack. If you're not on PostHog yet, the free tiers let you evaluate without financial risk. |

## Cross-sell pathways from this use case

| If Using... | They Might Need... | Why | Conversation Starter |
| --- | --- | --- | --- |
| Session Replay + Error Tracking (support team in PostHog daily) | Support | They're already debugging in PostHog but the conversation lives in a per-seat help desk that knows nothing about the product. | "Your team is already in PostHog to figure out what happened. What if the ticket itself lived here, with the replay and the errors already attached?" |
| Support (inbox only) | Session Replay + Error Tracking | They adopted the inbox but tickets are arriving without context, which is most of the value. | "Right now your tickets are just text. Turn on replay and error tracking and every ticket shows you exactly what the customer hit." |
| Support + Session Replay | Logging | They have frontend context but need backend visibility when debugging server-side issues. | "You can see the user's session and the error. But what was happening on the server at the same time?" |
| Support (growing ticket volume) | Workflows | Manual triage is starting to hurt: tickets sit unassigned, SLAs slip. | "How much time does your team spend deciding who picks up what? You can set rules for assignment, SLAs, and tagging and stop triaging by hand." |
| Support (recurring tickets) | Self-driving | The same issues keep coming back, and the underlying bugs never make the roadmap. | "How many of your tickets are the same handful of problems? Self-driving groups them and opens a PR you review — so they stop coming back." |
| Support + Session Replay + Error Tracking | Product Intelligence (for the product team) | Support and engineering are in PostHog for debugging. The product team would benefit from the same analytics for feature development. | "Your support team is using PostHog to debug issues. Has your product team seen what they can do with funnels and retention in the same platform?" |
| Support + Replay + Errors + Analytics | Surveys (NPS/CSAT) | They're handling reported issues well. Surveys find the frustrated users who never file a ticket. | "You're great at resolving tickets. But how do you find the frustrated users who never open one?" |
| Support + Replay (debugging AI features) | LLM Observability | Traditional debugging misses AI-specific issues: prompt quality, hallucinations, latency. | "You're catching errors in your AI features. But are you seeing when the model gives a bad answer that isn't technically an error?" |
| Replay + Errors (engineering in PostHog) | Release Engineering (Feature Flags) | Engineering is in PostHog for debugging. Feature flags for safe releases is a natural add. | "You're tracking bugs after releases. What if you could gate features behind flags and roll back without a deploy?" |
| Group Analytics + Person Profiles | Data Infrastructure (Data Warehouse) | They want to combine PostHog user/account data with CRM or billing data for a complete customer view. | "You're looking at users in PostHog. What if you could see their Stripe revenue and HubSpot status alongside their product behavior?" |

## Internal resources

- **Support docs:** [Support](/docs/support) · [Get started](/docs/support/start-here) · [Inbox](/docs/support/inbox) · [Widget](/docs/support/widget) · [Channels](/docs/support/concepts/channels) · [Workflows](/docs/support/workflows) · [Pricing](/docs/support/pricing)
- **Support migration:** [Imports](/docs/support/imports) · [Zendesk import](/docs/support/imports/zendesk)
- **Self-driving docs:** [Self-driving](/docs/self-driving)
- **Session Replay docs:** [Session Replay](/docs/session-replay)
- **Error Tracking docs:** [Error Tracking](/docs/error-tracking)
- **Product Analytics docs:** [Product Analytics](/docs/product-analytics)
- **Person Profiles docs:** [Persons](/docs/data/persons)
- **Group Analytics docs:** [Group Analytics](/docs/product-analytics/group-analytics)
- **Surveys docs:** [Surveys](/docs/surveys)
- **LLM Observability docs:** [AI Engineering](/docs/ai-engineering)
- **Privacy controls:** [Session Replay Privacy](/docs/session-replay/privacy)
- **PostHog AI docs:** [Enable PostHog AI](/docs/posthog-ai/allow-access) · [Example prompts](/docs/posthog-ai/example-prompts)
- **How we do support ourselves:** [Support team](/teams/support) — we're migrating off Zendesk onto this product, so use our own experience as the reference story
- **Competitive battlecard:** *To be added: Zendesk / Intercom / Front competitive positioning*

## Appendix: Company archetype considerations

| Archetype + Stage | Framing | Key Products | Buyer |
| --- | --- | --- | --- |
| AI Native — Early | "You don't have a support tool yet and you shouldn't buy one. Drop in the Support widget, and every ticket arrives with the session replay and the LLM trace that caused it. Free, and it's the same platform you're already using." | Support, Session Replay, Error Tracking, LLM Observability | CTO, founding engineer |
| AI Native — Scaled | "Support escalates AI issues to engineering because they can't see what the model did. PostHog puts the conversation, the replay, and the LLM trace on the same screen, then turns the ones that keep recurring into PRs." Bridge to AI/LLM Observability and Product Intelligence. | Support, Session Replay, Error Tracking, LLM Observability, Logging, Self-driving | VP Eng, Head of Support, AI Lead |
| Cloud Native — Early | "Stop asking users to send screenshots and stop paying per seat for a help desk. Support gives you one inbox, and each ticket comes with the session and the error already attached." | Support, Session Replay, Error Tracking, Person Profiles | CTO, Head of Support, founding engineer |
| Cloud Native — Scaled | "You're paying per seat for Zendesk and your agents still escalate everything because the ticket tells them nothing. PostHog puts replay, errors, and backend logs on the ticket, automates triage with Workflows, and turns recurring issues into merged fixes." Consolidation pitch: replace help desk + FullStory/LogRocket + Sentry with one platform. | Support, Session Replay, Error Tracking, Logging, Workflows, Group Analytics, Surveys, Self-driving | VP Eng, Head of Support, VP CS |
| Cloud Native — Enterprise | "Multiple teams, multiple products, and context spread across five tools. PostHog gives support, engineering, and product a shared view: conversation, replay, errors, logs, and satisfaction data tied to the same user and account. Fewer escalations, faster resolution, better customer trust." Expect a complement motion here if a mature CX suite or ITSM platform is entrenched — lead with the context layer and revisit Support later. | Full CX stack + Enterprise package (RBAC, SSO, dedicated support) | VP Eng, VP CS, Director of Support, CTO |
| Dev tool / infra (any stage) | "Your users report problems as GitHub issues. Connect the repo and those become tickets with two-way comment sync, so your team works one inbox without changing anything for your users." | Support (GitHub channel), Error Tracking, Session Replay, Self-driving | CTO, DevRel lead, Head of Support |
