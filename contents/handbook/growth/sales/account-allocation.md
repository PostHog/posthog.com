---
title: Account allocation and handover
sidebar: Handbook
showTitle: true
---
We have different roles within the team who manage customers at various stages in their lifecycle.  Customers will typically sign up and start paying for PostHog themselves, or land as customers via a [Technical Account Executive](/handbook/growth/sales/how-we-work#technical-account-executives).  Once customers hit $20k a year in spend with us they should have a dedicated Technical Account Manager or Customer Success Manager.

## TAM vs CSM

[Technical Account Managers](/handbook/growth/sales/how-we-work#technical-account-managers) (Sales Team) and [Customer Success Managers](/handbook/cs-and-onboarding/customer-success) (Customer Success Team) are the primary owner of customers spending $20k a year and above; and we aim to have full coverage of those customers across the two teams and roles.  When deciding whether a customer should be with a TAM or CSM we factor in to account their usage of our primary products.

**Primary products** are the set of billable main products which can be found on the [pricing](/pricing) page, not including add-ons or platform features.  Our current set of primary products are:

- Product analytics
- Session replay
- Feature flags
- Surveys
- Data warehouse
- Error tracking

We track the count of these products in Vitally using the `Total paid product count (main only)` custom trait and can use that number in determining who gets allocated to a customer.

- Customers paying for 1 or 2 primary products should go to a Technical Account Manager.  This is because there are a lot more products that the customer can use, so we need someone focused on cross-sell to make PostHog as sticky as possible.
- Customers paying for 3 or more primary products should go to a Customer Success Manager.  At this product count they should be pretty sticky as a customer so the main focus here is retention.

### Doing the allocation

It's Simon's job, with input from Dana and Charles, to review the list of <PrivateLink url="https://posthog.vitally-eu.io/hubs/152ccd4c-c7b2-4508-865b-b08fea5c3dc6/1c518181-54a5-4c59-98de-f0b0bb54f9c3">$20K accounts without an owner</PrivateLink>, as well as accounts which need to be handed over from TAE and TAMs. We use the criteria above to figure out which team should own a customer, and then use Vitally data to understand which region they are primarily based in. Looking at the user list in Vitally will show you where the most users are so make a judgement call on where the TAM or CSM should be based to best support and engage with the customer. Once this has been decided the New Owner trait is populated with one of the following:

- US TAM
- US CSM
- EU TAM
- EU CSM
- Singapore TAM

And then it is down to the Team Leads to figure out which team member is taking on the customer.

## Handing over customers

To help the new owner of a customer hit the ground running, we should make sure that the customer is in a good state and that a warm introduction happens.  Typical handoffs between roles are:

- TAE -> TAM 1-3 months after the initial contract is signed and the customer is onboarded into 1 or 2 primary products.
- TAE -> CSM 1-3 months after the initial contract is signed and the customer is onboarded into 3 or more primary products.
- TAE -> CSM after sufficient cross-product expansion has take place.

For handover to take place there should be an Account Plan and the customer should have been onboarded properly to the products they are currently paying for.

### Account Plan

Our [account planning template](/handbook/growth/sales/account-planning) is an ideal document to share with the new owner detailing everything they need to know about the customer.  The existing owner should have this up to date and then schedule a handover call for the new owner.  Feel free to push back and ask for it as the new owner if this doesn't happen!

### Product Onboarding

Before handing over a customer, the existing owner needs to ensure that the customer is onboarded properly to the products they are paying for.  We should first ensure that they are only paying for what they need to as detailed in the [health checks](/handbook/cs-and-onboarding/health-tracking) section of the handbook and then ensure the following steps have been completed, depending on the products they are paying for:

> This is an initial pass at what good onboarding looks like for each product.  We will refine this and add it to Vitally as a checklist to work through with the customer.

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

- They have connected up the sources the need to.
- They are aware of the difference between incremental and full sync and the impact on billing.
- We've conducted training on using SQL in PostHog, creating views and joining on person data.

#### Error Tracking

- They have set up tracking using posthog-js.