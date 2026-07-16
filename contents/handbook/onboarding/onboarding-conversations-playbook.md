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
  - “Want me to sanity-check your events / funnels / flags?”
  - “Data audit: 3 tracking gaps I’d fix first”
  - “I recorded a 2-min walkthrough for your setup”
  - “A recommended dashboard for [their use case]”
  - “Worth a look before your next release”
  - "Are you trying to do [goal]? (I can help)”

### Content

**Keep it short**. Don’t overwhelm the reader. It’s tempting to include every tip and best practice, but concise emails get read and replied to. Share the headline observation and the next step; save the deep dive for the call (or a follow-up).

**Set expectations early**. If you want consistent engagement throughout onboarding, be explicit about what the program includes and why it’s worth their time. When customers know what to expect and how to use our time, they’re more likely to participate. Setting clear boundaries also helps - what you can help with, and for how long we’re around. 

**Use prior context to be proactive**. Before you hit send, take a minute to scan prior threads. If a customer spoke with Sales during an evaluation, check what came up and reference it (e.g., “I saw you covered X with [Name]”) so your email feels connected. And look for other loose ends too, e.g., an old support ticket, or a question from months ago. Following up with a real solution feels personal, and proactive delight gets noticed.

**Good CTAs**
- "Want to take a look together?"
- "Want to compare notes on what's working?"
- " Worth a look before your next renewal?"
- "Happy to help if the timing is right."

**Vibe killers (never use)**
"circling back" · "just touching base" · "hope this finds you well" · "I'd love to connect" · "I'm genuinely
curious" · "are you open to a quick chat?" · "let me know your thoughts" · "synergy" · "leverage" · "alignment" · "best-in-class".

### Checking in

This is where we can have a real impact on product adoption and usage expansion. Think of it as a value-driven "soft cross-sell". 

Don’t just repeat yourself. Avoid rehashing the same observations from your first message. If your earlier advice still hasn’t been implemented, send a small, friendly nudge. Otherwise, bring something new:

- Look at what they’re actively using right now.
- Infer what they might be trying to measure or achieve as a business.

