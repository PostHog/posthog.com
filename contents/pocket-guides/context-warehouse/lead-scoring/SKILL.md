---
name: posthog-lead-scoring
description: >
  Score CRM leads (HubSpot/Salesforce) by recent product usage and surface the warmest leads sales hasn't contacted
  yet, a product-qualified-lead list saved as a reusable PostHog insight. Use this whenever someone wants
  product-qualified leads (PQLs), a lead score based on product usage, the warmest leads to prioritize, engaged
  signups sales should call, or a usage-based ranking of leads joined to the CRM. Triggers on phrasings like 'which
  leads should sales call', 'product qualified leads', 'score my leads by usage', 'hottest leads we have not
  contacted', 'PQL list', or 'which signups are sales-ready'. Boundary: this ranks individual leads to action now.
  For analyzing which onboarding STEPS drive trial-to-paid conversion in aggregate, use
  posthog-onboarding-conversion. It sets up the HubSpot/Salesforce source if needed and builds the insight
  end-to-end.
---

# Which leads deserve the sales team's time?

**Question:** Which leads are most product-engaged — especially ones sales hasn't contacted yet?
**For:** Sales & Growth · **Difficulty:** Intermediate · **Shape:** a scored query
**Data sources:** PostHog events (key product actions) + HubSpot / Salesforce (lead records)

## What this produces

A saved PostHog insight scoring CRM leads by recent product usage and highlighting the most engaged ones that
sales hasn't yet reached — a product-qualified-lead list.

## Workflow

First read `references/posthog-workflow.md` for the shared setup: confirm the PostHog MCP is connected, ensure the
CRM source (HubSpot or Salesforce) exists (secure connect-link flow if not), and learn the real schema. Then:

### 1. Identify the pieces in this project

- **Key product actions.** With the user, define the handful of events that signal buying intent / real usage
  (`event-definitions-list`). Assign each a weight, or keep it simple (count of key events, recency + frequency).
- **Lead records.** From the CRM: lead/contact rows with email, owner, and a "contacted"/lifecycle field so you can
  tell who sales has already worked. Confirm the field that means "not yet contacted".
- **Join key.** CRM lead ↔ PostHog person by `lower(email)` (see join gotchas in the shared reference).

### 2. Build and validate the query

Adapt names and validate with `query-run`. Produce one scored row per lead, filtered/sorted to surface warm,
uncontacted leads.

```sql
-- Score leads by recent product usage; surface the warmest uncontacted ones.
-- Adapt: key events + weights, the CRM table/fields, and the "contacted" flag.
WITH usage_score AS (
    SELECT
        lower(person.properties.email) AS email,
        sum(multiIf(event = 'created_project', 5,
                    event = 'invited_teammate', 4,
                    event = 'ran_query', 2, 1)) AS score,
        max(timestamp) AS last_seen
    FROM events
    WHERE timestamp >= now() - INTERVAL 30 DAY
      AND event IN ('created_project', 'invited_teammate', 'ran_query', 'viewed_pricing')
    GROUP BY lower(person.properties.email)
)
SELECT
    l.email,
    l.lead_owner,
    us.score,
    us.last_seen,
    l.lifecycle_stage
FROM hubspot_contacts AS l
INNER JOIN usage_score AS us ON lower(l.email) = us.email
WHERE l.lifecycle_stage NOT IN ('customer')          -- still a lead
  AND (l.last_contacted IS NULL OR l.last_contacted < now() - INTERVAL 30 DAY)  -- "not contacted yet"
ORDER BY us.score DESC
LIMIT 100
```

Keep the scoring transparent and let the user tune weights — a lead score sales doesn't understand won't get used.
Note that this ranks by product signal only; a real PQL model may blend in firmographics.

### 3. Save the insight

Save as a SQL/HogQL table insight named "Product-qualified leads (uncontacted)", documenting the scoring weights
and window. Return the URL and name the top few leads to call today.

## Self-driving development (offer this)

With leads scored by real product usage, the user can catch the warmest ones as they heat up. Offer to help set up
an alert or a cohort that flags a lead when its score crosses a threshold — filling the pipeline while they sleep.
(Pushing the score back into the CRM is a separate reverse-ETL step; offer to explain it.)
