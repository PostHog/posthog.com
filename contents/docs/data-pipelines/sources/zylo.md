---
title: Linking Zylo as a source
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
sourceId: Zylo
---

import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Zylo connector syncs your SaaS spend and license management data into PostHog, including applications, licenses, users, contracts, payments, and more. Use it to analyze software spend alongside your product data.

## Prerequisites

You need:

- A Zylo account with Enterprise API access
- An API token ID and token secret, created in Zylo under **Integrations → API Integration → Connect**
- Read scopes on your API key for the resources you want to sync (e.g. `applications:read`, `contracts:read`, `spend:read`, `team:read`)

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Zylo.
3. Enter your Zylo **Token ID** and **Token secret** from your Zylo API Integration settings.
4. Click **Next**.
5. Select the tables you want to sync and configure sync frequency as needed.
6. Click **Import**.

## Scope requirements

Different tables require different API key scopes. If your token doesn't have a particular scope, those tables show a permission error but other tables still sync successfully.

| Tables                                                               | Required scope                                          |
| -------------------------------------------------------------------- | ------------------------------------------------------- |
| Applications, ApplicationLicenses, SavingsEvents, ApplicationBudgets | `applications:read`                                     |
| Contracts, ContractLineItems, Suppliers, PendingContracts            | `contracts:read`                                        |
| Payments                                                             | `spend:read`                                            |
| ApplicationUsers, ActivityHistory, Users                             | `team:read`                                             |
| PurchaseOrders, POLineItems                                          | `applications:read` and `spend:read` (premium feature)  |
| ApplicationStats                                                     | `applications:read`, `spend:read`, and `contracts:read` |
| Views                                                                | `admin`                                                 |

## Sync modes

<SyncModes />

All Zylo tables except `application_stats` support incremental sync using either `zylo_created_at` or `zylo_modified_at` timestamps. The `application_stats` table supports full refresh only, because its spend and usage aggregates change every day. Full refresh is also available for all tables.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

- **applications** - SaaS applications in your Zylo catalog
- **application_licenses** - License seats assigned to users
- **application_users** - Users of applications with usage and activity data
- **contracts** - Software contracts with suppliers
- **contract_line_items** - Priced line items within contracts
- **payments** - Payments made for applications
- **purchase_orders** - Purchase orders for software spend (premium feature)
- **po_line_items** - Line items within purchase orders (premium feature)
- **suppliers** - Vendors that you buy software from
- **savings_events** - Cost-savings events like license reductions
- **application_budgets** - Yearly budget allocations per application
- **activity_history** - Audit log of changes to Zylo records
- **pending_contracts** - Uploaded contract documents whose extracted data is not yet a committed contract
- **application_stats** - Aggregated spend, license utilization, user, contract, and renewal stats, one row per application (full refresh only)
- **users** - People in your Zylo team directory, from direct, HR, or SSO integrations
- **views** - Named groupings of applications, such as a cost center or business unit

## Troubleshooting

<TroubleshootingLink />
