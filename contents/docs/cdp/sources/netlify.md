---
title: Linking Netlify as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Netlify
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Netlify connector syncs your Netlify sites, deploys, builds, forms, form submissions, DNS zones, accounts, and members into the PostHog data warehouse for engineering and marketing analytics.

## Prerequisites

You need a Netlify account and a personal access token. The token has full access to the resources your account can reach, so no extra scopes are required.

## Adding a data source

<SourceSetupIntro />

You need a Netlify personal access token. Create one under **User settings > Applications > Personal access tokens** in the [Netlify UI](https://app.netlify.com/user/applications).

> **Note:** Netlify invalidates tokens on password reset. If your team requires SAML SSO, select **Allow access to my SAML-based Netlify team** when generating the token, otherwise Netlify denies the token access to that team's data.

## Sync modes

<SyncModes />

All Netlify tables are full refresh only, since the API exposes no server-side timestamp filter.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The `sites` table includes every site the token can access, across all of your teams. The `builds`, `deploys`, `forms`, and `submissions` tables are fetched per site, and `members` is fetched per account.

## Troubleshooting

- If the connection fails with an access-denied error, your token may be invalid or revoked (Netlify invalidates tokens on password reset). Create a new token and reconnect.
- If syncs complete but tables stay empty, the token likely can't access the team that owns your sites. For SAML SSO teams, generate a new token with **Allow access to my SAML-based Netlify team** selected, then reconnect.
- The `builds`, `deploys`, `forms`, and `submissions` tables stay empty until the `sites` table syncs at least one row, since they're fetched per site.
- The `dns_zones` table is only populated if your team manages DNS through Netlify.

<TroubleshootingLink />
