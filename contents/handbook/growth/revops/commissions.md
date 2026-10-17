---
title: Sales compensation
sidebar: Handbook
showTitle: true
---

This page is the source of truth for how we calculate commission credit for TAEs, TAMs, TAM leads and BDRs. Your team page covers your plan: OTE split, ramp and book rules. This page covers the math. If you have the inputs, you can work out your number yourself.

Our examples use Spike (TAE), Bramble (TAM), Thistle (TAM lead) and Quill (BDR). The customers are made up. No real hedgehogs were invoiced.

## Terms

| Term | What it means |
|---|---|
| Annual contract | A customer who prepays for 1 year or more. |
| Monthly-paying customer | A customer with no annual contract, who pays a monthly invoice. |
| Close date | The date the deal is closed-won in Salesforce. |
| Effective date | The later of the signature date and the contract start date. See [which quarter an annual contract counts in](#which-quarter-an-annual-contract-counts-in). |
| Cutoff | The 14th of the month after the quarter ends: January 14, April 14, July 14 or October 14. Payment status at the end of that day is final for the quarter. |
| Real cash | Money that came in through Stripe by card, bank debit or bank transfer, less refunds. Prepaid credit, account balance and credit notes are not real cash. |
| Deal value | What an annual contract is worth for credit, after discounts. See [deal value](#deal-value). |
| Prior value | The value of the annual contract that a renewal replaces. This is the Salesforce "Up for renewal" amount. If that field is empty, it is the prior contract's discounted ARR. |
| Growth | Deal value minus prior value. It is never below $0. |
| Quota sheet | Who is on which team each quarter, and their quota. To change a quota or a team, edit the sheet, not the dashboard. |

All dates are US/Pacific.

## What earns credit

| | Annual contracts | Monthly-paying customers | SQOs |
|---|---|---|---|
| TAE | Deal value or growth | Change in monthly real cash, quarter over quarter | — |
| TAM | 10% of the annual base, plus 6.7% of growth on renewals and expansions | 5% of each paid monthly invoice | — |
| TAM lead | Deal value of your team's annual contracts | Your team's paid monthly invoices | — |
| BDR | — | — | Each SQO you source |

Self-serve customers never count.

### Annual contracts

These rules apply to TAE, TAM and TAM lead credit.

#### Which quarter an annual contract counts in

1. Take the effective date: the later of the signature date and the contract start date.
2. The contract counts in the quarter of the effective date. We pay it in that quarter too.
3. **Backdated contracts:** if the effective date is in an earlier quarter than the close date, we use the close date.
   - A customer can backdate a contract to line up with their billing. That date can fall in a quarter that is already closed. The close date keeps the contract in a quarter that is still open.
   - This applies to contracts that close on or after July 1, 2026.

| Customer | Close date | Signature / start date | Date we use | Quarter |
|---|---|---|---|---|
| Hoglet Labs | July 15 | June 27 | July 15 (close date) | Q3 |
| Beetle Box | September 29 | October 20 | October 20 (effective date) | Q4 |

> Hoglet Labs closes on July 15 but wants its contract to start June 27 to match its billing. June is in Q2, which is closed, so the contract counts in Q3. Beetle Box closes on September 29 but isn't ready to leave its burrow until October 20, so it counts in Q4.

#### Deal value

Deal value is always after discounts, never the list price.

| Contract | Deal value |
|---|---|
| 1 year | The Salesforce amount after discounts |
| Multi-year, paid upfront | The full contract value after discounts |
| Multi-year, not paid upfront | The year-1 value only, at the standard 1-year discount |

We check every contract invoice against Salesforce. If the two differ by more than 5%, the "Data checks" tile flags it, and RevOps fixes the record before the cutoff.

A multi-year contract is **paid upfront** if the customer is billed for the whole contract at the start, not year by year. That means one of these is true:
- The full contract value is invoiced, and every invoice is due within 45 days of the effective date.
- The full contract value is already paid by the cutoff.
- The contract type is "Annual contract - upfront pay".

Paying on time is a separate check. An upfront invoice still follows the [payment status](#payment-status) rules.

**Buyout deals**: we remove the free buyout credit first. Deal value = (list − one-time credit) × (1 − discount).

> Spiny Software signs for 3 years at $100,000 list per year and pays every year. The standard 1-year discount is 20%, so the deal value is $80,000, not $240,000.
>
> Leaf Pile Logistics has a $100,000 list price, a $20,000 buyout credit and a 25% discount: ($100,000 − $20,000) × 0.75 = $60,000.

#### Deal type

The deal type decides how much of the deal value counts.

| Type | What it is | What counts |
|---|---|---|
| Net new | No prior annual contract. This includes a monthly-paying customer who moves to an annual contract. | The deal value |
| Renewal | Replaces a prior annual contract | Growth: deal value − prior value. This includes any expansion at renewal. |
| Mid-term expansion | A top-up before renewal that ends on the same date as the current annual contract | The top-up's deal value |

The "What counts" column is the TAE credit and the base for the TAM growth incentive.

> Burrow Bank paid $50,000 last year. It now prepays 2 years at $65,000 a year, so the deal value is $130,000. The credit is $130,000 − $50,000 = $80,000. If Burrow Bank renewed at $45,000, the credit would be $0. A smaller burrow never gives negative credit.

#### Payment status

The status decides if an annual contract is added to your quota credit (TAE) or to your payout (TAM).

| Status | What it means | Added to your credit or payout? |
|---|---|---|
| Confirmed | The contract invoice is paid by the cutoff | Yes |
| At risk | Not paid yet, but not overdue. Or a 1-year contract with no invoice yet | Yes, in good faith |
| Excluded | Overdue at the cutoff, or cancelled by a credit note | No |

| Unpaid invoice | Before the cutoff | At the cutoff | At the next cutoff |
|---|---|---|---|
| Due before the cutoff | At risk until the due date, then excluded | Excluded | Stays excluded, even if paid late |
| Due after the cutoff | At risk | At risk (added) | Still unpaid: clawed back next quarter |

An invoice created after the quarter ends never changes that quarter's status.

> Hibernation Health signs in Q3. The invoice is due October 30, after the October 14 cutoff, so the contract is added to Q3 as at risk. If Hibernation Health sleeps through winter and hasn't paid by January 14, we claw the credit back in Q4.

### Monthly-paying customers

These rules apply to TAE, TAM and TAM lead credit.

- Only real cash counts.
- A monthly invoice counts in the quarter it is paid.
- If the customer has an annual contract in the quarter, their monthly invoices don't count that quarter.

The TAE and TAM math is different. See [TAE](#tae) and [TAM](#tam).

## TAE

- Credit goes to the Salesforce opportunity owner, if that person is on the quota sheet as a TAE for the quarter.
- **Annual contracts**: credit = "What counts" from the [deal type](#deal-type) table. At-risk contracts count. Excluded contracts don't.
- **Attainment** = credit ÷ quarterly quota.

**Monthly-paying customers** *(rule being finalized with the TAE leads)*

- The customer has a closed-won monthly contract that you own, and has the "AE managed" flag.
- You hold the customer for **[X months]** after close, or until they sign an annual contract.
- Credit = (this quarter's real cash × 4) − (last quarter's real cash × 4). It can be negative.
- From Q4 2026, the customer needs 3 paid monthly invoices in the quarter. With fewer, the credit is $0.

> Spike closes Prickle & Co on a monthly plan. Prickle & Co pays $3,000 a month last quarter and $4,000 a month this quarter. Spike gets ($12,000 × 4) − ($9,000 × 4) = $12,000. With $300,000 total credit against a $250,000 quota, Spike is at 120%. That's a well-fed hedgehog.

## TAM

**Who gets paid**

- **Monthly invoices**: the TAM assigned to the customer on the date the invoice is created.
- **Annual contracts**: the TAM assigned to the customer on the close date, who is also the Salesforce opportunity owner. If you're added to the book after the close date, the contract doesn't count for you.
- **Handoffs**: if a customer moves to another TAM mid-quarter, each TAM gets paid for the invoices from the time they held the customer.
- The customer must still be in a TAM book on the last day of the quarter. If it left before then, no TAM gets paid for it that quarter.

**Annual base**

- The amount invoiced for the contract. It pays only if the contract isn't excluded (see [payment status](#payment-status)).
- For a multi-year contract not paid upfront: the lower of the year-1 value and the amount invoiced.
- For a 1-year contract with no invoice yet: the Salesforce amount, at risk.

**Rates (from Q4 2026)**

| | Rate |
|---|---|
| Monthly invoices (real cash) | 5% |
| Annual contracts | 10% of the annual base |
| Growth incentive | 6.7% of "What counts", on renewals and mid-term expansions only |

Q3 2026 and earlier: 10% on monthly invoices, and the 6.7% incentive on all deal types.

> Mossy Media renews in Q4 for 1 year: $100,000 last year, $120,000 this year. Bramble gets 10% × $120,000 + 6.7% × $20,000 = $13,340.
>
> Snuffle Snacks is a monthly-paying customer. It pays $2,000, $2,500 and $1,500 in Q4. Bramble gets 5% × $6,000 = $300.

A line pays $0 if:
- the customer wasn't in a TAM book on the last day of the quarter
- you weren't the assigned TAM on the invoice date or the close date
- for an annual contract, you aren't the Salesforce opportunity owner
- you're not on the TAM roster that quarter
- the invoice was paid with prepaid credit, account balance or a credit note
- the contract is excluded

## TAM leads

- Your team is the TAMs who report to you in Salesforce, plus your own customers.
- A person counts if they're on the quota sheet as a TAM or TAM lead for the quarter. People on that quarter's TAE sheet don't count.
- **Closed-won total** = the deal value of annual contracts that pay a TAM on your team + the real cash from monthly invoices that pay a TAM on your team. Excluded contracts drop out. At-risk contracts count.
- **Attainment** = closed-won total ÷ your lead quota.

> Thistle has a $1,000,000 lead quota. The team closes $1,100,000 in annual deal value and collects $200,000 from monthly invoices. Thistle is at $1,300,000 ÷ $1,000,000 = 130%.

## BDR

- A **sales-qualified opportunity (SQO)** is a Salesforce opportunity with lead source "Outbound". It counts in the month it was created. The deal doesn't need to close.
- The SQO goes to the BDR who created an Outbound task on the same account. If more than one BDR did, the earliest task wins. You must be on the quota sheet.
- Quarterly quota = 3 × your monthly quota.
- Attainment = SQOs ÷ quarterly quota. There is no cap.

> Quill has a monthly quota of 3, so the quarterly quota is 9. Quill books 12 SQOs, which is 133%. Quill dug deep into the outbound list.

## Where to find your numbers

### Dashboards

Start here. Set the **Comp quarter** filter first, for example `2026-Q4`. Then filter to yourself.

| Team | Dashboard | Filter to yourself |
|---|---|---|
| TAE | TAE Quota Attribution (2026) | **tae**: part of your email, for example `spike` |
| TAM | TAM Compensation (2026 Comp Model) | **tam**: your full email or your full name |
| TAM lead | TAM Compensation (2026 Comp Model): the "TAM Lead attainment (closed-won)" and "TAM Lead detail" tiles at the bottom | Quarter only. Each tile shows both teams. |
| BDR | BDR Quota Attribution (2026) | **bdr**: part of your email or your name |

To see everyone, leave the person filter blank. On the TAM dashboard, you can also filter by **account_name**. Part of the name is enough.

Each dashboard has a "Data checks (RevOps)" tile. It lists the records to fix in Salesforce or Stripe. On the TAM dashboard, it also lists annual contracts that don't count because the TAM was added to the book after the close date or isn't the opportunity owner.

### Views

To build your own analysis, use the views in the **RevOps** folder of the SQL editor. Every view is live and rebuilds from the source data.

| View | One row per | Filter to yourself | Columns that explain the number |
|---|---|---|---|
| `comp_tae_quota_lines` | TAE credit line | `quarter_start`, `tae_email` | `credit`, `at_risk_credit`, `status`, `reason`, `calc_note` |
| `comp_tam_payout_lines` | TAM payout line (one monthly invoice or one annual contract) | `quarter_start`, `tam_email` | `payout`, `status`, `exclusion_reason` |
| `comp_bdr_sqo_lines` | SQO | `quarter_start`, `bdr_email` | `month_start`, `credit_source` |
| `comp_annual_deals` | Annual contract | `opportunity_id` | `deal_status`, `is_upfront`, `credit_basis`, `tae_quota_credit`, `tam_commission_base` |
| `comp_quotas` | Person per quarter | `team`, `quarter_start`, `email` | `quota` (TAE, TAM, TAM lead in dollars), `monthly_quota` (BDR in SQOs) |
| `comp_tam_book` | TAM assignment per quarter | `quarter_start`, `tam_email` | `window_start`, `window_end`, `in_book_at_quarter_end` |
| `comp_quarters` | Quarter | `quarter_label` | `quarter_start`, `cutoff_date` |

Two rules:
- `quarter_start` is the first day of the quarter. Q4 2026 is `toDate('2026-10-01')`.
- Always filter `comp_quotas` by `team`. Some people have rows for more than one team.

### Check your numbers with SQL

Each query below answers one question. To run one:
1. Open the SQL editor in PostHog.
2. Paste the query.
3. Change the email to your own. Change the date to the first day of the quarter you want: `2026-10-01` is Q4 2026.

#### TAE: which deals count toward my quota, and how much each one adds

Use this query to check your number deal by deal. You get one row for each annual contract and each monthly-paying customer credited to you that quarter. Use it to:
- find a deal you expected to see but can't find on the dashboard
- see how a deal's credit was calculated
- find out why a deal is at risk or excluded

```sql
SELECT account_name, deal_type, status, credit, at_risk_credit, calc_note, reason
FROM comp_tae_quota_lines
WHERE quarter_start = toDate('2026-10-01')
  AND tae_email = 'you@posthog.com'
ORDER BY credit DESC
```

How to read the result:

| Column | What it tells you |
|---|---|
| `credit` | What this deal adds to your quota credit |
| `at_risk_credit` | The part of `credit` that can be clawed back if the invoice isn't paid |
| `calc_note` | The math, in one line |
| `reason` | Why the deal is at risk, excluded or counted in another quarter |

Example result for Spike in Q4:

| account_name | deal_type | status | credit | at_risk_credit | calc_note | reason |
|---|---|---|---|---|---|---|
| Burrow Bank | Multi-year | Confirmed | 80000 | 0 | Paid 100% upfront: $130000 - prior $50000 = $80000 | |
| Nettle Networks | New annual | At risk | 40000 | 40000 | New: $40000 | Invoice due 2027-01-30 (after cutoff) |
| Prickle & Co | Monthly | Confirmed | 12000 | 0 | Q4 x4 $48000 - Q3 x4 $36000 = $12000 | |
| Acorn Analytics | New annual | Other quarter | 0 | 0 | | Effective date 2027-01-05: counts in 2027-Q1 |

A deal with the status "Other quarter" closed this quarter but counts in another quarter. It shows $0 here and its full credit in the quarter where it counts.

#### TAE: what is my attainment

Use this query to get your total credit and your attainment in one number. The result must match the Attainment tile on the dashboard. If it doesn't, ask RevOps.

```sql
SELECT
    sum(credit) AS total_credit,
    total_credit / (
        SELECT quota FROM comp_quotas
        WHERE team = 'TAE'
          AND quarter_start = toDate('2026-10-01')
          AND email = 'you@posthog.com'
    ) AS attainment
FROM comp_tae_quota_lines
WHERE quarter_start = toDate('2026-10-01')
  AND tae_email = 'you@posthog.com'
```

`attainment` is a ratio: 1.2 means 120%.

#### TAM: what am I paid on, and why does a line pay $0

Use this query to check your payout one item at a time. You get one row for each paid monthly invoice and each annual contract in your book that quarter. It is most useful when a customer pays less than you expect.

```sql
SELECT account_name, line_type, status, payout, exclusion_reason
FROM comp_tam_payout_lines
WHERE quarter_start = toDate('2026-10-01')
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
| `credit_covered` | Paid with prepaid credit, account balance or a credit note |
| `paid_out_of_band` | Marked as paid outside Stripe |
| `overdue_invoice` | The contract invoice was overdue at the cutoff |
| `contract_voided` | A credit note cancelled the contract |

#### BDR: which SQOs are credited to me

Use this query to check that every SQO you sourced is credited to you, and in which month. If an SQO is missing, check that the opportunity has lead source "Outbound" and that you logged an Outbound task on the account.

```sql
SELECT month_start, account_name, opportunity_name, credit_source
FROM comp_bdr_sqo_lines
WHERE quarter_start = toDate('2026-10-01')
  AND bdr_email = 'you@posthog.com'
ORDER BY month_start
```

`credit_source` tells you how the SQO was credited:
- "Outbound lead task": by the rule
- "Manual credit": by RevOps

### Sources and refresh times

| Input | Source | Refresh |
|---|---|---|
| Contracts, owners, dates, amounts | Salesforce | Every 24 hours |
| Invoices, payments, refunds | Stripe | Every hour |
| Quotas and teams | Quota sheet | Every 6 hours |
| TAM books | TAM assignment history | Every hour |

The dashboards are live, so a past quarter can change when the source data changes. After each cutoff, RevOps saves a frozen copy of the quarter. The frozen copy is what we pay from.

## Questions

If your number looks wrong, ask RevOps in [#CHANNEL] and send the opportunity link. Most issues are data issues in Salesforce or Stripe. Each dashboard has a "Data checks" tile that lists them.
