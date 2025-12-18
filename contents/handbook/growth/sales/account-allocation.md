---
title: Account allocation and handover
sidebar: Handbook
showTitle: true
---
We have different roles within the team who manage customers at various stages in their lifecycle. Customers will typically sign up and start paying for PostHog themselves, or land as customers via a [Technical Account Executive](/handbook/growth/sales/how-we-work#technical-account-executives). Once customers hit $20k a year in spend with us they should have a dedicated Technical Account Manager or Customer Success Manager.

## TAM vs CSM

[Technical Account Managers](/handbook/growth/sales/how-we-work#technical-account-managers) (Sales Team) and [Customer Success Managers](/handbook/cs-and-onboarding/customer-success) (Customer Success Team) are the primary owner of customers spending $20k a year and above; and we aim to have full coverage of those customers across the two teams and roles. When deciding whether a customer should be with a TAM or CSM we factor in to account their usage of our primary products.

**Primary products** are the set of billable main products which we believe that all engineers should be using, not including add-ons or platform features. Our current set of primary products are:

- Session replay
- Feature flags
- Error tracking

We track whether a customer is paying for each product in Vitally using the `Paying for <Product Name>` trait.

- Customers already paying for all of the primary products are considered expanded to the max and should go to a Customer Success Manager. They should be pretty sticky as a customer so the main focus here is retention.
- Otherwise, there is room to grow and a Technical Account Manager should be focused on getting them using the three primary products.

> Today we have lots of customers who aren't paying for the three primary products so it might make sense to allocate some customers who are paying for 2 out of the 3 to a CSM whilst we are hiring more TAMs.

---

## Quarterly book planning

At the start of each quarter, TAMs should prepare their book of business with the following constraints in mind:

**Target book size:** 10-15 accounts with a combined ~$1.5m ARR. This gives TAMs enough focus to actually move the needle on expansion and credit pre-purchases.

**Maximum book size:** 15 accounts. New leads or handoffs from CS/Onboarding/TAEs will push a TAM above this throughout the quarter, but if you're starting a quarter at 18 accounts, you need to find a way to get to 15 or fewer.

### Accounts to remove from your book

At the end of the current quarter and before the next one starts, review each account and note which ones may be removed that meet any of the following criteria:

- **Churned or dropped below $20k ARR** – unless you have a documented, specific plan to get them above $20k this quarter
- **On YC Plan** – accounts $20k-$50k on the YC plan will go to the YC role on the CS team. Accounts above $50k should be a candidate for TAM referral if there is growth opportunity.
- **Fully expanded and committed** – if the account has all 3 core products adopted (Session Replay, Feature Flags, Error Tracking), has a discount agreement in place, and has no viable levers for net new revenue, they should go to a CSM
- **No viable expansion levers** – if there's genuinely no path to growth, it shouldn't be consuming TAM bandwidth.  You need to document what you've tried here so that we know all avenues for growth have been exhausted.

### What is NOT a valid reason to hand off

Low engagement or an account being "difficult to work with" is not a reason to pass them off. That's literally your job. Specifically:

- Account doesn't respond to your outreach
- Champion left and you haven't re-established relationships
- Low user activity or poor health score
- You don't like working with them / they don't like you

If an account is struggling on these dimensions, that's a signal you need to invest more effort – not hand them off. You should only hand off accounts that are in a **good state**.

---

## Doing the allocation

It's Simon's job, with input from Charles and Team Leads, to do the allocation. 

They will review the list of [$20K accounts without an owner](https://posthog.vitally-eu.io/hubs/152ccd4c-c7b2-4508-865b-b08fea5c3dc6/1c518181-54a5-4c59-98de-f0b0bb54f9c3), as well as accounts which need to be handed over from TAE and TAMs, or ones to be removed from books. We use the criteria above to figure out which team should own a customer, and then use Vitally data to understand which region they are primarily based in. Looking at the user list in Vitally will show you where the most users are so make a judgement call on where the TAM or CSM should be based to best support and engage with the customer. Once this has been decided the New Owner trait is populated with one of the following:

- US TAM
- US CSM
- EU TAM
- EU CSM

And then it is down to the Team Leads to figure out which team member is taking on the customer.

### Quarterly allocation process

At the start of each quarter, Simon (with input from Charles and Team Leads) reviews:

1. **[$20K accounts without an owner](https://posthog.vitally-eu.io/hubs/152ccd4c-c7b2-4508-865b-b08fea5c3dc6/1c518181-54a5-4c59-98de-f0b0bb54f9c3)** – accounts that need to be assigned
2. **Accounts flagged for handover** from TAEs, TAMs, and CSMs
3. **TAM books exceeding 15 accounts** – identifying accounts that should move to CSM or another TAM
4. **CSM accounts with expansion potential** – identifying accounts that should move to a TAM

Once Simon determines whether an account belongs with a TAM or CSM (and which region), the `New Owner` trait is populated, and Team Leads assign the specific team member. Simon and Team Leads will make updates to the proper segments, and it is not in an account owner's power to add or remove Managed segments for designated assignment. 

### Mid-quarter changes

Account removals should only happen at the end of the quarter so that quota can be calculated correctly. However, accounts can be **added** to your book at any time if you're confident there's growth potential. Work with team leads when they are identified to confirm they are a solid addition and prompt assignment.  

If you're assigned an account with a previous owner, work with them on a proper handover. If the customer isn't in a healthy state (usage and engagement-wise), push back and ask the previous owner to get them to a good state first.

> New accounts with no previous owner come with a 3 month grace period – if they churn in that initial period, they won't count against your quota. Don't ask for the `AM Managed` segment to be added until you're confident there's growth potential.

---

## Top 40 account management

Our highest-spend customers (~Top 40 by ARR) get special consideration for ownership decisions. Simon and Charles regularly review these accounts to:

- **Minimize ownership changes** – frequent handoffs create whiplash for customers and damage relationships
- **Ensure continuity** – the bar for changing ownership on a Top 40 account is higher than for the rest of the book
- **Make judgment calls** – sometimes a TAM should keep a "fully expanded" account if the relationship is strong and there's long-term strategic value

For Top 40 accounts, ownership changes (TAM→CSM or CSM→TAM) are decided directly by Simon and Charles, not through the standard Team Lead allocation process.

---

## Handing over customers

To help the new owner of a customer hit the ground running, we should make sure that the customer is in a good state and that a warm introduction happens. Typical handoffs between roles are:

| Transition | Typical timing | Condition |
|------------|----------------|-----------|
| TAE → TAM | 12 months after initial credit pre-purchase | Customer onboarded to 1-2 primary products |
| TAE → CSM | 12 months after initial credit pre-purchase | Customer onboarded to 3+ primary products |
| TAM → CSM | After expansion completes | All 3 core products adopted, discount agreement in place, no remaining expansion levers |
| CSM → TAM | When expansion opportunity identified | Customer not fully expanded and has clear growth potential |

> For accounts who will be landing at $100k+ a year or have high expansion potential after the initial deal, we should involve a TAM early in the process to ensure a smooth transition. See the section further down this page on how this works.

For handover to take place there should be an Account Plan (saved as a note on the account in Vitally) and the customer should have been onboarded properly to the products they are currently paying for.

> All open invoices should also have been paid before handing over. It makes sense to use existing relationships to chase payments, rather than the new owner's first action needing to be chasing payments/suspending access for non-payment.

### Account Plan

Every AM Managed account should have an up-to-date [Account Plan](/handbook/growth/sales/risk-mitigation-and-churn-prevention#quarterly-account-planning) saved as a note in Vitally. The existing owner should ensure that this is current and schedule a handover call to walk through it with the new owner. Feel free to push back and ask for it as the new owner if this doesn't happen! Ask your team lead or [Simon](/community/profiles/28895) for help with this if you're not getting the information you need from the previous owner.

### Product Onboarding

Before handing over a customer, the existing owner needs to ensure that the customer is onboarded properly to the products they are paying for. We should first ensure that they are only paying for what they need to as detailed in the [health checks](/handbook/cs-and-onboarding/health-tracking) section of the handbook and then ensure the following steps have been completed, depending on the products they are paying for:

> This is an initial pass at what good onboarding looks like for each product. We will refine this and add it to Vitally as a checklist to work through with the customer.

#### General principles

- They are aware of how to get support both via Slack and in-app and where in-app is more appropriate.
- They have the correct owners and admins set up in their PostHog organization.
- We have the correct finance contact details in Stripe.

#### Product analytics

- They have set up tracking, implementing posthog.identify() and posthog.group() correctly where appropriate.
- They are aware of the difference between anonymous and identified events.
- Event capture is tuned and automatic events have been turned off where not wanted.
- We have completed training for the core user base, so that they are aware of concepts such as Actions, Cohorts etc.
- They have set some insights and dashboards aligned with their use case for PostHog.

#### Session replay

- They have set up tracking using posthog-js.
- They are aware of the different recording controls and how to use them.
- They have implemented privacy controls where necessary.
- We have completed training for the core user base so that they know how to find specific recordings, as well as navigate from other products to session replays (e.g. from a funnel)

#### Feature flags

- They understand how to integrate feature flags into their workflow.
- Feature flag calls are implemented correctly so as not to artificially inflate the bill.
- They understand the current targeting mechanisms which are available.
- We've conducted training on how to set up Feature Flags and Experiments.

#### Data warehouse

- They have connected up the sources they need to.
- They are aware of the difference between incremental and full sync and the impact on billing.
- We've conducted training on using SQL in PostHog, creating views and joining on person data.

#### Error Tracking

- They have set up tracking using posthog-js.

---

## High potential customers

For TAE-led customers who will be landing at $100k+ a year or have high expansion potential into new product areas, we should introduce a TAM earlier on than normal.

The prime time for this is when the technical win is confirmed - the TAM should be introduced to the customer by the TAE in an evaluation or POC wrap-up call when we know that the customer has selected PostHog.

The introduction is purely for relationship building and continuity purposes so that the TAM can hit the ground running with the customer after the initial credit pre-purchase is signed. It's still on the TAE to work with the customer on the deal, and as such only the TAE will be recognized on the initial deal for commission purposes. After the initial deal is closed won the TAM will take over the account in their book of business.

The TAE and TAM should use their overlapping time to work with the customer on a documented onboarding plan per the above guidance.
