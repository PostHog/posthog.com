---
name: posthog-value-vs-engagement
description: >
  Compare each account's ARR (from Salesforce/HubSpot) against its PostHog engagement score and flag the high-ARR,
  low-engagement accounts, saved as a reusable PostHog insight. Use this whenever someone asks whether their
  biggest accounts are actually engaged or happy, wants to compare account value against product usage, find
  at-risk revenue, spot big accounts that barely use the product, or map ARR against engagement. Triggers on
  phrasings like 'are our biggest customers actually using us', 'ARR vs engagement', 'which big accounts are at
  risk', 'high value low usage accounts', 'value-engagement matrix', or 'are our biggest accounts our happiest'.
  Boundary: this measures CRM-ARR versus engagement health. For expansion/upsell based on usage against PLAN
  LIMITS, use posthog-upsell-ready-accounts. It sets up the Salesforce/HubSpot source if needed and builds the
  insight end-to-end.
---

# Are our biggest accounts our happiest ones?

**Question:** Where does account ARR diverge from product engagement — which big accounts barely use us?
**For:** CS & Leadership · **Difficulty:** Intermediate · **Shape:** one dashboard
**Data sources:** PostHog groups (engagement per account) + Salesforce / HubSpot (ARR per account)

## What this produces

A saved PostHog insight plotting ARR against an engagement score per account, with the high-ARR / low-engagement
quadrant flagged — the accounts whose revenue is at risk, and the expansion targets.

## Workflow

First read `references/posthog-workflow.md` for the shared setup: confirm the PostHog MCP is connected, ensure the
CRM source (Salesforce or HubSpot) exists (secure connect-link flow if not), and learn the real schema. This
question is account/group-centric, so pay special attention to PostHog group types. Then:

### 1. Identify the pieces in this project

- **Account entity.** This works best when the user tracks a PostHog group (e.g. organization). Confirm the group
  type and how accounts are identified. If they only have persons, aggregate to a company via email domain.
- **ARR per account.** From the CRM: `salesforce_account` / `hubspot_companies` ARR (or an annualized amount) per
  account. Confirm the field.
- **Engagement score.** Define a simple, transparent score per account — e.g. active days in the last 30, distinct
  active users, or count of key events. Keep it explainable.
- **Join key.** CRM account ↔ PostHog group by name or domain (see join gotchas in the shared reference; lowercase
  and trim).

### 2. Build and validate the query

Adapt names and validate with `query-run`. Produce one row per account with ARR and engagement so it can be
plotted or flagged.

```sql
-- ARR vs engagement per account, flagging high-ARR / low-engagement.
-- Adapt: group type, CRM table/fields, engagement definition, and the account join key.
WITH engagement AS (
    SELECT
        e.person.properties.company_domain AS account,     -- or the group key
        count(DISTINCT toDate(e.timestamp)) AS active_days_30d,
        count(DISTINCT e.person.id) AS active_users_30d
    FROM events AS e
    WHERE e.timestamp >= now() - INTERVAL 30 DAY
    GROUP BY account
),
arr AS (
    SELECT lower(domain) AS account, sum(annual_recurring_revenue) AS arr
    FROM hubspot_companies
    GROUP BY lower(domain)
)
SELECT
    a.account,
    a.arr,
    coalesce(e.active_days_30d, 0) AS active_days_30d,
    coalesce(e.active_users_30d, 0) AS active_users_30d,
    if(a.arr >= quantile(0.75)(a.arr) OVER () AND coalesce(e.active_days_30d, 0) <= 5,
       'high ARR / low engagement', 'ok') AS flag
FROM arr AS a
LEFT JOIN engagement AS e ON a.account = e.account
ORDER BY a.arr DESC
```

Engagement scoring is a judgment call — keep it simple and tell the user exactly how you defined it so the flags
are trustworthy.

### 3. Save the insight

Save as a SQL/HogQL insight named "ARR vs engagement by account" (a table works; a scatter is ideal if the user
wants the quadrant visual). Offer to put it on a dashboard. Return the URL and name the specific high-ARR /
low-engagement accounts.

## Self-driving development (offer this)

With ARR mapped against real engagement, the user can protect at-risk revenue and find expansion targets. Offer to
help build cohorts for the flagged quadrants and trigger tailored CS outreach or in-product nudges — catching big
accounts before they wobble.
