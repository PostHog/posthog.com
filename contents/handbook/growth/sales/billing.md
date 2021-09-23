---
title: Billing
sidebar: Handbook
showTitle: true
---

## Managing billing

This handbook section is sort of the operation manual for the billing engine. If you're looking for the technical details or need to troubleshoot something check out the relevant [tech docs](https://github.com/PostHog/posthog-cloud#additional-docs)

### Self-hosted
For customers with special pricing (i.e. very large volumes or Enterprise & Supported plans), we need to manually set up the billing information on the system. This page contains instructions for setting up billing. Please note this page covers the process after an official PostHog quote has been approved by the customer. For information before this stage, please refer to the [Sales](/handbook/growth/sales/sales-operations) section of the handbook. Contrary to cloud plans, **all self-hosted _paid_ plans must be manually prepared today** (i.e. there's no self-serve option yet). To set up billing for self-hosted, please follow these instructions:

#### Setting up a subscription

You can send customers to https://license.posthog.com and they can self-serve a license.

You can create bespoke pricing with the following steps:

1. Go to https://dashboard.stripe.com/products and click 'Add product'
1. Give it a name (likely the name of the customer) and description
1. Pricing model select "Graduated model"
   1. The first tier is likely a flat fee, all the other tiers are likely unit based prices
1. Select "Usage is metered"
1. Save product, and copy the API ID under "Pricing" (starts with `price_`)
1. Send customer to `https://license.posthog.com/?price_id=price_...`

#### Activate subscription

As a customer, to redeem a license key:
1. Go to the license page in your PostHog instance. `<your url>/instance/licenses`.
1. Enter the received license key in the input.
1. Tap on activate license key and you are good to go.


### Cloud billing
Cloud billing may be set up using self-serve. For this, the new user just needs to go to the [organization billing](https://app.posthog.com/organization/billing) page and select one of the available plans (internally please note these plans must have both `is_active` and `self_serve` set to `True`). Billing can also be set up from account creation, by adding the `plan_key` as a query string parameter (e.g. `https://app.posthog.com/signup?plan=standard`), this is helpful for redirections from landing sites where a plan has already been selected.


For PostHog Team: to set up a billing agreement, please follow these steps.
1. Go to the [Django admin](https://app.posthog.com/admin/) and open the [Organization billing](https://app.posthog.com/admin/multi_tenancy/organizationbilling/) objects.
2. Search for the relevant user (either by name, company name, email or Stripe IDs).
3. Once you have the appropriate user, select the plan you want to assign to the organization.
4. In addition to the plan, be sure to check the "Should setup billing" checkbox and click save.

After this the user will be prompted in their app to enter their card details to initiate the billing agreement.

If you need to activate a plan bypassing actual billing on Stripe (this should be extremely rare!), just set up a `billing_period_ends` that is after today's date (and be sure that "Should setup billing" is not checked).


#### Non-profit organizations
We offer 50% discount to non-profit companies (see [pricing](/pricing#non-profits)). The activation process is as follows:
1. Non-profit company reaches out to PostHog, likely via email.
1. On our end we validate the company is eligible for the discount.
1. Validate the customer has signed up for the standard plan and completed the billing process. Easiest done in [Stripe dashboard][stripe_dashboard], look up the customer using the owner's email address. The Standard Plan subscription must be active **and** the customer must have a valid payment source on file.
1. On the customer page click on Actions, and then _Apply coupon_. Select coupon "Non-profit organization discount" (ID: `NxipELS0`)
1. Let the customer know via email.


#### Startup & YC plans
We offer [a deal](/handbook/growth/sales/yc-onboarding) for certain YC companies & other startups, while the details of this deal change periodically (and are documented in the main website and/or ops repo), here are the details on how to apply the plan for a company. Internally, these plans have special logic handling in the [posthog-cloud][posthog-cloud] repo. If our deal terms changes (current details detailed below), a new plan needs to be added. This custom logic is handled in `multi_tenancy/models.py#handle_post_card_validation`). Currently we only have one plan (`plan_key = startup`) which provides free billing for 1 year and a 20M monthly event allocation.

**How to apply it**
- Follow the steps above (Go to Django admin, find the relevant customer, ...).
- For the plan, you'll choose the custom startup plan, `plan_key = startup`. Be sure to check the `should_setup_billing` checkbox!
- Let the customer know they need to enter their card information at the prompt (shown on every page of the app).
- After they enter their card information successfully, the plan will be activated and the prompt will disappear. The plan will last for 365 days from the moment they confirm their card details.

**General structure & notes**
- The way this plan works internally is that it creates a checkout session with `mode = setup` and with a card pre-authorization charge instead of a subscription agreement. This way, we validate the card is active and it gets saved on Stripe for future use. When we receive confirmation the charge has been processed and the card saved (via the `payment_intent.amount_capturable_updated` webhook), we do the custom logic handling to enable the plan for 365 days.
- There's an issue, [posthog-cloud#92](https://github.com/PostHog/posthog-cloud/issues/92), with some details on tech debt / improvements to this flow.



#### Updating subscriptions
This section provides instructions for a PostHog team member to change subscriptions for a existing customer (e.g. if they want to upgrade/downgrade, move from legacy plans to standard plans, etc.)
1. Look up the customer on [Stripe dashboard][stripe_dashboard] using their email address or Stripe ID (this ID can be obtained from Django Admin too, under `OrganizationBilling` object).
1. Click on the customer's current subscription.
1. Click on _Update subscription_.
1. Remove the old item from the pricing table and add the new item. 
1. Click on _Update subscription_. Do not schedule the update for a later time. There will be unintended side effects if the changes are not applied immediately.
1. Find the corresponding `OrganizationBilling` on [Django Admin](https://app.posthog.com/admin/multi_tenancy/organizationbilling/). You can look up by the same email address.
1. Update the **new billing plan and the new Stripe subscription item ID**. The subscription item ID starts with `si_` (not to be confused with a Subscription ID). This **ID will have changed**, the Subscription ID remains the same.

[license]: https://github.com/posthog/license
[posthog-cloud]: https://github.com/posthog/posthog-cloud
[stripe_dashboard]: https://dashboard.stripe.com/