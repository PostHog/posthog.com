---
title: Linking Vitally as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Vitally
---

The Vitally connector can link accounts, conversations, notes, tasks, and more to PostHog.

To link Vitally:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Vitally.

3. Next, you need a secret token from Vitally. To start, click on your account logo in the top left, then **Settings**. Next, under **Operations**, select **Integrations**. Choose **Vitally REST API**, enable the integration with the toggle, and copy the secret token.

4. Back in PostHog, paste the token in the `Secret token` field, choose your Vitally region, and add a prefix for your tables if you want. Once all this is entered, click **Save**.

5. On the next page, set up the schemas you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can start using Vitally data in PostHog.

## Custom object records

In addition to the standard schemas (accounts, conversations, notes, etc.), PostHog automatically discovers any [custom objects](https://docs.vitally.io/pushing-data-to-vitally/rest-api/custom-objects) in your Vitally workspace and creates a separate schema for each one. These schemas are named `Custom_Object_<machineName>` (e.g., `Custom_Object_featureRequest`) and sync the actual records, not just the definitions.

To sync custom object records, refresh your source schemas. Each custom object appears as a toggleable schema. Once synced, the data lands in a table named `vitally_custom_object_<name>` (e.g., `vitally_custom_object_featurerequest`), which you can query directly in PostHog SQL. Incremental sync is supported via the `updatedAt` field.

> **Note:** The existing `Custom_Objects` schema still syncs custom object definitions (metadata). The new `Custom_Object_<machineName>` schemas sync the underlying records for each object.

## Configuration

<SourceParameters />
