---
title: Currency Normalization Plugin
sidebar: Docs
showTitle: true
---

> **Note:** This is an official PostHog plugin maintained by our core team.

The PostHog Currency Normalization Plugin converts currency data in events to a normalized currency you choose.

For example, if you have events with currency data that uses both `EUR` and `USD`, the plugin can convert the `EUR` values to `USD` on the event, allowing you to have all your revenue data in a single currency when you perform analytics.

## Installation

> **Official Repository:** [posthog-currency-normalization-plugin](https://github.com/PostHog/posthog-currency-normalization-plugin)

Install by selecting this plugin from the list or pasting the package URL in the plugin installation interface:
```
https://www.npmjs.com/package/posthog-currency-normalization-plugin
```

## PostHog Configuration

> **Note:** Plugins are currently only available on [self-hosted PostHog instances](posthog.com/docs/features/plugins).

1. [Sign up to openexchangerates.org](https://openexchangerates.org/)
1. Generate and copy an API Key from Open Exchange Rates
1. Add the API Key in the configuration step on the plugins interface
1. Select what currencies to convert to and from
1. Enable the plugin and watch your events come in with the enriched data!
