---
title: Linking Superwall as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Superwall
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Superwall connector syncs your paywall, campaign, product, entitlement, survey, and webhook event data from [Superwall](https://superwall.com) into PostHog.

## Prerequisites

You need a Superwall account with an organization API key. The API key must have read scopes for the tables you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Superwall, you need:

- **Organization API key** - Create an organization API key in Superwall under **Access Controls**. Grant read scopes for the tables you want to sync: `paywalls:read`, `campaigns:read`, `products:read`, `entitlements:read`, `surveys:read`, and `webhooks:read`.

- **Project ID** - Your Superwall project identifier.

- **Application ID** - Your Superwall application identifier.

You can find your project ID and application ID in your Superwall dashboard settings.

## Sync methods

<SyncModes />

All Superwall tables sync using full table refresh only. Incremental sync is not available because Superwall's API does not provide timestamp filters for most endpoints.

Webhook events include only the history retained by Superwall.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid API key** - The Superwall API key is invalid or revoked. Create a new organization API key in Superwall under **Access Controls**.

- **Missing scope error** - The API key lacks a required read scope. Check that your key has the correct permissions for the tables you want to sync.

- **Resource not found** - Superwall could not find this resource. Verify that the project ID and application ID are correct.

<TroubleshootingLink />
