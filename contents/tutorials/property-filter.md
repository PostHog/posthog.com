---
title: How to protect user privacy with the Property Filter app
sidebar: Docs
showTitle: true
featuredImage: ../images/tutorials/banners/property-filter-tutorial.png
author: ["lukas-smith"]
topics: ["apps", "configuration"]
date: 2022-07-01
---

_Estimated reading time: 2 minutes_ ☕

By default, PostHog has the ability to gather IP data on users to determine their location, via the [GeoIP Enricher app](/apps/geoip-enrichment). 

It also has the ability to discard IP data by default. However, if this option is used then the GeoIP Enricher is unable to identify the country of origin for users - either _all_ the data is collected via the GeoIP Enricher, or all of it is discarded. 

That's where the Property Filter, which was created by the team at [Witty Works](https://www.witty.works/), comes in. Witty Works see privacy as a core feature, but also needs to collect some data to develop data-driven solutions. 

For this reason Witty Works created the [Property Filter app](/apps/property-filter) as a way to determine the _country_ from which requests are coming, while discarding all other data to protect users privacy. Here's how!

# 1. Install the Property Filter app

First, install the [Property Filter](/apps/property-filter) to your PostHog instance. You can find it in the Apps Library by following these steps:

- Log in to your PostHog instance
- Click 'Apps' on the left-hand tool bar
- Search for 'Property Filter' press 'Install'

It's important to note that this app effectively removes information from PostHog events by setting properties to null. Apps on PostHog run in sequence, so it usually makes sense to place this app at the end of a sequence. If you are filtering `$ip`, `event.ip` will also be set to `null`.

# 2. Configure the app chain

Apps on PostHog run in a sequential chain and in order for the Property Filter to remove unwanted information, that information first has to be present. In short: Ensure that the Property Filter runs _after_ the GeoIP Enricher. 

![PostHog Property Filter](../images/tutorials/property-filter/property-filter-tutorial.png)

You can reorder the app chain simply by selecting 'Edit Order' and dragging the apps to run in any order you want. Apps at the top of the list run first, while those at the bottom run last. 

# 3. Configure the filter to remove selected GeoIP info

This app sets all specified properties on ingested events to `null`, effectively preventing PostHog from collecting information you do not want it to use.

To configure the app to remove selected properties, simply select the blue gear icon and enter the properties you wish to remove. 

![PostHog Property Filter](../images/tutorials/property-filter/property-filter-tutorial-2.png)

Below is the full configuration Witty Works uses to filter out unwanted data before it is written to PostHog's event log:

```$geoip_city_name,$geoip_longitude,$geoip_latitude,$ip,$geoip_postal_code,$current_url,$performance_raw,$referrer,$initial_referrer,$pathname```

<NewsletterTutorial compact/>


