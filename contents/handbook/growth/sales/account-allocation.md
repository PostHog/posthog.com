---
title: Account allocation
sidebar: Handbook
showTitle: true
---
We have different roles who manage customers through their lifecycle. Customers typically sign up and start paying on their own, or land via a [Technical Account Executive](/handbook/growth/sales/new-business-how-we-work). Once an account hits $20k a year in usage-based spend, or is on a non-legacy Enterprise plan, a [Customer Success Manager](/handbook/customer-success/how-we-work) becomes the point of contact. A [Technical Account Manager](/handbook/growth/sales/how-we-work#technical-account-managers) is added on top only where there's a qualified growth opportunity.

The [customer journey and coverage model](/handbook/growth/sales/customer-journey) covers the phases an account moves through and who covers it at each one. This page covers the rules: who covers what, where ownership is recorded, and how books are built. [Adding and removing a TAM](/handbook/growth/sales/adding-and-removing-a-tam) covers the overlay flow, and [account handovers](/handbook/growth/sales/account-handovers) covers how to move an account.

We're partway through this transition. Not every $20k+ account has a CSM yet, so some accounts are TAM-only for now. The rules below describe where we're headed. Where today works differently, we've noted it.

## Who covers an account

### CSMs are the base layer

Every account at $20k+ in usage-based ARR, or on an Enterprise plan, gets a [CSM](/handbook/customer-success/customer-success). The threshold is what the customer actually consumes, not what they've contracted for: signing a prepaid or annual contract doesn't make an account a CSM account on its own. They own the relationship: onboarding depth, product health, engagement, retention. If nothing else is happening on an account, the CSM is who the customer knows.

### TAMs are an overlay

A [TAM](/handbook/growth/sales/how-we-work#technical-account-managers) joins an account only when there's a qualified expansion opportunity. That could be cross-sell, workload expansion, annual conversion, or a renewal worth actively working. How to judge whether an opportunity is real is covered in [how to evaluate an account's revenue growth potential](/handbook/growth/sales/evaluating-growth-potential). Without a qualified opportunity, the account stays CSM-only.

In [customer journey](/handbook/growth/sales/customer-journey) terms: a TAM is on an account while it's Expanding (or Implementing, when a deal closed with a qualified opp already attached). When the account reaches Steady state, the TAM comes off. The CSM was there the whole time, so nothing gets handed over.

When both are on an account, who does what is covered in [CSM + TAM rules of engagement](/handbook/growth/sales/csm-tam-overlay-coverage).

Where there's expansion potential but no TAM capacity yet, an account can sit CSM-only until a TAM can be added.

### A note on primary products

We used to route accounts between TAM and CSM based on primary product adoption (Session Replay, Feature Flags, Error Tracking, tracked in Vitally as `Paying for <Product Name>`). That was the old model. Product count is still a decent rough signal, since an account paying for all three is often closer to saturated. Rather than using a strict product adoption method, we rely on the framing in [how to evaluate an account's revenue growth potential](/handbook/growth/sales/evaluating-growth-potential) to determine if there's actually expansion potential.

### Churn saves

An at-risk account follows the [risk mitigation and churn prevention](/handbook/growth/sales/risk-mitigation-and-churn-prevention) playbook, same as always. Flag early with the Churn Risk tag, dig into the why, and run the save.

When both a TAM and a CSM are on the account, they co-own the save. Both are responsible, and neither should assume the other is handling it.

An account going at risk is also not a reason to add a TAM. Churn saves are generally not a legitimate TAM opportunity. Risk on a CSM-only account stays with the CSM unless a genuine expansion opportunity qualifies through the normal path.


### Competitive renewal

Accounts owned only by a CSM can benefit from TAM overlay where we know a competitor is being evaluated ahead of renewal time.  CSMs should be having renewal conversations early (3 months out from the renewal date) so that we can get a TAM involved and compete hard to win the renewal.

> Trying to layer in a TAM to a competitive situation 30 days from a renewal isn't enough time to meaningfully impact the competitive evaluation.

### Below $20k

Accounts below $20k don't get a CSM or TAM. The [coverage map](/handbook/growth/sales/customer-journey#coverage-map) covers who (or what) handles them, including Growth TAM coverage and automation.

---

## Where ownership is recorded

Customer Analytics is the source of truth for account ownership. Billing and Salesforce get owner changes from Customer Analytics. The sync goes in one direction only: Customer Analytics to billing to Salesforce. A change shows in Salesforce in 5-10 minutes.

### Assigned is not the same as owned

**You are considered assigned to the account in Customer Analytics when you are assigned to the correct field (account executive, csm, etc)  and relevant tags are applied to the account.** 

Only accounts assigned to you count toward quota and commission.

### Automated assignments are temporary

The Salesforce round robin and the [lead-gateway](https://github.com/PostHog/lead-gateway) assign accounts automatically (see [task assignment logic](/handbook/growth/sales/crm#task-assignment-logic)). This assignment also shows in Customer Analytics, but it makes you a temporary owner only. If you disqualify the task or unassign yourself in Salesforce, Customer Analytics removes you from the account.

A human assignment in Customer Analytics stays. If a person assigned you in Customer Analytics and you unassign yourself in Salesforce, Customer Analytics makes you the owner again in approximately 5 minutes. To come off the account, unassign yourself in Customer Analytics and remove any relevant tags.

Do not change the owner in Salesforce. For an account that Customer Analytics controls, Customer Analytics writes over the Salesforce owner. An account without a PostHog organization is not in Customer Analytics, so you can manage it in Salesforce. If the account gets a PostHog organization later, the Salesforce owner becomes the owner in Customer Analytics.

### Technical Account Managers

- Team Leads will assign you as the TAM on the account in Customer Analytics and add the 'AM Managed' tag. 
- The account must have the `AM Managed` tag to count toward your quota. Do not add or tag yourself. See the [TAM book of business rules](/handbook/growth/sales/how-we-work#tam-book-of-business-rules).

### Technical Account Executives

- Your TAE assignment comes from Salesforce automatically. The `AE Managed` tag does not.
- Add the `AE Managed` tag in Customer Analytics yourself, with approval from your team lead. Without it, the account does not count toward your quota.

### Ownership history

The `system.account_relationships` table keeps the history of all account relationships. Each row is one person in one role on one account:

- `started_at` is the date the relationship started.
- `ended_at` is the date the relationship stopped. It is empty while the relationship is active.
- `definition_id` joins to `system.account_relationship_definitions` for the role name. `account_id` joins to `system.accounts`.

Use this table to find who owned an account at a given date.

---

## How to request coverage

To request CSM coverage, add:

- `csm overlay needed` when you are keeping the account but need CSM support
- `csm handover needed` when you are handing the account over to a CSM

To request TAM coverage for an account with a qualified growth opportunity, add the `tam overlay needed` tag in Customer Analytics.

---

## Books and the quarterly review

Each quarter, TAM and CSM team leads review coverage and rebalance books. TAM allocation requires Ben's approval; CSM allocation requires Simon's approval. Accounts can still be added during the quarter when a handover or qualified growth opportunity requires it.

### CSM books

CSM books target around $2.5M ARR and are balanced by account size as well as total ARR. Book targets are covered in [how the Customer Success team works](/handbook/customer-success/how-we-work#book-of-business).

If your book is outside the current target at quarter start, work with your team lead to rebalance it.

#### CSM allocation

Every $20k+ account should have a CSM. At the start of each quarter, CSM team leads, with Simon's approval, review:

1. **The <PrivateLink url="https://us.posthog.com/code/canvas/55b93018-aa64-4d36-9996-7b9415a043fd/01a0425d-ad76-7a59-9f74-e77d73a9a30a">Uncovered customer backlog</PrivateLink> canvas** to find accounts without a CSM
2. **Accounts tagged `csm overlay needed` or `csm handover needed`** that need a CSM assigned
3. **CSM books outside the current target** to identify which accounts should be rebalanced

For accounts with no previous owner, use PostHog GeoIP data to identify the account's primary region. The relevant team lead then assigns the CSM in Customer Analytics. Once the CSM is assigned, a <PrivateLink url="https://us.posthog.com/project/2/workflows/01a00fc0-0f90-0000-6aa7-b78a941c08cb/workflow">workflow removes the tags automatically</PrivateLink>.

> Once a day an <PrivateLink url='posthog-code://loop/9f441418-1400-4839-b82c-4ce3f8bcb2cb'>automation</PrivateLink> runs which adds a region tag to the account to assist in routing to the correct team.

### TAM books

TAM book size is set by ARR under management. Account count follows from that. This mirrors how [CSM books](/handbook/customer-success/how-we-work) are balanced, by shape as well as total.

- **Target:** Around $1.5M to $2M ARR per TAM. This usually works out to 12-18 accounts. There is a little in-quarter wiggle room, but generally TAMs should focus on a defined book of business. 
- **Rough makeup:** 1-2 accounts around $200k ARR, 3-4 around $100k, and the rest in the $30k-$100k range.

Beyond total size, a balanced book also needs:

- **Billing mix.** At least 40% of book ARR on monthly billing. Annual accounts still have plenty to work: renewals, cross-sells, and expanding into more of the org. But monthly accounts are where annual conversions come from, and usage growth there turns into cash faster, so a book with little monthly billing has a thin conversion pipeline.
- **Conversion candidates.** At least 2 accounts above $100k ARR with a realistic path to an annual conversion this year.
- **A staggered renewal calendar.** If half your book renews in the same quarter, a single weak quarter can set back the whole year, so spread renewals across the calendar.
- **Concentration awareness.** Two $200k accounts can be a quarter of your book. That's fine, but know what losing one does to your number. Don't stack more concentration than that.

If your book is outside these bounds at quarter start, work with your team lead to rebalance.

#### TAM allocation

A TAM is added on top of CSM coverage where an opportunity qualifies. At the start of each quarter, TAM team leads, with Ben's approval, review:

1. **Accounts still tagged `tam overlay needed`** that are waiting for a TAM with room. New requests don't wait for this review: they get an answer within two weeks (see [before you tag the account](/handbook/growth/sales/adding-and-removing-a-tam#before-you-tag-the-account))
2. **TAM books outside the $1.5M-$2M ARR band** to identify which accounts to rebalance
3. **Accounts where the TAM should be removed** because expansion is exhausted

Once the decision is settled, the team lead updates the tags and assigns the specific TAM in Customer Analytics. When the TAM is assigned, remove the `tam overlay needed` tag.

#### Mid-quarter TAM changes

Account removals should only happen at the end of the quarter so that quota can be calculated correctly. However, accounts can be **added** to your book at any time if you're confident there's growth potential.

If you're assigned an account with a previous owner, work with them on a proper handover. If the customer isn't in a healthy state (usage and engagement-wise), push back and ask the previous owner to get them to a good state first.

> New accounts with no previous owner come with a 3 month grace period – if they churn in that initial period, they won't count against your quota. Don't ask for the TAM field to be set until you're confident there's growth potential.

---

## Exceptions

### Top 40 account management

Our highest-spend customers (~Top 40 by ARR) get special consideration. Adding or removing a TAM on a Top 40 account is decided directly by Ben and team leads rather than the standard Team Lead process. The bar for change is higher here. Sometimes a TAM stays on a saturated account because the relationship is strong and there's long-term strategic value.

---

## When an account moves owner

### Handing over customers

To help the new owner hit the ground running, we should make sure the customer is in a good state and a warm introduction happens.

If the account is at $20k+ in usage-based ARR or on a non-legacy Enterprise plan, the TAE handoff always goes to a CSM. Signing a prepaid or annual contract doesn't trigger the handoff by itself: the account needs to be onboarded and consuming at the $20k threshold. The handover typically happens around 3 months after the initial credit purchase, or 12 months after the initial credit pre-purchase if the TAE retains the account against a specific opportunity (see the [journey page ownership rules](/handbook/growth/sales/customer-journey#ownership-rules)). If a qualified expansion opportunity exists at handover, a TAM is added at the same time. If usage is still under the threshold at the 3 month mark, the TAE hands the renewal opportunity over to the relevant CSM team lead to work the renewal and monitor the account. The team lead is responsible for ensuring the renewal is managed by a CSM as per the [renewal handbook guidelines](/handbook/customer-success/renewals#when-to-start). The team lead is not responsible for support or proactive adoption work. Once the account reaches $20k+ in usage-base ARR, it will be queued for a CSM's book.

TAM add and removal aren't handoffs, since the CSM stays throughout. See [Adding a TAM](/handbook/growth/sales/adding-and-removing-a-tam#adding-a-tam-to-an-account) and [Removing a TAM](/handbook/growth/sales/adding-and-removing-a-tam#removing-a-tam-from-an-account) above.

> For accounts who will be landing at $100k+ a year or have high expansion potential after the initial deal, we should involve a TAM early in the process to ensure a smooth transition. See the section further down this page on how this works.

- When judging growth potential, use [how to evaluate an account's revenue growth potential](/handbook/growth/sales/evaluating-growth-potential)
- When in doubt, ask yourself: do I see this account growing in the next year? If not, it doesn't need a TAM

For handover to take place there should be an Account Plan (saved as a note on the account in Customer Analytics) and the customer should have been onboarded properly to the products they are currently paying for.

> All open invoices should also have been paid before handing over. It makes sense to use existing relationships to chase payments, rather than the new owner's first action needing to be chasing payments/suspending access for non-payment.

> For TAE accounts being handed over to a CSM, add the `csm handover needed` tag in PostHog Customer Analytics and flag it with the relevant CSM team lead. There's no need to wait for the end of the quarter. The team lead will review the plan and current state of the customer, then assign a new owner with Simon's approval.

### High potential customers

For TAE-led customers who will be landing at $100k+ a year or have high expansion potential into new product areas, we should introduce a TAM earlier on than normal.

The prime time for this is when the technical win is confirmed - the TAM should be introduced to the customer by the TAE in an evaluation or POC wrap-up call when we know that the customer has selected PostHog.

The introduction is purely for relationship building and continuity purposes so that the TAM can hit the ground running with the customer after the initial credit pre-purchase is signed. It's still on the TAE to work with the customer on the deal, and as such only the TAE will be recognized on the initial deal for commission purposes. After the initial deal is closed won the TAM will take over the account in their book of business.

The TAE and TAM should use their overlapping time to work with the customer on a documented onboarding plan per the above guidance.
