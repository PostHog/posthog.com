---
name: posthog-pre-cancellation-behavior
description: >
  Find the shared product-usage warning pattern before churn: pull cancellation dates from Stripe or Chargebee and
  examine the roughly 30 days of activity before each one, saved as a reusable PostHog insight. Use this whenever
  someone wants an early-warning churn signal from behavior, asks what churning customers do (or stop doing) before
  they leave, how usage or activity changes before cancellation, or the usage drop that precedes churn. Triggers on
  phrasings like 'what do customers do before they cancel', 'pre-cancellation behavior', 'churn warning signs', 'how
  does usage change before churn', or 'leading indicators of churn'. Boundary: this is behavioral/usage-based churn
  prediction with no support data. If the question is specifically about SUPPORT TICKETS or Zendesk/Intercom
  predicting churn, use posthog-support-tickets-churn. It sets up the Stripe/Chargebee source if needed and builds
  the insight end-to-end.
---

# What do customers do right before they cancel?

**Question:** How does account activity change in the ~30 days before a customer cancels?
**For:** CS & Product · **Difficulty:** Intermediate · **Shape:** a window query
**Data sources:** PostHog events (activity timeline per account) + Stripe / Chargebee (cancellation dates)

## What this produces

A saved PostHog insight showing the shared pre-churn pattern — how engagement trends downward (or which last
actions occur) in the weeks before cancellation — giving the user an early-warning signal.

## Workflow

First read `references/posthog-workflow.md` for the shared setup: confirm the PostHog MCP is connected, ensure the
churn source (Stripe or Chargebee) exists (secure connect-link flow if not), and learn the real schema. Then the
question-specific part:

### 1. Identify the pieces in this project

- **Cancellation dates.** From Stripe: `stripe_subscription` with `status = 'canceled'` and its `canceled_at` (or
  `ended_at`) timestamp per customer. Chargebee has an equivalent subscription cancellation field. Confirm which
  system holds the source of truth for churn.
- **Activity timeline.** The events that represent meaningful engagement (`event-definitions-list`).
- **Account key.** Map the churned Stripe/Chargebee customer to PostHog people/groups (email or customer id — see
  join gotchas in the shared reference).

### 2. Build and validate the query

The idea: for each churned account, index activity to weeks-before-cancellation, then average across accounts to
reveal the shared decline. Adapt names and validate with `query-run`.

```sql
-- Average weekly activity in the 30 days before cancellation, aligned by weeks-to-churn.
-- Adapt: the cancellation source/fields, activity events, and the email join key.
WITH cancels AS (
    SELECT lower(email) AS email, max(canceled_at) AS churn_ts
    FROM stripe_subscription
    WHERE status = 'canceled'
      AND canceled_at >= now() - INTERVAL 90 DAY       -- "last quarter" churners
    GROUP BY lower(email)
),
activity AS (
    SELECT
        c.email AS email,
        -- how many days before cancellation each event happened, bucketed into weeks
        intDiv(dateDiff('day', e.timestamp, c.churn_ts), 7) AS weeks_before_churn,
        count() AS events
    FROM events AS e
    INNER JOIN cancels AS c ON lower(e.person.properties.email) = c.email
    WHERE e.timestamp >= c.churn_ts - INTERVAL 30 DAY
      AND e.timestamp <= c.churn_ts
    GROUP BY c.email, weeks_before_churn
)
SELECT
    weeks_before_churn,                                -- 0 = final week before churn
    round(avg(events), 1) AS avg_events_per_account,
    count(DISTINCT email) AS accounts
FROM activity
GROUP BY weeks_before_churn
ORDER BY weeks_before_churn DESC
```

For "what was the last action", instead select each account's final event before `churn_ts` and rank those events
by frequency. Offer both readings to the user.

### 3. Save the insight

Save as a SQL/HogQL insight named "Activity before cancellation" — a line/bar over weeks-to-churn works well for
the trend; a table for the last-action ranking. Return the URL and tell the user the pattern you see (e.g.
"engagement roughly halves in the final two weeks").

## Self-driving development (offer this)

With an early-warning signal, the user can spot at-risk accounts before they leave. Offer to help turn the pattern
into a cohort or alert (e.g. "activity down >50% week-over-week") that triggers a save flow or CS outreach —
cutting churn automatically.
