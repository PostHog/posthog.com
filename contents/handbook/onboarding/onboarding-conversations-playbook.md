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

Audit this customer's PostHog account and write a notebook for the customer. Last 30 days. Switch to SQL mode.

Rules:

- Batch independent queries, run them in parallel.
- Discover schema on demand: `SELECT * FROM <table> LIMIT 3`, or `system.information_schema.tables` / `columns`.
- Always verify: if a table errors or looks empty when you expected data, check `system.information_schema.columns` before concluding.
- Filter bots: `AND getBotName(properties.$raw_user_agent) = ''` on every events query. Never `isLikelyBot` or `$virt_is_bot`: they flag every non-browser SDK and drop whole mobile and backend products.
- Internal and test users: apply `test_account_filters` from `SELECT * FROM system.teams` (an array of `{key, type, value, operator}`; `type: event` maps to `properties.<key>`, `type: person` to `person.properties.<key>`). If empty, say internal traffic cannot be separated.
- Count people with `uniqExact(person_id)`, never distinct_id.
- `system.*` entity tables return deleted and archived rows. Filter every count: `deleted = 0` for actions, cohorts, dashboards, feature_flags; `deleted = 0 AND saved = 1` for insights; `archived = 0` for experiments; surveys have no flag, judge by start_date and end_date.
- `LIMIT 10` on any top-N. Apply bot and test filters to non-events tables only where those fields exist.
- Where things live: `events` by default, except replay → `raw_session_replay_events` (on/off state); heatmaps → `heatmaps`; logs → `logs`; LLM prompt/response bodies → `posthog.ai_events`. Billing and delivery meters → `app_metrics` (`app_source` + `metric_name` + `count`). Ingestion problems → `system.ingestion_warnings`. Warehouse syncs → `system.source_sync_jobs` joined to `system.source_schemas`. Query volume → `query_log`. Everything the customer created → `system.*`.
- Always consider billing ([posthog.com/pricing](/pricing)) for each area's optimization.

Snapshot first:

```sql
SELECT
 count() AS total_events,
 countIf(event = '$pageview') AS pageviews,
 countIf(event = '$pageleave') AS pageleaves,
 countIf(event = '$autocapture') AS autocapture,
 countIf(event = '$exception') AS exceptions,
 countIf(event LIKE '$ai_%') AS ai_events,
 countIf(event = '$feature_flag_called') AS flag_evals,
 countIf(event = 'survey sent') AS survey_sends,
 countIf(event = '$identify') AS identify_events,
 countIf(event = '$set') AS set_events,
 countIf(event = '$groupidentify') AS groupidentify_events,
 countIf(event = '$web_vitals') AS web_vitals,
 countIf(person_mode IN ('full', 'force_upgrade')) AS identified_events,
 uniqExact(person_id) AS people,
 uniqExact(properties.$session_id) AS sessions,
 uniqExact(properties.$lib) AS sdk_count,
 groupUniqArray(10)(properties.$lib) AS sdks
FROM events
WHERE timestamp >= now() - INTERVAL 30 DAY
 AND getBotName(properties.$raw_user_agent) = ''
```

Analyze each area. Each carries a value read (getting the most from it) and a cost read (what it costs, how to cut). Prefix each finding subheading :large_green_circle: working well, :large_yellow_circle: worth attention, or :red_circle: needs action. If an area is unused, consider how it might be used in this project. State each finding only once. Always inline link to documentation:

1. Instrumentation: SDKs and versions (`properties.$lib`, `$lib_version`; old versions miss cost controls like replay minimum duration and flag bootstrapping); autocapture vs named-event share; identified vs anonymous (`person_mode`); `identify()`/`$set`/`$groupidentify` each about once per session (compare totals to sessions). Ingestion warnings (`system.ingestion_warnings` type and timestamp; `cannot_merge_already_identified` means identify ran on already-identified users, spending events for nothing). Custom events no saved insight references (they bill but are never analyzed; cross-check flags, cohorts, experiments before suggesting removal). Dev or staging leakage (`properties.$host` localhost or staging domains billing here means point them at a separate project). If autocapture is a large share with few named actions, name the potential specific actions or custom events to create that don't already exist (actions apply retroactively).
2. Product analytics: top events, paths, week-over-week retention, drop-off, spikes, DAU/WAU, dashboards, alerts, subscriptions, gaps in measurement. Which event names and libraries drive the most billable volume.
3. Web analytics: enabled, data flowing, conversion goals, core web vitals.
4. Session replay. Three-state read:

```sql
SELECT
 uniqExactIf(session_id, min_first_timestamp >= now() - INTERVAL 30 DAY) AS recordings_30d,
 uniqExact(session_id) AS recordings_all_time,
 minIf(min_first_timestamp, min_first_timestamp >= '2015-01-01') AS first_recording,
 maxIf(max_last_timestamp, max_last_timestamp <= now()) AS latest_recording
FROM raw_session_replay_events
```

30d > 0: recording now. all-time > 0 but 30d = 0: stopped, give the last date and name candidates. Both 0: never recorded. `latest_recording` will show if it was turned off and when. When replay is active, assess the minimum-duration lever from `session_replay_events` (`session_id`, `dateDiff('second', start_time, end_time)`, `console_error_count`) if its count roughly matches the read above: a high share under 2 to 5 seconds is bounce recordings they pay for.

5. Heatmaps: group by type so the real values surface. See total, active vs stale. Run:

