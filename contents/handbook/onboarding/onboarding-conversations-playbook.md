---
title: Onboarding conversations playbook
sidebar: Handbook
showTitle: true
---
Our customers are busy, self-serve by default, and allergic to anything that feels like a time sink. We deliver the most value when we can talk directly, so it’s worth being intentional and trying creative ways to earn that conversation.

That said, we’ve repeatedly seen customers implement our recommendations even when they never reply. That’s why we don’t gate value behind a meeting - we provide it regardless.

Check out the [Getting people to talk to you](https://posthog.com/handbook/growth/sales/getting-people-to-talk-to-you) page in the Sales Handbook and our learnings below. As you experiment, add more and share what worked!

## Our guiding principles

- **Stay human**. Be yourself, stay casual, open, and friendly. Aim for “talking to a friend,” not a script.
- **Be genuinely helpful**. Reduce complexity. Offer simple next steps that save the customer time and effort.
- **Be prescriptive**. Don’t just explain options - recommend the best path for this customer, and say why. You’re the expert. [Here’s a good example](https://posthog.com/tutorials/validating-what-you-ship). 
- **Be generous**. If a refund or credit is clearly the right call, make it happen. Use your good judgment.

## Outreach

**Your first message is your best chance to earn attention**. It should feel like practical help from a real person - not a pitch. Lead with a specific observation, a clear benefit, and an easy next step.

### Captivating subject lines

Avoid generic subjects (“Checking in”, “Following up”). Instead, experiment with short, specific lines and anchor them to a specific outcome.

Use the following product signals:

- **Billing / pricing signal** - e.g. first bill coming up, increased number of billing page visits
  - “Your first PostHog bill is coming up - quick way to save $”
  - “PostHog bill coming up - quick way to reduce it”
  - “Noticed a spike in costs - 2 ways to bring it down”
  - “Cost check: a small tweak that can reduce event volume”

- **Docs signal** - increased visits to the docs pages
  - “Noticed docs activity - need help with [topic]?”

- **Event spike / instrumentation signal** 
  - “Too many events? Let’s fix it.”
  - “I think you’re tracking more than you need”
  - “Event spike yesterday - need help figuring it out?”

- **General value offer (audit / review)**
  - “Quick data audit from the Onboarding team”
  - “Tracking review: 3 improvements I’d make”
  - “Want me to sanity-check your {events / funnels / flags}?”
  - “Data audit: 3 tracking gaps I’d fix first”
  - “I recorded a 2-min walkthrough for your setup”
  - “A recommended dashboard for [their use case]”
  - “Worth a look before your next release”
  ​​- “Are you trying to do [goal]? (I can help)”

### Content

**Keep it short**. Don’t overwhelm the reader. It’s tempting to include every tip and best practice, but concise emails get read and replied to. Share the headline observation and the next step; save the deep dive for the call (or a follow-up).

**Set expectations early**. If you want consistent engagement throughout onboarding, be explicit about what the program includes and why it’s worth their time. When customers know what to expect and how to use our time, they’re more likely to participate. Setting clear boundaries also helps - what you can help with, and for how long we’re around. 

**Use prior context to be proactive**. Before you hit send, take a minute to scan prior threads. If a customer spoke with Sales during an evaluation, check what came up and reference it (e.g., “I saw you covered X with [Name]”) so your email feels connected. And look for other loose ends too, e.g., an old support ticket, or a question from months ago. Following up with a real solution feels personal, and proactive delight gets noticed.

### Checking in

Don’t just repeat yourself. Avoid rehashing the same observations from your first message. If your earlier advice still hasn’t been implemented, send a small, friendly nudge. Otherwise, bring something new:

- Look at what they’re actively using right now.
- Infer what they might be trying to measure or achieve as a business.

Help them get to an “aha” moment, and/or suggest one or two features they’d benefit from, but may not have discovered or had time to try.
PostHog features become more powerful when used together (e.g., funnels/error tracking + session replay + PostHog AI). Share a specific guide, an example, or a Loom video, so the customer doesn’t have to poke around to figure it out.

Lastly, if the customer is trending toward growth (usage, team expansion, increasing volume), it’s okay to mention pre-paid credits and the option of dedicated human support early. Framing it as “when you’re ready” gives them time to consider it and makes a future Sales handoff smoother.

### No response?

Review the list of users on the account: who’s active in PostHog, what roles they have, and who is most likely to own outcomes (implementation, analytics, product, engineering) vs. commercial topics (billing/procurement). Choose a small set of the most relevant people (3-4 total) and avoid repeatedly emailing everyone.

Tailor the email to their likely concerns:
- Engineers: how to implement/reduce noise
- PMs/analytics: insights, funnels, retention, experiments
- Finance/procurement: cost control

A small, human touch can help here! Use what’s publicly obvious or clearly relevant (their product category, their website messaging, their goals). If you genuinely relate (e.g., you’re learning a language and they build a language app), one sentence can be enough to build rapport. That’s also a great tip for the first outreach. 

## Preparing for the call

Use Vitally and [Metabase](https://posthog.com/handbook/onboarding/metabase-account-analysis) to understand the customer’s current setup. For easier access, you can pin the "Engagement Metric Dashboard" custom trait in Vitally, where you can take a closer look at power users in the organization, the usage of AI or error tracking, and more. 

Then zoom out to learn about their business, their product, and the rest of their stack. The better your context, the faster you’ll get to relevant recommendations.

**Start with their KPIs**

Use the customer’s KPIs (usually captured in the booking form) to drive your prep. Ask yourself: what would “success” look like for them? Come prepared with 2-3 concrete use cases tied to those KPIs (e.g., a specific insight type, dashboard, funnel, experiment, etc.). [This Handbook page](https://posthog.com/handbook/growth/sales/utilization-by-business-type) can be a good source of inspiration.

**Map the stack and spot opportunities**

Check Wappalyzer (login details in 1Password). It’s not always perfectly accurate, but it’s usually good enough to understand the tools they rely on. Use it to identify integrations, suggest Sources/Destinations where it makes sense (e.g., HubSpot),

It might be a great moment to position PostHog as the place where multiple tools can connect under one hood.

Customers respond well when we’re proactive, especially when we show them a path they hadn’t considered. PostHog is most powerful when features compound, so part of prep is identifying the next adoption step that unlocks more value.

**Use AI to broaden your angles**

AI can help you sanity-check assumptions and surface ideas you might miss. Customer-facing teams at PostHog use PostHog AI, Claude (with PostHog + Vitally MCPs), Cursor, or Antigravity. Use it to generate questions, identify likely “aha” moments, and draft call checklists, then apply human judgment to keep it relevant.

## On the call

- **Start with a quick discovery (3–5 minutes)**.  What they shared in the booking form may not reflect today’s priorities or the goals of everyone on the call. Confirm what outcome they want by the end of the session.
- **Have the relevant docs ready**. If you can anticipate the topic of the session, keep the key docs open so you can screen-share them quickly.
- **Show, don’t tell. Build things live**. If you discuss funnels, dashboards, cohorts, or flags, create one. Save it so the customer can revisit it later.
-**Connect features**. Show how features compound and check [this Handbook page](https://posthog.com/handbook/growth/cross-selling/cross-sell-motions#bundle-features) for inspiration:
  - Funnels → drop-off → jump into Session Replay to understand it better and create a cohort
  - Error tracking → watch related replays
  - Experiments → measurable impact → rolling out the winning variant
- **If you don’t know something, don’t guess**. Open the docs or use PostHog AI during the call. It builds trust and teaches them how to self-serve.
- **Check the event schema (if relevant)**. If their KPIs require certain milestones, verify they’re capturing the right events/properties. E.g.:
  - Walk through their signup/purchase flow and compare it to events captured.
  - Use PostHog AI to watch Session Replays and suggest missing milestone events.
- **Spot unused events**. Show what’s used vs. unused and where volume can be reduced.  This is an easy way to explain optimization opportunities and cost control:
  - Activity → Event counts → last 30 days
  - Open an event → check if it’s used in any saved insights/queries
- **Introduce our beta features** (if relevant). Encourage customers to use them and share feedback. It can positively impact adoption before the feature becomes a paid product. 
- **If growth signals are strong, plant the seed early**. If the account is on a positive trajectory, introduce the idea of prepaid credits coming with [a discount](https://posthog.com/handbook/growth/sales/contract-rules) and the option of a dedicated PostHog human. 

## Email Follow-up

- Send it the same day. Use the momentum!
- Include the public Gong recording link.
- Loop in everybody. If some folks couldn’t attend, include them anyway so they can catch up async.
- Summarize the call and send resources. Include some extra resources if you feel it would be beneficial as well. For example, our [YouTube playlist](https://www.youtube.com/playlist?list=PLnOY1RYHjDfzBX5wsSUHwLj91xuGnH5Ci%C2%A0) is great!
- If relevant, give them one quick win. Encourage a small task they can do immediately after the call to lock in value and reinforce learning.
