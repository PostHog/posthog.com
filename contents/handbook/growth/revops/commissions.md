---
title: Commissions
sidebar: Handbook
showTitle: true
---

This page explains how commission and bonuses are calculated and paid each quarter for TAEs, TAE leads, TAMs, TAM leads, CSMs, CSM leads, and BDRs. With the inputs, you can work out your own number.

This page covers the math: what earns credit, who gets it, and which quarter it counts in. Your team page covers your plan: on-target earnings (OTE) split, quota, ramp, book rules, and how attainment turns into pay. See How we work for [TAEs and BDRs](/handbook/growth/sales/new-business-how-we-work), [TAMs](/handbook/growth/sales/how-we-work), and [CSMs](/handbook/customer-success/how-we-work).

If this page and a team page disagree on the math, this page is correct. Tell RevOps in <PrivateLink url="https://posthog.slack.com/archives/C0BSAUQENEA">#team-revops</PrivateLink> so we can fix the other page.

Our examples use Spike (TAE), Hazel (TAE lead), Bramble (TAM), Thistle (TAM lead), Clover (CSM), and Quill (BDR). The customers are made up. No real hedgehogs were invoiced.

## How you get paid

| When | What happens | What you need to do |
|---|---|---|
| During the quarter | Your [dashboard](#dashboards) updates as deals close in Salesforce, customers pay in Stripe, and billing updates usage. | Review your dashboard regularly. Make sure every deal you closed shows up with the right amount and dates, and that your customers are paying their invoices on time. If a deal is missing or wrong, post the opportunity link in #team-revops before the 14th, so RevOps can fix it before the snapshot |
| Cutoff: the 14th of the month after the quarter ends | [Payment status](#payment-status) is locked for the quarter. Overdue invoices don't count. | Follow up with any customer who hasn't paid. An invoice that's overdue on the 14th won't count toward your number.|
| Snapshot: the 15th | RevOps freezes the numbers. This is what you're paid on. See [quarter end](#quarter-end). | Compare your dashboard with the snapshot. Raise anything that doesn't match in #team-revops. |
| Payment | You're paid in the month after the quarter ends. For Q3, that's October. | Nothing. |
| The next pay period | Prior-period at-risk invoices that are still unpaid will be clawed back. Prior-period overdue invoices that have since been paid will be compensated under that period’s rules.| Follow up on at-risk invoices or you lose that $ next quarter. |

### How your credit becomes pay

| Role | What earns you credit | How it's measured |
|---|---|---|
| TAE | Annual contracts and monthly-paying customers you own. See [TAE](#tae). | Attainment = credit ÷ quarterly quota |
| TAE lead | Your team's TAE credit. See [TAE leads](#tae-leads). | Attainment = team credit ÷ team quota |
| TAM | Invoices and annual contracts for customers in your book. See [TAM](#tam). | The % of the dollar amount paid to the business|
| TAM lead | Your team's annual contracts and monthly invoices. See [TAM leads](#tam-leads). | Attainment = closed-won total ÷ lead quota |
| CSM | The ARR of accounts in your book. See [CSM](#csm). | NRR = this quarter's ARR ÷ end of previous quarter's ARR |
| CSM lead | Your team's combined books. See [CSM leads](#csm-leads). | Combined NRR of your team's books |
| BDR | Sales-qualified opportunities (SQOs) you source. See [BDR](#bdr). | Attainment = SQOs ÷ quarterly SQO quota |

Your team page describes how attainment or NRR turns into your commission in more detail.

In your first three months, you're paid at least 100% of your OTE. See the [new hire FAQ](/handbook/growth/sales/new-hire-onboarding#how-does-my-quota-work-during-my-ramp-period) and your team page for how this works in your role.

## Terms

| Term | What it means |
|---|---|
| Annual contract | A customer who prepays credits for one year or more of expected usage. |
| Monthly-paying customer | A customer with no prepaid annual credits, who pays a monthly |
| Close date | The date the deal is closed-won in Salesforce. |
| Effective date | The later of the signature date and the contract start date. See [which quarter an annual contract counts in](#which-quarter-an-annual-contract-counts-in). |
| Cutoff | The 14th of the month after the quarter ends: January 14, April 14, July 14, or October 14. Payment status at the end of that day is final. |
| Real cash | Money paid through Stripe by card, bank debit, or bank transfer, minus refunds.|
| Deal value | What an annual contract is worth for credit, after discounts. See [deal value](#deal-value). |
| Prior value | The value of the annual contract a renewal replaces. This is the Salesforce **Up for renewal** amount. If that's empty, it's the prior contract's discounted annual recurring revenue (ARR). |
| Growth | Deal value minus prior value. It's never below $0. |
| Quota sheet | Who is on which team each quarter and their quota. To change a quota or team - flag in #team-revops. |

## What earns credit

| | Annual contracts | Monthly-paying customers | SQOs |
|---|---|---|---|
| TAE | Deal value or growth | Change in monthly real cash, quarter over quarter | – |
| TAE lead | Your team's TAE credit | Your team's TAE credit | – |
| TAM | % of the annual base, plus % of growth on renewals and expansions | % of each paid monthly invoice | – |
| TAM lead | Deal value of your team's annual contracts | Your team's paid monthly invoices | – |
| CSM | Usage in the quarter × 4, toward NRR | The quarter's three invoices × 4, toward NRR | – |
| BDR | – | – | Each SQO you source |

Self-serve customers never count.

### Annual contracts

These rules apply to TAEs, TAMs, and TAM leads. CSMs are measured on usage instead. See [CSM](#csm).

#### Which quarter an annual contract counts in
An annual contract counts in, and is paid in, the quarter of its effective date. The effective date is whichever comes later: the signature date or the contract start date.

Customers sometimes backdate the start date to line up with their billing cycle, which can put it in a quarter that’s already closed. Because the effective date can never be earlier than the signature date, the contract still counts in an open quarter. This rule applies to contracts closed on or after July 1, 2026.

| Customer | Signature date | Contract start date | Date we use | Quarter |
|---|---|---|---|---|
| Hoglet Labs | July 15 | June 27 | July 15 (signature date) | Q3 |
| Beetle Box | September 29 | October 20 | October 20 (contract start date) | Q4 |

> Hoglet Labs signs on July 15 but backdates its start to June 27 to match its billing. Q2 is closed, so the contract counts in Q3. Beetle Box signs on September 29 but isn't ready to leave its burrow until October 20, so it counts in Q4.

#### Deal value

Deal value is always after discounts, never the list price.

| Contract | Deal value |
|---|---|
| One year | The Salesforce amount after discounts |
| Multi-year, paid upfront | The full contract value after discounts |
| Multi-year, not paid upfront | The year-one value only, at the standard one-year discount |

We check every invoice against Stripe and Salesforce. If they differ by more than 5%, the **Data checks** tile flags it, and RevOps fixes the record before the cutoff.

For buyout deals, we remove the free buyout credit first: deal value = (list − one-time credit) × (1 − discount).

> Leaf Pile Logistics is leaving a competitor with time left on its old contract. Its order has $100,000 of credit at list price. That includes a $20,000 free buyout credit to cover the time left on the old contract. It gets a 25% discount. We remove the free credit first, so the deal value is ($100,000 − $20,000) × 0.75 = $60,000.
>
> For multi-year deals, see [how multi-year contracts count](#how-multi-year-contracts-count).

#### How multi-year contracts count

How the customer pays decides how much of a multi-year contract counts:

- **Paid upfront** - The full contract value counts in the quarter it starts.
- **Paid yearly** - Only year one counts, at the standard one-year discount.

The same contract can be worth very different amounts depending on how it's paid.

A multi-year contract is paid upfront if any of these is true:

- The full contract value is paid by the cutoff
- The contract type is **Annual contract - upfront pay**

Paid upfront still means paid on time. Make sure the customer pays by the due date. See [payment status](#payment-status).

**New customer.** Spiny Software signs for three years at $80,000 a year after discount ($100,000 list, 20% standard one-year discount).

| | Paid upfront | Paid yearly |
|---|---|---|
| What the customer pays | $240,000 at the start | $80,000 a year |
| Deal value | $240,000, the full contract | $80,000, year one only |
| TAE credit (net new) | $240,000 | $80,000 |
| TAM payout, if a TAM owns the deal | 10% × $240,000 = $24,000 | 10% × $80,000 = $8,000 |

**Renewal.** Growth works the same way as in [deal type](#deal-type). Burrow Bank paid $50,000 for its last one-year contract. It renews for two years at $65,000 a year.

| | Paid upfront | Paid yearly |
|---|---|---|
| What the customer pays | $130,000 at the start | $65,000 a year |
| Deal value | $130,000 | $65,000 |
| Growth (deal value − $50,000 prior value) | $80,000 | $15,000 |
| TAE credit | $80,000 | $15,000 |
| TAM payout | 10% × $130,000 + 6.7% × $80,000 = $18,360 | 10% × $65,000 + 6.7% × $15,000 = $7,505 |

#### Deal type

The deal type decides how much of the deal value counts.

| Type | What it is | What counts |
|---|---|---|
| Net new | No prior annual contract, including a monthly-paying customer who moves to annual | The deal value |
| Renewal | Replaces a prior annual contract | Growth: deal value − prior value, including any expansion at renewal |
| Mid-term expansion | A top-up before renewal that ends on the same date as the current contract | The top-up's deal value |

The **What counts** column is the TAE credit and the base for the TAM growth incentive.

> Burrow Bank paid $50,000 last year and renews for one year at $65,000. The credit is $65,000 − $50,000 = $15,000. If it renewed at $45,000, the credit would be $0. A smaller burrow never gives negative credit.

#### Payment status

The status decides whether an annual contract counts toward your credit (TAE) or payout (TAM).

| Status | What it means | Does it count? |
|---|---|---|
| Confirmed | The contract invoice is paid by the cutoff | Yes |
| At risk | Not paid yet but not overdue, or a one-year contract with no invoice yet | Yes, until it's paid or clawed back |
| Excluded | Overdue at the cutoff, or cancelled by a credit note | No |
| Other quarter | Closed this quarter, but the effective date is in a later quarter | Counts in the quarter of its effective date |

| Unpaid invoice | Before the cutoff | At the cutoff | At the next cutoff |
|---|---|---|---|
| Due before the cutoff | At risk until the due date, then excluded | Excluded | If paid late, you receive $ per the rules of the quarter of the effective date |
| Due after the cutoff | At risk | At risk (counts) | Still unpaid: clawed back next quarter |

An invoice created after the quarter ends never changes that quarter's status.

> Hibernation Health signs in Q3. The invoice is due October 30, after the October 14 cutoff, so the contract counts in Q3 as at risk. If Hibernation Health sleeps through winter and hasn't paid by January 14, we claw the credit back in Q4.

### Monthly-paying customers

These rules apply to TAEs, TAMs, and TAM leads. CSMs are measured on usage instead. See [CSM](#csm).

- Only real cash counts.
- A monthly invoice counts in the quarter it's paid.
- **TAMs and TAM leads** - Monthly invoices still count when the customer also has an annual contract. This includes invoices paid before the annual contract starts, and invoices for usage beyond it.
- **TAEs** - Monthly credit stops when the customer signs an annual contract. In that quarter, you're credited for the annual deal only.

The TAE and TAM math is different. See [TAE](#tae) and [TAM](#tam).

## TAE

Make sure you're the opportunity owner in Salesforce. Credit goes to the owner, if they're on the quota sheet as a TAE for the quarter.

- **Annual contracts** - Credit is the **What counts** amount from the [deal type](#deal-type) table. At-risk contracts count. Excluded contracts don't.
- **Attainment** - Credit ÷ quarterly quota.

### Monthly-paying customers

- The customer has a closed-won monthly contract that you own.
- Set **AE managed account** to true in <PrivateLink url="https://us.posthog.com/project/2/customer_analytics/accounts">Customer Analytics</PrivateLink>. If it's false, the customer doesn't count for you.
- You hold the customer for up to 12 months after close, or until they sign an annual contract. In the quarter they sign, you're credited for the annual deal only.
- Credit = (this quarter's real cash × 4) − (last quarter's real cash × 4). **It can be negative**
- The customer needs three paid monthly invoices in the quarter to count.

> Spike closes Prickle & Co on a monthly plan. Prickle & Co paid $3,000 a month last quarter ($9,000 for the quarter) and pays $4,000 a month this quarter ($12,000 for the quarter). Spike’s credit is the annualized increase: ($12,000 × 4) − ($9,000 × 4) = $12,000. That $12,000 counts toward Spike’s quota attainment.

## TAE leads

Your attainment is your team's combined attainment against quota.

- **Team credit** - The sum of your TAEs' credit under the [TAE](#tae) rules
- **Team quota** - The sum of your TAEs' quarterly quotas
- **Attainment** - Team credit ÷ team quota

> Hazel leads three ramped TAEs and one ramping TAE, each with a $250,000 quarterly quota. The team quota is ($250,000 × 3) + $125,000 = $875,000. The team earns $1,050,000 in credit, so Hazel is at 120%.

## TAM

### Who gets paid

- **Monthly invoices** - The TAM assigned to the customer prior to the date the invoice is created.
- **Annual contracts** - The TAM assigned to the customer prior to the close date, who is also the Salesforce opportunity owner. Make sure you're assigned as the TAM before the deal closes. If you're added after the close date, the contract doesn't count
- **Handoffs** - If a customer moves to another TAM mid-quarter, each TAM is paid for the invoices from their time with the customer.

The customer must still be in a TAM book on the last day of the quarter. If it left earlier, no TAM is paid for it that quarter.

### Annual base

- The amount invoiced for the contract. It pays only if the contract isn't excluded. See [payment status](#payment-status).
- For a multi-year contract not paid upfront, it's the lower of the year-one value and the amount invoiced.
- For a one-year contract with no invoice yet, it's the Salesforce amount, at risk.

### Rates from Q4 2026

| | Rate |
|---|---|
| Monthly invoices (real cash) | 5% |
| Annual contracts | 10% of the annual base |
| Growth incentive | 6.7% of **What counts**, on renewals and mid-term expansions only |

> Mossy Media renews in Q4 for one year: $100,000 last year, $120,000 this year. Bramble gets 10% × $120,000 + 6.7% × $20,000 = $13,340.
>
> Snuffle Snacks is a monthly-paying customer. It pays $2,000, $2,500, and $1,500 in Q4. Bramble gets 5% × $6,000 = $300.

A line pays $0 if:

- the customer wasn't in a TAM book on the last day of the quarter
- you weren't the assigned TAM on the invoice date or close date
- you aren't the Salesforce opportunity owner of an annual contract
- you're not on the TAM roster that quarter
- the invoice was paid with prepaid credit, account balance, or a credit note
- the contract is overdue by the 14th [snapshot cut off date]

## TAM leads

- **Your team** - The TAMs who report to you in Salesforce, plus your own customers. A person counts if they're on the quota sheet as a TAM or TAM lead for the quarter. People on that quarter's TAE sheet don't count.
- **Closed-won total** - The deal value of annual contracts that pay a TAM on your team. Add the real cash from monthly invoices that pay a TAM on your team. Excluded contracts drop out. At-risk contracts count.
- **Attainment** - Closed-won total ÷ your lead quota.

> Thistle has a $1,000,000 lead quota. The team closes $1,100,000 in annual deal value and collects $200,000 from monthly invoices. Thistle is at $1,300,000 ÷ $1,000,000 = 130%.

## CSM

CSMs earn a bonus on net revenue retention (NRR), not on deals. Your [team page](/handbook/customer-success/how-we-work#how-csm-bonus-works) sets the NRR target and how NRR turns into bonus.

### Which accounts count

Your book is the set of accounts where you’re listed as CSM in <PrivateLink url="https://us.posthog.com/project/2/customer_analytics/accounts">Customer Analytics</PrivateLink>.

### Which accounts count toward your NRR

An account counts toward your NRR for a quarter if all of these are true:

- You’re the assigned CSM on the second-to-last day of the quarter.
- You’ve been the CSM for at least one month of that quarter.
- The account isn’t excluded (see below).
- Changes to your book

In the first month of each quarter, review your book and tell your team lead about any account that shouldn’t be there.

- Removed in the first month: doesn’t count that quarter.
- Added in the last month: starts counting next quarter.
- After the first month: the account stays in your book for the rest of the quarter. The only exceptions are:
- The account moves to the YC/Startup program.
- Simon or Ben Bradley approves the removal in a public Slack thread.
- Excluded accounts

These accounts never count toward NRR:

- Accounts in the YC program, including any that received YC credits
- Accounts that churned in an earlier quarter
- Accounts that have been manually exclude per various reasons

### How NRR is calculated

- **NRR** - Counted ARR this quarter ÷ base ARR.
- **Base ARR** - What the account actually spent last quarter × 4, before discounts. If it was in a CSM book last quarter, this comes from last quarter's [snapshot](#how-csm-data-carries-into-the-next-quarter). Grace doesn't change it.
- **Counted ARR** - The account's usage this quarter × 4. For monthly-paying customers, that's their three invoices in the quarter × 4. For annual contracts, it's their usage-based spend × 4, not the contract value ÷ 12.

An account needs spend in all three months of last quarter to have a base. If it doesn't have one, it starts counting next quarter.

Usage is before discounts and excludes tax. Payment status doesn't affect NRR.

**Credits and refunds**

- Accidental spikes don't count. To remove one, give the credit with the reason `Unwanted Spike`. See [giving credits](/handbook/growth/revops/credits). Without that reason, the spike stays in your NRR.
- Usage we credit back during a product trial doesn't count. It starts counting once the customer pays for it.
- All other credits and refunds for real usage count as normal.

If a customer churns or gives formal notice of churn during the quarter, its counted ARR is $0.

### Grace

An account is in grace for the quarter you take it on if:

- nobody (CSM, TAE, or TAM) actively managed it in the 90 days before you were assigned, or
- you took it on knowing it was at risk, and Simon (or Ben B) approved an exception in a public Slack thread within your first month

In grace, a drop in ARR doesn't count against you, but growth does. From the next quarter, the account counts as normal. Next quarter, the base is what the account actually spent, not the protected number.

> Clover's book had $1,000,000 base ARR in the Q3 snapshot. In Q4, one account grows by $150,000, one account in grace drops by $40,000, and another churns ($50,000). Counted ARR is $1,000,000 + $150,000 − $50,000 = $1,100,000. The grace drop doesn't count, so Clover's NRR is 110%. In Q1, the base for the grace account is what it really spent in Q4, not the protected amount.
>
> **New accounts.** Clover is assigned Acme on October 20. It spent $30,000 in Q3, so its base is $120,000. If it spends $33,000 in Q4, that's $132,000, or 110%. If it drops to $27,000 and it's in grace, it's counted at $120,000, or 100%. Without grace, it's $108,000, or 90%.

### TAM overlay accounts

An account can have both a CSM and a TAM. The CSM is paid on the account's NRR. The TAM is paid on its invoices and contracts under the [TAM](#tam) rules.

### CSM leads

CSM team leads are paid on the combined NRR of their team's books. The CS lead is paid on the combined NRR of all CSM books.

## BDR

- **SQO** - A Salesforce opportunity with lead source **Outbound**. It counts in the month it's created. The deal doesn't need to close.
- **Who gets it** - The BDR who created an Outbound task on the same account. If more than one BDR did, the earliest task wins. You must be on the quota sheet.
- **Quarterly quota** - 3 × your monthly quota.
- **Attainment** - SQOs ÷ quarterly quota. There's no cap.

> Quill has a monthly quota of three, so the quarterly quota is nine. Quill books 12 SQOs, which is 133%. Quill dug deep into the outbound list.

## Quarter end

On the 15th of the month after the quarter ends, RevOps takes a snapshot of the data and pushes it into a Google Sheet. The sheet loads the rows into the snapshot tables in the warehouse. RevOps then locks the rows, and you're paid from them.

The snapshot is the source of truth for the quarter. Dashboards read live data, so they can change after the snapshot. The snapshot doesn't. A later change in Salesforce, Stripe, or the quota sheet can't change a number we've already paid.

### What the snapshot does not include

The snapshot doesn't include deal changes after the snapshot date. If a number is wrong after the lock, ask in #team-revops. RevOps fixes it in the final payout sheet shared with Finance. See [after the snapshot](#after-the-snapshot).

### How CSM data carries into the next quarter

Each quarter's CSM snapshot sets the base for the next quarter: each account's actual ARR, before any grace adjustment. For example, Q4 ARR is compared against the Q3 snapshot. A late change to live Q3 data can't move the Q4 base.

## Adjustments

Sometimes the data is right but a rule gives the wrong answer, like a deal paid through AWS Marketplace or credit that belongs to someone else. RevOps fixes these with a row in an adjustments sheet. Don't edit the dashboards or views.

### How to ask for one

1. **Check the data first.** Most problems are a Salesforce or Stripe record that needs fixing. The **Data checks** tile on the TAE, TAM, and BDR dashboards lists them. Fix the record if you can, and only ask for an adjustment when a data fix can't solve it.
2. **Post in <PrivateLink url="https://posthog.slack.com/archives/C0BSAUQENEA">#team-revops</PrivateLink> before the cutoff.** Include the opportunity or invoice link, what should change, and why.
3. **RevOps adds the row.** Ben Bradley or RevOps approves it. Don't edit the sheets yourself.
4. **Check it took effect after the next sync.** The quota sheet syncs every six hours, and the CSM sheet every 24 hours. On the TAE, TAM, and BDR dashboards, the **Adjustments (from the quota sheet)** tile shows each row and how it applies.

Adjustments must be in before the snapshot on the 15th to count for that quarter.

### TAE, TAM, and BDR

Adjustments go in the **adjustments** tab of the <PrivateLink url="https://docs.google.com/spreadsheets/d/1u8gHwbO-_BpvNUeGxJY4IV5sPXmTXYnQqusSFBPRBxQ">quota sheet</PrivateLink>. Each row is one deal or invoice, identified by its Salesforce opportunity ID or Stripe invoice ID.

| Action | What it does |
|---|---|
| `include` | Counts the line as confirmed, for example when it was paid outside Stripe |
| `exclude` | Removes the line |
| `set_amount` | Replaces the credit or payout base with the amount in the row |
| `move_quarter` | Counts the deal in a different quarter |
| `reassign` | Credits the line to someone else |

Every row needs a reason and the approver's email.

### CSM

CSM adjustments go in the <PrivateLink url="https://docs.google.com/spreadsheets/d/1SJbrgkLeGoO5nu0FG0hJ-u2N1vXtOFhfcEBQeCCjgiQ">CSM adjustments sheet</PrivateLink>:

- **nrr_exclusions** - Leaves an account out of NRR for one or more quarters. Simon or Ben B approves each one.
- **Quarterly adjustments** - Replaces an account's revenue for a month, for example after an accidental spike that wasn't credited with the right reason.

### After the snapshot

The snapshot doesn't change. If a number is wrong after the snapshot, RevOps fixes it in the final payout sheet shared with Finance.

### Quarterly payout review

Each quarter, Finance, team leads, and RevOps use <PrivateLink url="https://posthog.slack.com/archives/C0C1H8GA7TM">#project-quota-calcs</PrivateLink> to go through open questions and agree each team's payouts before payment.

## Where to find your numbers

### Dashboards

Start here. Set the **Comp quarter** filter first, for example `2026-Q4`. Then filter to yourself.

| Team | Dashboard | Filter to yourself |
|---|---|---|
| TAE | <PrivateLink url="https://us.posthog.com/project/2/dashboard/2117716">TAE Quota Attribution (2026)</PrivateLink> | **tae** - part of your email, for example `spike` |
| TAE lead | <PrivateLink url="https://us.posthog.com/project/2/dashboard/2117716">TAE Quota Attribution (2026)</PrivateLink> | Leave **tae** blank to see everyone, or filter to each TAE. There's no team roll-up tile yet. |
| TAM | <PrivateLink url="https://us.posthog.com/project/2/dashboard/2066634">TAM Compensation (2026 Comp Model)</PrivateLink> | **tam** - your full email or full name |
| TAM lead | <PrivateLink url="https://us.posthog.com/project/2/dashboard/2066634">TAM Compensation (2026 Comp Model)</PrivateLink>, the **TAM Lead attainment (closed-won)** and **TAM Lead detail** tiles at the bottom | Quarter only. Each tile shows every team. |
| CSM and CSM lead | <PrivateLink url="https://us.posthog.com/project/2/dashboard/2158711">CSM Quarterly Attainment - NRR</PrivateLink> | **nrr_quarter** - the first day of the quarter, for example `2026-10-01`. **csm_email_accounts_drilldown** - your email. |
| BDR | <PrivateLink url="https://us.posthog.com/project/2/dashboard/2164347">BDR Quota Attribution (2026)</PrivateLink> | **bdr** - part of your email or name |

To see everyone, leave the person filter blank. On the TAM dashboard, you can also filter by **account_name**. Part of the name is enough.

The TAE, TAM, and BDR dashboards each have a Data checks (RevOps) tile that lists records to fix. On the TAM dashboard, it also lists annual contracts that don’t count, because the TAM was added after the close date or isn’t the opportunity owner. These three dashboards also have an **Adjustments (from the quota sheet)** tile. See [adjustments](#adjustments).

### Queries

To check your number line by line, or look up a past quarter, use the [commission queries](/handbook/growth/revops/commission-queries). Each query is grouped by role, and picks the right quarter for you.

### Sources and refresh times

| Input | Source | Refresh |
|---|---|---|
| Contracts, owners, dates, and amounts | Salesforce | Every 24 hours |
| Invoices, payments, and refunds | Stripe | Every hour |
| Quotas and teams | Quota sheet | Every six hours |
| TAM books | TAM assignment history | Every hour |

## Questions

If a deal is missing or your number looks wrong before the cutoff, post the opportunity link in <PrivateLink url="https://posthog.slack.com/archives/C0BSAUQENEA">#team-revops</PrivateLink>. Most issues are Salesforce or Stripe data problems, and the **Data checks** tile on the TAE, TAM, and BDR dashboards lists them.

After the snapshot, ask in #team-revops too. RevOps fixes it in the final payout sheet shared with Finance. See [after the snapshot](#after-the-snapshot).
