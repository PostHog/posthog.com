---
title: Linking Salesforce as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

The Salesforce connector can link accounts, contacts, leads, and other custom objects to PostHog.

To link Salesforce:

1. Go to the [Data pipeline page](https://us.posthog.com/pipeline/sources) and the sources tab in PostHog
2. Click **Link Source** and select Salesforce
3. Log in to your Salesforce account and authorize PostHog to access your data
4. Select the objects you want to sync (e.g., Accounts, Contacts, Leads)
5. *Optional:* Add a prefix to your table names
6. Click **Next**

The data warehouse then starts syncing your Salesforce data. You can see details and progress in the [data pipeline sources tab](https://us.posthog.com/pipeline/sources).