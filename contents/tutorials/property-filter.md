---
title: How to protect user privacy with the Property Filter app
sidebar: Docs
showTitle: true
author:
  - lukas-smith
tags:
  - apps
  - configuration
  - data management
  - product os
date: 2024-12-09
---

When collecting data with PostHog, you may want to avoid collecting certain properties for privacy reasons. For example, you may want to ensure you never collect IP addresses or exact locations.

That's where the [property filter app](/apps/property-filter), which was created by the team at [Witty Works](https://www.witty.works/), comes in. It gives you fine-grained control over which properties are kept or discarded from your events, helping you balance data collection needs with privacy requirements. Here's how to use it.

> **Note:** If you prefer not to use the property filter app, you can also filter properties by using the `sanitize` configuration option when initializing the PostHog client. See the [sanitize docs](/docs/product-analytics/privacy#sanitize-properties) for more details.

## How to set up the property filter app

The property filter app works by setting the selected properties to `null` when events are ingested. Here's how to set it up:

1. Navigate to the [data pipelines](https://us.posthog.com/pipeline) tab in PostHog.
2. Click the **+ New** button in the top right.
3. Select **Transformation** from the dropdown.
4. Next to the **Property Filter** app, click **+ Create**.
5. Click **Enabled** to turn on the app.
6. Type the properties you want to filter out in the text field. Separate properties with commas, without using spaces, like so: `foo,bar,baz`.

<ProductVideo
    videoLight= "https://res.cloudinary.com/dmukukwp6/video/upload/property_light_6cf45cedd1.mp4" 
    videoDark= "https://res.cloudinary.com/dmukukwp6/video/upload/property_dark_aa6e41f5b2.mp4"
    alt="How to set up the property filter app" 
    classes="rounded"
/>

## List of default PostHog properties

Below is a list of some of the properties that PostHog captures by default. You can see the full list of properties that PostHog captures by default in [GitHub](https://github.com/PostHog/posthog-js/blob/main/src/utils/event-utils.ts). 

Note that PostHog's default properties begin with `$`, so you'll need to include this when adding them to the property filter app. For example, `$ip,$os`.

| Name                        | Key                      | Example value                  |
|-----------------------------|--------------------------|--------------------------------|
| Timestamp                   | `$timestamp`             | `2024-05-29T17:32:07.202Z`     |
| OS                          | `$os`                    | `Mac OS X`                     |
| OS Version                  | `$os_version`            | `10.15.7`                      |
| Browser                     | `$browser`               | `Chrome`                       |
| Browser Version             | `$browser_version`       | `125`                          |
| Device Type                 | `$device_type`           | `Desktop`                      |
| Current URL                 | `$current_url`           | `https://example.com/page`     |
| Host                        | `$host`                  | `example.com`                  |
| Path Name                   | `$pathname`              | `/page`                        |
| Screen Height               | `$screen_height`         | `1080`                         |
| Screen Width                | `$screen_width`          | `1920`                         |
| Viewport Height             | `$viewport_height`       | `950`                          |
| Viewport Width              | `$viewport_width`        | `1903`                         |
| Library                     | `$lib`                   | `web`                          |
| Library Version             | `$lib_version`           | `1.31.0`                       |
| Search Engine               | `$search_engine`         | `google`                       |
| Referrer URL                | `$referrer`              | `https://google.com`           |
| Referring Domain            | `$referring_domain`      | `www.google.com`               |
| Active Feature Flags        | `$active_feature_flags`  | `['beta_feature']`             |
| Event Type                  | `$event_type`            | `click`                        |
| UTM Source                  | `$utm_source`            | `newsletter`                   |
| UTM Medium                  | `$utm_medium`            | `email`                        |
| UTM Campaign                | `$utm_campaign`          | `product_launch`               |
| UTM Term                    | `$utm_term`              | `new+product`                  |
| UTM Content                 | `$utm_content`           | `logolink`                     |
| Google Click ID             | `$gclid`                 | `TeSter-123`                   |
| Google Ads Source           | `$gad_source`            | `google_ads`                   |
| Google Search Ads 360 Click | `$gclsrc`                | `dsa`                          |
| Google DoubleClick Click ID | `$dclid`                 | `testDclid123`                 |
| Google Web-to-app Measure   | `$wbraid`                | `testWbraid123`                |
| Google App-to-web Measure   | `$gbraid`                | `testGbraid123`                |
| Facebook Click ID           | `$fbclid`                | `testFbclid123`                |
| Microsoft Click ID          | `$msclkid`               | `testMsclkid123`               |
| Twitter Click ID            | `$twclid`                | `testTwclid123`                |
| LinkedIn Ad Tracking ID     | `$la_fat_id`             | `testLaFatId123`               |
| Mailchimp Campaign ID       | `$mc_cid`                | `testMcCid123`                 |
| Instagram Share Id          | `$igshid`                | `testIgshid123`                |
| TikTok Click ID             | `$ttclid`                | `testTtclid123`                |
| Plugins Succeeded           | `$plugins_succeeded`     | `['GeoIP (56578)']`            |
| Plugins Failed              | `$plugins_failed`        | `['plugin3']`                  |
| Plugins Deferred            | `$plugins_deferred`      | `['plugin4']`                  |
| IP Address                  | `$ip`                    | `192.168.1.1`                  |

### Filtering GeoIP properties

PostHog enriches events with the [GeoIP app](/cdp/geoip-enrichment) based on the IP address. You either disable this app completely or filter out specific properties using the property filter app.

The current list of GeoIP properties is shown below. For the most up-to-date list, see the [source code](https://github.com/PostHog/posthog-plugin-geoip).

- `$geoip_city_name`
- `$geoip_country_name`
- `$geoip_country_code`
- `$geoip_continent_name`
- `$geoip_continent_code`
- `$geoip_latitude`
- `$geoip_longitude`
- `$geoip_time_zone`
- `$geoip_subdivision_1_code`
- `$geoip_subdivision_1_name`
- `$geoip_subdivision_2_code`
- `$geoip_subdivision_2_name`
- `$geoip_subdivision_3_code`
- `$geoip_subdivision_3_name`

## (Optional) Configure the order of transformations

Transformations in PostHog run in sequential order, so you should carefully consider where you place the property filter app. For example, you may want to place it after other apps that might need the data.

Here's how to reorder transformations:

1. Go to the [transformations tab](https://us.posthog.com/pipeline/transformations).
2. Click **Change order** just above the table.
3. Drag and drop apps to change their order.

<ProductVideo
    videoLight= "https://res.cloudinary.com/dmukukwp6/video/upload/change_order_light_7ae51452d1.mp4" 
    videoDark= "https://res.cloudinary.com/dmukukwp6/video/upload/change_order_dark_e7df6040ef.mp4"
    alt="Change order of transformations" 
    classes="rounded"
/>

## Further reading

- [Property filter app docs](/docs/cdp/property-filter)
- [GeoIP enrichment docs](/docs/cdp/geoip-enrichment)
- [Product analytics privacy controls docs](/docs/product-analytics/privacy)