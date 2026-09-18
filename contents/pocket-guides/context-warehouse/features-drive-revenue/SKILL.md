---
name: posthog-features-drive-revenue
description: >
  Rank a PostHog user's product features by the revenue of the customers who use them (joins Stripe MRR/invoices to
  feature-usage events) and save it as a reusable PostHog insight. Use this whenever someone asks which features
  their highest-revenue or best customers use most, wants revenue-weighted feature adoption, wants to tie existing
  feature usage to MRR/ARR, or wants to decide which features to invest in based on paying customers. Triggers on
  phrasings like 'which features drive revenue', 'what do our best customers use', 'revenue by feature', 'connect
  Stripe revenue to feature usage', or 'which features should we double down on'. Boundary: this ranks EXISTING
  features by adopter revenue, it is not a before/after test. For whether a specific rollout, experiment, or feature
  flag moved revenue use posthog-feature-revenue-impact; for revenue by acquisition channel or ad spend use
  posthog-acquisition-channels-retention. It sets up the Stripe warehouse source if needed and builds the insight
  end-to-end.
---

# Which features drive revenue?

**Question:** Which product features do our highest-revenue customers use most?
**For:** Product & PMM · **Difficulty:** Beginner · **Shape:** one SQL/HogQL query
**Data sources:** PostHog events (feature usage per account) + Stripe (MRR & invoices per customer)

## What this produces

A saved PostHog insight — a table of features ranked by the revenue of the accounts that use them — so the user can
see which features their paying customers actually rely on, and spot high-revenue accounts that haven't adopted a
top feature yet.

## Workflow

First read `references/posthog-workflow.md` and follow it for the shared setup: confirm the PostHog MCP is
connected, make sure the Stripe source exists (set it up via the secure connect-link flow if not), and learn this
project's real schema. Everything below is the question-specific part.

### 1. Identify the pieces in this project

- **Feature usage events.** Use `event-definitions-list` to find the events that represent meaningful feature use
  (not pageviews). Confirm with the user which events count as "features" — every product defines this differently.
- **The account/customer key.** Work out how a PostHog person or group maps to a Stripe customer. Usually
  `person.properties.email` ↔ `stripe_customer.email`, or a stored `stripe_customer_id`. If the product is
  account-centric, the key may live on a group.
- **Revenue per customer.** Approximate MRR from active `stripe_subscription` items, or use recent `stripe_invoice`
  totals. See the money/time gotchas in the shared reference (amounts are in cents; state your MRR method).

### 2. Build and validate the query

Start from this shape and adapt the event/property/column names to what actually exists. Validate with `query-run`
and iterate until it returns sensible rows.

```sql
-- Features ranked by the revenue of the accounts that use them.
-- Adapt: event names, the email/customer join key, and the MRR source for your project.
WITH customer_revenue AS (
    SELECT
        lower(email) AS email,
        -- Approximate account MRR; swap for your real revenue logic.
        sum(amount) / 100.0 AS revenue
    FROM stripe_invoice
    WHERE status = 'paid'
      AND created >= now() - INTERVAL 90 DAY
    GROUP BY lower(email)
)
SELECT
    e.event AS feature,
    count(DISTINCT e.person.id) AS accounts_using,
    round(sum(cr.revenue), 2) AS revenue_of_users,
    round(sum(cr.revenue) / nullif(count(DISTINCT e.person.id), 0), 2) AS revenue_per_account
FROM events AS e
INNER JOIN customer_revenue AS cr
    ON lower(e.person.properties.email) = cr.email
WHERE e.timestamp >= now() - INTERVAL 90 DAY
  -- Optional: restrict to the events you consider "features".
  -- AND e.event IN ('created_dashboard', 'ran_query', 'invited_teammate')
GROUP BY e.event
ORDER BY revenue_of_users DESC
LIMIT 50
```

Tips: exclude noise events; if the natural key is a group, join on the group property instead of person email;
consider weighting by distinct accounts rather than raw event counts so a few heavy users don't dominate.

### 3. Save the insight

Create a SQL/HogQL insight (per the shared reference) named "Features ranked by customer revenue", described with
the MRR method and date window you used, shown as a table. Return the URL and give the user the plain-English read:
which features skew toward high-revenue accounts.

## Self-driving development (offer this)

With a revenue-weighted feature ranking, the user can spot high-revenue accounts that haven't adopted a top feature
and nudge them there. Offer to help set up an in-product prompt, a survey, or an experiment targeting those
accounts — improving activation automatically.
