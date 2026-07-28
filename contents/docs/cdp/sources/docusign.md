---
title: Linking DocuSign as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Docusign
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The DocuSign connector syncs your e-signature data — envelopes, recipients, documents, templates, users, and folders — into the PostHog data warehouse. This lets you analyze contract and sales cycle activity alongside your product data.

## Prerequisites

You need a DocuSign account and an integration key created in [DocuSign Apps and Keys](https://apps.docusign.com/admin/apps-and-keys).

For **JWT grant** authentication (recommended), you also need to:

1. Add an RSA keypair to your integration key.
2. Grant one-time consent for the user you want to impersonate.

> **Note:** Production integration keys must pass [DocuSign's go-live review](https://developers.docusign.com/docs/esign-rest-api/go-live/) before they work outside the demo environment.

## Adding a data source

<SourceSetupIntro />

When linking DocuSign, you'll need to configure:

- **Environment** – select **Production** for live accounts or **Demo (sandbox)** for testing. Production keys require go-live approval from DocuSign.

- **Authentication type** – choose one of the following:

### JWT grant (recommended)

- **Integration key** – your app's UUID from DocuSign Apps and Keys.
- **Impersonated user ID** – the API user ID (UUID) of the user to impersonate. Find this under **Apps and Keys → My Account Information**.
- **RSA private key** – the full PEM key including the `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines.

### Refresh token

- **Integration key** – your app's UUID from DocuSign Apps and Keys.
- **Secret key** – your app's secret key.
- **Refresh token** – a valid refresh token obtained through DocuSign's OAuth flow.

### Optional fields

- **Account ID** – leave blank to use your default account. Only needed if the impersonated user has access to multiple DocuSign accounts and you want to sync a non-default one.
- **Start date** – how far back to sync. Defaults to the last 2 years. Use ISO 8601 format, e.g. `2023-01-01T00:00:00Z`.

## Sync modes

<SyncModes />

Envelope-based tables (`envelopes`, `envelope_recipients`, `envelope_documents`) and `templates` support incremental syncing. The `users` and `folders` tables always perform a full refresh since DocuSign does not support server-side date filtering for these resources.

Interrupted syncs resume from where they left off.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### consent_required

DocuSign needs one-time consent for the integration key. Grant consent for the impersonated user by visiting the consent URL for your app, then reconnect.

### invalid_grant

DocuSign rejected the credentials. Check the integration key, the impersonated user ID, and that the key is authorized for the selected environment.

### unauthorized_client

The integration key is not authorized for the selected environment. Production keys must pass DocuSign's go-live review before they work outside the demo environment.

### 401 Unauthorized

DocuSign authentication failed. Your credentials may have been revoked — reconnect with fresh credentials.

### 403 Forbidden

DocuSign denied access. Check that the impersonated user has permission to read the account's data.

<TroubleshootingLink />
