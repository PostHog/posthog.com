---
title: "Org definitions: intent, setup & engagement"
sidebar: Handbook
showTitle: true
---

Intent, setup, and engagement are customer level concepts that Sales, Marketing & Website, Customer Success, and Growth all rely on. If you think a definition should change (which events qualify, which table is the source of truth, etc.), see "Adding an event to these definitions" section below and suggest here before you edit a dashboard tile so we can all work off of same source of truth.

[Growth's self-serve dashboard](https://us.posthog.com/project/2/dashboard/1849743) tracks these definitions against specific time windows and cohorts (e.g. "% of intent orgs that completed setup within 14 days of signup"). 

## Level of aggregation

Every definition below is at the **organization** level (PostHog's `organization` group). An org qualifies once *any* of its users has triggered a qualifying action.

**Standard exclusions:** 
- **PostHog's own organization** because our own usage is not customer behavior.
- **PostHog staff inside customer orgs**: exclude events where the person's `email` contains `@posthog.com`.
- **Impersonated sessions**: exclude events with `was_impersonated = true`. Impersonation carries the *customer's* identity, so the email filter doesn't catch it.

**Organization vs. customer/billing account:** the billing tables (`prod_postgres_billing_usagereport`, `prod_postgres_billing_customer`) also have a `customer_id` a billing system identifier separate from `organization_id`. Today these are the same level: `organization_id` and billing `customer_id` are 1:1 and `prod_postgres_billing_customer` has a single `organization_id` per customer row so there's no way to attach multiple orgs to one billing customer in the current schema.

## Intent

An org has shown intent once any of its users triggers at least one of the events below. Because orgs take different paths, each event counts on its own. An event qualifies by what it means – did someone deliberately do something with PostHog before getting value from it? – not by current volume – so we can keep this accurate as new products launch and usage shifts between surfaces.

Both the start and the finish of the same flow qualify (`onboarding started` and `onboarding completed`; `wizard: agent started` and `wizard: agent completed`). 

| Event | What fires it | Captured from |
|---|---|---|
| `user showed product intent` | When a user performs one of the registered intent actions for a product (choosing a product in onboarding, setting replay filters, opening a product's setup page, …). The specific action is in `intent_context`. | Server – fired by app actions |
| `onboarding started` | Opening a product's onboarding flow in the app | Browser |
| `onboarding step completed` | Completing a step of an onboarding flow | Browser |
| `onboarding completed` | Finishing an onboarding flow | Browser |
| `sdk selected` | Picking an SDK on the install step | Browser |
| `onboarding_products_confirmed` | Confirming product selection (legacy onboarding screen) | Browser |
| `product setup task completed` | A task in the in-app setup checklist being completed | Browser |
| `wizard: agent started` | The wizard's agent phase starting – in the user's terminal, or as a hosted (cloud) run kicked off from onboarding | Wizard (CLI or hosted) |
| `wizard: auth complete` | Completing authentication in the setup wizard | Wizard (CLI or hosted) |
| `wizard: agent completed` | The wizard's agent finishing its setup run | Wizard (CLI or hosted) |
| `setup wizard finished` where `status = 'success'` | The wizard finishing its run successfully – the definitive "wizard done" event | Wizard (CLI or hosted) |
| `quickstart product enabled` | Enabling a product from the quick-start panel | Browser |
| `heatmaps toggled` where `heatmaps_opt_in = true` | Turning on heatmap capture in team settings | Browser |
| `autocapture exceptions toggled` where `autocapture_opt_in = true` | Turning on exception autocapture in team settings | Browser |

Some events that look similar but do not qualify: the `<field> team setting updated` events (e.g. `heatmaps_opt_in team setting updated`). Onboarding saves default settings in bulk, so these fire for nearly every new org – they look like deliberate toggles but usually aren't. Use the toggle events above instead.


## Setup

An org has completed setup if it has at least one day of non-zero product usage: any counter in `org_usage_summary` greater than 0 on its billing usage report (`prod_postgres_billing_usagereport`, one row per org per day, keyed by `organization_id`). The summary holds per-product counters: `events`, `recordings`, `exceptions`, `llm_events`, `rows_synced`, `feature_flag_requests`, `survey_responses`, `logs_mb_ingested` and so on. This is a billing system usage signal. Note a non-empty summary is not enough: a row can exist with every counter at 0, so check for a value above zero.

This is a different concept from per-product **activation** (see [Per-product activation](/handbook/growth/growth-engineering/per-product-activation)), which is a specific, retention-validated behavioral milestone chosen separately for each product. Setup is simpler: it just means billable data started flowing for the org at all. Use "setup" for this org-level signal and reserve "activation"/"activated" for the per-product, retention-validated definitions.

**Signals that look similar but aren't this definition:** the single event signal `first team event ingested` is sometimes used elsewhere as a setup proxy. This doesn't match the canonical definition.

## Engaged (customer initiated product or tool usage)

An org is engaged once any of its users triggers at least one qualifying event below. An event qualifies when the action behind it shows a customer getting value: a person deliberately using the product, or automation the customer built themselves. Anything PostHog's own systems fire on a schedule with no human involved doesn't qualify.

One known blind spot: customer automation can outlive its usefulness. A forgotten script keeps its org "engaged" until someone turns it off, and events can't tell us whether anyone still reads its output. We accept that, because the alternative – not counting `api` – would wrongly mark every API-only customer as unengaged.

The threshold is deliberately a single event. The quality bar lives in *which* events qualify, not how many times they fire – a count threshold would also quietly set a lower bar for chatty surfaces (one dashboard session emits dozens of events; one Slack question emits two). For health questions, add a window and a tier on top instead: **recurring engagement** = qualifying events on 2+ distinct days in the window, and **team engagement** = 2+ distinct engaged users. 

Related: one action often produces several qualifying events. An agent creating a dashboard over MCP fires both `$mcp_tool_call` and `dashboard created` (with `source = 'mcp'`); opening a dashboard in the app fires `viewed dashboard` plus a `query executed` per tile. Harmless for the definition but another reason never to read summed event counts as "number of actions".

### The `source` allowlist

Events captured on the server carry `properties.source`, which says which surface made the request. Events marked "allowlist" in the tables below only count when `source` is one of: `web`, `desktop`, `slack`, `mobile`, `posthog_ai`, `mcp`, `api`, `cli`, `terraform`

Machine values never count: `cache_warming`, `alert`, `export`, `subscription`, `self_driving` (Signals scouts), `posthog_code` (headless coding agents), `wizard` (setup automation). When a new `source` value appears, it stays excluded until someone classifies it. We'd prefer briefly undercounting a new surface than silently count machines as customers.

Two dates to know: `desktop`, `slack`, `mobile` and `self_driving` only exist since 2026-08-17 ([#72941](https://github.com/PostHog/posthog/pull/72941)), and older events weren't updated. Before that date `$mcp_tool_call` carried no `source` at all, so historical queries on it need `source IS NULL OR source IN (...)` for the older window.

### Consuming data

| Event | What fires it | Captured from |
|---|---|---|
| `query executed` (allowlist) | Backend query runner, once per insight/SQL query executed for an authenticated request | Server – multi-surface; `source` says which (includes MCP) |
| `logs query executed` (allowlist) | The Logs API returning results for a user's query. Live-tail refresh polls are excluded at the capture site. The Logs API bypasses the generic query runner, so `query executed` doesn't cover it. | Server – multi-surface (includes MCP) |
| `$mcp_tool_call` where `source` in `mcp`, `slack`, `posthog_ai` | Once per tool call an agent makes. The filter matters: scouts and headless coding agents fire this event too. | MCP server |
| `insight viewed` | Opening an insight in the app | Browser |
| `viewed dashboard` | Opening a dashboard (legacy event name) | Browser |
| `recording viewed` | Opening a session recording | Server – app-driven |
| `chat with ai` | A Max conversation turn | Server – app + Slack; carries no `source` |
| `error_tracking_issue_viewed` | Opening an error issue's detail page | Browser |
| `llma single trace loaded` | Opening an LLM trace | Browser |
| `web analytics filter applied` | Changing a filter on the web analytics dashboard | Browser |
| `notebook opened` | Opening a notebook | Browser |
| `Inbox report opened` | Opening a report in the Inbox – the human end of self-driving | Browser |
| `heatmap screenshot generated` | Generating a heatmap screenshot | Browser |
| `toolbar mode triggered` | Activating a toolbar mode (heatmap, inspect, actions, flags). Toolbar engagement happens entirely outside the PostHog app but still carries the org group. | Browser – toolbar on the customer's site |
| `toolbar feature flag overridden` | Overriding a feature flag from the toolbar to test it on their own site | Browser – toolbar on the customer's site |
| `pr_merged` where `origin_product = 'signal_report'` | A customer merging a scout-authored PR into their own repo. Merging is a human act accepting PostHog's work – the strongest self-driving value signal. Only with this filter; see the exclusion list for unfiltered `pr_merged`. | GitHub webhook |

### Creating things

Creating things counts as engagement even before any data gets consumed: a new flag or destination is the org putting PostHog to work. All server-side rows use the allowlist (plus `terraform`).

| Event | What fires it | Captured from |
|---|---|---|
| `insight created`, `dashboard created` (allowlist) | API layer, when an insight/dashboard is saved from any surface | Server – multi-surface |
| `feature flag created`, `experiment created`, `cohort created`, `alert created`, `endpoint created`, `hog_flow_created`, `action created` (allowlist) | API layer, on creation of the object | Server – multi-surface |
| `data warehouse source created` (allowlist) | Connecting a Data Warehouse source. The allowlist excludes sources the self-driving flow connects automatically (`source = 'wizard'`). | Server – multi-surface |
| `survey created`, `survey launched` | Creating / launching a survey | Browser (`survey launched` also has a small API/MCP slice) |
| `source created` | Finishing the Data Warehouse new-source wizard in the app (Stripe, Postgres, ad platforms, file uploads, …). The browser-side twin of `data warehouse source created` above – same action, captured on both sides. | Browser |
| `Task created` | Creating a task, in the app | Browser |
| `Signal source connected` | Connecting a signal source in the Inbox UI | Browser |
| `Scout config changed` where `setting = 'enabled'` and `new_value = true` | Turning a Signals scout on | Browser |
| `annotation created` | Creating an annotation (in the app, or from deploy hooks via the API). No `source` on these yet – they're deliberate acts in practice; add the allowlist filter once the backend adds it. | Server – carries no `source` |
| `batch export backfill created` | Starting a batch-export backfill. Same caveat: no `source` yet. | Server – carries no `source` |

### Events that look like engagement but aren't

Each of these looks like usage but fires without a customer doing anything deliberate. Adding any one of them would wrongly mark orgs as engaged:

- `marketing analytics query performed` – captured inside the query runner, fires on dashboard refreshes and exports, carries no `source`. Human marketing-analytics usage is covered by `query executed`.
- `error_tracking_issue_created` – system-generated per issue.
- `pr_created` / `pr_merged` **unfiltered** – ingestion of the customer's own repo activity. `pr_created` with scout origin is also out: a scout opening a PR is machine output (the human counterparts are `pr_merged` with the `signal_report` filter, and `Inbox report opened`).
- `survey shown` / `survey sent` / `survey dismissed` – the customer's *respondents* answering a survey, not the customer using the Surveys product.
- `endpoint executed` – automated API traffic by design.
- `llm analytics usage` – a backend usage rollup, not a user action.
- `insight refresh time`, `dashboard insight refreshed` – auto-refresh.
- `first team event ingested` – fires per org *member*, and measures ingestion, not usage.
- `signals_scout_*` – scheduled machine runs.
- `Inbox onboarding decided` – records which onboarding mode a user ended up with (defaults included), not a deliberate opt-in.
- `toolbar loaded` – fires whenever the toolbar loads on a page the user browses; presence, not use. The deliberate acts are the toolbar events above.
- `toolbar token expired` – fires for *anonymous visitors* of customers' sites carrying a stale token. Its user count roughly equals its event count – the signature of machine-generated events.
- `$workflows_email_opened` / `$workflows_email_link_clicked` – PostHog's own lifecycle emails. Opens are pixel-tracked (machine-inflated by mail clients); clicks are human but measure engagement with our emails, not the product – the click lands in-app where real events fire.

### Adding an event to these definitions

Before adding an event, check all four:
1. **It carries the organization group.** The group on the event records which org the action happened in, and org-level queries silently drop events without it. Joining person → org membership is a last resort: some users belong to several orgs, so a join has to guess what the event itself knows.
2. **It fires once per deliberate action** and not on background refreshes.
3. **It's captured where the action happens** (the request or UI layer), never inside a query runner or data pipeline.
4. **It's convincing on its own.** These definitions are a list of alternatives, so one bad event wrongly marks orgs no matter how good the rest are.

Server-side events also need the `source` allowlist. 

## Teammate invited

An org has invited a teammate if it has any of the following events: `team member invited`, `user invited`, `bulk invite executed`.

## Paying / revenue

An org is paying in a given month if its `total_mrr` (from `iwa_summary_customer_month`, keyed by `organization_id`) is greater than 0.

Startup credit orgs are identified separately, via `startup_plan_start_at` in `prod_postgres_billing_customer.metadata` This flags an org that is on startup plan and is covered by credits rather than paying cash. 

**Credit covered conversion:** a startup plan org can still behave like a converted, paying customer even while its cash MRR is $0. We flag this by combining the startup flag above with usage data: an org counts as a credit covered conversion once, in some month, it's on the startup plan (has a non-null `startup_plan_start_at`) *and* its usage in `iwa_summary_customer_month` exceeds the standard free-tier allowance for any product (e.g. `product_analytics_usage`, `session_replay_usage`, `feature_flags_usage`,  `llm_analytics_usage`, `posthog_ai_usage`, `workflows_emails_usage`, `workflows_destinations_usage` thresholds per [our pricing page](https://posthog.com/pricing), since those change over time). This matters because it's a real conversion signal: the org has grown past what a non credit account would get for free even though it won't show up in cash revenue metrics until the credits run out.

## Why these metrics may look different

The definitions above describe *what qualifies* an org for a state. Any specific tracked metric adds three more choices on top of a definition: a **population** (which orgs count), a **time window**, and whether stages are **chained into one funnel** or measured **independently**. Two metrics that both reference "setup" can give different looking answers even though neither is wrong, because these choices differ.

**Time frames**: "Setup" itself has no time limit, it's non-zero usage, ever. A tracked metric layers a window on top: "completed setup within 14 days of signup" (a speed-of-onboarding read) is a different number from "completed setup, at any point, no deadline" (a volume read). Both use the same setup definition, but they don't match because the window differs.

**Full funnel vs. independent cutoffs**: A metric can chain stages together end-to-end e.g. "signed up AND showed intent AND completed setup within 14 days AND was still engaged in week 4". In this case only orgs that cleared every gate in sequence count. Or it can measure a later stage independently, anchored to its own clock e.g. "of orgs that completed setup, what % later engaged, counted from THEIR setup date, regardless of how long signup-to-setup took." The chained version gives a strict end-to-end conversion rate vs. the independent version isolates whether a later stage is healthy without conflating it with how fast an earlier stage was. Don't assume two "engagement" numbers are measuring the same thing just because they're both built on the setup/engaged definitions above.

**Intent timestamps can land late**: the intent list includes both the start and the finish of flows, but start events often fire before login and miss the org group (`wizard: auth complete` never carries it; `wizard: agent completed` always does). For some orgs the first intent event we can tie to them is therefore a finish event – their "first intent" lands around setup time, and a chained metric like "showed intent then completed setup within 14 days" passes automatically for wizard orgs where a single run does both. Don't read first-intent timestamps as "strictly before setup".

If a metric doesn't match what you expected, check which population, window, and chaining choice it's using before assuming a definition changed.
