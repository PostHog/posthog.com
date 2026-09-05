---
title: Linking Gainsight CS as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GainsightCs
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Gainsight CS connector syncs your customer success data into the PostHog Data warehouse: companies, people, relationships, timeline activities, CTAs, and success plans. You can then join account health and CSM activity to how those accounts actually use your product.

This is the connector for **Gainsight CS** (also sold as Gainsight NXT). Gainsight PX, the product experience tool, is a separate connector.

## Prerequisites

You need a Gainsight admin to generate an access key for your tenant. The key inherits the permissions of the admin who created it, and it doesn't expire.

## Adding a data source

<SourceSetupIntro />

When linking Gainsight CS, you'll need:

- **Gainsight domain** – the host you reach Gainsight on, for example `acme.gainsightcloud.com`. If your team uses a custom domain, enter that instead.
- **Access key** – generate one in Gainsight under **Administration → Connectors**, on the **Gainsight API** tab.
- **Custom objects** (optional) – a comma-separated list of extra object names to sync, for example `health_score__gc, renewal_forecast__gc`. Find the exact names on the Gainsight **Data Management** page.

## Sync modes

<SyncModes />

Every Gainsight CS object is full refresh. The Read API documents a `where` clause with date operators, but its behavior alongside paging isn't verified, so the connector re-reads each object rather than risk skipping records on an incremental sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Each table's columns are discovered from your tenant, so any custom fields you've added to a standard object are synced along with the built-in ones. Date and datetime columns are converted from Gainsight's epoch-millisecond format to timestamps.

## Troubleshooting

- If you see a **401** or **403** error, the access key is invalid, has been revoked, or belongs to an admin without access to the object. Generate a new key under **Administration → Connectors**, then reconnect.
- If a table fails with **no fields for object**, the object name doesn't exist on your tenant or the key can't read it. Check the name on the **Data Management** page. Custom objects end in `__gc`.
- If the domain is rejected, enter just the host (`acme.gainsightcloud.com`) rather than a full URL with a path.

<TroubleshootingLink />
