---
title: Linking Zoho CRM as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ZohoCRM
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Zoho CRM connector syncs leads, contacts, accounts, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your Zoho CRM account to pull leads, contacts, deals, and your other modules.

In the [Zoho API console](https://api-console.zoho.com), create a **Self Client** and generate a code for the scopes `ZohoCRM.modules.ALL`, `ZohoCRM.settings.fields.READ`, and `ZohoCRM.settings.modules.READ`. To sync territories, also add `ZohoCRM.settings.territories.READ`. To sync pipelines, also add `ZohoCRM.settings.pipeline.READ` and `ZohoCRM.settings.layouts.READ`. That code is not a refresh token and expires within minutes. Exchange it for a refresh token by sending a POST request to `/oauth/v2/token` on your data center's Zoho accounts domain, with `grant_type=authorization_code`, your client ID, client secret, and the code. Paste the client ID, client secret, and refresh token below, then pick the data center your Zoho account lives in.

You'll be asked for:

- **Data center**: choose between United States (.com), Europe (.eu), India (.in), Australia (.com.au), Japan (.jp), Canada (.ca) and China (.com.cn).
- **Client ID**: for example `1000.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.
- **Client secret**
- **Refresh token**: for example `1000.XXXXXXXX.XXXXXXXX`.

## Sync modes

<SyncModes />

Most Zoho CRM tables use full refresh, where each sync replaces the entire table. The `Deal_Timeline` table supports incremental sync using the `audited_time` field – after the first full import, subsequent syncs only fetch entries created since the last sync.

> **Note:** Incremental `Deal_Timeline` syncs read only deals that changed since the last sync. Timeline-only changes (like a note added to a deal) don't update the deal's `Modified_Time`, so they can be missed until the deal changes for another reason.

## Configuration

<SourceParameters />

### Tables requiring additional scopes

Some Zoho CRM tables require OAuth scopes beyond the base setup. These tables are deselected by default:

| Table           | Required scope                                                    | Notes                                            |
| --------------- | ----------------------------------------------------------------- | ------------------------------------------------ |
| `Territories`   | `ZohoCRM.settings.territories.READ`                               | Requires territory management to be enabled      |
| `Pipelines`     | `ZohoCRM.settings.pipeline.READ`, `ZohoCRM.settings.layouts.READ` | Reads pipelines for every Deals layout           |
| `Deal_Timeline` | Uses existing scopes                                              | One API request per deal; opt-in due to API cost |

If you see a scope error when enabling these tables, add the required scope to your Self Client and generate a new refresh token.

### Custom modules

PostHog automatically discovers custom and linking modules in your Zoho CRM organization. Each appears as a `Custom_<module_name>` table (e.g. `Custom_Projects`). Custom module tables are deselected by default.

Custom modules use the same scopes as standard modules (`ZohoCRM.modules.ALL`), so no additional setup is needed.

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
