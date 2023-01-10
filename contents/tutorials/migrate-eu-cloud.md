---
title: How to migrate to EU Cloud
sidebar: Docs
showTitle: true
author: ['ian-vanagas']
date: 2022-10-11
featuredImage: ../images/tutorials/banners/tutorial-4.png
tags: ['configuration', 'settings']
---

> **Warning:** Migrating event data to PostHog's EU Cloud is a time-consuming process, likely to take several days or weeks. We strongly recommend users with a large amount of event data begin by setting up and connecting a new EU cloud instance and migrating data later, if needed. There is currently **no way** for Cloud instances to migrate the following data (although it is accessible via the PostHog API and self-hosted instances can use the [migrate metadata script](https://github.com/PostHog/posthog-migrate-meta)):
- PostHog user accounts
- actions, cohorts
- insights, dashboards
- annotations
- feature flags, experiments
- project settings, internal filters, API keys

For many companies, teams, and products, keeping customer data within the EU is critical for compliance with regulations such as GDPR. To help them with this, we’ve created an EU Cloud hosting option. It includes all the features of PostHog, with data being hosted in the EU (specifically Germany).

Why this matters is that the EU has stricter data privacy laws than other areas. In the EU, there are often stricter requirements for what companies can and can’t do with customer data. For example, there is less regulation in the US on data privacy. To understand how this applies to your company and data, you should check with a legal professional.

For this tutorial, we will go over how to migrate from US Cloud or self-hosting to EU Cloud. This process might take a while.

## Signing up for EU Cloud

The first step in migrating to EU Cloud is having an EU Cloud PostHog instance. Even if you have an existing PostHog Cloud instance, you need to create a new one. It is not possible (right now) to change your account between US Cloud (all cloud instances before this launch) or self-hosting and EU Cloud. Instead, you must create a new account and then migrate data to the new account.

> **Note:** If you are migrating from a Cloud instance, you'll need to manually recreate your insights, dashboards, feature flags, and other non-event data in EU Cloud. These won’t be migrated over from your US Cloud instance. Only events, persons, and other data derived from events are migrated through this process. Self-hosted instance users can use the [migrate metadata script](https://github.com/PostHog/posthog-migrate-meta) to migrate this data into EU Cloud.

To start with EU Cloud, you can go to the [cloud signup page](https://app.posthog.com/signup), enter your details, and be sure to select European Union as your data region.

![EU Cloud signup](../images/tutorials/migrate-eu-cloud/signup.png)

## Using the Replicator Plugin

Once you’ve created your EU Cloud account, you can immediately start migrating data there. To do this, in your original PostHog instance (either Cloud or self-hosted), go to Apps and search for the [Replicator app](/apps/replicator). Install it and then configure it to point to your EU Cloud instance.

![Replicator app](../images/tutorials/migrate-eu-cloud/replicator.png)

In the configuration menu (blue gear), enter the host (`eu.posthog.com`) and project key from your EU Cloud instance settings.

![Replicator config](../images/tutorials/migrate-eu-cloud/replicator-config.png)

After clicking save and activating it (toggle on the left side), the Replicator will start to run. Any events added to your old instance will be replicated in your EU Cloud instance. It can take a little while (15-20 minutes) for the first events to show up.

Once the Replicator is activated, go back to the configuration menu and click the gear next to "Export historical events" under "Jobs." On the calendar, select a start and end date, then click "Run job now." This will begin the process of historical events being import (and might take a while). You can see the progress in logs or by clicking the "App metrics" button (graph) and going to the "Historical exports" tab.

## Finished complete migration

Once the Replicator is set up, you’ll have your data and events in your new EU Cloud instance. To complete your migration, follow the steps below. 

1. Ensure the events you want are there. Check that EU Cloud data (events, persons, and other data derived from events) matches your self-hosting or US Cloud instance.
2. Switch your project key and host to your EU Cloud information. The Replicator app will continue to run, and replicating events over with a delay, but changing your project key and host is better and faster.
3. Recreate your insights, dashboards, feature flags, and other non-events data in EU Cloud (or, if self-hosted, run the [metadata migrator](https://github.com/PostHog/posthog-migrate-meta)). These won’t be migrated over from your old instance.
4. If necessary for compliance, delete data from your US Cloud or self-hosted PostHog instance.

Once all these are completed, you’ll be fully migrated to EU Cloud.

## Further reading

For more information about migration, check out our [docs](/docs/migrate/migrate-between-cloud-and-self-hosted).
