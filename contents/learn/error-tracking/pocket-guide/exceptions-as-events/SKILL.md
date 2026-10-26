---
name: error-tracking-errors-by-revenue
description: >
  Build a PostHog insight that joins exceptions to your accounts and revenue, such as the new
  errors ranked by the MRR of the accounts they hit. Find the events, find the key that joins it,
  pick a chart, then adapt the example query to this project.
---

# Rank errors by what they put at risk

Read the current docs first. Every PostHog docs URL returns Markdown if you append `.md`:

- https://posthog.com/docs/data-warehouse/sql.md
- https://posthog.com/docs/product-analytics/group-analytics.md
- https://posthog.com/docs/data-warehouse/warehouse-properties.md

If the user hasn't said what to rank by, ask: MRR, ARR, plan, or seats. Then work through these
steps in order.

## 1. Find the events and properties

You need three things. Check that each one exists in this project before you write a query.

- **Exceptions.** `$exception` events. Each one has an `issue_id`, and
  `properties.$exception_list[1]` holds the error's type and message.
- **The account each exception came from.** Group types are defined by each project, so list this
  project's group types and find the one that represents an account, such as `company`. Note its
  index. If the project has no groups, look for an account property on persons, such as a company
  ID or email domain.
- **What each account is worth.** A property on that group, such as `mrr`, `arr`, or `plan`. Check
  that most accounts have a value.

If no account has a value, stop. Tell the user that warehouse properties can sync one from Stripe
or their database. Don't guess one.

## 2. Find the key that joins them

Each event's `$groups` property maps the project's group types to keys, such as
`{"company": "acme"}`. In HogQL, the same keys are the columns `$group_0` to `$group_4`, and the
index from step 1 picks the column.

- Check that most `$exception` events from the last 7 days have that key. If they don't, the SDK
  doesn't set the group when it captures exceptions. Tell the user, and point them to group
  analytics for their SDK.
- Join exceptions to the `groups` table on `groups.key` and `groups.index`.
- Count each account once per error. An account that hits an error 500 times is still one account.

## 3. Pick the shape

- One value per error reads best as a bar chart. In the SQL editor, open **Visualization**, pick
  **Horizontal bar chart**, and put the error label on the X-axis and the value on the Y-axis.
- Label each bar with the exception type and the start of its message. Issue IDs are unreadable on
  an axis.
- Show the top 10.
- Match the time window to the question. "New errors" means first seen in the last 7 days. To rank
  every error, drop that filter.

## 4. Adapt the example

This query ranks the errors first seen in the last 7 days by the MRR of the accounts they hit. It
assumes the account group type has index 0 and an `mrr` property. Change the group index, the
property, and the time windows to match what you found in steps 1 and 2. Don't run it unchanged.

```sql
WITH issues AS (
    SELECT
        issue_id,
        min(timestamp) AS first_seen,
        concat(
            any(properties.$exception_list[1].type),
            ': ',
            substring(any(properties.$exception_list[1].value), 1, 45)
        ) AS error
    FROM events
    WHERE event = '$exception'
        AND timestamp >= now() - INTERVAL 21 DAY
    GROUP BY issue_id
    HAVING first_seen >= now() - INTERVAL 7 DAY
),
affected AS (
    SELECT DISTINCT issue_id, $group_0 AS account
    FROM events
    WHERE event = '$exception'
        AND timestamp >= now() - INTERVAL 7 DAY
        AND notEmpty($group_0)
        AND issue_id IN (SELECT issue_id FROM issues)
)
SELECT
    i.error AS error,
    round(sum(toFloat(g.properties.mrr))) AS mrr_at_risk
FROM affected a
JOIN issues i ON i.issue_id = a.issue_id
LEFT JOIN groups g ON g.key = a.account AND g.index = 0
GROUP BY i.error
ORDER BY mrr_at_risk DESC
LIMIT 10
```

Run it and check the result. The values shouldn't all be zero, and the labels should be readable.
Then save it as an insight.

## Finally

Report the top three errors and what they put at risk. Say that the value is what those accounts
pay, not revenue the error lost.
