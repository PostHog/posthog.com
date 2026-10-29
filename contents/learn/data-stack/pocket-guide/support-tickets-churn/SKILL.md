---
name: posthog-support-tickets-churn
description: >
  Test whether support tickets predict churn with a three-way join of PostHog engagement, Zendesk/Intercom tickets
  and topics, and Stripe churn, ranking the support issues that precede the most lost revenue, saved as a reusable
  PostHog insight. Use this whenever someone asks whether support contact or tickets predict churn, which ticket
  topics lead to cancellations, which support issues cost the most revenue, or how tickets correlate with
  retention. Triggers on phrasings like 'do tickets predict churn', 'which support issues cause churn', 'tickets vs
  retention', 'support topics that lose revenue', or 'does contacting support mean they will leave'. Boundary: this
  requires support-tool data (Zendesk/Intercom). For churn warning signs from PRODUCT USAGE alone with no tickets,
  use posthog-pre-cancellation-behavior. It sets up the Zendesk/Intercom and Stripe sources if needed and builds
  the insight end-to-end.
---

# Do support tickets predict churn?

**Question:** Which support ticket volumes/topics precede the most churned revenue?
**For:** Support & CS · **Difficulty:** Intermediate · **Shape:** a three-way join
**Data sources:** PostHog events (engagement) + Zendesk/Intercom (tickets & topics) + Stripe (churn)

## What this produces

A saved PostHog insight ranking support issues by the revenue that churns after them, and showing how ticket
volume relates to engagement and cancellation — so the user knows which support problems actually cost money.

## Workflow

First read `references/posthog-workflow.md` for the shared setup: confirm the PostHog MCP is connected, ensure the
Zendesk (or Intercom) and Stripe sources exist (secure connect-link flow for each if not), and learn the real
schema. This question needs two external sources plus PostHog, so verify all three are present before querying.
Then:

### 1. Identify the pieces in this project

- **Tickets & topics.** From Zendesk/Intercom: ticket rows with a customer identifier, created date, and a
  topic/tag/category field. Confirm which field carries the "topic".
- **Churn.** From Stripe: canceled subscriptions and the revenue lost (approximate from the last active
  `stripe_invoice`/subscription value — see the money gotchas in the shared reference).
- **Engagement.** A per-account PostHog engagement measure (event count or active days).
- **Join key.** Tickets → accounts by email or domain; accounts → Stripe by email/customer id. Domain joins
  (`splitByChar('@', email)[2]`) are common when tickets are logged per-company.

### 2. Build and validate the query

Adapt names/fields and validate with `query-run`. Core idea: per topic, sum the churned revenue of accounts that
filed that topic.

```sql
-- Support topics ranked by the churned revenue of accounts that filed them.
-- Adapt: ticket table/fields, the topic field, the churn/revenue logic, and join keys.
WITH churned AS (
    SELECT lower(email) AS email, sum(amount) / 100.0 AS lost_revenue
    FROM stripe_invoice
    WHERE status = 'paid'
      AND lower(email) IN (
        SELECT lower(email) FROM stripe_subscription WHERE status = 'canceled'
      )
    GROUP BY lower(email)
),
tickets AS (
    SELECT lower(requester_email) AS email, subject_topic AS topic
    FROM zendesk_tickets
    WHERE created_at >= now() - INTERVAL 180 DAY
)
SELECT
    t.topic,
    count(DISTINCT t.email) AS accounts_with_topic,
    count() AS ticket_count,
    round(sum(c.lost_revenue), 2) AS churned_revenue_after_topic
FROM tickets AS t
INNER JOIN churned AS c ON t.email = c.email
GROUP BY t.topic
ORDER BY churned_revenue_after_topic DESC
```

Be honest in the writeup: this shows correlation between topics and churned revenue, not proof the tickets caused
churn. A high-volume topic among healthy accounts can still be fine.

### 3. Save the insight

Save as a SQL/HogQL table insight named "Support topics ranked by churned revenue", with a note on the
churn/revenue method. Return the URL and call out the top revenue-costing issues.

## Self-driving development (offer this)

With issues ranked by the revenue they cost, the user can spot accounts hit by the worst ones. Offer to help build
a cohort of accounts with those tickets and trigger proactive CS outreach or a fix experiment — protecting revenue
automatically.
