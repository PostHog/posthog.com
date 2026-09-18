---
title: Linking DataHub as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Datahub
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The DataHub connector syncs your metadata catalog – datasets, dashboards, charts, pipelines, owners, domains, glossary, and tags – into the PostHog Data warehouse, so you can build governance reports and lineage-coverage analytics alongside your product data. Lineage edges ride along on the entities themselves: datasets carry their upstream lineage and data jobs carry their input/output edges.

## Prerequisites

You need a DataHub instance (self-hosted or DataHub Cloud) with [Metadata Service Authentication](https://docs.datahub.com/docs/authentication/introducing-metadata-service-authentication) enabled, and a user who can generate access tokens. The token inherits its owner's view privileges, so the owner must be able to view the entity types you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking DataHub, you'll need:

- **Instance URL** – where your DataHub API is served. For DataHub Cloud, that's `https://<your-tenant>.acryl.io/gms`. For self-hosted, it's your metadata service (GMS) URL, or the DataHub frontend URL, which proxies the API.
- **Access token** – a [personal access token](https://docs.datahub.com/docs/authentication/personal-access-tokens) generated under **Settings → Access Tokens** in DataHub.

## Sync modes

<SyncModes />

All DataHub tables are full refresh only: the entity list API has no reliable "updated since" filter, so each sync re-reads the catalog. Metadata catalogs are usually small enough that this is cheap.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your access token is invalid or has expired, or your instance doesn't have Metadata Service Authentication enabled. Enable it, generate a new token, then reconnect.
- If you see a permissions error, the token's owner is missing the view privilege for that entity type. Check their DataHub policies, then reconnect.

<TroubleshootingLink />
