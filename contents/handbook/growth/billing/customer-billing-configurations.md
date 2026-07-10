---
title: Customer billing configurations
sidebar: Handbook
showTitle: true
---

This document outlines all possible billing configurations for customers at PostHog. The goal is to ensure the team is on the same page with the different configurations we support to ensure things move smoothly as we scale. We want to ensure they support the billing repo, dashboard, usage reports, revenue reporting, etc.


Below are the main configurations. Configurations 1–4 are the ones we support for new customers going forward; configuration 5 (amortized credit payment) is **no longer offered for new contracts** and is retained here for legacy customers only. Each outlines how the Stripe accounts are setup and billing and how we account for revenue on them. 

1. Free plan customers
   - We don't need to worry about these users because they aren't paying anything, even if they have a Stripe account.
2. Paid plan customers
   - Regular user on a paid plan with no credits.
   - Pay the invoice directly with no funny business
   - Can be with or without tax.
   - Every line item on the invoice is a product with a product key
   - Should be using default products/prices
   - Should only have 1 stripe account and 1 subscription
   - **Details**
     - mrr = sum(mrr products) + tax
3. Start-up plan customers
   - Startup plan where users receive credits (e.g., $50,000).
   - Credits apply to all charges until the credits run out.
   - Credit usage needs to be tracked.
   - Metadata added to Stripe account (`is_startup_plan_customer`, `credit_expires_at`, etc.).
     - [There is an RFC](https://github.com/PostHog/product-internal/pull/610) in the works to update this metadata for better tracking.
     - We are going to revisit this process.
   - Revenue is not earned until credits are depleted or expired.
   - Can be with or without tax.
   - Should be using default products/prices.
   - Should only have 1 stripe account and 1 subscription.
   - **Details**
     - mrr = 0 while on credits
     - mrr per product = 0 while on credits
4. Enterprise customers (yearly credit purchase)
   - Enterprise customers pay an invoice for credits (before the subscription is created).
   - Once the invoice is paid, the subscription is created by CS.
   - Much of this is done via Zapier. See the [docs](https://posthog.com/handbook/growth/sales/billing) for more info.
   - Credits apply to their usage (including the Teams package - up to the discretion of the CS team is that's charged for).
   - Credits reduce product charges on invoices.
   - Can be with or without tax.
   - Should be using default products/prices.
   - Should only have 1 stripe account and 1 subscription.
   - **Details:**
     - mrr comes from the credits payment - yearly upfront payment (we split these)
     - mrr per product comes from the actual usage in that month (minus the credit-discount-percent on the customer)
5. Enterprise customers (amortized credit payment) — **legacy, not offered for new contracts**
   - > **We no longer offer this configuration for new contracts.** Per our [contract rules](/handbook/growth/sales/contract-rules#discounts), we require upfront payment for all discounted contracts — quarterly, monthly, or otherwise split payment terms are not available, irrespective of commitment length. If a customer needs payment flexibility, adjust the credit amount and discount to fit their budget while keeping payment upfront. The details below are retained only to document existing legacy customers still on this setup.
   - Similar to above, where an enterprise customer is paying for credits. This is the case where they commit but pay on a recurring cadence (e.g. monthly) rather than upfront.
   - That means they need two customers in Stripe - one for the credits and one for the usage.
   - Currently, this also means they have two customers in billing. See more below on "unsupported configurations" for how this will change. 
   - The credits are charged on a recurring cadence and tracked as MRR - cadence could be monthly, quarterly, semi-annually, during the fourth phase of the moon on the second sunday of the festival of Saturnalia, etc.
   - The usage is tracked by another stripe customer with its own subscription - where credit is used against invoices.
   - Can be with or without tax.
   - **Details:**
     - the customer will have two Stripe customers, each with a subscriptions
     - the mrr comes from the credits subscription on one customer
     - the mrr per product comes from the usage subscription (paid by the credits) on the other customer (minus the credit-discount-percent on the customer)

#### Legacy configuration
Note: this above list is focused about the creation of new customers going forward - there are many existing configurations not covered directly in this document.

#### Unsupported configurations
While we don't currently fully support these, we would like to soon:
- 2 Stripe Customers, each with 1 Subscription [There is another RFC](https://github.com/PostHog/product-internal/pull/604) outlining the current limitations in the works.