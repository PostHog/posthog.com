---
title: Linking Stripe as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

The Stripe connector can link charges, customers, invoices, prices, products, subscriptions, and balance transactions to PostHog. 

To link Stripe:

1. Go to the [data warehouse tab](https://us.posthog.com/data-warehouse) in PostHog
2. Click **Link Source** and select Stripe
3. Get your Account ID from your [Stripe user settings](https://dashboard.stripe.com/settings/user) under Accounts then ID
4. Get a [restricted API key](https://dashboard.stripe.com/apikeys/create) that can read the resources you want to query
4. *Optional:* Add a prefix to your table names
6. Click **Next**

The data warehouse then starts syncing your Stripe data. You can see details and progress in the [data warehouse settings tab](https://us.posthog.com/data-warehouse/settings).