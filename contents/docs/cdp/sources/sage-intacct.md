---
title: Linking Sage Intacct as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SageIntacct
---

import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Sage Intacct connector syncs your financial and accounting data – customers, vendors, invoices, bills, GL accounts, and journal entries – into PostHog, so you can analyze your finance data alongside your product data.

<CalloutBox icon="IconWarning" title="Alpha feature" type="caution">

The Sage Intacct source is in alpha. If you encounter any issues, please report them in [PostHog's GitHub repository](https://github.com/PostHog/posthog/issues).

</CalloutBox>

## Prerequisites

You need:

- A Sage Intacct account with REST API access enabled
- An OAuth client ID and client secret from a customer-owned OAuth application
- A web services username in the format `UserId@CompanyId` (or `UserId@CompanyId|entityId` for access to a single entity)

For details on setting up OAuth credentials, see the [Sage Intacct OAuth guide](https://developer.sage.com/intacct/docs/1/sage-intacct-rest-api/authorization-and-security/oauth2).

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Sage Intacct.
3. Enter your **Client ID**, **Client secret**, and **Web services username**.
4. Click **Next**.
5. Select the tables you want to sync and configure sync frequency as needed.
6. Click **Import**.

## Sync modes

<SyncModes />

All Sage Intacct tables use **full refresh** only. Each sync re-imports the complete dataset for the selected tables. This ensures edits and deletions in Sage Intacct are reflected in PostHog. Incremental sync is not supported.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

- **customers** – A customer that buys goods or services from the company
- **vendors** – A vendor that supplies goods or services to the company
- **invoices** – An accounts receivable invoice that records charges to a customer
- **bills** – An accounts payable bill that records charges from a vendor
- **gl_accounts** – A general ledger account in the company chart of accounts
- **journal_entries** – A journal entry that records a transaction in the general ledger

## Troubleshooting

<TroubleshootingLink />
