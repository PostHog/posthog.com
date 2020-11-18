---
title: MaxMind Plugin
sidebar: Docs
showTitle: true
---

> **Note:** This is an official PostHog plugin maintained by our core team.

The PostHog MaxMind plugin allows you to enrich your PostHog events with GeoIP data from MaxMind.

Once configured, the plugin adds IP-based location information as properties on your events, such as what country and city your users are located in, making it possible to create charts and tables filtered based on the location of your users.

The plugin adds the following data to events:

- `$city_name`
- `$country_name` 
- `$country_code`
- `$continent_name` 
- `$continent_code` 
- `$postal_code` 
- `$latitude`
- `$longitude`
- `$time_zone`

In addition, it also adds specific subdivision names and codes if available.

## Installation

> **Official Repository:** [posthog-maxmind-plugin](https://github.com/PostHog/posthog-maxmind-plugin)

Install by selecting this plugin from the list or copy the package URL directly:

```
https://www.npmjs.com/package/posthog-maxmind-plugin
```

## PostHog Configuration

> **Note:** Plugins are currently only available on [self-hosted PostHog instances](posthog.com/docs/features/plugins).

1. [Sign up to MaxMind](https://dev.maxmind.com/geoip/geoip2/geolite2/)
1. Download the GeoLite2 City (or the paid GeoIP City) database
1. Upload the `.mmdb` file in the archive via the plugin interface
1. Enable the plugin and watch your events come in with the enriched data!
