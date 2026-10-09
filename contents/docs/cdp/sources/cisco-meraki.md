---
title: Linking Cisco Meraki as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CiscoMeraki
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Cisco Meraki connector syncs network infrastructure data – networks, devices, device inventory, uplink statuses, and assurance alerts – into PostHog, so you can analyze network health alongside your product data.

Each connection imports one Meraki organization. All tables use full refresh sync.

## Prerequisites

- A Cisco Meraki account with [API access enabled](https://developer.cisco.com/meraki/api-v1/)
- An API key with administrator read permissions for the data you want to sync
- Your Meraki organization ID

## Adding a data source

<SourceSetupIntro />

When linking Cisco Meraki, you'll need:

1. In the Meraki Dashboard, go to **Organization > API & Webhooks > API keys and access**. Create an API key and enable API access for your organization.
2. Note your **organization ID** from **Organization > Configure > Info** in the Meraki Dashboard.
3. Back in PostHog, select your **region**, enter the **API key** and **Organization ID**, then click **Next**.
4. Select the tables you want to sync, set the sync frequency, then click **Import**.

### Region selection

Choose the region that matches your Meraki organization:

| Region            | Description                              |
| ----------------- | ---------------------------------------- |
| **Global**        | Americas, Europe, Asia-Pacific (default) |
| **Canada**        | Canada                                   |
| **China**         | China                                    |
| **India**         | India                                    |
| **US Government** | US Government                            |

Changing the region requires re-entering your API key.

## Available tables

| Table               | Description                                                                                           | Sync method  |
| ------------------- | ----------------------------------------------------------------------------------------------------- | ------------ |
| `networks`          | Networks that the API key can access in the selected Meraki organization                              | Full refresh |
| `devices`           | Devices assigned to networks in the selected Meraki organization                                      | Full refresh |
| `inventory_devices` | Device inventory for the selected Meraki organization, including devices without an assigned network  | Full refresh |
| `uplink_statuses`   | Current uplink status for MX, MG, and Z series devices in the selected Meraki organization            | Full refresh |
| `assurance_alerts`  | Active health alerts for the selected Meraki organization. Resolved and dismissed alerts are excluded | Full refresh |

**Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