Mainly, help them get to an “aha” moment, and/or suggest one or two features they’d benefit from, but may not have discovered or had time to try.
PostHog features become more powerful when used together (e.g., funnels/error tracking + session replay + PostHog AI). Share a specific guide, an example, or a Loom video, so the customer doesn’t have to poke around to figure it out. You can take some inspiration from [Use Case Selling handbook pages](https://posthog.com/handbook/growth/use-case-selling/use-case-selling).

A very powerful way to engage the customer and provide value is to run an account audit prompt on their account and save the findings as a notebook for them. The prompt creates a readable, easy-to-follow guide on the areas the customer might not have thought about before. This also works really well as an additional post-meeting resource!

<details>
<summary>Account audit prompt</summary>

You are auditing this customer's PostHog account to produce a notebook they will read directly. Use the last 30 days of data unless noted. The customer will see this output, so write it for them, not for an internal PostHog reviewer.

**Internal analysis (do NOT output)**

Before writing the notebook, infer for yourself:
- Customer's business and product type (from event names, URLs, person properties)
- Stack (SDKs, frameworks)
- Approximate scale and product maturity
- Likely cost drivers

Use this context to sharpen recommendations. Do NOT write these inferences into the notebook. The customer knows their business.

**Notebook structure**

Open with a brief summary, 2 to 3 lines in plain language:
- A one-line headline that names the most important finding or finding count.
- One or two more lines highlighting what the customer should know first.

Then the audit, then recommendations, then untapped opportunities. No "Step 1" or "Phase N" labels in headings.

**Audit**

Run checks across every PostHog product below. Checks are exhaustive; output is filtered. Surface a finding only if it is (a) actionable, (b) notably healthy, or (c) anomalous. Skip dimensions where nothing stands out.

For every product dimension (everything except Instrumentation health and Cost drivers): if the product is not in use, evaluate whether the customer would benefit from it given the business and stage you inferred. If yes, surface as a finding (🟡 "could help" or 🔴 "major gap" depending on severity). This makes "should they adopt this?" a first-class question for every product. One exception: Revenue analytics is a retired PostHog product, so never recommend adopting it; when revenue tracking is the gap, recommend connecting a billing source (Stripe, etc.) as a data warehouse source and building custom insights or SQL queries that join revenue with product data.

Prefix every finding with:
- 🟢 Working well
- 🟡 Worth attention
- 🔴 Needs action

**Common pitfalls (verify before reporting)**

- **Sessions vs session recordings**: The `sessions` table contains every user session regardless of whether session replay is enabled. Session recordings only exist when replay is explicitly turned on. Before reporting any volume as "recordings," verify session replay is enabled on the project (check `session_recording_opt_in` on the team, or confirm `session_recording` data actually exists). NEVER describe `sessions` table counts as "recordings."
- **Events vs actions**: Events are raw; actions are named/filtered groupings of events. Do not conflate. Absence of Actions is NOT absence of events; it is an autocapture-optimization opportunity (flag only if autocapture is a significant % of volume AND zero Actions are defined).
- **`distinct_id` vs `person_id`**: A single person can have many distinct_ids (post-identify merge). When counting "users," confirm which level the query is returning.
- **Identified vs anonymous persons**: Anonymous persons are still persons in PostHog's data model. "Total persons" includes both. ALSO: backend and server-side SDKs always create identified events by design, and logged-in product subdomains will be near-100% identified. Only flag a "low anonymous ratio" as a problem for web SDK traffic on public or marketing sites; do not flag it for backend SDKs or logged-in apps.
- **Internal and test users inflate everything**: Most customers have an internal or test cohort (e.g. `$internal_or_test_user = true`, or email-domain filtering). Before reporting DAU/WAU, engagement, top events, or per-user metrics, exclude internal/test traffic if such a cohort exists. If unclear, check whether the top distinct_ids look like company-domain emails.
- **Bot traffic**: PostHog auto-excludes known bots from billing, but raw event tables (`events`, `sessions`) still contain them. For "unique users," DAU, or engagement counts, apply the same bot exclusion the project uses (`bot_user_agents` team setting plus the standard `$browser` check) before reporting numbers.
- **Billing limits cap volumes**: If a product is at or near its billing limit, observed event/recording volume is artificially capped. Events past the limit are DROPPED, not queued. Check whether the team has `billing_limits` set before describing observed volume as "natural" or recommending optimizations against an already-capped baseline.
- **Session replay sampling**: If `sampleRate` is below 1.0, recording counts are a sample of total sessions, not all of them. Always report the sample rate alongside recording-volume claims, or you will understate true session activity.
- **`$ai_*` events have multiple sources**: `$ai_generation`, `$ai_span`, and `$ai_trace` fire from (a) the customer instrumenting LLM observability on their own product, AND (b) anyone using PostHog AI or Max inside the project (including admins running ad-hoc queries). Confirm the events come from real product users (check distinct_ids, not just volume) before reporting them as "customer AI feature adoption."
- **Low-volume events are not always broken**: Some events (payment failures, deletion confirmations, rare admin actions) fire infrequently by design. Do not flag a custom event as "deprecated" based purely on volume; check the event-name pattern first.

**Dimensions to check (14 total, covering every PostHog product)**

1. **Instrumentation health**: SDKs in use, autocapture vs custom event ratio, duplicate or redundant events, low-volume events that may be broken (cross-check with the pitfalls list), identified vs anonymous ratio (apply the backend-SDK caveat), person property update frequency, `identify()` call patterns (anti-pattern: called on every page load instead of only on auth), group analytics (for B2B).
2. **Product analytics**: top events, common paths, week-over-week retention, drop-off points, DAU/WAU, dashboards, alerts, subscriptions.
3. **Web analytics**: enabled, data flowing, conversion goals, core web vitals.
4. **Session replay and heatmaps**: First confirm session replay is actually enabled (see Common pitfalls). Then: recording volume (note sample rate if set), average duration, minimum duration filter, rage and dead clicks, heatmap usage.
5. **Feature flags**: total, active vs stale, evaluation distribution, server vs client, flags at 100% for over 30 days, flag-shaped use cases that should be experiments. Note: unused flags still bill until archived in the PostHog UI (removing from code alone is not enough). Local-evaluation polling can be a silent billing driver; check polling cadence.
6. **Experiments**: in use, sample sizes, statistical health.
7. **Surveys**: in use, response rates, targeting.
8. **Error tracking**: capturing exceptions, grouping, issue assignment, alerts.
9. **LLM observability**: `$ai_generation`, `$ai_trace` events (apply the multi-source caveat), generations, traces, cost and latency tracking for AI features.
10. **Data warehouse**: external sources connected (Stripe, Postgres, etc.), sync health, joins with event data.
11. **CDP / Data pipelines (destinations)**: events exported to BigQuery, Snowflake, Hubspot, Salesforce, etc.; Hog functions and transformations in use. Note: transformations only affect future events; past data is unchanged.
12. **Revenue tracking**: is billing or revenue data connected and joined to product usage? Do NOT recommend the retired Revenue analytics product. The play is to connect a billing source (Stripe, Chargebee, etc.) as a data warehouse source, then build custom insights or SQL queries that join revenue with event data (MRR/ARR by feature, expansion, churn signals). Check whether a billing source is connected, syncing, and joined to product data.
13. **Cohorts**: count, static vs dynamic, used in flags/experiments/surveys/insights. Anti-pattern: dynamic cohorts targeted at experiments, flags, or surveys do not work (the cohort must be duplicated as static first).
14. **Cost drivers**: which products, events, or patterns drive the most volume on THIS account. Reference findings from other sections rather than repeating them. Diagnose from the data, not from generic rules. Account for billing limits and sampling when computing "true" volumes.

Each finding appears in exactly ONE section. No duplication across dimensions.

**Recommendations**

Single numbered list, ranked by impact then effort. Top 5 only. For each:
- The specific action, named.
- Why it matters, in plain language.
- Estimated impact in numbers (event count, % reduction, etc.) ONLY when you can compute it from the data. If you cannot, skip the number; do not guess.
- Link to the relevant PostHog docs page.

No P0/P1/P2 labels. No category headers like "Billing reduction" or "Activation lift." One tight paragraph per recommendation, 3 sentences maximum.

**Untapped opportunities**

3 to 5 strategic plays the customer should consider next, given the business and stage you inferred. Forward-looking and creative, NOT a recap of products already flagged as missing in the audit. Examples: a specific funnel worth measuring, an experiment worth running on a key flow, a cohort definition that would unlock churn prediction, a data warehouse join that would expose revenue-by-feature. One to two sentences each on what and why. Link to docs.

**Output rules**

- Plain markdown. H2 per section, H3 per sub-area.
- Embed PostHog insights (trends, funnels, retention, etc.) inline where data benefits from visualization.
- Include the full HogQL query under any non-trivial finding so the customer can re-run or customize it. Do NOT save these as named PostHog insights.
- Bullets only, max 5 per section. Max 3 sentences per bullet. If more detail is needed, split into nested sub-bullets, not longer prose.
- No markdown tables (notebooks do not render them). For comparisons, use bold-labeled bullets.
- Use blank lines to separate sections. Do NOT use horizontal rule dividers (three hyphens in a row).
- NO EM DASHES anywhere in the output. Em dashes (the long dash typographic character) and double-hyphen sequences used as dashes are both forbidden. Use commas, colons, parentheses, or full stops instead. This is critical: em dashes make writing read as AI-generated.
- No "Step 1:" or "Phase N:" prefixes in headings.
- No internal-to-PostHog framing. Do not write things like "PostHog adoption is 2 months old" or "the setup is sophisticated for an account this size." The customer knows their setup. Focus on what they should do, not commentary on what they have.
- VERIFY before describing data. When a check might conflate two similar things (see Common pitfalls in the Audit section), confirm which one the query is actually returning before writing the finding. If unsure, say so explicitly rather than guessing.
- HogQL specifics: `team_id` is a reserved keyword (alias to `team` instead); cast functions are HogQL-flavoured (`toInt(...)` not `toInt64(...)`); timestamps are UTC by default (be explicit about timezone if business hours matter).
- Be concise everywhere. Cut every sentence that does not add information.

</details>

Lastly, if the customer is trending toward growth (usage, team expansion, increasing volume), it’s okay to mention pre-paid credits and the option of dedicated human support early. Framing it as “when you’re ready” gives them time to consider it and makes a future Sales handoff smoother.

### No response?

Review the list of users on the account: who’s active in PostHog, what roles they have, and who is most likely to own outcomes (implementation, analytics, product, engineering) vs. commercial topics (billing/procurement). Choose a small set of the most relevant people (3-4 total) and avoid repeatedly emailing everyone.

Tailor the email to their likely concerns:
- Engineers: how to implement/reduce noise
- PMs/analytics: insights, funnels, retention, experiments
- Finance/procurement: cost control

A small, human touch can help here! Use what’s publicly obvious or clearly relevant (their product category, their website messaging, their goals). If you genuinely relate (e.g., you’re learning a language and they build a language app), one sentence can be enough to build rapport. That’s also a great tip for the first outreach. 

You can also draw inspiration from the [Customer Success team's tactics](https://posthog.com/handbook/cs-and-onboarding/engaging-unengaged-customers), such as flagging outdated SDKs.

## Preparing for the call

**Start from a health check**

Use Vitally and [Metabase](https://posthog.com/handbook/onboarding/metabase-account-analysis) to understand the customer’s current setup. For easier access, you can pin the "Engagement Metric Dashboard" custom trait in Vitally, where you can take a closer look at power users in the organization, the usage of AI or error tracking, and more. 

You can supplement Metabase analysis with the [HogSpy extension](https://github.com/PostHog/hogspy/releases/tag/v1.0.0) to audit the implementation of identify, flags, and experiments.

Then zoom out to learn about their business, their product, and the rest of their stack. The better your context, the faster you’ll get to relevant recommendations.

**Lead with their KPIs**

Use the customer’s KPIs (usually captured in the booking form) to drive your prep. Ask yourself: what would “success” look like for them? Come prepared with 2-3 concrete use cases tied to those KPIs (e.g., a specific insight type, dashboard, funnel, experiment, etc.). [This Handbook page](https://posthog.com/handbook/growth/sales/utilization-by-business-type) can be a good source of inspiration.

**Map the stack and spot opportunities**

Check Wappalyzer (login details in 1Password). It’s not always perfectly accurate, but it’s usually good enough to understand the tools they rely on. Use it to identify integrations, suggest Sources/Destinations where it makes sense (e.g., HubSpot),

It might be a great moment to position PostHog as the place where multiple tools can connect under one hood.

Customers respond well when we’re proactive, especially when we show them a path they hadn’t considered. PostHog is most powerful when features compound, so part of prep is identifying the next adoption step that unlocks more value. You can take some inspiration from [Use Case Selling handbook pages](https://posthog.com/handbook/growth/use-case-selling/use-case-selling) as well.

**Use AI to broaden your angles**

AI can help you sanity-check assumptions and surface ideas you might miss. Customer-facing teams at PostHog use PostHog AI, Claude (with PostHog + Vitally MCPs), Cursor, or Antigravity. Use it to generate questions, identify likely “aha” moments, and draft call checklists, then apply human judgment to keep it relevant.

You can also run PostHog AI on the customer instance (visible only to us, no cost incurred) to do the account audit. Prompt below.

<details><summary>PostHog AI prompt</summary>
Analyze the organization across the following dimensions using the last 30 days of data.

1. Instrumentation health
- What SDKs are sending data? (web, mobile, server-side, etc.)
- What's the ratio of auto-captured events vs. custom events?
- Are there any custom events that appear to be duplicates or redundant?
- Are there events with very low volume that might be broken or deprecated?
- Are person profiles being created?
- What's the identified vs. anonymous user ratio?

2. Feature flag usage
- How many feature flags exist?
- How many are active vs. stale?
- Which flags have the most evaluations?
- Which have the fewest?
- Are any flags being evaluated server-side vs. client-side?
- Can you tell?
- Are there flags that have been at 100% rollout for more than 30 days that could be cleaned up?

3. Product usage patterns
- What are the top 20 most frequent events?
- What are the most common user paths? (entry point to key actions)
- What does retention look like week over week?
- Are there obvious drop-off points in any user flows?
- What's the DAU/WAU ratio (stickiness)?

4. Session replay
- Is session replay active?
- How many recordings were there in the last 30 days?
- What's the average session duration?
- Are there minimum duration filters set, or are very short sessions being recorded?
- What's the rage click and dead click volume?

5. Underutilized PostHog features
- Are they using experiments?
- If not, are there flags that look like they could be experiments?
- Is web analytics enabled and collecting data?
- Are surveys being used?
- Is error tracking / exception capture active?
- Are any data warehouse sources connected?
- Are cohorts being used?
- How many exist?

6. Cost optimization
- What products are driving the most usage? (events, recordings, flags)
- Are there any quick wins to reduce noise? (short session filtering, dropping low-value events at ingestion, disabling stale flags)

Summarize findings with a prioritized list of recommendations:
- what's working well
- what needs attention
- what untapped opportunities exist

Follow-up with: Now go look at their business and domain. What should they be doing to get more use and value out of PostHog?
</details>

## On the call

- **Start with a quick discovery (3–5 minutes)**.  What they shared in the booking form may not reflect today’s priorities or the goals of everyone on the call. Confirm what outcome they want by the end of the session.
- **Have the relevant docs ready**. If you can anticipate the topic of the session, keep the key docs open so you can screen-share them quickly.
- **Show, don’t tell. Build things live**. If you discuss funnels, dashboards, cohorts, or flags, create one. Save it so the customer can revisit it later.
- **Connect features**. Show how features compound and check [this Handbook page](https://posthog.com/handbook/growth/cross-selling/cross-sell-motions#bundle-features) for inspiration:
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
- If you feel you have built a strong relationship, use your champion to introduce you to other teams that might be interested in PostHog and might be willing to jump on the call to be shown around.
- Share any feedback or feature requests with the relevant product team. Their responsiveness can help you deliver some customer happiness! It's always great to be able to send a GitHub link to follow in your email. 
