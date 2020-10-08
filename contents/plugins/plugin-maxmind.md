---
date: 2020-10-08
title: MaxMind
rootPage: /plugins
sidebar: Plugin Directory
showTitle: true
hideAnchor: true
repository: https://github.com/mariusandra/posthog-maxmind-plugin
description: Ingest GeoIP data via MaxMind
---

Enrich your collected events with GeoIP data from MaxMind

1. Install posthog-cli
1. Install this plugin posthog plugin install https://github.com/mariusandra/posthog-maxmind-plugin
1. Sign up to maxmind
1. Download the GeoLite2 City (or the paid GeoIP City) database
1. Run posthog with the env MAXMIND_GEOIP_DATABASE=/path/to/GeoLite2-City.mmdb
1. Optional: Set up automatic updates as [described here](https://dev.maxmind.com/geoip/geoipupdate/#Direct_Downloads).
