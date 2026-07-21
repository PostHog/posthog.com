---
title: Linking Typeform as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Typeform
---

The Typeform connector can link data from your Typeform account into PostHog.

## Linking Typeform

1. In Typeform, go to your **Account** settings, navigate to **Personal tokens**, and click **Generate a new token**.
2. Give the token a name and select the required scopes: **Forms: Read** and **Responses: Read**. Copy the token. For more details, see Typeform's [Personal Access Tokens docs](https://www.typeform.com/developers/get-started/personal-access-token/).
3. In PostHog, go to the [Data pipeline sources page](https://app.posthog.com/data-management/sources), click **+ New source**, and then click **Link** next to Typeform.
4. Paste your **Personal Access Token**. If your account is on the EU region, set the **API base URL** to `https://api.eu.typeform.com` or `https://api.typeform.eu`.
5. Click **Next**, choose the tables you want to sync, and then click **Import**.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Available datasets and endpoints

The Typeform source currently supports syncing the following datasets and API endpoints:

| Dataset     | Endpoint path                |
| ----------- | ---------------------------- |
| `forms`     | `/forms`                     |
| `responses` | `/forms/{form_id}/responses` |

The `responses` dataset is a dependent (fan-out) endpoint — PostHog fetches all your forms first, then retrieves responses for each form individually.

## Syncing partial and started responses

By default, PostHog only syncs **completed** Typeform responses. You can change this using the **Responses to sync** setting when configuring your Typeform source:

- **Completed responses only** (default): Syncs only completed form submissions. Uses incremental sync on `submitted_at`.
- **All responses (including partial & started)**: Syncs completed, partial, and started responses. Uses a **full refresh** on every sync run.

The "All responses" mode uses full refresh because partial and started responses have no `submitted_at` timestamp, and Typeform's API doesn't provide a cursor that works across all three response types. This means incremental sync isn't possible when including partial responses.

> **Note:** To apply this change to an existing source, use **Delete table and resync** on the `responses` table. **Sync now** alone won't backfill the responses you're adding.

## Supported API base URLs

| Region           | API base URL                  |
| ---------------- | ----------------------------- |
| Global (default) | `https://api.typeform.com`    |
| EU               | `https://api.eu.typeform.com` |
| EU (alternative) | `https://api.typeform.eu`     |