```sql
SELECT type, count() AS interactions, count(DISTINCT current_url) AS urls
FROM heatmaps WHERE timestamp >= now() - INTERVAL 30 DAY
GROUP BY type ORDER BY interactions DESC
```

6. Feature flags: total, active vs stale (created before the window with zero `$feature_flag_called` in it, but server local-eval flags may not emit the event, so caveat it), evaluation distribution by `$feature_flag` key and `$lib`, server vs client, at 100% for 30+ days, flag-shaped cases that should be experiments. Cost is per `/flags` request, not per flag: the lever is cutting request volume (local evaluation, polling cadence, bootstrapping), not archiving individual flags.
7. Experiments: running (`system.experiments`: `start_date` set, `end_date` null, `archived = 0`) and how long; one running for months is usually decided, ship the winner and stop it. Sample sizes, statistical health.
8. Surveys: running (`system.surveys`), response rate per survey (`survey shown` vs `survey sent`, grouped by `properties.$survey_name`), targeting, response limits. Always-on surveys quietly accrue billable responses.
9. Error tracking: capturing exceptions, grouping, assignment, alerts. Top exception types come from `$exception_list`, not `$exception_type` (that scalar is null ~80% of the time and fakes a null-type flood); extract the first with `JSONExtractString(arrayElement(JSONExtractArrayRaw(JSONExtractString(properties, '$exception_list')), 1), 'type')`. Ingested vs rate-limited (`app_metrics`, `app_source = 'exceptions'`). Suppression rules drop matches before they bill.
10. LLM observability: `$ai_generation`/`$ai_span`/`$ai_trace`/`$ai_embedding` volume, generations, traces, cost by model (`properties.$ai_model`, `sum(toFloat(properties.$ai_total_cost_usd))`), latency. Deeply instrumented agents emit far more spans and traces than generations. Confirm senders are real users, not PostHog AI usage by admins.
11. Data warehouse: external sources, sync health, joins with events. Rank schemas by total `rows_synced` over the window. Look for `full_refresh` vs sync frequency (`system.source_sync_jobs`: `rows_synced`, `status`; join `system.source_schemas` on `schema_id = id` for `name`, `sync_type`). `full_refresh` on a large table re-bills every row each sync.
12. CDP, destinations, transformations, workflows: enabled inventory (`system.hog_functions`: type, enabled, deleted). Destination deliveries and batch-export rows (`app_metrics`, `app_source` `'hog_function'` and `'batch_export'`); the billed meter is `metric_name = 'billable_invocation'`, not `failed`/`succeeded`/`triggered` (those are delivery outcomes), so size cost from that and read a 100%-failure rate as a delivery problem to fix, not a bill. Workflows (`system.hog_flows`, filter by `status`). Transformations act on future events only; a filtered delivery is skipped by its own filters, which is free and good. only metric_name = 'billable_invocation' bills; failed, filtered, triggered, and fetch do not (a 100%-failing destination shows zero billable_invocation). A dead destination is a delivery fix, never a cost saving — do not rank it as one.
13. Platform, queries and logs: query volume app vs personal API key (`query_log`, `is_personal_api_key_request`; an API spike usually means an automation polling too often). Logs GB ingested and dropped (`app_metrics`, `app_source = 'logs'`).
14. Revenue: billing connected and joined to usage. If not, connect Stripe or Chargebee as a warehouse source and join to events in SQL.
15. Cohorts: count, static vs dynamic, usage. Dynamic cohorts with behavioral or lifecycle criteria can't target feature flags, experiments, or surveys; flag any that do and recommend a static duplicate or a person property to target instead.
16. What they're not using yet: one inventory across `system.*` shows coverage and the best untapped plays (saved insights, dashboards, notebooks, actions, cohorts, annotations, saved SQL views `data_modeling_views`, feature flags, running experiments, early access features, running surveys, recording collections `session_recording_playlists`, error suppression rules, warehouse sources, active batch exports, enabled `hog_functions` and `hog_flows`, insight alerts `alerts` and log alerts `logs_alerts`, integrations). Count with the right filter per table. A zero is an opportunity, not a failure.

## Write the notebook

- Renders only: h1-3 headings, bold, inline code (but not in bolded sentences), fenced code blocks, bullets, links, emojis. Anything needing alignment goes in a code block.
- Open with an `## At a glance` space-aligned table (columns: Area, Main Finding, Next Step). Each area is separated by underlined of `─`.
- Embed all relevant data as a table in fenced code blocks. Do not embed insights directly. Format every table as a simple table: space-aligned columns with the header underlined by a line of `─`, never pipe-delimited.
- Use headings for hierarchy. Each subheading states primary finding (":large_yellow_circle: Autocapture is 60% of your events, turn it into actions").
- Recommendations: 5 h3 headings ordered by impact, each with the action, why, and a docs link.
- Untapped opportunities: 3 to 5 h3 headings forward-looking plays. has to be something new that wasn't covered before.
- Frame cost findings as efficiency and savings, not waste or blame. Rank recommendations purely by impact; give fewer than five rather than pad.
- At the end of the notebook, add all the SQL queries used in separate code blocks for each area.
- Sentence case, no em dashes or en dashes. Never use `---` or any dividers between sections; separate them with 2 blank lines and the next heading only. Output as one continuous block.
- After drafting the notebook, validate that all formatting rules in this section have been met. Fix, and only then save the notebook.

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
