---
title: Commission queries
sidebar: Handbook
showTitle: true
---

These SQL queries let you check your own commission or bonus number. The rules behind each number are on the [commissions](/handbook/growth/revops/commissions) page.

## Before you start

1. Open the <PrivateLink url="https://us.posthog.com/project/2/sql">SQL editor</PrivateLink>.
2. Paste a query and change `you@posthog.com` to your email.
3. Run it. You don't need to change the date.

Every query picks the quarter for you:

| Query uses | Quarter | Date in the query |
|---|---|---|
| Live data | This quarter | `toStartOfQuarter(today())` |
| A snapshot | Last quarter | `toStartOfQuarter(today() - INTERVAL 3 MONTH)` |

To look up a different quarter, replace the date with the quarter's first day, for example `toDate('2026-04-01')` for Q2 2026.

Use live data for this quarter only. Live views rebuild from today's data, so a past quarter can drift from what you were paid. For past quarters, use the snapshot queries. Snapshots start in Q3 2026.

Ratios such as `attainment` and `nrr` are decimals: 1.2 means 120%.

## Views

All views are in the **RevOps** folder of the SQL editor. Each view's header comment and column descriptions explain the rule it applies, so read them before writing your own query.

| View | Data | One row per | Filter to yourself |
|---|---|---|---|
| <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a0fe0d-0967-0000-9c94-487f6c01d223">comp_tae_quota_lines</PrivateLink> | Live | TAE credit line | `quarter_start`, `tae_email` |
| <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a0fd97-f31c-0000-84d2-1c1ccc62644d">comp_tam_payout_lines</PrivateLink> | Live | TAM payout line (one monthly invoice or one annual contract) | `quarter_start`, `tam_email` |
| <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a0fe89-cc84-0000-ae66-ff01c65bab04">comp_bdr_sqo_lines</PrivateLink> | Live | SQO | `quarter_start`, `bdr_email` |
| <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a14103-6b88-0000-e989-dafe23cb58c2">comp_account_lines_live</PrivateLink> | Live | Account line per quarter, every team | `quarter_start`, `team`, `person_email` |
| <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a1023f-e022-0000-ef08-18cffc37554f">comp_annual_deals</PrivateLink> | Live | Annual contract | `opportunity_id` |
| <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a0fd17-3e5a-0000-2b84-92633966a379">comp_quotas</PrivateLink> | Live | Person per quarter | `team`, `quarter_start`, `email` |
| <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a0fd30-24d0-0000-905e-244923567e9c">comp_tam_book</PrivateLink> | Live | TAM assignment per quarter | `quarter_start`, `tam_email` |
| <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a0fd15-14f3-0000-2a3b-a69f95d9ed46">comp_quarters</PrivateLink> | Live | Quarter | `quarter_label` |
| <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a14104-e22f-0000-4b06-aff178434df0">comp_account_snapshots</PrivateLink> | Snapshot | Account line per quarter | `quarter_start`, `team`, `person_email` |
| <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a1412c-20f9-0000-17ab-cf934c4d6b1a">comp_quota_snapshots</PrivateLink> | Snapshot | Person per quarter | `quarter_start`, `team`, `person_email` |

Three things to know:

- Always filter by `team`. Some people have rows for more than one team.
- `comp_amount` has a different unit for each team: USD for TAE and TAM, SQOs for BDR, and ARR for CSM. Never add it across teams.
- The `details` column holds JSON. Read one key with `JSONExtractString(details, 'rule_applied')`.

## Everyone

### My quota this quarter

- **Use it when** – you want to know your quota
- **Data** – live, this quarter
- **Returns** – one row per team you're on

```sql
SELECT team, quarter_start, quota, quarter_quota, monthly_quota
FROM comp_quotas
WHERE email = 'you@posthog.com'
  AND quarter_start = toStartOfQuarter(today())
```

`quarter_quota` is in dollars for TAEs, TAMs, and TAM leads, and in SQOs for BDRs. A blank quota means your row on the quota sheet isn't filled in yet. Ask in #team-revops.

### My result for last quarter

- **Use it when** – you want the number you were paid on
- **Data** – snapshot, last quarter
- **Returns** – one row per team, with your result in that team's unit

