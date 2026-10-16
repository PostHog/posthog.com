---
title: Linking Particle as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: Particle
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Particle connector sends events from your [Particle](https://www.particle.io) devices to PostHog, with no server of your own. Every `Particle.publish()` that matches your event name prefixes arrives as a PostHog event on that device, so you can build insights, dashboards, and alerts on device data. PostHog also syncs your device list into the Data Warehouse.

## Prerequisites

- A Particle account with devices that publish events with `Particle.publish()`.
- Permission to add an API user to your Particle product, or to your sandbox if your devices aren't in a product.

## Adding a data source

<SourceSetupIntro />

You need three values:

- **Access token**: create an API user in the Particle console. Open your product (or your sandbox), go to **Team**, and click **Add API user**. Give it these scopes:
  - `devices:list` to sync your device list
  - `integrations:list`, `integrations:create`, and `integrations:remove` so PostHog can manage its webhooks
- **Product ID**: the ID of your Particle product. Leave it empty to use the devices you own in your sandbox.
- **Event name prefixes**: a comma-separated list of the event names to send to PostHog. Particle matches event names by prefix and has no wildcard, so `env/` receives `env/temp` and `env/humidity`.

When you select the `events` table, PostHog creates one Particle webhook per prefix. You can see them under **Integrations** in the Particle console, named `PostHog (<prefix>)`.

## How device events appear in PostHog

Each Particle event becomes a PostHog event:

| PostHog field | Value |
| --- | --- |
| Event name | The Particle event name, for example `env/temp` |
| Distinct ID | The Particle device ID |
| Properties | The keys of the published data when it is a JSON object. Any other value is in the `data` property. |
| `particle_device_id`, `particle_event_id`, `particle_published_at` | The device, Particle's event ID, and the publish time |
| `particle_product_id`, `particle_firmware_version` | The product and firmware version. Only for product devices. |

PostHog doesn't create person profiles for devices. For example, a device that publishes `{"temp": 21.5}` as `env/temp` sends an `env/temp` event with a `temp` property of `21.5`, which you can chart as an average per device.

Particle delivers webhooks at least once. A retried delivery can create a duplicate event. The `events` warehouse table removes duplicates by Particle's event ID.

## Sync modes

<SyncModes />

The `devices` table uses full refresh. The `events` table uses webhooks only, because Particle doesn't keep an event history to import. Events published before you connect the source are not imported.

## Set up the webhook manually

If PostHog can't create the webhooks, for example because the token is missing an integration scope, create one webhook per prefix in the Particle console:

1. Go to **Integrations** > **Add new integration** > **Webhook**.
2. Set the event name to your prefix, the URL to the webhook URL PostHog shows, and the request type to **POST**.
3. Under **Advanced settings**, set a custom body of `{{{PARTICLE_EVENT_JSON}}}` and turn off the default data.
4. Add these query parameters: `event` = `{{{PARTICLE_EVENT_NAME}}}`, `device_id` = `{{{PARTICLE_DEVICE_ID}}}`, `published_at` = `{{{PARTICLE_PUBLISHED_AT}}}`, `event_id` = `{{{PARTICLE_EVENT_ID}}}`, `product_id` = `{{{PRODUCT_ID}}}`, and `firmware_version` = `{{{PRODUCT_VERSION}}}`.
5. Add the header `Content-Type: application/json`, and a header `x-posthog-webhook-secret` with a value of your choosing.
6. Paste the same secret into the **Webhook secret** field in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **No events arrive**: check that your event names start with one of your prefixes. Prefixes are case sensitive. In the Particle console event log, a `hook-sent` event shows that Particle sent the webhook, and a `hook-error` event shows that it failed.
- **The token can't manage integrations**: add the `integrations:list`, `integrations:create`, and `integrations:remove` scopes to the API user, then reconnect.
- **Product not found**: check the product ID, and check that the API user belongs to that product.

<TroubleshootingLink />
