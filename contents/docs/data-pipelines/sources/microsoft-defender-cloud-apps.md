---
title: Linking Microsoft Defender for Cloud Apps as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MicrosoftDefenderCloudApps
---

The Microsoft Defender for Cloud Apps connector syncs security alerts, file metadata, and entity data into PostHog's data warehouse. It pulls data from the [Defender for Cloud Apps REST API v1](https://learn.microsoft.com/en-us/defender-cloud-apps/api-introduction) using a portal API token.

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and then click **Link** next to **Microsoft Defender for Cloud Apps**.
3. Enter your **Portal URL**. You can find this in the Microsoft Defender portal under **Settings** > **Cloud Apps** > **System** > **About**. The URL looks like `https://your-tenant.us2.portal.cloudappsecurity.com`. It must use HTTPS.
4. Next, create an API token in the Microsoft Defender portal. Go to **Settings** > **Cloud Apps** > **System** > **API tokens** and generate a new token. A read-only token is sufficient. See [Microsoft's authentication docs](https://learn.microsoft.com/en-us/defender-cloud-apps/api-authentication) for details.
5. Paste the token into the **API token** field in PostHog.
6. Select the tables you want to sync, set the sync frequency, then click **Import**.

The data warehouse then starts syncing your Defender data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Available tables

| Table      | Description                                                                                           | Sync method                 |
| ---------- | ----------------------------------------------------------------------------------------------------- | --------------------------- |
| `alerts`   | Security risks that Microsoft Defender for Cloud Apps detects in connected cloud apps.                | Incremental or full refresh |
| `files`    | Metadata about files and folders in connected cloud apps, including ownership and modification dates. | Full refresh                |
| `entities` | Users and accounts that use the organization's connected cloud apps.                                  | Full refresh                |

- **Incremental** syncs for `alerts` use the `timestamp` field (milliseconds since Unix epoch) to collect new alerts since the last sync. Use a full refresh to update older alert statuses.

- **Full refresh** syncs re-download every row on each sync.

## Sync limitations

- **Files and entities require Microsoft Defender for Cloud Apps.** Microsoft excludes these tables from Microsoft 365 Cloud App Security. Only `alerts` is available on that tier.

- **Large file collections may time out.** Microsoft [warns](https://learn.microsoft.com/en-us/defender-cloud-apps/api-files-list) that listing files can time out for large collections.

- **Rate limiting.** Microsoft limits requests to 30 per minute per tenant. PostHog handles `429` responses and `Retry-After` headers automatically.

- **Activity logs are excluded.** Activity logs are not available from this source to avoid unbounded event streams.

- **Portal tokens are on a deprecation path.** Portal-generated API tokens still work but Microsoft is [deprecating them](https://learn.microsoft.com/en-us/defender-cloud-apps/api-authentication) in favor of other authentication methods. PostHog will update the connector as needed.

## Troubleshooting

**401 – Invalid or expired API token.** Your API token is invalid or expired. Create a new token in the Microsoft Defender portal under **Settings** > **Cloud Apps** > **System** > **API tokens** and reconnect the source in PostHog.

**403 – Insufficient permissions.** Your API token cannot read the requested data. Check the token owner's permissions and verify your Defender license includes the tables you're syncing (files and entities require full Defender for Cloud Apps).

**Portal URL rejected.** The portal URL must use HTTPS and point to a public Microsoft Defender host. Verify the URL matches what's shown under **Settings** > **Cloud Apps** > **System** > **About** in the Defender portal.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
