---
title: Linking Azure API Management as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AzureApiManagement
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

<CalloutBox icon="IconInfo" title="Alpha" type="fyi">

The Azure API Management source is in alpha. [Tell us](https://us.posthog.com/#panel=support%3Asupport%3Adata_warehouse%3A%3Atrue) how it works for you, and report anything that looks wrong.

</CalloutBox>

The Azure API Management connector syncs gateway logs into PostHog: every request through the gateway, token usage for language model APIs behind the AI gateway, and WebSocket connections. Use it to see API usage and LLM token usage next to your product data.

## Prerequisites

- An API Management instance that sends its logs to a Log Analytics workspace.
- Permission to register an app in Microsoft Entra ID, and to assign roles on the workspace.

## Adding a data source

First, send API Management logs to a workspace:

1. Open the API Management instance in the Azure portal and go to **Diagnostic settings**.
2. Add a diagnostic setting that sends these log categories to your Log Analytics workspace: `GatewayLogs` (shown as **Logs related to ApiManagement Gateway**) for `ApiManagementGatewayLogs`, `GatewayLlmLogs` for `ApiManagementGatewayLlmLog`, and `WebSocketConnectionLogs` for `ApiManagementWebSocketConnectionLogs`.
3. Set **Destination table** to **Resource specific**. The source reads the resource-specific tables, not `AzureDiagnostics`.

<SourceSetupIntro />

When linking Azure API Management, you'll need:

- **Directory (tenant) ID** and **Application (client) ID** – from the **Overview** page of an [app registration](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) in Microsoft Entra ID.
- **Client secret** – create one under **Certificates & secrets** on the app registration and copy its value.
- **Workspace ID** – from the workspace's **Overview** page in the Azure portal.

Then give the app access to the workspace: in the workspace's **Access control (IAM)**, assign the **Log Analytics Reader** role to the app registration.

## Sync modes

<SyncModes />

Every table supports incremental sync on `_IngestionTime`, the time Azure stored each record, so records that arrive late still sync. Each incremental run reads the last 15 minutes again, because Azure ingests records concurrently. Rows are keyed on `_ItemId`, so the overlap doesn't create duplicates. Append only isn't available: only merge removes the duplicates.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **This workspace has no API Management logs** – the diagnostic setting sends logs to another workspace, or to `AzureDiagnostics` instead of resource-specific tables.
- **A table is empty or missing** – check that the diagnostic setting includes that log category and uses resource-specific tables. LLM logs only appear for APIs that use the AI gateway's LLM logging.
- **The app cannot query this workspace** – the app registration is missing the **Log Analytics Reader** role on the workspace, or the assignment hasn't applied yet.
- **Microsoft Entra ID rejected the app credentials** – the client secret expired or was copied incorrectly. Create a new secret under **Certificates & secrets** and update the source.
- **Basic or Auxiliary tables** – the source reads tables on the **Analytics** plan only. Switch a Basic table to the Analytics plan to sync it. Auxiliary tables can't be switched.

<TroubleshootingLink />
