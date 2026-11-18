---
name: posthog-acquisition-channels-retention
description: >
  Rank a PostHog user's first-touch acquisition channels by retained Stripe revenue and CAC payback, using ad spend
  from Google/Meta, saved as a reusable PostHog insight. Use this whenever someone asks which marketing channels or
  sources bring customers who retain, wants channel ROI by retained revenue, CAC or payback by channel, wants to
  decide where to shift ad budget, or which UTMs/campaigns bring lasting customers. Triggers on phrasings like
  'which channels bring the best customers', 'channel ROI', 'CAC payback by source', 'retained revenue by channel',
  'where should we spend ad budget', or 'which UTMs convert to lasting customers'. Boundary: this is about
  acquisition source and marketing spend, not in-product feature revenue (use posthog-features-drive-revenue) or
  experiment impact (use posthog-feature-revenue-impact). It sets up the Stripe and ad sources if needed and builds
  the insight end-to-end.
---

# Which channels bring customers who stick?

**Question:** Which first-touch acquisition channels bring customers who retain, by retained revenue and CAC
payback?
**For:** Marketing · **Difficulty:** Advanced · **Shape:** a modeled query
**Data sources:** PostHog events (first-touch / UTMs) + Stripe (revenue & retention) + Google/Meta Ads (spend)

## What this produces

A saved PostHog insight ranking first-touch channels by retained Stripe revenue and CAC payback — so the user can
shift budget toward the channels that bring customers who last, not just the cheapest signups.

## Workflow

First read `references/posthog-workflow.md` for the shared setup: confirm the PostHog MCP is connected, ensure
Stripe and (for CAC) Google Ads / Meta Ads sources exist (secure connect-link flow if not), and learn the real
schema. This is the most involved question — verify each source before querying. Then:

### 1. Identify the pieces in this project

- **First-touch channel.** Attribute each person to a channel from first-touch UTM properties
  (`$initial_utm_source` / `$initial_utm_medium`) or a stored referrer. Confirm which properties the user actually
  captures with `property-definitions`.
- **Revenue & retention.** From Stripe: revenue per customer and whether they're still active (or how many months
  they retained). Approximate retained revenue as revenue from customers still subscribed after N months.
- **Spend per channel.** From Google/Meta Ads tables: spend by campaign/source over the period. CAC = spend ÷
  customers acquired from that channel.
- **Join keys.** Person → Stripe by email; channel comes from the person's own properties, so no external join is
  needed for attribution itself.

### 2. Build and validate the query

This is genuinely multi-step — build it in pieces, validating each CTE with `query-run` before combining. Adapt
names throughout.

```sql
-- Channels ranked by retained revenue and (roughly) CAC payback.
-- Adapt: UTM properties, the retention window, revenue logic, and ad-spend tables.
WITH first_touch AS (
    SELECT
        person.id AS person_id,
        lower(person.properties.email) AS email,
        coalesce(person.properties.$initial_utm_source, 'direct/unknown') AS channel
    FROM persons
),
revenue AS (
    SELECT lower(email) AS email,
           sum(amount) / 100.0 AS revenue,
           max(created) >= now() - INTERVAL 30 DAY AS still_active   -- crude retention proxy
    FROM stripe_invoice
    WHERE status = 'paid'
    GROUP BY lower(email)
),
spend AS (
    SELECT campaign_source AS channel, sum(spend) AS spend
    FROM google_ads_campaign_stats            -- union with meta ads if used
    WHERE date >= now() - INTERVAL 180 DAY
    GROUP BY campaign_source
)
SELECT
    ft.channel,
    count(DISTINCT ft.person_id) AS customers,
    round(sum(if(r.still_active, r.revenue, 0)), 2) AS retained_revenue,
    round(any(s.spend), 2) AS ad_spend,
    round(any(s.spend) / nullif(count(DISTINCT ft.person_id), 0), 2) AS cac
FROM first_touch AS ft
INNER JOIN revenue AS r ON ft.email = r.email
LEFT JOIN spend AS s ON ft.channel = s.channel
GROUP BY ft.channel
ORDER BY retained_revenue DESC
```

Retention and CAC payback have real modeling choices (cohort window, gross vs net revenue, blended vs paid CAC).
State the choices you made; offer to refine them with the user rather than presenting one number as definitive.

### 3. Save the insight

Save as a SQL/HogQL table insight named "Channels by retained revenue & CAC", documenting the retention window and
CAC method. Return the URL and name the channels that punch above their spend.

## Self-driving development (offer this)

With channels ranked by retained revenue, the user can shift budget toward the ones that bring customers who last.
Offer to help set this up as a recurring materialized view and to build experiments that test reallocating spend —
spending smarter without the guesswork.
