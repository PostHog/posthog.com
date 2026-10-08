---
title: Linking Argo CD as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Argocd
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Argo CD connector syncs your GitOps delivery data – applications, deployment history, projects, repositories, and clusters – into PostHog, so you can analyze deployment frequency, rollback rates, and other delivery metrics alongside your product data.

## Prerequisites

Argo CD is self-hosted, so your Argo CD API server must be reachable from PostHog over HTTPS with a publicly trusted TLS certificate. Servers that are only accessible on a private network or behind a VPN can't be synced.

You also need an Argo CD account with the `apiKey` capability enabled so it can generate API tokens. See the [Argo CD user management docs](https://argo-cd.readthedocs.io/en/stable/operator-manual/user-management/) for how to create a local account with `apiKey` capability.

## Adding a data source

<SourceSetupIntro />

When linking Argo CD, you'll need:

- **Argo CD server URL** – the base URL of your Argo CD API server, for example `https://argocd.example.com`.
- **API token** – generate one with `argocd account generate-token --account <account>`. The account's [RBAC policy](https://argo-cd.readthedocs.io/en/stable/operator-manual/rbac/) needs read access to the resources you want to sync, for example `applications, get`, `projects, get`, `repositories, get`, and `clusters, get`.
- **Project** (optional) – an Argo CD project name to limit which applications are synced. Leave blank to sync all applications the token can see.

## Sync modes

<SyncModes />

Argo CD tables are full refresh only: the Argo CD API has no reliable way to fetch only changed records, so each sync pulls the current state. Deployment history is flattened from each application's recorded history and deduplicated across syncs.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API token is invalid or expired, generate a new token with `argocd account generate-token` and reconnect.
- If some tables come back empty, the token's RBAC policy may not grant read access to those resources. Argo CD list APIs only return the items the token is allowed to see, so grant the missing `get` permissions and re-sync.
- If the connection fails with a certificate error, your Argo CD server is presenting a self-signed or otherwise untrusted TLS certificate. PostHog requires a publicly trusted certificate.

<TroubleshootingLink />