```sql
SELECT s.team AS team,
       any(s.comp_unit) AS unit,
       count() AS lines,
       round(sum(s.comp_amount), 2) AS result,
       round(sum(s.base_amount), 2) AS base,
       any(q.quarter_quota) AS quota,
       multiIf(
           s.team = 'CSM', round(sum(s.comp_amount) / nullIf(sum(s.base_amount), 0), 3),
           s.team IN ('TAE', 'BDR'), round(sum(s.comp_amount) / nullIf(any(q.quarter_quota), 0), 3),
           NULL
       ) AS attainment_or_nrr
FROM comp_account_snapshots AS s
LEFT JOIN comp_quota_snapshots AS q
    ON q.person_email = s.person_email
   AND q.team = s.team
   AND q.quarter_start = s.quarter_start
WHERE s.quarter_start = toStartOfQuarter(today() - INTERVAL 3 MONTH)
  AND s.person_email = 'you@posthog.com'
GROUP BY s.team
```

| Team | `result` | `attainment_or_nrr` |
|---|---|---|
| TAE | Your credit | Credit ÷ quota |
| BDR | Your SQOs | SQOs ÷ quota |
| TAM | Your payout in dollars | Blank. TAMs have no attainment. |
| CSM | Your counted ARR | Your NRR: counted ARR ÷ base ARR |

TAM leads don't appear here yet. Use the dashboard tile. See [TAM leads](#tam-leads).

### My adjustments

- **Use it when** – you want to see manual changes made to your lines
- **Data** – the adjustments tab of the quota sheet
- **Returns** – one row per adjustment credited to you

```sql
SELECT quarter, team, account_name, action, amount, move_to_quarter, reason, approved_by_email
FROM googlesheets.sales.adjustments
WHERE lower(credit_to_email) = 'you@posthog.com'
ORDER BY quarter DESC
```

