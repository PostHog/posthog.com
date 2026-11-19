---
title: Linking TeamUp Fitness as a source
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
sourceId: TeamupFitness
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The TeamUp Fitness connector syncs your customer, membership, attendance, and billing data into the [PostHog Data Warehouse](/docs/data-warehouse). You can analyze this data alongside your product data.

## Prerequisites

You need access to your TeamUp business dashboard to create a machine-to-machine (M2M) token, and the numeric provider ID for your business. The token must have access to that provider and the tables you want to sync.

See [TeamUp's authentication guide](https://docs.goteamup.com/api-reference/authentication#m2m-tokens) for details about M2M tokens.

## Adding a data source

<SourceSetupIntro />

When linking TeamUp Fitness, you'll need:

-   **M2M token**: In your TeamUp business dashboard, open **Settings > Integrations > API Integration > Options > Manage Applications**. Create an M2M token and enter it in PostHog. Use the token value, without the `Bearer` prefix. A client ID or client secret isn't an M2M token.
-   **Provider ID**: Enter the numeric ID of the TeamUp business you want to sync, for example `12345`.

## Sync modes

All TeamUp Fitness tables support full refresh only. Each sync reloads the whole table to reflect the current data in TeamUp, including changes to existing records. Schedule and membership start dates don't track later changes to those records, so the connector doesn't use them for incremental syncs.

See [sync methods](/docs/data-pipelines/sources#sync-methods) for more details.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

-   **TeamUp rejected the M2M token**: Create a new M2M token in your TeamUp business dashboard, then update the source credentials in PostHog. Check that you entered the M2M token rather than a client secret.
-   **TeamUp denied access**: Check that the token has access to the specified provider ID and the permissions the failing table needs.
-   **TeamUp could not select your business**: Enter the provider ID using digits only. Check that it identifies an active business your token can access. Don't enter a business name or URL.

See [TeamUp's API errors guide](https://docs.goteamup.com/api-reference/errors) for details about authentication and provider errors.

<TroubleshootingLink />
