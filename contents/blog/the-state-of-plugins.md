---
date: 2021-11-16
title: The state of plugins on PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - yakko-majuri
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/running-content.png
featuredImageType: full
category: Engineering
tags:
  - Product updates
---

> **Update (May 2022):** Plugins are now known as [apps](/apps)!

The plugin server has become an integral part of PostHog, as it is responsible for event ingestion. However, it isn’t called “ingestion server” because it was originally designed to run plugins. So, how are those going?

I used a combination of PostHog, Metabase, Python scripts, and Google Sheets to compile, analyze, and display the data you see here to answer that question as transparently as possible. 

## TL;DR

- Most teams using PostHog use plugins (if GeoIP is included)
- Relatively few Cloud teams use plugins (if GeoIP is excluded)
- Self-hosted users are way more likely to use plugins than Cloud users
- Export plugins are key for our larger customers (particularly self-hosted ones)
- Simple plugins covering basic functionality that PostHog lacks are quite popular
- The plugins ecosystem still needs a lot of work 

## Why we like plugins

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/state-of-plugins/plugin-views.png)

Above: Pageviews for the Plugin Library (weekly).

Fun fact: the average length for the top six most popular plugins on PostHog is only 57 lines of code. Some, such as the Timestamp Parser, are only 16 lines long! The other thing they have in common is that they cover basic functionality which we haven’t built natively into PostHog yet. 

This is a deliberate decision. It’s true that we could spend engineering time to build these features, such as filtering nested properties, but plugins enable us to quickly solve the same challenge without the resource overhead. Then, once we fully understand the challenge, we can create a better solution — some plugins are literally the duct tape version of full-fledged features we’re building at the moment. 

Plugins also enable us to build useful functionality in a matter of hours. The Twitter Followers plugin hits an API and creates an event once a day. It would never make sense to build this natively, but it took just 30 minutes to make it as a plugin which is used by 30+ teams.

## About the GeoIP plugin

Despite feeling like a core part of the product, PostHog’s geolocation capabilities are actually handled by a plugin. This is a widely used feature, and the plugin is enabled for everyone by default, meaning it has thousands of users, both on self-hosted instances and Cloud. 

As a result, it has been removed from all the graphs and tables you’ll be seeing in this document, so we can focus on plugins which users have deliberately enabled.

## Plugins on PostHog Cloud

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/state-of-plugins/cloud-usage.png)

Above: Plugin usage on PostHog Cloud.

PostHog Cloud users have a selection of whitelisted plugins that they can install from [our plugin library](https://posthog.com/plugins). Arbitrary plugins are not allowed, so if users want to install their own plugins, they must first submit a PR to our [Plugin repo](https://github.com/PostHog/plugin-repository) for review.

Out of the more than 4,000 teams we have on PostHog Cloud, 50.3% use plugins (including GeoIP).

However, only 4% of teams use a plugin that is not GeoIP. This is quite low. That said, many plugins weren't available to everyone on cloud until recently, so this is likely to be under-reporting the reality of how many teams would use them.

The most popular plugin on Cloud (excluding GeoIP) is the Timestamp Parser, which turns timestamp data into date properties. This helps teams answer questions such as ‘_Why did our traffic spike on Tuesday?_’ or ‘_Do we get more purchases at the weekend or not?_’

## Plugins on self-hosted PostHog deployments

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/state-of-plugins/self-usage.png)

Above: Plugin usage on self-hosted deployments.

Gathering and parsing data on self-hosted users is a bit harder, but we can pull some data from status reports going back two months from teams who did not opt out. This comes with the caveat that we are looking at distinct IDs, meaning some organizations may be counted twice.

Of the 1,500+ organizations in the dataset, 75.6% use plugins, and 23.5% use a plugin other than GeoIP. Both are much better ratios than Cloud. 

This analysis shows the power of community plugins, as the most popular plugin is the User Agent plugin which was created by a community contributor. Thank you, [Weyert](https://github.com/weyert)! 

> *Note:* This plugin doesn’t show for PostHog Cloud stats because, as I found out while writing this, it wasn’t whitelisted for other organizations. We’ve since corrected this. 

Finally, the most important point about self-hosted plugins is that they’re far more powerful than on Cloud. When you run your own instance, you can add whatever plugins you like to it. As such, we see some teams creating and running their own massively complicated plugin across multiple projects. 

One user, for example, created a plugin to migrate more than 15 million events from Heap to PostHog. Others, such as [MentionMe](https://posthog.com/customers/mention-me), have successfully used plugins we’ve made but haven’t released yet by installing them directly from GitHub!

## Export plugins

Export plugins are arguably our most important type of plugin, as they are specifically useful for Enterprise customers and form a core part of PostHog’s offering by enabling users to export PostHog info to a data warehouse.

BigQuery is by far the most popular export destination, across both self-hosted and Cloud deployments.  

## The future of plugins

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/state-of-plugins/plugin-time.png)

Above: Time spent running plugins on PostHog Cloud (weekly).

One of the most striking data points we have about plugins is that installations per week have been mostly flat and the correlation with user sign-ups is constant. This means we’re not doing a good job of getting more users to try out plugins (at least on Cloud) even though we are doing a good job of getting people to try PostHog. 

Part of the reason for that could be that plugins still need a lot of polishing. We’ve had multiple reports in our community Slack that the release tracker plugin is broken, for example, and both the developer tooling and the user-facing plugin library are somewhat underwhelming to use. 

Yet, it can be hard to prioritize fixing these issues. Almost by definition any work to improve the extensibility of PostHog will never be a short-term priority because the product has to come before the efforts to extend it. 

In the short term I’m currently focusing on fixing known bugs as part of my current sprint, but the _only_ real way to prioritize extensibility is to look at it from a long-term perspective and I hope we can invest ongoing engineering efforts into PostHog in the future.

_Want to know more about what we're up to? [Subscribe to our new newsletter](https://newsletter.posthog.com/subscribe), which we send once every two weeks!_
