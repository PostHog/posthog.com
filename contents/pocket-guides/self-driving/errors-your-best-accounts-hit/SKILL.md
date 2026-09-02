---
name: signals-scout-errors-by-account-value
description: >
  Finds error tracking issues concentrated in commercially significant accounts – the ones a
  count-ranked issue list buries – and files each as a report weighted by what the account is
  worth rather than by how often it fired.
allowed_tools:
  - emit_report
  - edit_report
---

# Errors your best accounts hit

Rank issues by whose money is behind them, not by how loudly they fire.

Narrower than `signals-scout-error-tracking`, which watches the whole exception surface – bursts,
stuck loops, multi-fingerprint clusters, status regressions – and discriminates on the ratio
between `count` and `distinct_users`. That scout answers "is this reaching real people". This one
adds the half it cannot see: **which people**, and what they pay.

It also sits beside `signals-scout-customer-analytics`, which already watches per-account health
weighted by commercial ownership – but watches engagement, not errors. Borrow its join, not its
subject.

## Discriminator

Emit a report when an issue's exceptions concentrate in accounts carrying commercial weight, and
that concentration is not explained by those accounts simply being your busiest.

Concretely, all three:

- **(a)** The issue's affected accounts skew to accounts with a `stripe_customer_id`, an assigned
  `csm` / `account_executive`, or a plan tier above your floor.
- **(b)** Their share of the issue is meaningfully above their share of your overall traffic. An
  account that is 40% of your events being 40% of an issue is not a finding.
- **(c)** The issue is live – firing in the last 24h, not a resolved issue's tail.

Write nothing when the issue is spread evenly across the fleet. That is a broad regression and it
belongs to `signals-scout-error-tracking`, which will already have it.

Write nothing when a single account is the entire issue **and** it is one client retrying. High
`count`, low `distinct_users`, one account is a stuck loop, not a customer-impacting bug – the
canonical error scout's table already names that shape.

## Getting oriented

Four reads cold-start a run:

- `scout-scratchpad-search` (`text=account-value`, then `text=exception`) – the group-type index
  you discovered last time, accounts already reported on, and issues ruled out as fleet-wide.
- `scout-project-profile-get` – confirm `error_tracking` is in `products_in_use` and `$exception`
  has fresh 24h volume. Nothing fresh, close out.
- `inbox-reports-list` – an issue you have reported on before that is still firing is an **edit**,
  not a new report.
- **Discover the account group index.** Do not assume one. Which `$group_N` the account roster
  keys to varies by project:

  ```sql
  SELECT countIf(external_id IN (SELECT DISTINCT $group_0 FROM events WHERE timestamp > now() - INTERVAL 30 DAY AND $group_0 != '')) AS g0,
         countIf(external_id IN (SELECT DISTINCT $group_1 FROM events WHERE timestamp > now() - INTERVAL 30 DAY AND $group_1 != '')) AS g1,
         countIf(external_id IN (SELECT DISTINCT $group_2 FROM events WHERE timestamp > now() - INTERVAL 30 DAY AND $group_2 != '')) AS g2,
         count() AS total
  FROM system.accounts WHERE external_id != ''
  ```

  Record the winning index as `pattern:account-value:group-type` so later runs skip this. No
  overlap on any index means the roster is not joined to events – close out `join-unlinked` and
  say so, because that is a setup problem worth a human knowing about.

## The query that does the work

Issues by account, against each account's share of overall traffic. Substitute the discovered
index for `$group_1`.

```sql
WITH
  fleet AS (
    SELECT $group_1 AS gk, count() AS all_events
    FROM events
    WHERE timestamp > now() - INTERVAL 7 DAY AND $group_1 != ''
    GROUP BY gk
  ),
  errs AS (
    SELECT properties.$exception_issue_id AS issue, $group_1 AS gk,
           count() AS hits, uniq(distinct_id) AS people
    FROM events
    WHERE event = '$exception'
      AND timestamp > now() - INTERVAL 7 DAY
      AND $group_1 != ''
    GROUP BY issue, gk
  )
SELECT e.issue, a.name, e.hits, e.people,
       f.all_events,
       round(e.hits / sum(e.hits) OVER (PARTITION BY e.issue), 3) AS issue_share,
       round(f.all_events / sum(f.all_events) OVER (), 4) AS fleet_share
FROM errs e
INNER JOIN system.accounts a ON a.external_id = e.gk
INNER JOIN fleet f ON f.gk = e.gk
WHERE JSONExtractString(a.properties, 'stripe_customer_id') != ''
ORDER BY e.issue, issue_share DESC
```

`issue_share` well above `fleet_share` is the finding. Equal is noise.

## What a good report says

Name the issue, name the accounts, and give the reader the comparison that makes it a finding –
their share of the issue against their share of your traffic. A report that says "this error hit
enterprise customers" without that ratio is not actionable, because every error hits some
customers.

Say what you cannot see. You are ranking by commercial weight, which is a proxy for impact, not
impact itself. An account hitting an error on a page nobody uses is still an account hitting an
error.

## Schedule

Daily. Account concentration shifts on the timescale of deploys, not months – but it only writes
when a live issue skews, so most days are silent.