This covers TAE, TAM, and BDR adjustments. See [adjustments](/handbook/growth/revops/commissions#commission-adjustments) for what each action does.

### Live versus snapshot for my lines

- **Use it when** – your dashboard and your paid number don't match
- **Data** – live and snapshot, last quarter
- **Returns** – only the lines that differ

```sql
SELECT coalesce(l.line_id, s.line_id) AS line_id,
       coalesce(l.account_name, s.account_name) AS account_name,
       s.status AS snapshot_status,
       l.status AS live_status,
       round(s.comp_amount, 2) AS snapshot_amount,
       round(l.comp_amount, 2) AS live_amount,
       round(coalesce(l.comp_amount, 0) - coalesce(s.comp_amount, 0), 2) AS difference
FROM (
    SELECT line_id, account_name, status, comp_amount
    FROM comp_account_lines_live
    WHERE person_email = 'you@posthog.com'
      AND quarter_start = toStartOfQuarter(today() - INTERVAL 3 MONTH)
) AS l
FULL OUTER JOIN (
    SELECT line_id, account_name, status, comp_amount
    FROM comp_account_snapshots
    WHERE person_email = 'you@posthog.com'
      AND quarter_start = toStartOfQuarter(today() - INTERVAL 3 MONTH)
) AS s
    ON s.line_id = l.line_id
WHERE abs(difference) >= 0.01
   OR coalesce(s.status, '') != coalesce(l.status, '')
ORDER BY abs(difference) DESC
```

No rows means the two match. You're paid from the snapshot. If a difference looks wrong, post it in #team-revops.

### Why a line paid what it paid

- **Use it when** – you want the rule behind each line from last quarter
- **Data** – snapshot, last quarter
- **Returns** – one row per line

```sql
SELECT team, account_name, line_type, status, base_amount, comp_amount,
       JSONExtractString(details, 'rule_applied') AS rule_applied
FROM comp_account_snapshots
WHERE quarter_start = toStartOfQuarter(today() - INTERVAL 3 MONTH)
  AND person_email = 'you@posthog.com'
ORDER BY comp_amount DESC
```

For a TAM line, read `exclusion_reason` from `details` the same way.

## TAE

### My deals this quarter

- **Use it when** – a deal is missing, or you want to see how its credit was calculated
- **Data** – live, this quarter
- **Returns** – one row per annual contract or monthly-paying customer credited to you

```sql
SELECT account_name, deal_type, status, credit, at_risk_credit, calc_note, reason
FROM comp_tae_quota_lines
WHERE quarter_start = toStartOfQuarter(today())
  AND tae_email = 'you@posthog.com'
ORDER BY credit DESC
```

| Column | What it tells you |
|---|---|
| `credit` | What this deal adds to your quota credit |
| `at_risk_credit` | The part of `credit` that's clawed back if the invoice isn't paid |
| `calc_note` | The math, in one line |
| `reason` | Why the deal is at risk, excluded, or counted in another quarter |

### My attainment this quarter

- **Use it when** – you want your total credit and attainment so far
- **Data** – live, this quarter
- **Returns** – `total_credit`, `attainment`

```sql
SELECT
    sum(credit) AS total_credit,
    total_credit / (
        SELECT any(quarter_quota) FROM comp_quotas
        WHERE team = 'TAE'
          AND quarter_start = toStartOfQuarter(today())
          AND email = 'you@posthog.com'
    ) AS attainment
FROM comp_tae_quota_lines
WHERE quarter_start = toStartOfQuarter(today())
  AND tae_email = 'you@posthog.com'
```

This should match the **Attainment** tile on the dashboard. If it doesn't, post both numbers in #team-revops.

### My at-risk invoices

- **Use it when** – you want to chase unpaid invoices before the next cutoff
- **Data** – live, this quarter and last quarter
- **Returns** – one row per at-risk deal, soonest due first

```sql
SELECT quarter_start, account_name, deal_type,
       round(at_risk_credit, 2) AS at_risk_credit, due_date, reason
FROM comp_tae_quota_lines
WHERE tae_email = 'you@posthog.com'
  AND status = 'At risk'
  AND quarter_start >= toStartOfQuarter(today() - INTERVAL 3 MONTH)
ORDER BY due_date
```

Last quarter's at-risk deals are clawed back if they're still unpaid at the next cutoff.

### My attainment by quarter

- **Use it when** – you want your paid attainment for every past quarter
- **Data** – snapshot, all quarters
- **Returns** – one row per quarter

```sql
SELECT c.quarter_start AS quarter_start,
       c.credit AS credit,
       q.quarter_quota AS quota,
       round(c.credit / q.quarter_quota, 3) AS attainment
FROM (
    SELECT quarter_start, person_email, sum(comp_amount) AS credit
    FROM comp_account_snapshots
    WHERE team = 'TAE' AND person_email = 'you@posthog.com'
    GROUP BY quarter_start, person_email
) AS c
INNER JOIN (
    SELECT quarter_start, person_email, quarter_quota
    FROM comp_quota_snapshots
    WHERE team = 'TAE'
) AS q
    ON q.quarter_start = c.quarter_start AND q.person_email = c.person_email
ORDER BY c.quarter_start
```

If you have no quota row for a quarter, that quarter won't appear.

## TAE leads

### My team's attainment this quarter

- **Use it when** – you want your team's roll-up against your lead quota
- **Data** – live, this quarter
- **Returns** – your team's credit, lead quota, and attainment

```sql
WITH team AS (
    SELECT lower(u.email) AS tae_email, lower(lu.email) AS lead_email
    FROM salesforce.user AS u
    JOIN salesforce.userrole AS r ON r.id = u.user_role_id
    JOIN salesforce.user AS lu ON lu.user_role_id = r.parent_role_id
    WHERE r.name = 'Technical Account Executive' AND lu.is_active
)
SELECT t.lead_email AS lead_email,
       count(DISTINCT l.tae_email) AS taes,
       round(sum(l.credit), 2) AS team_credit,
       (
           SELECT any(quarter_quota) FROM comp_quotas
           WHERE team = 'TAE LEAD'
             AND quarter_start = toStartOfQuarter(today())
             AND email = 'you@posthog.com'
       ) AS lead_quota,
       round(team_credit / lead_quota, 3) AS attainment
FROM comp_tae_quota_lines AS l
JOIN team AS t ON t.tae_email = lower(l.tae_email)
WHERE l.quarter_start = toStartOfQuarter(today())
  AND t.lead_email = 'you@posthog.com'
GROUP BY t.lead_email
```

Your team comes from the Salesforce role hierarchy: the TAEs whose role reports to yours. `lead_quota` is blank until your TAE lead row is on the quota sheet.

## TAM

### My payout lines this quarter

- **Use it when** – a customer pays less than you expect, or a line pays $0
- **Data** – live, this quarter
- **Returns** – one row per paid monthly invoice or annual contract in your book

```sql
SELECT account_name, line_type, status, payout, exclusion_reason
FROM comp_tam_payout_lines
WHERE quarter_start = toStartOfQuarter(today())
  AND tam_email = 'you@posthog.com'
ORDER BY payout DESC
```

If `payout` is $0, `exclusion_reason` tells you why:

| exclusion_reason | What it means |
|---|---|
| `left_book` | The customer wasn't in a TAM book on the last day of the quarter |
| `invoice_before_book_date` | The invoice is from before you were assigned the customer |
| `deal_before_book_date` | No TAM was assigned to the customer on the close date |
| `not_opportunity_owner` | You aren't the Salesforce opportunity owner |
| `not_on_tam_roster` | You weren't on the TAM roster that quarter |
| `credit_covered` | Paid with prepaid credit, account balance, or a credit note |
| `paid_out_of_band` | Marked as paid outside Stripe |
| `overdue_invoice` | The contract invoice was overdue at the cutoff |
| `contract_voided` | A credit note canceled the contract |

### My total payout this quarter

- **Use it when** – you want one number for this quarter so far
- **Data** – live, this quarter
- **Returns** – total payout, the at-risk part, and line counts

```sql
SELECT round(sum(payout), 2) AS total_payout,
       round(coalesce(sumIf(payout, status = 'at_risk'), 0), 2) AS of_which_at_risk,
       count() AS lines,
       countIf(payout = 0) AS lines_paying_zero
FROM comp_tam_payout_lines
WHERE quarter_start = toStartOfQuarter(today())
  AND tam_email = 'you@posthog.com'
```

### My at-risk invoices

- **Use it when** – you want to chase unpaid invoices before the next cutoff
- **Data** – live, this quarter and last quarter
- **Returns** – one row per at-risk line, soonest due first

```sql
SELECT quarter_start, account_name, line_type, round(payout, 2) AS payout,
       at_risk_reason, earliest_unpaid_due_date, clawback_status
FROM comp_tam_payout_lines
WHERE tam_email = 'you@posthog.com'
  AND status = 'at_risk'
  AND quarter_start >= toStartOfQuarter(today() - INTERVAL 3 MONTH)
ORDER BY earliest_unpaid_due_date
```

### My book this quarter

- **Use it when** – you want to check which accounts are in your book
- **Data** – live, this quarter
- **Returns** – one row per account, with assignment dates

```sql
SELECT b.org_id AS org_id,
       any(p.account_name) AS account_name,
       any(b.assigned_date) AS assigned_date,
       any(b.unassigned_date) AS unassigned_date,
       any(b.in_book_at_quarter_end) AS in_book_at_quarter_end
FROM comp_tam_book AS b
LEFT JOIN comp_tam_payout_lines AS p ON p.org_id = b.org_id
WHERE b.quarter_start = toStartOfQuarter(today())
  AND b.tam_email = 'you@posthog.com'
GROUP BY b.org_id
ORDER BY account_name
```

`in_book_at_quarter_end` = 0 means the account left your book, so it won't pay this quarter. A blank `account_name` means the account has no payout line yet.

### My payout by quarter

- **Use it when** – you want your paid total for every past quarter
- **Data** – snapshot, all quarters
- **Returns** – one row per quarter

```sql
SELECT quarter_start, count() AS lines, round(sum(comp_amount), 2) AS payout
FROM comp_account_snapshots
WHERE team = 'TAM' AND person_email = 'you@posthog.com'
GROUP BY quarter_start
ORDER BY quarter_start
```

The TAM total is a dollar payout. Don't divide it by quota.

## TAM leads

Use the **TAM Lead attainment (closed-won, PLS West / East)** and **TAM Lead detail: in and out of the closed-won total, by account** tiles on the <PrivateLink url="https://us.posthog.com/project/2/dashboard/2066634">TAM Compensation (2026 Comp Model)</PrivateLink> dashboard. Snapshots don't include TAM lead lines yet, so there's no query for past quarters.

## CSM

### My accounts this quarter

- **Use it when** – you want to check your book account by account
- **Data** – live, this quarter
- **Returns** – one row per account counted in your NRR

```sql
SELECT account_name, status, base_amount, comp_amount,
       JSONExtractString(details, 'rule_applied') AS rule_applied
FROM comp_account_lines_live
WHERE team = 'CSM'
  AND quarter_start = toStartOfQuarter(today())
  AND person_email = 'you@posthog.com'
ORDER BY base_amount DESC
```

- `base_amount` is the account's base ARR. `comp_amount` is its counted ARR this quarter.
- `status` is Counted or Grace. `rule_applied` explains a churn or a grace drop.

### My NRR so far this quarter

- **Use it when** – you want one number for this quarter so far
- **Data** – live, this quarter
- **Returns** – accounts, base ARR, counted ARR, and NRR

```sql
SELECT person_email,
       count() AS accounts,
       round(sum(base_amount), 2) AS base_arr,
       round(sum(comp_amount), 2) AS counted_arr,
       round(counted_arr / base_arr, 3) AS nrr
FROM comp_account_lines_live
WHERE team = 'CSM'
  AND quarter_start = toStartOfQuarter(today())
  AND person_email = 'you@posthog.com'
GROUP BY person_email
```

### My NRR by quarter

- **Use it when** – you want your paid NRR for every past quarter
- **Data** – snapshot, all quarters
- **Returns** – one row per quarter

```sql
SELECT quarter_start,
       count() AS accounts,
       round(sum(base_amount), 2) AS base_arr,
       round(sum(comp_amount), 2) AS counted_arr,
       round(counted_arr / base_arr, 3) AS nrr
FROM comp_account_snapshots
WHERE team = 'CSM' AND person_email = 'you@posthog.com'
GROUP BY quarter_start
ORDER BY quarter_start
```

`base_arr` is what your accounts actually spent last quarter. `counted_arr` is the ARR that counts this quarter.

## CSM leads

### My team's NRR this quarter

- **Use it when** – you want your team's combined NRR
- **Data** – live, this quarter
- **Returns** – one row per CS team (EU and NA)

```sql
SELECT coalesce(nullIf(t.team, ''), 'unknown') AS cs_team,
       count(DISTINCT l.person_email) AS csms,
       count() AS accounts,
       round(sum(l.base_amount), 2) AS base_arr,
       round(sum(l.comp_amount), 2) AS counted_arr,
       round(counted_arr / base_arr, 3) AS nrr
FROM comp_account_lines_live AS l
LEFT JOIN CS_name_email AS t ON t.csm = l.person_email
WHERE l.team = 'CSM'
  AND l.quarter_start = toStartOfQuarter(today())
GROUP BY cs_team
ORDER BY cs_team
```

Each CSM's team comes from the `CS_name_email` table, the same one the CSM dashboard uses. An `unknown` row means a CSM is missing from that table. Ask RevOps to add them.

## BDR

### My SQOs this quarter

- **Use it when** – you want to check every SQO is credited to you, and in which month
- **Data** – live, this quarter
- **Returns** – one row per SQO

```sql
SELECT month_start, account_name, opportunity_name, credit_source
FROM comp_bdr_sqo_lines
WHERE quarter_start = toStartOfQuarter(today())
  AND bdr_email = 'you@posthog.com'
ORDER BY month_start
```

Missing an SQO? Check the opportunity's lead source is **Outbound**, and that you logged an Outbound task on the account. If both are right, post it in #team-revops.

`credit_source` shows how the SQO was credited:

- **Outbound lead task** – By the rule
- **Manual credit** – By an [adjustment](/handbook/growth/revops/commissions#commission-adjustments)

### My attainment this quarter

- **Use it when** – you want your SQOs against quota so far
- **Data** – live, this quarter
- **Returns** – SQOs, quarterly quota, and attainment

```sql
SELECT count() AS sqos,
       (
           SELECT any(quarter_quota) FROM comp_quotas
           WHERE team = 'BDR'
             AND quarter_start = toStartOfQuarter(today())
             AND email = 'you@posthog.com'
       ) AS quarterly_quota,
       round(sqos / quarterly_quota, 3) AS attainment
FROM comp_bdr_sqo_lines
WHERE quarter_start = toStartOfQuarter(today())
  AND bdr_email = 'you@posthog.com'
```
