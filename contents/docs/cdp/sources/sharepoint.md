---
title: Linking SharePoint as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SharePoint
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The SharePoint connector syncs your SharePoint Online sites, lists, list items, document libraries, and file metadata into PostHog, so you can analyze your SharePoint data alongside your product data.

Personal OneDrive sites and hidden system lists are automatically excluded.

## Prerequisites

You need an [Entra ID (Azure AD) app registration](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) with a client secret. Grant it one of the following Microsoft Graph **application** permissions:

- **Sites.Read.All** – syncs every SharePoint site in the tenant. Requires admin consent.
- **Sites.Selected** – limits access to specific sites. List those site URLs in the **Site URLs** field during setup.

You'll also need the following values from your app registration:

- Directory (tenant) ID
- Application (client) ID
- Client secret

## Adding a data source

<SourceSetupIntro />

When linking SharePoint, you'll need:

- **Directory (tenant) ID** – the tenant ID from your Entra ID app registration, for example `00000000-0000-0000-0000-000000000000`.
- **Application (client) ID** – the application (client) ID from your app registration.
- **Client secret** – a client secret created for the app registration.
- **Site URLs (optional)** – one URL per line to limit the sync to specific sites. Leave empty to sync every site the app can read. For example: `https://contoso.sharepoint.com/sites/marketing`.

## Sync modes

<SyncModes />

All SharePoint tables are full refresh. Each sync replaces the contents of the table. Microsoft Graph has no reliable "modified since" filter across lists and drives.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Here's a summary of the tables the connector syncs:

| Table         | Description                                                                          |
| ------------- | ------------------------------------------------------------------------------------ |
| `sites`       | SharePoint sites the app can read, excluding personal OneDrive sites                 |
| `lists`       | Lists and document libraries in each site                                            |
| `list_items`  | Items in every visible list, with the list's column values in a `fields` JSON column |
| `drives`      | Document libraries (drives) in each site                                             |
| `drive_items` | File and folder metadata in every document library (not file contents)               |

## Limitations

- **File metadata only** – `drive_items` syncs file and folder metadata. It does not parse or import file contents (CSV, Excel, etc.).
- **Personal OneDrive sites excluded** – the sync automatically skips personal OneDrive sites.
- **Hidden system lists excluded** – SharePoint's internal system lists (workflow history, user info, etc.) are not synced.
- **Full refresh only** – all tables use full refresh sync. Incremental sync is not available.

## Troubleshooting

- If the connection fails with an Entra ID error, check the tenant ID, application (client) ID, and client secret are correct and that the secret has not expired.
- If you see "Microsoft Graph denied access to SharePoint," grant the app the **Sites.Read.All** application permission with admin consent, or list the site URLs it was granted through **Sites.Selected**.
- If a table syncs no rows, verify the app registration has access to the sites containing that data.

<TroubleshootingLink />
