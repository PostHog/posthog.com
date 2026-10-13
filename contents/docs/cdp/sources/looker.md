---
title: Linking Looker (Google Cloud) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Looker
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

> **Note:** This connector is in **alpha**. It's functional but may change based on feedback.

The Looker (Google Cloud) connector syncs users, Looks, dashboards, projects, folders, and LookML models into the PostHog data warehouse, so you can analyze your Looker metadata alongside your product data.

## Prerequisites

You need:

- A Looker (Google Cloud) instance accessible over the public internet
- API credentials (client ID and client secret) from a Looker user with access to the tables you want to sync
- The API instance URL for your Looker instance (including port if non-standard, e.g. `https://example.looker.com:19999`)
- HTTPS with a trusted TLS certificate on the instance URL

We recommend using a dedicated service account with the minimum permissions required to read the data you need. Create API credentials in **Admin > Users** by selecting the user and generating API keys.

## Adding a data source

<SourceSetupIntro />

You'll be asked for:

- **API instance URL** - The hostname (and optional port) of your Looker instance, e.g. `https://example.looker.com:19999`. Must use HTTPS with a trusted TLS certificate.

- **Client ID** - The API client ID from your Looker user's API credentials.

- **Client secret** - The API client secret from your Looker user's API credentials.

PostHog exchanges these credentials for a short-lived access token through Looker's `/api/4.0/login` endpoint. Your client secret is stored securely and never exposed after setup.

## Sync modes

<SyncModes />

All Looker tables use full refresh. Each sync replaces the contents of the table. This is because the Looker API endpoints don't expose creation or update filters that would support incremental syncing.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

- **users** - Looker users, their profile fields, and their group and role IDs. Credential and session objects are excluded for security.

- **looks** - Active saved Looks that the API user can access.

- **dashboards** - Active dashboards created by users. LookML dashboards and deleted dashboards are excluded.

- **projects** - LookML projects visible to the API user in the production workspace.

- **folders** - Folders visible to the API user, including their parent folder and creator IDs.

- **lookml_models** - LookML models and their Explore metadata visible to the API user.

> **Note:** Saved queries aren't available because the Looker API 4.0 has no endpoint to list them.

## Troubleshooting

- If the connection fails with a login error, your client ID or client secret is wrong. Regenerate your API credentials in **Admin > Users** and reconnect.
- If a table syncs with a 403 error, the Looker user doesn't have permission to read that resource. Check the user's roles and permissions.
- If PostHog can't connect, verify the instance URL uses HTTPS with a valid TLS certificate and is reachable over the public internet.

<TroubleshootingLink />
