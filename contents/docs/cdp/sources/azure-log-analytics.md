---
title: Linking Azure Log Analytics as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AzureLogAnalytics
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

<CalloutBox icon="IconInfo" title="Alpha" type="fyi">

The Azure Log Analytics source is in alpha. [Tell us](https://us.posthog.com/#panel=support%3Asupport%3Adata_warehouse%3A%3Atrue) how it works for you, and report anything that looks wrong.

</CalloutBox>

The Azure Log Analytics connector syncs tables from an Azure Monitor Log Analytics workspace into PostHog. Use it to join application logs, requests, and custom log tables with your product data. In the source list, it's called **Microsoft Azure (Azure Monitor / Log Analytics)**.

## Prerequisites

- A Log Analytics workspace, and permission to assign roles on it.
- Permission to register an app in Microsoft Entra ID.
- Tables on the **Analytics** plan. Basic and Auxiliary tables can't be read through the query API this source uses, and the table list marks them.

## Adding a data source

<SourceSetupIntro />

When linking Azure Log Analytics, you'll need:

- **Directory (tenant) ID** and **Application (client) ID** – from the **Overview** page of an [app registration](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) in Microsoft Entra ID.
- **Client secret** – create one under **Certificates & secrets** on the app registration and copy its value.
- **Workspace ID** – from the workspace's **Overview** page in the Azure portal.
- **Tables** – the tables to sync, one per line, for example `AppRequests` or `MyEvents_CL`. Leave this empty to see every table that received data in the last 30 days.

Then give the app access to the workspace:

1. Open the Log Analytics workspace in the Azure portal.
2. Go to **Access control (IAM)** and select **Add role assignment**.
3. Choose the **Log Analytics Reader** role and assign it to the app registration.

Role assignments can take a few minutes to apply.

## Sync modes

<SyncModes />

Every table supports incremental sync on `_IngestionTime`, the time Azure stored each record. Records from an agent that was offline can arrive hours after their `TimeGenerated`, and they still sync because they have a recent ingestion time. Each incremental run reads the last 15 minutes again, because Azure ingests records concurrently. Rows are keyed on `_ItemId`, so the overlap doesn't create duplicates. Append only isn't available: only merge removes the duplicates.

A full refresh reads everything the workspace still retains. The table's interactive retention period decides how far back that goes.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **The app cannot query this workspace** – the app registration is missing the **Log Analytics Reader** role on the workspace, or the assignment hasn't applied yet.
- **Microsoft Entra ID rejected the app credentials** – the client secret expired or was copied incorrectly. Create a new secret under **Certificates & secrets** and update the source.
- **No table with that name** – table names are case-sensitive. Check the name in the workspace's **Logs** page.
- **A sync fails with a partial result** – the query hit a Log Analytics service limit even after PostHog retried with smaller pages. Contact support with the table name.

<TroubleshootingLink />
