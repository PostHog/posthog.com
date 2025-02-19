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

1. Go to the [Data pipeline page](https://us.posthog.com/pipeline/sources) and the sources tab in PostHog
2. Click **New source** and select Stripe
3. Get your Account ID from your [Stripe user settings](https://dashboard.stripe.com/settings/user) under Accounts then ID
4. Get a [restricted API key](https://dashboard.stripe.com/apikeys/create) that can read the resources you want to query
4. *Optional:* Add a prefix to your table names
6. Click **Next**

> For Stripe tables, incremental syncs will only sync new records and not update existing records. This is a limitation of the Stripe API in which it's not possible to query for updated data. 

The data warehouse then starts syncing your Stripe data. You can see details and progress in the [data pipeline sources tab](https://us.posthog.com/pipeline/sources).