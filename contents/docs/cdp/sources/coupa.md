---
title: Linking Coupa as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Coupa
---

<CalloutBox icon="IconFlask" title="Alpha source" type="action">

The Coupa source is currently in **alpha**. If you run into issues, please let us know.

</CalloutBox>

The Coupa connector syncs spend management data from your Coupa instance into PostHog, including invoices, purchase orders, requisitions, suppliers, contracts, expense reports, users, and approvals.

## Prerequisites

Before linking Coupa, you need an OIDC client set up in your Coupa instance:

1. In Coupa, go to **Setup** > **Integrations** > **OAuth2/OpenID Connect Clients**.
2. Create a new OIDC client using the **client credentials** grant type.
3. Grant it read scopes for the objects you want to sync:

| Table           | Required scope             |
| --------------- | -------------------------- |
| Invoices        | `core.invoice.read`        |
| Purchase orders | `core.purchase_order.read` |
| Requisitions    | `core.requisition.read`    |
| Suppliers       | `core.supplier.read`       |
| Contracts       | `core.contract.read`       |
| Expense reports | `core.expense.read`        |
| Users           | `core.user.read`           |
| Approvals       | `core.approval.read`       |

You only need to grant scopes for the tables you plan to sync. If your Coupa instance doesn't support per-object scopes, PostHog falls back to a scope-less token request that uses whichever scopes the admin granted the OIDC client.

## Linking Coupa

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and the **Sources** tab in PostHog.
2. Click **+ New source** and select Coupa.
3. Provide your Coupa instance URL (e.g., `https://myorg.coupahost.com`). Only HTTPS URLs are accepted.
4. Provide the **Client ID** from your OIDC client.
5. Provide the **Client secret** from your OIDC client.
6. _Optional:_ Add a prefix to your table names.
7. Click **Next**.

The data warehouse then starts syncing your Coupa data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Sync behavior

All Coupa tables support incremental syncing using Coupa's `updated_at` filter. On incremental syncs, PostHog only fetches records modified since the last sync, which keeps sync times short and reduces API usage.

If a sync is interrupted, it resumes from where it left off rather than starting over.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
