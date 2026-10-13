---
title: Revenue views
sidebar: Handbook
showTitle: true
---

Our revenue reporting runs on a small chain of warehouse views in the PostHog project. The chain starts from billing's invoice rows and ends in one row per customer per month with revenue by product, usage by product, discounts, credits and refunds. Most revenue dashboards, the comp and quota views, and the sales and customer success account views read from it.

This page explains how the chain is layered, where to find which data, and where the exceptions live. It does not copy the SQL. Each view carries a header comment and column descriptions that describe its logic in detail. When this page and a view disagree, the view is right and this page needs an update.

The views share the prefix `iwa`. It stands for "invoice with annual", the billing table the chain reads.

## The layers

```
billing_customer ─────────────┬─> iwa_seed_customer_merges      (seed: one customer, several accounts)
                              └─> iwa_seed_manual_overrides     (seed: hand-applied exceptions)

invoice_with_annual + merges ────> iwa_stg_invoice_rows         (staging: one row per invoice row)
billing_usagereport + merges ────> iwa_stg_usage_month          (staging: usage per customer per month)

iwa_stg_invoice_rows + overrides ─> iwa_fct_customer_month      (fact: revenue per customer per month)
iwa_fct_customer_month + usage ───> iwa_summary_customer_month  (summary: revenue + usage + lifecycle)
iwa_summary_customer_month ───────> iwa_summary_customer_month_recalc (comp / quota / NRR view)
```

Each layer has one job.

| Layer | View | Grain | What it adds |
|---|---|---|---|
| Seed | <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a0d4dd-2f9c-0000-e3ca-68c2a30898e6">iwa_seed_customer_merges</PrivateLink> | one row per merge | Maps a customer's other billing customer and organization ids to one canonical id, so all of that customer's revenue and usage land on one row per month. |
| Seed | <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a0d4dd-a98a-0000-0a65-4941cd578be9">iwa_seed_manual_overrides</PrivateLink> | one row per organization, month range and field | Every hand-applied exception, with a note that says why. |
| Staging | <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a0d4df-a40d-0000-8e7a-cdccb96b500d">iwa_stg_invoice_rows</PrivateLink> | one row per invoice row | The only reader of the invoice table. Canonical ids, the month, one column per product, the resolved discount rate, Stripe amounts, balance credits. |
| Staging | <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a0d4de-5284-0000-519f-4e1383fa8611">iwa_stg_usage_month</PrivateLink> | customer x organization x month | The only reader of the usage report table. Usage per product from the last report of each billing period. |
| Fact | <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01a0d4e0-8bd3-0000-3cc8-b402af84d27a">iwa_fct_customer_month</PrivateLink> | customer x organization x month | Sums the invoice rows, decides the month's invoice type, applies the `summary` overrides, and builds the revenue waterfall. |
| Summary | <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01954002-54e7-0000-5c69-2dd9a9711769">iwa_summary_customer_month</PrivateLink> | customer x organization x month | Fact plus usage, a web analytics estimate, and lifecycle counters. The headline view. |
| Recalc | <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01987610-89c1-0000-28e4-cd3939ef296d">iwa_summary_customer_month_recalc</PrivateLink> | customer x organization x month | The comp, quota and NRR basis. Restates old straight-line months, applies the `recalc` overrides, adds product adoption flags. |

Two rules keep the chain honest:

- **One reader per source.** Only one view reads each billing table. A fix to how we read invoices happens in one place.
- **One rate per row.** `discount` is the only discount rate. Every other reduction is an amount in its own column, so a row reconciles by addition (see the waterfall below).

## Where to find what

| You want | Read | Notes |
|---|---|---|
| Revenue by customer and month, by product | `iwa_summary_customer_month` | `total_mrr` is billing's own figure, net of credits and refunds. Per-product columns end in `_mrr`. |
| Usage by customer and month, by product | `iwa_summary_customer_month` | Columns end in `_usage`. Usage joins on customer, organization and month. A month with no usage report has null usage. |
| The number used for comp, quota and NRR | `iwa_summary_customer_month_recalc` | `total_mrr` here is the usage basis. It differs from the summary only on pre-2026 annual months. |
| A single invoice row, or why a month looks odd | `iwa_stg_invoice_rows` | Filter on `customer_id` and `month`. `invoice_type` and `invoice_classification` explain most surprises. |
| Which accounts are combined into one customer | `iwa_seed_customer_merges` | Names are looked up for display. Joins use the ids. |
| Which months carry a manual exception, and why | `iwa_seed_manual_overrides` | Read the `note` column first. |

