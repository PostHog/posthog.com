---
title: Apps
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---

> Looking to get data in or out of PostHog? Check out our [data connections library](/cdp) or visit their [docs](/docs/cdp/).

Apps extend PostHog's functionality by either pulling data into or sending data out of PostHog. They allow anyone to extend and customize PostHog in order to better fit their needs. [Explore our app library](/apps)

Apps can be used for a wide variety of use cases, such as:

- **Pulling data from a third-party API to enrich the event.** Apps can pull in information like exchange rates, GeoIP location data, online reviews, and anything else you can think of and add it to your PostHog events, enriching the data to improve your analytics processes.
- **Labeling events.** In order to facilitate sorting through your events, apps can be used to determine arbitrary logic that can label an event (e.g. by setting a `label` property). This can help you tailor your metrics in PostHog, as well as facilitate data ordering if you ever use PostHog data somewhere else.

## Enabling apps

Head to 'Data pipelines' -> 'Apps' on the left sidebar in the PostHog app. Here you can install official PostHog apps.

If you're self-hosting, you can install a custom app by pasting a link to its public repository, or write your own app directly in PostHog.

## Self-host app troubleshooting

If you're having issues getting apps to work on your self-hosted instance of PostHog, check out our [troubleshooting guide](/docs/cdp/enabling).
