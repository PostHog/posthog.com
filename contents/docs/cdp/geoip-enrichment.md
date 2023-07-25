---
title: GeoIP Enricher
github: https://github.com/PostHog/posthog-plugin-geoip
installUrl: https://app.posthog.com/project/apps?name=GeoIP
thumbnail: ../../cdp/thumbnails/geoip.png
tags:
    - geoip
---

This app enriches PostHog events and persons with IP location data. Simply enable this app and from that point on, your new events will have GeoIP data added, allowing you to locate users and run queries based on geographic data.

## How it works

This app prefers to use event property `$ip` (which should be of type `string`), but if that is not provided, it uses the IP address of the client that sent the event.

This way the app can, in most cases, infer the IP address without any work on your side.

## Requirements

The GeoIP Enricher requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Installation

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'GeoIP'
4. Select the GeoIP app, press 'Install' and follow the on-screen instructions

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

If you'd like this app to skip over an event and not add the above properties,
set property `$geoip_disable` to `true` on that event.

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the GeoIP Enricher](https://github.com/PostHog/posthog-plugin-geoip) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri), [Tim Glaser](https://github.com/timgl), [Michael Matloka](https://github.com/Twixes) and former team member [Paolo D'Amico](https://github.com/paolodamico) for creating the GeoIP Enricher. We miss you, Paolo!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
