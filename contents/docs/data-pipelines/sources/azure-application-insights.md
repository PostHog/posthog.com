---
title: Linking Microsoft Azure (Application Insights) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AzureApplicationInsights
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Azure Application Insights connector syncs your application telemetry – requests, dependencies, exceptions, and availability results – into the PostHog data warehouse. This enables you to analyze your application monitoring data alongside your product analytics.

## Prerequisites

Before connecting, you need:

1. A **Microsoft Entra app registration** with the **Reader** role assigned on your Application Insights resource. Follow [Microsoft's authentication setup](https://learn.microsoft.com/en-us/azure/azure-monitor/app/azure-ad-authentication) for instructions.

2. A **client secret** for the app registration. Create one under **App registrations > Certificates & secrets** in the Azure portal.

3. Your **Application Insights application ID**. Find it under **API Access** in your Application Insights resource in the Azure portal.

> **Note:** Only Azure public cloud is supported (`api.applicationinsights.io`). Sovereign clouds (government, China) are not supported.

## Adding a data source

<SourceSetupIntro />

When linking Azure Application Insights, you'll need:

- **Tenant ID** – your Microsoft Entra (Azure AD) tenant ID.

- **Client ID** – the application (client) ID of your Microsoft Entra app registration.

- **Client secret** – the client secret you created for the app registration.

- **Application Insights application ID** – the application ID from the **API Access** section of your Application Insights resource (this is different from the Azure resource ID).

## Available tables

| Table                 | Description                                                                  | Sync method |
| --------------------- | ---------------------------------------------------------------------------- | ----------- |
| `requests`            | Incoming application requests, with their duration and result                | Incremental |
| `dependencies`        | Calls to external services or storage, with their duration and result        | Incremental |
| `exceptions`          | Application exceptions and their diagnostic details                          | Incremental |
| `availabilityResults` | Availability test results that measure application responsiveness and uptime | Incremental |

All tables support both **incremental** and **full refresh** sync. Incremental syncs only fetch new or updated records using the `timestamp` field.

## Sync modes

<SyncModes />

## Sync limitations

- Each sync reads at most the **last seven days** of telemetry, including full refresh. To import older telemetry, use a separate [Azure export](https://learn.microsoft.com/en-us/azure/azure-monitor/app/export-telemetry).

- Incremental syncs repeat the **previous hour** before the last saved timestamp to capture delayed telemetry. Data that arrives more than one hour late may be missed.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Authentication error:** Your tenant ID, client ID, or client secret is incorrect or the secret has expired. Verify them in the Azure portal under **App registrations**, then reconnect.

- **Permissions error:** Your Microsoft Entra app does not have the **Reader** role on the Application Insights resource. Assign the role under **Access control (IAM)** on the resource, then reconnect.

- **Application not found error:** The Application Insights application ID is incorrect or the app registration does not have access. Check the ID under **API Access** in your Application Insights resource.

<TroubleshootingLink />
