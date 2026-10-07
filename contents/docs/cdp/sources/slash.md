---
title: Linking Slash as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Slash
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Slash connector syncs your corporate banking data – accounts, transactions, cards, invoices, invoice series, expense reports, and contacts – into PostHog.

<CalloutBox icon="IconInfo" title="Slash API access" type="info">

Slash labels API access as beta. You may need to request access from Slash support at support@joinslash.com before connecting.

</CalloutBox>

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Slash.
3. Get an API key from your Slash dashboard. Create a read-only key for your legal entity.
4. Enter your **API key** in PostHog. If you're using a user-scoped key (rather than an organization key), also enter your **Legal entity ID**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Slash data in PostHog.

## Available tables

| Table             | Description                                                                      | Sync method  |
| ----------------- | -------------------------------------------------------------------------------- | ------------ |
| `accounts`        | Slash bank accounts accessible to the API key                                    | Full refresh |
| `transactions`    | Transactions across Slash accounts, including card payments, transfers, and fees | Incremental  |
| `cards`           | Physical and virtual cards accessible to the API key                             | Full refresh |
| `invoices`        | Invoices for the legal entity, with their details and receiving account info     | Full refresh |
| `invoice_series`  | Recurring invoice configurations for the legal entity                            | Full refresh |
| `expense_reports` | Expense reports submitted for reimbursement, with merchant and review info       | Full refresh |
| `contacts`        | Counterparties for the legal entity, including customers and vendors             | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

<CalloutBox icon="IconWarning" title="Transaction reconciliation" type="caution">

Transaction dates can change when posting occurs. Date filters may miss later changes to older transactions. Use full refresh to reconcile those changes when needed.

</CalloutBox>

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
