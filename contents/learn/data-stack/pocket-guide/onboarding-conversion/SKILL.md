---
name: posthog-onboarding-conversion
description: >
  Rank the onboarding and activation steps that best predict a trial becomes a paying customer: build the onboarding
  funnel, flag who reached a first Stripe payment, and compare payers versus non-payers, saved as a reusable PostHog
  insight. Use this whenever someone asks which onboarding or activation steps lead to paid conversion, what
  converting trials do differently, which signup steps predict revenue, or where trials stall before paying.
  Triggers on phrasings like 'what makes trials convert', 'onboarding steps that lead to payment', 'activation
  actions that predict conversion', 'compare payers vs non-payers by onboarding', or 'where do trials stall'.
  Boundary: this analyzes the onboarding PATH to first payment in aggregate. For scoring and prioritizing which
  individual LEADS sales should contact, use posthog-lead-scoring. It sets up the Stripe source if needed and
  builds the insight end-to-end.
---

# Which onboarding steps turn trials into paying customers?

**Question:** Which onboarding actions best predict that a trial becomes a paying customer?
**For:** Growth · **Difficulty:** Beginner · **Shape:** a funnel + a join
**Data sources:** PostHog funnels (onboarding steps) + Stripe (first successful payment)

## What this produces

A saved PostHog insight comparing onboarding actions completed by users who reached a first Stripe payment against
those who never paid, ranked by how strongly each step predicts conversion — so the user knows which steps to push
everyone toward.

## Workflow

First read `references/posthog-workflow.md` for the shared setup: confirm the PostHog MCP is connected, ensure the
Stripe source exists (set it up via the secure connect-link flow if not), and learn this project's real schema.
Then do the question-specific part below.

### 1. Identify the pieces in this project

- **Onboarding steps.** Use `event-definitions-list` to find signup → activation events. Confirm the intended step
  order with the user; onboarding funnels are product-specific.
- **First payment.** Identify each user's first successful payment from Stripe — typically the earliest paid
  `stripe_invoice` or successful `stripe_charge` per customer. Join to PostHog people on `lower(email)` (see the
  join gotchas in the shared reference).
- **Conversion label.** For each user, a boolean: did they ever reach a first Stripe payment?

### 2. Build and validate the query

Two good approaches — use whichever the user prefers:

- **Funnel insight split by converted vs not** (most native): build the onboarding funnel and break it down by a
  "paid" cohort. This shows step-by-step drop-off for payers vs non-payers directly.
- **Comparison query** (ranks predictive steps): compute, per onboarding action, the completion rate among payers
  vs non-payers and the lift. Start from this shape and adapt names, then validate with `query-run`:

```sql
-- Completion rate of each onboarding action among payers vs non-payers, with lift.
-- Adapt: onboarding event names, the payment definition, and the email join key.
WITH payers AS (
    SELECT DISTINCT lower(email) AS email
    FROM stripe_invoice
    WHERE status = 'paid'
),
user_actions AS (
    SELECT
        e.person.id AS person_id,
        lower(e.person.properties.email) AS email,
        e.event AS action,
        min(e.timestamp) AS first_did
    FROM events AS e
    WHERE e.event IN ('signed_up', 'completed_profile', 'created_project', 'invited_teammate', 'activated')
    GROUP BY e.person.id, lower(e.person.properties.email), e.event
)
SELECT
    ua.action,
    countIf(p.email != '') AS payers_who_did,
    countIf(p.email = '') AS nonpayers_who_did,
    round(countIf(p.email != '') / nullif(count(), 0), 3) AS share_of_doers_who_paid
FROM user_actions AS ua
LEFT JOIN payers AS p ON ua.email = p.email
GROUP BY ua.action
ORDER BY share_of_doers_who_paid DESC
```

Note the caveat honestly when you report: this is correlation, not proof of causation — steps that correlate with
paying aren't guaranteed to cause it.

### 3. Save the insight

Save as a funnel insight (if you went the funnel route) or a SQL/HogQL table insight named "Onboarding steps that
predict conversion", described with the payment definition and window. Return the URL and tell the user which
steps most separate payers from non-payers.

## Self-driving development (offer this)

With the steps that predict conversion, the user can spot trials stalling before them. Offer to help set up
in-product prompts, a lifecycle email trigger, or an experiment that moves stalled users forward — turning more
trials into customers.