The first month of a customer, the number of paying months, and the months since the last payment are in the summary view as `first_month`, `paying_month_number` and `months_since_last_payment`.

## Customer merges (combining accounts)

One customer can hold more than one PostHog account. A customer migrates from one account to another, for example from the EU region to the US region or to a new organization under a new contract. A customer can also run two accounts at the same time, for example two teams of one company. In both cases we want one complete view of that customer's revenue and usage. Without a merge, a migration shows as a churn and a new customer in the same month, and two parallel accounts show as two small customers instead of one.

`iwa_seed_customer_merges` is the single list of these merges. Each row maps one account's billing customer id and organization id to the canonical ids of that customer. Both staging views apply it, so invoices and usage always land on the same canonical id. To add a merge, add one row to the seed. Do not edit any other view for this.

The seed maps ids, not names. Names are looked up live for readability only.

## Manual overrides

`iwa_seed_manual_overrides` holds every hand-applied exception. Each row overrides one field for one organization over an inclusive month range and carries a note that says why.

Two scopes exist:

- `applies_to = 'summary'`: applied in the fact view, so the summary and everything built on it inherit it. Fields: `total_mrr`, `product_analytics_mrr`, `discount_percent`. Used when billing recorded a month wrong and the correction is not in billing itself.
- `applies_to = 'recalc'`: applied only in the recalc view. Field: `selected_type`, always `annual`. Used for annual contracts that billing does not carry as annual invoices, so the comp and quota views treat them as annual customers. Only the label changes. No amount changes.

To add an exception, add one row to the seed with a note. Do not edit view SQL for a one-customer fix.

## Invoice types and classifications

Every invoice row has a `type` and a `classification`. The fact view turns them into `selected_type` for the month.

Types:

- `completed`: a finalized invoice.
- `upcoming`: the Stripe preview of the invoice for the current period.
- `upcoming_duplicated`: a forecast copy of the preview for a future month.
- `annual`: an annual prepay invoice, split into one row per month it covers.

`selected_type` is `annual` when the month has any annual row. Otherwise it is the type of the latest-ending invoice row in the month.

Classifications: `standard` (pay as you go), `annual` (a customer on an annual contract, including its usage invoices), and `startup` (a customer on the startup program). Trials produce no invoice rows and so have no rows in these views. A trial that later pays appears from its first invoice.

Two things follow from this:

- **Future months exist.** Forecast rows and annual prepay rows create customer months in the future. Filter on `month` or on `selected_type` when you report closed months only. The lifecycle counters count forecast months as months.
- **An open month mixes types.** In the current month a customer can have a completed row and an upcoming row. The fact view sums them.

## The revenue waterfall

Every row in the fact, summary and recalc views reconciles by addition:

```
total_mrr_before_discount - discount_amount - credit_applied - refund = total_mrr
```

- `total_mrr_before_discount` is the Stripe list value before the prepaid-credit discount that annual customers receive.
- `discount` is that rate. It is zero on every month where no such discount applied. Coupons and other invoice discounts stay applied and never appear as a rate.
- `discount_amount` is what the rate removed. It can be smaller than rate times list value, because the discount does not always cover the whole invoice.
- `credit_applied` is the balance credit Stripe applied. It is counted for standard customers only. Annual customers pay from a prepaid balance, so their credits are the payment method, not a reduction.
- `refund` is added back on every row.
- `total_mrr` is billing's net figure.

The identity holds on every row except pre-2026 months where billing reported annual customers straight-line and the month also carried balance credits. `is_straight_line_annual` marks those months and the `_usage_basis` columns restate them.

## Known caveats

- **Pre-2026 annual months.** Before 2026 billing reported annual customers straight-line while their usage sat on separate rows. The recalc view restates those months onto usage. The summary view keeps billing's figure. The two agree from 2026 onward.
- **Per-product columns are line-item based.** `products_mrr_sum` is the sum of every product key. The prepurchase-credit discount shows in both the per-product amounts and `total_mrr`. Refunds and credit notes issued after the invoice are netted from `total_mrr` only, so on those invoices the per-product sum is higher than `total_mrr`.

## Changing the views

- A one customer fix is a seed row, never a view edit.
- A logic change goes in the layer that owns it. Reading invoices changes in the invoice staging view. The waterfall changes in the fact view. Comp rules change in the recalc view.
- Update the view's header comment and the column descriptions in the same change. The next reader starts there.
- After a change, check the waterfall identity on the fact view and compare row counts and one closed month's total across fact, summary and recalc. They must be equal.
