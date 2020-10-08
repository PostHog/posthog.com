---
title: Getting started with plugins
rootPage: /plugins
sidebar: Docs
showTitle: true
---

Welcome to the world of building your first plugin.

1. Get PostHog running locally
1. Go to the [helloworld plugin](https://github.com/PostHog/helloworldplugin)
1. Create a fork and work on this locally
1. In `__init__.py` you can carry out functions with APIs such as

* process_event
* process_alias
* process_identify

## Example code

An example of a generic plugin is maxmind-plugin.

```python
from posthog.plugins import PluginBaseClass, PosthogEvent
import os
# we've installed geoip2 in the requirements.txt file too
import geoip2.database

# MAXMIND_GEOIP_DATABASE is the path to where the database is stored
geoip_path = os.environ.get("MAXMIND_GEOIP_DATABASE", None)

if geoip_path:
    reader = geoip2.database.Reader(geoip_path)
else:
    print("🔻 Running posthog-maxmind-plugin without MAXMIND_GEOIP_DATABASE")
    print("🔺 No GeoIP data will be ingested!")
    reader = None


class MaxmindPlugin(PluginBaseClass):
    def process_event(self, event: PosthogEvent):
        if reader and event.ip:
            try:
                response = reader.city(event.ip)
                # add a series of properties to the event with location data
                event.properties['$country_iso'] = response.country.iso_code
                event.properties['$country_name'] = response.country.name
                event.properties['$region_iso'] = response.subdivisions.most_specific.iso_code
                event.properties['$region_name'] = response.subdivisions.most_specific.name
                event.properties['$city_name'] = response.city.name
                event.properties['$latitude'] = response.location.latitude
                event.properties['$longitude'] = response.location.longitude
            except:
                # ip not in the database, so there is no cool data to add
                pass

        return event
```

This plugin has also been published to PostHog's [plugin directory](/plugins). This was done by adding the repo's URL to [this page](https://github.com/PostHog/plugins/blob/main/plugins.json). When edits to the JSON get merged, the core team will then manually add the plugin to the docs... we'll automate that step one day soon!

We give some [cool merch](https://merch.posthog.com) out to plugin authors. If we've missed you out here, email hey@posthog.com!