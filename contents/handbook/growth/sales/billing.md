---
title: Billing
sidebar: Handbook
showTitle: true
---


## Managing billing

With the addition of our "V2" Billing architecture, billing for **self-hosted** and **cloud** is almost identical, with all PostHog instances talking to a common external **Billing Service**. This service is the single point for managing billing across PostHog Cloud US, PostHog Cloud EU and self-hosted customers. It leans heavily on our payment provider Stripe for both showing what products are available as well as controlling things like free-tier allowances.


### Stripe Products & Prices

> ⚠️ Modifying products and prices should be done carefully. If you aren't sure at any point contact the #growth team to check what you are doing

Each of our billable Products has an entry in Stripe with each Product having multiple Prices.
We use a billing config file to determine what is shown in the UI, and how billing should behave.
We use metadata on these prices to allow the Billing Service to appropriately load and offer products to the instances:


![Stripe products](../../../images/handbook/growth/sales/stripe-products.png)



#### Custom metadata
**On Stripe Products**
* `posthog_product_key`: `posthog_analytics` | `session_replay` | ... -> This allows PostHog to find and map the relevant products. **Important:** There should never be more than 1 Stripe product with the same `posthog_product_key`. The list of keys is defined in the main billing config.

**On Stripe Product Prices**
The following keys are used to manage Startup prices:
* `plan` - Any Startup plan prices must have the `plan` metadata set to `startup` to have their subscription automatically moved to the default (paid) prices. If not, when their subscription ends they will instead be switched to the free plans for all products. 
* `valid_days` -> The number of days a price is valid for, before automatically switching to another plan (the `default` plan unless `move_to_price_id` is set). Useful to create pricing that is only valid for a specific period, e.g. for the startup plans. Note: if more than one price with `valid_days` is added to a subscription, the validity period will be the *shortest* of the two, before resetting all plans to the default ones 
* `move_to_price_id` -> Can be used to specify if the customer needs to be moved to a specific pricing, rather than the default one, at the end of the subscription period.


### Custom pricing 

Each Product has multiple prices that can be used in a subscription. Which price is default depends on the billing config file.
The `default` price in Stripe does not affect the actual default price for a product. This is instead defined in the billing config.
There are special prices named `Free` which can be used to give a product for free. These can be added manually.
As far as possible these existing prices should be used in combination with `Coupons` to offer custom deals to customers. 
In general, if coming from the UI, a customer will subscribe to certain prices depending on the config. 
In more complex cases however it may be useful to create a custom pricing configuration for a product(s).
This will send a webhook to the service, which will update the UI accordingly, showcasing the custom price.
To do this:

1. Go to the appropriate product in question (**do not create your own Product**)
1. Click "Add another price"
1. **Important**: For metered products (e.g. Product Analytics, Session Replay) select `Graduated Pricing`, `Usage is metered` and `Maximum usage during period`. This is crucial as the Billing Service will always send the maximum number of events for the billable period, respecting any billing limits set at the time.
1. Expand the `additional options` and add a straightforward Price Description like `Custom - {date of creation}`
1. Add the tiers as you see fit
1. Add custom metadata if needed

![Stripe price example](../../../images/handbook/growth/sales/stripe-custom-price.png)

### Plans
> ⚠️ Modifying plans should be done carefully. If you aren't sure at any point contact the #growth team to check what you are doing

You can find a list of available plans in the billing repo. These are found inside `costants/plans`, divided by folder.
Each plan can have a list of features, and a price.
Features are used to infer which features are available in the product, for a customer on that plan.
You can manually change the plan for a customer by updating the `plans_map` in the billing admin panel.

### Upgrading a customer to Enterprise
Using the **Updating Subscriptions** flow below:
1. If a customer has already a subscription to a product, and you want to upgrade it, make sure to remove the existing product
2. Add any enterprise price to the subscription, in particular the `platform_and_support` product can be used to give enterprise features such as SSO.

### Moving a customer to a Startup plan
Same flow as updating a customer to Enterprise.
Create custom prices in Stripe, then follow the **Update Subscriptions** flow.

### Giving customers a free trial
1. Ask the customer to upgrade in the interface
2. Give them a free trial on Stripe


### Updating subscriptions

Stripe subscriptions can be modified relatively freely for example if moving to a custom pricing plan. 

![Stripe subscription update](../../../images/handbook/growth/sales/stripe-update-subscription.png)

1. Look up the customer on [Stripe dashboard][stripe_dashboard] using their email address or Stripe ID (this can be found in the Billing Service admin under `Customers`).
1. Click on the customer's current subscription.
1. Click on _Update subscription_.
1. Remove the old item from the pricing table and add the new item. 
1. Click on _Update subscription_. Do not schedule the update for a later time. There will be unintended side effects if the changes are not applied immediately.
2. Do not prorate the subscription.
3. The changes should be reflected for the user within a few minutes.

> **NOTE:** Removing a metered product price (events, recordings) and adding a new price will likely reset the usage. This is fine as the Billing Service will update it during the next sync.


### Self-hosted differences

Self-hosted customers as of 1.42.0 can signup for premium services within the product just as a Cloud customer would. The only additional step that occurs in the background is that a `License` is generated and automatically saved in their PostHog database and the license key emailed to them. This `License` does not actually enable any functionality but acts as a sort of API Key to talk to the Billing Service so that they can setup payment just as the Cloud instances do. Unlike the Cloud edition, only one Billing Customer can be created per self-hosted License.

#### Troubleshooting self-hosted

1. Something goes wrong during the activation flow
  * The customer should have a license key sent to their email which they can enter manually on the Organization Billing page
  ![Self hosted license key activation](../../../images/handbook/growth/sales/self-hosted-license-key.png)
  ![Self hosted license key activation input](../../../images/handbook/growth/sales/self-hosted-license-key-input.png)
2. The instance is air-gapped (blocked from calling external services)
  * If the customer can allow traffic to `billing.posthog.com` at least during the activation flow then they can do this and signup as normal.
  * If not, they will need some direct support to enter the license directly. Please reach out to #growth team who can advise here.

