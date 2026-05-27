---
title: Workflows
sidebar: Handbook
showTitle: true
---

> **Owner:** Sara Miteva

## Elevator pitch

PostHog Workflows is an automation builder that turns any product event, schedule, or cohort change into a multi-step flow – send emails, fire Slack alerts, push webhooks, update feature flags, capture new events – all on the same data your analytics, replay, and experiments already use. Triggers and the builder are free; messages start at $0.005 per send after 10K free per channel each month.

Zapier and Make have triggers but no product context. Customer.io and Braze have lifecycle email but need a CDP in the middle. PostHog Workflows reads the product data, acts on it, and feeds the agents that act on it – for example, [our customer Grantable replaced Zapier](https://posthog.com/customers/grantable) outright and cut workflow setup time by ~90%.

## The unique belief

PostHog's vision is a [self-driving product](https://posthog.com/blog/self-driving-product): software that watches itself for bugs and conversion drops, then ships the fix while you sleep. The signal layer is well-covered with errors, replays, logs, analytics. What closes the loop is what happens next. Knowing a checkout error hit your top customer doesn't matter if no one is paged. The systems that act on signals almost always live somewhere else, behind a CDP or homegrown glue.

Workflows is the act layer. Every event, cohort change, error spike, or ticket update can trigger a multi-step flow, including sending a message and updating a person property, without leaving the platform the signal came from. PostHog AI drafts email copy today; soon, agents will design and revise workflows through MCP.

Zapier and Make have triggers but can't see product data. Customer.io and Braze send messages but need a CDP to know what users did. PostHog Workflows lives inside the signal itself, so the action follows automatically.

## Who this is for

- **Teams already on PostHog paying separately for Zapier or Make.** They're paying for triggers they could get for free, and stitching identity by hand to do it.
- **Engineer-led teams building product-led growth motions.** They want to act on product events – onboarding milestones, activation drop-offs, feature usage – without a CDP in the middle.
- **B2B teams running intent-signal automation.** Triggering sales follow-ups, Slack alerts, or Linear tickets directly from product behavior, not delayed by CRM syncs. ([Croissant does this.](/customers/croissant))
- **Startups consolidating their messaging stack.** Workflows replaces Zapier + Customer.io + a CDP.
- **Customers on Customer.io, Iterable, Brevo, or ActiveCampaign for transactional and onboarding email.** Especially when most of the trigger logic already lives in product events. ([Suped migrated off Customer.io.](/customers/suped)
- **AI-native teams building agent loops.** PostHog AI already drafts email copy from a prompt; multi-turn, agent-authored workflows ship through MCP.

### Who this isn't for

- **Teams that need deep email infrastructure** (deliverability dashboards, sent/open/click/bounce tracking, suppression lists at scale) – Iterable, Braze, and Customer.io are more mature here. We might get there somewhere down the line.
- **Marketing teams running complex cross-channel campaigns with mature audience-segmentation tooling** – the bundle is automation-first, not marketing-platform-first. (For example, Workflows doesn't have predictive segments. At some point we might get there but right now we still aren't the best tool for this use case.)
- **Teams who only want a messaging tool and don't care about the rest of PostHog** – the bundle is the whole point.

## Messaging

### Message 1: Your data and your automated workflows live in the same place

**Problem:** Most teams keep product data in one tool and run automation in another. To connect them they sync data through a CDP or stitch identities by hand across Stripe, HubSpot, and Slack. The sync breaks, the schema drifts, and the workflow fires on stale data.

**Solution:** Workflows runs inside PostHog, on the same event stream your analytics, replay, and experiments already use. Every event, every cohort, every person property is immediately available as a trigger or an audience, without having to sync multiple tools. The data and the automation share the same identity by default.

**Supporting features:**
- Triggers run on the same events that drive your analytics
- Trigger on feature flag exposure, experiment variants, or any other product event
- Update person state inside the workflow – no reverse data engineering needed
- 35+ destinations (Slack, Linear, Jira, GitHub, Discord, more) for fan-out
- API and MCP access for programmatic workflow management

### Message 2: React to product behavior the moment it happens

**Problem:** Sales finds out a customer churned a week later. Support hears about an error after a ticket comes in. Engineering learns a feature flag broke during the post-mortem. The signal is in the data the whole time, and the response is late because the data has to travel through three tools first.

**Solution:** Workflows reacts in real time. A 404 fires a Slack alert. An error spike opens a Linear ticket. A user upgrading triggers a HubSpot update. The action happens the same second the event hits PostHog.

**Supporting features:**
- Real-time triggers on any product event – clicks, conversions, errors, feature flag exposures
- Direct dispatch to Slack, Linear, Jira, HubSpot, Discord, and 35+ destinations
- Schedule triggers for time-based playbooks; batch triggers for cohort sweeps
- Branch on conditions, wait for events, or chain workflows together via captured events

### Message 3: Cut three vendors down to one platform

**Problem:** Most teams pay for several layers to move product events into the tools their team actually works in. An automation builder (Zapier, Make) to handle triggers. A lifecycle messaging tool (Customer.io, Brevo, ActiveCampaign) to send the actual emails. A CDP (Segment, Rudderstack) or hand-rolled webhooks to keep identities consistent across all of them. Three bills, six contracts, and every new destination is another integration to build.

**Solution:** Workflows replaces all three. Trigger from any PostHog event and fan out to 35+ destinations natively: Slack alerts, Linear tickets, HubSpot updates, Discord pings, custom webhooks. ([Grantable replaced Zapier](https://posthog.com/customers/grantable) outright and cut workflow setup time by ~90%. [Suped](https://posthog.com/customers/suped) consolidated transactional email off Customer.io.)

**Supporting features:**
- One platform for triggers, conditions, dispatches, and audience updates
- 35+ destinations natively: Slack, Linear, Jira, GitHub, Discord, HubSpot, Google Ads, more
- Webhook step for anything not covered natively
- Predictable per-send pricing; no per-user, per-MTU, or per-task billing

## Battle cards

### vs Zapier (and Make)

**Their approach:** General-purpose automation builders. Zapier connects thousands of SaaS tools via pre-built integrations and per-task pricing. Make uses a visual scenario builder with more powerful branching, iteration, and data transformation primitives than Zapier. Both are built to connect tools that don't natively talk, meaning events go *into* them, events come *out* the other side.

**Where PostHog wins:**
- The customer is already sending product events to PostHog and Workflows triggers on them directly, no separate integration needed.
- Per-send pricing is more predictable than per-task as workflow volume scales.
- Bundled with analytics, flags, and experiments means no leaving PostHog to debug a workflow.
- Identity stays consistent across the stack; workflows don't break when a user property changes.
- Grantable replaced Zapier outright and cut workflow setup time by ~90%. Croissant: *"Workflows is better for us than Zapier. It's simpler, and lets us move faster without adding another vendor to manage."*

### vs Customer.io

**Their approach:** Lifecycle messaging platform with mature email deliverability, drag-and-drop editor, Liquid templating. **Hybrid pricing: per-profile + per-email-send.** Essentials starts at $100/mo for 5,000 profiles + 1M emails; overage is $0.009/profile + $0.12/1K emails. Recently repositioned as AI-native with an AI Agent, MCP server, AI segment builder, and AI translator. Channels include email, SMS, push, in-app, WhatsApp, LINE, webhooks.

**Where PostHog wins:**
- Workflows triggers on the same events that already drive PostHog analytics – no double-instrumentation, no identity drift across two systems.
- Per-send pricing (no per-profile fee) – cheaper for low-frequency, large-audience campaigns.
- Bundled with analytics, session replay, and feature flags – no four-tool stack to maintain.
- [Suped](https://posthog.com/customers/suped) consolidated transactional email off Customer.io after running both in parallel.
- The customer is already paying for PostHog and sending the same events to both.

### vs Brevo (and ActiveCampaign, Mailchimp)

**Their approach:** Mid-market email marketing platforms with full multi-channel reach, including email, SMS, WhatsApp, push, live chat. Per-month pricing based on email send volume (Starter from 5K emails, Professional from 150K). AI features under the Aura AI brand. Strong fit for SMB and mid-market marketing teams running email-first campaigns. Customer base includes Mont Blanc, Michelin, eBay.

**Where PostHog wins:**
- Workflows trigger on product events, not just lists or segments, meaning the customer doesn't have to engineer their own event pipeline.
- Bundled with analytics, flags, and experiments means workflows can act on product behavior the email tool wouldn't see.
- Per-send pricing instead of per-month-volume tiers – simpler to model at scale.
- Targets product-led teams whose buyer is an engineer, not a marketer.

### vs Iterable / Braze

**Their approach:** Enterprise customer engagement platforms with comprehensive multi-channel reach (email, mobile, web, SMS/RCS, WhatsApp; Braze adds LINE and KakaoTalk), real-time decisioning AI suites, mature segmentation tooling, and analyst recognition (Gartner Magic Quadrant Leader). No public pricing (enterprise contracts only). Customer base: Wyndham, HelloFresh, Canva, Washington Post, Square.

**Where PostHog wins:**
- Product-led mid-market teams who don't need a full enterprise customer engagement suite.
- Engineers who want product events as the trigger source rather than CRM events or campaign builders.
- Customer wants a working workflow this week, not after a Q3 implementation.
- Bundled with the analytics, flags, and experiments product-led teams already use.
- Per-send pricing, published openly, not quote-locked.

## Objections

### "Customer.io / Brevo has more mature email features – open/click/bounce tracking, suppression lists, dedicated IPs. You don't."

**Follow-up:** Are you running serious lifecycle marketing or product-triggered messaging? What email volume are you sending monthly?

**Answer:** True today – PostHog Workflows handles transactional and product-triggered emails well, but it isn't a full lifecycle marketing platform. Most teams using Workflows are sending behavior-triggered sequences (onboarding, activation, error alerts) where the value is in the trigger logic, not the email infrastructure. If the customer is running hundreds of thousands of monthly marketing sends with dedicated IPs and per-campaign deliverability dashboards, Customer.io or Brevo is the right tool today and we should say so. If it's product-triggered or transactional, Workflows works.

**Proof point:** [Suped](https://posthog.com/customers/suped) consolidated transactional email off Customer.io after running both in parallel.

### "You don't have native mobile push or WhatsApp. Iterable and Braze do."

**Follow-up:** Do you need them shipping in the next quarter, or are they on your 12-month plan?

**Answer:** Honest: push, SMS templates, and WhatsApp templates are still rolling out – email is the production channel today, with SMS via Twilio and webhook for everything else. If the customer needs full native push and WhatsApp shipped now, an enterprise customer engagement platform is the right pick. If they can route push through a webhook to their existing push service while we build native support, Workflows handles everything else with PostHog product data attached. The roadmap is committed and tracked publicly in our Q2 objectives.

### "We already use Zapier – why switch?"

**Follow-up:** How many of your Zaps are actually triggered by product behavior versus tool-to-tool plumbing? And what are you paying in monthly task volume?

**Answer:** Zapier customers usually have two patterns. Tool-to-tool plumbing (Stripe → Slack, Calendly → HubSpot) – fine to leave in Zapier. Product-behavior-triggered automations (onboarding flows, error alerts, upgrade nudges) – that's where Workflows wins, because the events are already in PostHog. Migration doesn't have to be all-or-nothing; many teams run both in parallel before consolidating. Per-send pricing is also typically cheaper than per-task once volume scales.

**Proof point:** Grantable replaced Zapier outright and cut workflow setup time by ~90%. Croissant framed it the same way: *"Workflows is better for us than Zapier. It's simpler, and lets us move faster without adding another vendor to manage."*

### "Workflows is too new – how do I know it's stable?"

**Follow-up:** Is the concern reliable execution, feature completeness, or vendor lock-in?

**Answer:** Reliable execution is solid – Workflows runs on the same engine that powers PostHog's CDP destinations and data pipelines. GA'd in December 2025 after a public alpha and beta with hundreds of teams. Feature completeness is honestly still growing (batch triggers are in beta, push/WhatsApp templates are rolling out) and we publish the roadmap. Vendor lock-in isn't a concern: PostHog is open source, OpenTelemetry-compatible, and workflows can be managed via REST API and OAuth scopes for portability.

**Proof point:** Grantable's onboarding email flow ran 179 times in 7 sessions without issues. PostHog runs part of its flows on Workflows and is planning full migration.
