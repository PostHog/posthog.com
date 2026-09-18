---
name: posthog-upsell-ready-accounts
description: >
  Find expansion-ready accounts by comparing each account's real product usage against its current Stripe plan
  limits and flagging accounts consistently near or over their limits while still on a lower plan, saved as a
  reusable PostHog insight. Use this whenever someone asks who to upsell, which accounts are outgrowing their plan,
  which accounts are hitting usage limits, upgrade or expansion candidates, or accounts on the wrong (too-small)
  plan. Triggers on phrasings like 'who should we upsell', 'which accounts are hitting their limits', 'expansion
  candidates', 'accounts on the wrong plan', 'usage vs plan limit', or 'accounts ready to upgrade'. Boundary: this
  flags expansion by usage-versus-plan-limits. For account health measured as ARR versus engagement (big accounts
  that barely use the product), use posthog-value-vs-engagement. It sets up the Stripe source if needed and builds
  the insight end-to-end.
---

# Which accounts are ready to upsell?

**Question:** Which accounts are consistently near or over their plan limits but still on a lower plan?
**For:** Sales & CS · **Difficulty:** Intermediate · **Shape:** a scheduled query
**Data sources:** PostHog events (usage vs plan limits & premium features) + Stripe (current plan per account)

## What this produces

A saved PostHog insight listing accounts whose measured product usage runs near or over the limits of their
current Stripe plan — a live, refreshable expansion list for Sales/CS.

## Workflow

First read `references/posthog-workflow.md` for the shared setup: confirm the PostHog MCP is connected, ensure the
Stripe source exists (secure connect-link flow if not), and learn the real schema. Then the question-specific part:

### 1. Identify the pieces in this project

- **Current plan per account.** From Stripe: the active `stripe_subscription` → `stripe_price` / `stripe_product`
  gives each customer's current plan. Confirm how the user names their tiers.
- **Plan limits.** The numeric limit each plan implies (seats, events, API calls, etc.). This often isn't in
  Stripe — ask the user for the limit per tier, or read it from a plan/product metadata field if they store one.
- **Real usage.** The PostHog metric that maps to the limited resource (e.g. count of a usage event per account per
  month, or distinct active users per group). Find it with `event-definitions-list` / `property-definitions`.
- **Account key.** Map usage to the Stripe customer (person email or a group's account id). See the join gotchas
  in the shared reference.

### 2. Build and validate the query

Adapt and validate with `query-run`. The core idea: usage ÷ plan limit ≥ threshold, AND plan is not already the
top tier.

```sql
-- Accounts whose usage is near/over their plan limit but still on a lower plan.
-- Adapt: usage event, the account key, plan→limit mapping (here inline as a CASE), and thresholds.
WITH usage AS (
    SELECT
        e.person.properties.account_id AS account,   -- or group key / email
        count() AS usage_last_30d
    FROM events AS e
    WHERE e.event = 'billable_action'                -- the resource you meter on
      AND e.timestamp >= now() - INTERVAL 30 DAY
    GROUP BY account
),
plan AS (
    SELECT
        lower(c.email) AS account,                   -- align this key with `usage.account`
        p.nickname AS plan_name,
        multiIf(p.nickname = 'Starter', 10000,
                p.nickname = 'Growth', 100000,
                p.nickname = 'Scale', 1000000, NULL) AS plan_limit,
        p.nickname != 'Scale' AS not_top_tier
    FROM stripe_subscription AS s
    INNER JOIN stripe_price AS p ON s.plan_id = p.id
    WHERE s.status = 'active'
)
SELECT
    pl.account,
    pl.plan_name,
    u.usage_last_30d,
    pl.plan_limit,
    round(u.usage_last_30d / nullif(pl.plan_limit, 0), 2) AS utilization
FROM usage AS u
INNER JOIN plan AS pl ON u.account = pl.account
WHERE pl.not_top_tier
  AND u.usage_last_30d >= 0.8 * pl.plan_limit          -- "near or over" threshold
ORDER BY utilization DESC
```

Prefer a "consistently over" signal (e.g. over threshold in 2+ of the last 3 months) to avoid flagging one-off
spikes — extend the usage CTE to bucket by month if the user wants that.

### 3. Save the insight and schedule it

Save as a SQL/HogQL table insight named "Upsell-ready accounts (usage vs plan)". Because this is most useful
fresh, offer to add it to a dashboard and to materialize the underlying query (`view-create` + `view-materialize`)
so it refreshes on a schedule.

## Self-driving development (offer this)

With a live list of accounts outgrowing their plan, the user can catch expansion moments as they happen. Offer to
help trigger an in-product upgrade prompt or a Sales/CS outreach alert for accounts that cross the threshold —
growing revenue without anyone watching a dashboard.
