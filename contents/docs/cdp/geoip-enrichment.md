---
title: Enrich PostHog analytics with IP location data
github: 'https://github.com/PostHog/posthog-plugin-geoip'
installUrl: 'https://app.posthog.com/project/apps?name=GeoIP'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/geoip.png
tags:
  - geoip
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import PostHogMaintained from "./_snippets/posthog-maintained.mdx"

This transformation enriches PostHog events and persons with IP location data. Simply enable this transformation and from that point on, your new events will have GeoIP data added, allowing you to locate users and run queries based on geographic data.

## How it works

This transformation prefers to use event property `$ip` (which should be of type `string`), but if that is not provided, it uses the IP address of the client that sent the event.

This way the transformation can, in most cases, infer the IP address without any work on your side.

<Requirements />

## Installation

1. Log in to your PostHog instance
2. Click "[Data pipeline](https://us.posthog.com/pipeline)" in the left sidebar
3. Search for 'GeoIP'
4. Select the GeoIP transformation, press 'Install' and follow the on-screen instructions

## Adding properties

The following properties can be added to the event if its IP address can be matched to a GeoLite2 City location:

```ts
$geoip_city_name?: string
$geoip_country_name?: string
$geoip_country_code?: string
$geoip_continent_name?: string
$geoip_continent_code?: string
$geoip_latitude?: number
$geoip_longitude?: number
$geoip_time_zone?: string
$geoip_subdivision_1_code?: string
$geoip_subdivision_1_name?: string
$geoip_subdivision_2_code?: string
$geoip_subdivision_2_name?: string
$geoip_subdivision_3_code?: string
$geoip_subdivision_3_name?: string
```

They are also set on the associated person same as above, plus set*once in `$initial_geoip*...` form, to record where the user was when they were first seen.

## How do I skip events without applying GeoIP enrichment?

A case to be aware of is sending events from a server – such events, if not provided with custom property `$ip`, will be detected as sent from the location of the data center, instead of the related user.

If you'd like this transformation to skip over an event and not add the above properties,
set property `$geoip_disable` to `true` on that event.

## FAQ

### How can I still get some geo data, but with less precision?

We use the Maxmind GeoIP2 City database, in which latitude and longitude are set to the detected city's geographical center. The data is not more precise than the city name field.

If having city precision is too much, then you can use use the [property filter transformation](/docs/cdp/property-filter). The GeoIP transformation adds event and person properties (`$set` and `$set_once`), so you'll want to filter those out as well. For example, if you are trying to filter `$geoip_latitude`, make sure to include `$geoip_latitude` for the event property as well as`$set.$geoip_latitude` and `$set_once.$geoip_latitude` for the person properties to the property filter configuration.

### Is the source code for this transformation available?

PostHog is open-source and so are all transformations on the platform. The [source code for the GeoIP Enricher](https://github.com/PostHog/posthog-plugin-geoip) is available on GitHub.

### Who created this transformation?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri), [Tim Glaser](https://github.com/timgl), [Michael Matloka](https://github.com/Twixes) and former team member [Paolo D'Amico](https://github.com/paolodamico) for creating the GeoIP Enricher. We miss you, Paolo!

<PostHogMaintained />

<FeedbackQuestions />
