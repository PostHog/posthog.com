---
title: Creating Sandboxes for Demos
sidebar: Handbook
showTitle: true
---

[DemoHog](https://demohog.vercel.app) is an internal tool for spinning up a PostHog project filled with realistic, made-up event data. Describe an app in plain English, and it generates events, dashboards, insights, cohorts, Surveys, Feature Flags, Experiments, and (optionally) a hosted demo site wired for Session Replay.

## When to use it

Two reasons to reach for DemoHog:

- **Tailored demos.** A dashboard showing the prospect's funnel, personas, and events lands harder than a generic ecommerce demo. Describe their product, generate the data, walk into the call with a project that already tells the story.
- **Take-home sandboxes for prospects.** Sometimes a prospect wants to click around before they instrument anything. DemoHog hands them a populated project to explore Product Analytics, Session Replay, Feature Flags, and Experiments with zero setup.

Sandboxes are a fallback, not the goal. Read the next section before you hand one out.

## Sandboxes carry real risk

First prize is always getting prospects to send their own data. Two things break when they don't:

- **Lower commitment.** Installing the SDK is the moment a prospect actually invests in PostHog. Skip it and they're one click from walking. Instrumented prospects convert at much higher rates than sandbox-only ones.
- **It doesn't feel like the real product.** The data is plausible but it isn't theirs. Numbers won't match anything they recognize, edge cases in their funnel are missing, and the "aha" moment from spotting something real in their traffic never happens.

Push for real instrumentation first. Offer to pair on the SDK install. Send them the relevant [installation guide](https://posthog.com/docs/getting-started/install). Only fall back to a sandbox when they genuinely can't instrument yet (pre-launch products, procurement gates, locked engineering time).

If you do hand one over, frame it as a tour, not a trial.

## The four-step wizard

Open [demohog.vercel.app](https://demohog.vercel.app) and click **Start wizard** (`/wizard`). The home page also lists past demos under **Scheduled** and **Sandboxes** so you can resume or extend a run.

### 1. Describe your app

Write a paragraph covering:

- What the product does
- 1 or 2 personas
- The main journey (sign up, do thing, convert)
- Any specific events, Surveys, or Experiments you want to show off

Your prompt can be as simple as:

```
A prediction market site with a theme related to buying or selling predictions based on what hedgehogs will or won't do.
```

You can add significantly more detail if you want a more deterministic output:

```
A prediction market site with a theme related to buying or selling predictions based on what hedgehogs will or won't do. Below is an example of the events and event properties that should be instrumented for capture and imported.

**Basic**
- `signup`, `buy_trade`, and `sell_trade`. Add relevant properties based on below information.

**Discovery & Education**
- `market_viewed`: `category`, `market_id`, `source` (browse, search, deeplink, push notification, email), `time_to_close`, `total_volume`, `is_trending`
- `search_performed`: `query_text`, `results_count`, `result_clicked` (bool)
- `market_shared`: `share_method` (link copy, twitter, embed), `market_id`
- `education_tooltip_viewed` / `explainer_opened`: `user_tenure_days`

**Pre-Trade Deliberation**
- `order_book_viewed`: `depth_viewed`, `time_spent_ms`
- `position_calculator_used`
- `price_chart_interacted`: `timeframe_selected`, `zoomed`, `hovered_on_event_marker`
- `order_started_but_abandoned`: `amount_entered`, `price_entered`, `abandon_reason` (navigated away, changed mind, insufficient balance)
- `contract_details_expanded`

**Portfolio & Position Management**
- `portfolio_viewed`: `total_positions`, `unrealized_pnl`, `frequency_per_day`
- `position_closed_early`: `pnl_at_close`, `time_held`, `market_time_remaining`
- `limit_order_placed` vs. `market_order_placed`
- `deposit_initiated` / `deposit_completed` / `deposit_failed`: `method`, `amount`, `is_first_deposit`, `time_since_signup`
- `withdrawal_requested`: `amount`, `remaining_balance`, `trigger_event`

**Engagement & Return Triggers**
- `notification_received` / `notification_opened`: `notification_type` (price alert, market resolution, new market in category), `time_to_open`
- `watchlist_added` / `watchlist_removed`: `market_category`, `current_price`
- `market_resolved_viewed`: `user_had_position` (bool), `pnl_on_resolution`, `next_action_within_5min`
- `referral_link_generated` / `referral_converted`: `referrer_lifetime_volume`

**Trust & Friction Signals**
- `kyc_step_completed` / `kyc_step_abandoned`: `step_number`, `time_on_step`, `document_type`
- `support_ticket_opened`: `category`, `user_tenure`, `recent_trade_count`
- `terms_or_rules_page_viewed`: `from_context` (during trade, during dispute, idle browsing)
```

You'll also be asked to fill in:

- **Customer name** (required). Labels the saved config (e.g. prospect name).
- **Date range.** How far back (and forward) synthetic history should span. Defaults to roughly 3 months back through 1 month ahead.

Click **Analyze my app**. DemoHog uses an LLM to infer pages, events (with property specs), objects, personas, funnels, key events (signup, revenue, churn), audience (B2B vs B2C), a dashboard spec, trend/funnel/retention insights, and dynamic cohorts.

### 2. Review inferred data

Check the inferred cards (pages, events, funnels, key events, audience) and fix anything that's off. For full control, open **Edit inferred JSON** to edit dashboard, insight, and cohort definitions directly in the model.

Set:

- **Number of users.** Synthetic users in the dataset (default 100).
- **Events per session.** Custom events per session (default 5).

Keep custom event names in `snake_case` so they match PostHog conventions. Click through to save the config.

### 3. Connect PostHog and generate

Enter:

| Field | Where to find it |
| --- | --- |
| **Host** | Ingest host, e.g. `https://us.i.posthog.com` or EU (`https://eu.i.posthog.com`) |
| **Project ID** | PostHog → Project settings |
| **Project token** (`phc_…`) | PostHog → Project settings → Project token (needed for upload; add it here or on Results) |
| **Personal API key** (`phx_…`) | PostHog → Personal API keys |

The personal key needs these scopes:

- `dashboard:write`
- `insight:write`
- `cohort:write`
- `survey:write`
- `feature_flag:write`
- `experiment:write`

Click **Generate demo data**. DemoHog will:

1. Create (or reuse) a **survey**, **feature flag**, and **experiment** in the project via the PostHog app API.
2. Produce JSONL for the date range, **validate** it, and **auto-repair** (up to 5 attempts) if validation fails.

Generation doesn't upload events yet. If the end date is still in the future, a **daily job** gets scheduled automatically (see Optional extras).

### 4. Results

On **Results**:

1. **Download JSONL** (optional) to inspect the file.
2. **Upload to PostHog.** Sends events to `/batch` using the project token. Needs the `phc_…` token if you didn't set it earlier.
3. **Create dashboard, insights & cohorts.** Available after upload. The UI waits ~30 seconds for ingest, then creates the inferred dashboard plus trend, funnel, and retention insights and dynamic cohorts.
4. **Session Replay demo site** (optional). Provisions a generated Next.js app on a [Fly.io Sprite](https://docs.sprites.dev/) with `posthog-js` and session recording enabled, wired to your host and project token. Provisioning takes a few minutes. Click around the live URL for at least 10 seconds and move between pages so replays land in PostHog (and confirm Session Replay is enabled in the target project).

Done. You've got a populated project with analytics resources; replays show up once someone (or automation) uses the demo site.

## What gets generated

Beyond pageviews and custom events, synthetic data can include:

- **Groups** (B2B-style organizations)
- **Feature flag / experiment** exposure (`$feature_flag_called`) aligned with the created flag and experiment
- **Survey** responses tied to the created survey
- **Revenue** and subscription-style events
- **LLM**-style usage events
- **Error** events at a low baseline rate

State carries over between runs so scheduled generation stays coherent (same synthetic users and groups over time).

## Optional extras

### Daily scheduled generation

If the config **end date is after today**, DemoHog schedules a daily job when you generate (default 03:00 in the job timezone). Production runs this on Vercel cron.

- **First scheduled run:** backfills from the range **start** through **today** (or the range end, whichever is sooner).
- **Later runs:** 1 new day of events per run until the range end.
- Each day gets validated, repaired if needed, queued, and uploaded in the same cron run.

The home page **Scheduled** tab shows active jobs and lets you extend the end date to keep a sandbox alive for prospects who come back over a week or two.

### Hosted demo site (Sprites)

Provisioning kicks off from the wizard **Results** step. It needs a **Sprites API token** on the DemoHog server (`SPRITE_TOKEN` or `SPRITES_TOKEN` in the deployment env, not something you paste per demo). If provisioning fails with a missing-token error, ping whoever maintains DemoHog.

The generated site mirrors your inferred pages and events and is built to produce **real PostHog Session Replay** in the same project you connected.

### Automated browser sessions (Browserbase)

If the DemoHog deployment has **`BROWSERBASE_API_KEY`** set, the server fires 5 headless Stagehand sessions against the demo URL after Sprite provisioning, and again after scheduled runs that generated new data (when a sandbox URL exists). Those sessions drive the instrumented demo site so PostHog gets events and replays without you clicking manually. Replays also show up in the Browserbase dashboard for debugging.

Optional infrastructure on the shared DemoHog instance, not a per-user setting in the wizard.

## Picking the right project

For tailored demos, generate into a **fresh project** so the data doesn't pollute anything else. Don't reuse a project from a previous prospect.

For prospect sandboxes, create the project in an org the prospect can be invited to, and set realistic **timezone** and **currency** so the data feels right.

## Getting help

DemoHog is maintained as an internal tool. Code lives in the [demohog repo](https://github.com/PostHog/demohog). 
