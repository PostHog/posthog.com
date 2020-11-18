---
title: Overview
sidebar: Docs
showTitle: true
---
<br>

> **Important:** Our Plugins functionality is still in **Beta** mode. Please report any issues you find [on GitHub](https://github.com/PostHog/posthog/issues). 

Plugins are a way to extend PostHog's functionality by either pulling data into or sending data out of PostHog. 

Our goal with plugins is to allow anyone to extend and customize PostHog in order to better fit their analytics and business needs. 

## Example Use-Cases

Plugins can be used for a wide variety of use-cases, such as:

**Sending the event data to a data warehouse**

If you have a data lake or data warehouse, you can use plugins to send PostHog event data there, while ensuring you still have that data in PostHog to perform your analytics processes.

**Pulling data from a third-party API to enrich the event**

Plugins can pull in information like exchange rates, GeoIP location data, online reviews, and anything else you can think of and add it to your PostHog events, enriching the data to improve your analytics processes.
 
**Adding your own data from other sources to PostHog**

In addition to pulling data from third-parties, you might also want to bring in data from your own sources, such other tools and platforms you use. 

**Labeling events**

In order to facilitate sorting through your events, plugins can be used to determine arbitrary logic that can label an event (e.g. by setting a `label` property). This can help you tailor your metrics in PostHog, as well as facilitate data ordering if you ever use PostHog data somewhere else.

**Enforcing event schemas**

By default, PostHog does not enforce schemas on events it receives. However, a plugin could do so, preventing ingestion of events that do not match the specified schema in order to keep your data clean and following specific guidelines you need it to follow.

## Using Plugins

> **Note:** Plugins are currently only available on self-hosted instances, but we are working to also make them available on PostHog Cloud.

To use plugins on your self-hosted instance, head over to 'Project' -> 'Plugins' on the left sidebar:

![Plugins Screenshot](../../images/blog/array/plugins.png)

Here you will be able to install our default plugins to test out the functionality or install a custom plugin by pasting a link to its public repository. 

Given that plugins are still in **Beta**, our default library is currently limited to test plugins. We are working to expand the number of plugins available and will soon release tutorials on how to build your own plugin. 

In the meanwhile, you can [follow our progress on GitHub](https://github.com/PostHog/posthog/issues/1896).

## In This Section

- [Plugin Architecture](/docs/plugins/architecture)
- [Build Your Own Plugin](/docs/plugins/build)
- [MaxMind Plugin](/docs/plugins/maxmind)
- [Currency Normalization Plugin](/docs/plugins/currency-normalization)