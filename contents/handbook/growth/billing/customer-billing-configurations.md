---
title: Customer billing configurations
sidebar: Handbook
showTitle: true
---

This document outlines all possible billing configurations for customers at PostHog. The goal is to ensure the team is on the same page with the different configurations we support to ensure things move smoothly as we scale. We want to ensure they support the billing repo, dashboard, usage reports, revenue reporting, etc.


Below are the main configurations. Each one outlines how the Stripe customers are set up and billed, and how we account for revenue on them.

1. Free plan customers
   - We don't need to worry about these users because they aren't paying anything, even if they have a Stripe customer.
2. Paid plan customers
   - Regular user on a paid plan with no credits.
   - Pay the invoice directly with no funny business
   - Can be with or without tax.
   - Every line item on the invoice is a product with a product key
   - Should be using default products/prices
   - Should only have 1 Stripe customer and 1 subscription. Configuration 5 below is the exception.
   - **Details**
     - mrr = sum(mrr products) + tax
3. Start-up plan customers
   - Startup plan where users receive credits (e.g., $50,000).
   - Credits apply to all charges until the credits run out.
   - Credit usage needs to be tracked.
   - Metadata added to the Stripe customer (`is_startup_plan_customer`, `credit_expires_at`, etc.), as agreed in [this RFC](https://github.com/PostHog/product-internal/pull/610). The [Vitally and Zapier automations](/handbook/growth/sales/automations) read the same metadata.
   - Revenue is not earned until credits are depleted or expired.
   - Can be with or without tax.
   - Should be using default products/prices.
   - Should only have 1 Stripe customer and 1 subscription. Configuration 5 below is the exception.
   - **Details**
     - mrr = 0 while on credits
     - mrr per product = 0 while on credits
4. Annual plan customers (prepaid credits)
   - The customer pays an invoice for credits before the subscription is created.
   - Once the invoice is paid, the subscription is created by revops.
   - Metadata added to the Stripe customer (`annual_plan_starts_at`, `annual_plan_ends_at`) sets the contract term. The billing service reads these dates to decide if the customer is on an annual plan today.
   - Much of this is done via Zapier. See the [billing docs](/handbook/growth/sales/billing) for more info.
   - Credits apply to their usage.
   - Credits reduce product charges on invoices.
   - Should be using default products/prices.
   - The Enterprise platform and support package is not related to this configuration. It is an add-on that a customer can buy on any configuration. See [contract rules](/handbook/growth/sales/contract-rules).
   - **Details:**
     - mrr comes from the actual usage in that month (minus the credit-discount-percent on the customer)

5. Customers with more than one organization
   - A customer can have more than one organization: one in the US cloud and one in the EU cloud (usually because their own customers need EU data residency), or several organizations that belong to one parent company. Data does not move between organizations, and the customer cannot query across them.
   - The same two options apply when a parent company asks us to bill several existing accounts as one. To migrate existing paying accounts into one of these options, see [consolidating billing across organizations](/handbook/growth/revops/billing-consolidation).
   - Before you choose an option, confirm these with the customer:
     - Why they need more than one organization. Some customers ask for a second region and then use only one organization.
     - The usage split they expect across the organizations.
     - If their finance team needs the spend for each organization, or if one invoice is enough.
   - Get the organization ID for each organization before contract setup. It is much easier to set the configuration up at the start than to change it later.
   - There are two options. Agree on one with the customer before the order form goes out. The list below gives what each one costs the customer and when to choose it.
   - **Option A: one Stripe customer for each organization**
     - Each organization gets its own Stripe customer, subscription, invoices, and credit pool.
     - Write the credit split for each organization on the order form.
     - Each organization operates as usual: separate spend visibility, MRR, forecasts, and billing limits.
     - The customer pays for each add-on one time for each organization. We can comp the add-ons on the second organization, so the customer pays one time.
     - Credits are not shared. If the split is incorrect, revops must move credits between the organizations manually.
     - Use this option when the customer knows the split, or when their finance team needs the spend for each organization.
   - **Option B: one Stripe customer for all the organizations**
     - The organizations share one Stripe customer, one subscription, one invoice, and one credit pool.
     - Usage from all the organizations is added together and reported against the shared subscription.
     - The customer pays for each add-on one time. No override is necessary.
     - The customer cannot see a spend breakdown for each organization.
     - All the organizations show the same combined usage and forecast numbers in the billing UI.
     - Billing limits for each organization are not reliable. A limit applies to the combined pool, and the organization that reported last wins.
     - Internally, MRR and invoices attach to the canonical organization, which is the organization with the lowest customer ID. The other organizations show no MRR in our own tools, which include flags, campaigns, and Vitally.
     - Use this option when the customer does not know the split, and their finance team does not need the spend for each organization.

#### Legacy configuration
Note: this above list is focused about the creation of new customers going forward – there are many existing configurations not covered directly in this document.
