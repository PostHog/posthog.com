---
name: posthog-feature-revenue-impact
description: >
  Measure whether a specific feature rollout moved revenue: split users on feature-flag or experiment exposure and
  compare downstream Stripe revenue and retention between the exposed cohort and control, saved as a reusable
  PostHog insight. Use this whenever someone wants the revenue impact of an experiment or a feature they shipped,
  wants to tie a feature flag or A/B test to revenue and retention, or asks whether a rollout paid off. Triggers on
  phrasings like 'did the feature we shipped move revenue', 'revenue impact of our experiment', 'did the rollout
  pay off', 'compare exposed vs control on revenue', 'feature flag revenue lift', or 'A/B test revenue'. Boundary:
  this is a before/after causal test tied to a specific flag or experiment. For ranking which EXISTING features
  high-revenue customers already use, use posthog-features-drive-revenue. It sets up the Stripe source if needed
  and builds the insight end-to-end.
---

# Did the feature we shipped move revenue?

**Question:** Do users exposed to the new-feature flag show higher downstream revenue/retention than control?
**For:** Product & PMM · **Difficulty:** Advanced · **Shape:** a cohort join
**Data sources:** PostHog experiments (flag-exposure cohorts) + Stripe (revenue & retention)

## What this produces

A saved PostHog insight comparing Stripe revenue and retention between the flag-exposed cohort and the control
cohort — so the user can tell whether a rollout actually moved money, not just usage.

## Workflow

First read `references/posthog-workflow.md` for the shared setup: confirm the PostHog MCP is connected, ensure the
Stripe source exists (secure connect-link flow if not), and learn the real schema. Then:

### 1. Identify the pieces in this project

- **Exposure cohorts.** Find the feature flag / experiment and each person's variant from exposure events —
  typically `$feature_flag_called` with `$feature_flag` = the flag key and `$feature_flag_response` = the variant
  (test/control or true/false). Confirm the flag key and variant values with the user; also confirm the exposure
  date so revenue is measured after it.
- **Revenue & retention.** From Stripe: revenue per person after exposure, and whether they retained (still active
  after N days). See the money/time gotchas in the shared reference.
- **Join key.** Person → Stripe by `lower(email)`.

### 2. Build and validate the query

Adapt names and validate with `query-run`. Compare cohorts on average post-exposure revenue and retention.

```sql
-- Post-exposure revenue & retention: flag-exposed vs control.
-- Adapt: the flag key, variant values, the exposure/measurement window, and the email join key.
WITH exposure AS (
    SELECT
        person.id AS person_id,
        lower(person.properties.email) AS email,
        argMin(properties.$feature_flag_response, timestamp) AS variant,
        min(timestamp) AS exposed_at
    FROM events
    WHERE event = '$feature_flag_called'
      AND properties.$feature_flag = 'my_new_feature'      -- the flag key
    GROUP BY person.id, lower(person.properties.email)
),
revenue AS (
    SELECT lower(email) AS email, created, amount / 100.0 AS amount, status
    FROM stripe_invoice
)
SELECT
    ex.variant,
    count(DISTINCT ex.person_id) AS users,
    round(sum(if(r.status = 'paid' AND r.created >= ex.exposed_at, r.amount, 0))
          / nullif(count(DISTINCT ex.person_id), 0), 2) AS revenue_per_user_post_exposure,
    round(countIf(r.status = 'paid' AND r.created >= ex.exposed_at + INTERVAL 30 DAY)
          / nullif(count(DISTINCT ex.person_id), 0), 3) AS retained_share_30d
FROM exposure AS ex
LEFT JOIN revenue AS r ON ex.email = r.email
GROUP BY ex.variant
ORDER BY revenue_per_user_post_exposure DESC
```

Be careful and honest: only measure revenue after each user's exposure timestamp; report cohort sizes; and note
that unless this came from a proper randomized experiment, differences may reflect who was exposed rather than the
feature itself. If it was a PostHog experiment, PostHog's experiment results with a revenue/Stripe metric may be
the cleaner tool — mention that option.

### 3. Save the insight

Save as a SQL/HogQL insight named "Feature revenue impact: exposed vs control", documenting the flag key,
variants, and measurement window. Return the URL and give the plain read: which cohort earned more per user, and
whether the gap is big enough to matter given the cohort sizes.

## Self-driving development (offer this)

With revenue tied to each rollout, the user can tell which changes pay off. Offer to help wire this up so winners
can be ramped and laggards rolled back — and to set up the same measurement as a reusable template for the next
feature — shipping what moves money, hands-off.
