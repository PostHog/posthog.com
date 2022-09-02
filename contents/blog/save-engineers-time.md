---
date: 2022-09-01
title: "How PostHog saves an engineer’s time"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
author: ["ian-vanagas"]
categories: ["Engineering", "Product analytics"]
---

Engineers' time is valuable. Making sure it is effectively used should be a goal for both engineers and the companies they are a part of. Product Analytics can and should be helping you save time.

On top of helping understand and create better products, PostHog provides the tools to maximize and save engineers time. We do this by:

1.  Empowering non-engineers to access and utilize Product Analytics themselves.

2.  Making it easier for engineers to implement and customize Product Analytics.

To provide details about both, here are four specific ways PostHog saves engineers' time.

## Test features faster

The goal of implementing a new feature is for it to improve the product. Understanding when a feature has succeeded is key to doing this. You waste less time on low-impact features. Many analytics providers make testing difficult to implement or slow to get results. PostHog's testing tools help both engineers and non-engineers test and understand what features are working fast.

[Feature Flags](https://posthog.com/product/feature-flags) are an example of this. Feature Flags help test new features to a subset of users, and they integrate with the rest of your product data. PostHog provides tools to non-engineers to understand Feature Flags, help set them up, and monitor their success. They have more ability to decide the "when, where, and who" of Feature Flags. For you, all you need to add is a single [if statement](https://posthog.com/manual/feature-flags#implementing-the-feature-flag) around the feature. This leaves you more time to implement the feature itself.

If features fail, PostHog makes it easy to turn them off. Breaking your flow with urgent work to remove them isn't required. It just requires flipping a switch in PostHog to kill them. This is especially useful for apps that are slower to update (such as app store or extension reviews). These slow updates can take a surprising amount of time, so limiting them is critical to maximizing your useful time.

As an example, the crypto wallet [Phantom](https://posthog.com/customers/phantom) uses PostHog Feature Flags as kill switches for all their features. This is because they can't deploy a new version of their Chrome Extension on demand. Feature Flags give them control of the user experience, limit feature failure, and save time.

On top of Feature Flags, PostHog includes several other testing tools that are simple for you to set up and easy for non-engineers to use. They include [Session Recording](https://posthog.com/product/session-recording), [Heatmaps](https://posthog.com/product/heatmaps), [Multivariate Testing](https://posthog.com/product/experimentation-suite) and more. These create a positive feedback loop in product decisions that help features get tested faster. The team gets data on the quality of their decision and this helps them improve and speed up the next one.

## Simple, customizable data ingestion

When implementing Product Analytics, many services require significant work to implement and customize. They often require writing detailed requests in your app and ensuring they are handled properly in your analytics platform. PostHog makes it simple to capture events and gain data on usage. At its [simplest](https://posthog.com/docs/integrate), it requires either a one-line [snippet](https://posthog.com/docs/integrate#snippet) or an API request with the wanted data object.

You don't need to spend time implementing a library for sending those API requests because we've already built them. We have [libraries](https://posthog.com/docs/integrate#libraries) in client and server languages like Javascript, Python, and Ruby. As well, we have several integrated ingestion [apps](https://posthog.com/docs/integrate#apps) like Amazon Kinesis, Shopify, and Zapier. This doesn't prevent you from implementing your own library with our API but saves you time if you need it.

We automatically capture data from wherever it is sent. No need to do elaborate configurations of each instance. You won't have to read through pages of documentation to understand how to capture an event correctly. Within PostHog, the data can be sliced, filtered, modified, and analyzed. The people who care more about the data (like the ones making product decisions) can analyze it how they like. This saves you time on implementation and customization.

PostHog helps companies capture more data faster. For example, [Saga](https://posthog.com/customers/saga)found that PostHog saw 40-50% more events than Mixpanel because of self-hosting. We also managed to track 20-30% more users. By capturing more data, decisions are made faster and more accurately. This helped Saga find a missing step in their tutorials, leading to increased retention of 70-80%. 

Finally, PostHog can [transform and enrich data](https://posthog.com/apps), rather than relying on your app to do it. We have a range of apps and integrations used to enrich data after it is sent to PostHog. For example, instead of adding a library to get geographic data about users in your app, you can use PostHog's [GeoIP](https://posthog.com/apps/geoip-enrichment) app to add location data to a record easily.

## Integrate product analytics all in one place

An unfortunately common task for engineers is writing internal queries or reports for data from sources like in-app usage, historical data, and third parties. This could include gathering a list of new users who've completed onboarding, combining it with a recent list pulled from your payment processor, and enriching it with geographic data. For an experienced engineer, this isn't hard to do but takes time and breaks your focus on work.

For example, [Vendasta](https://posthog.com/customers/vendasta) had engineers spending a lot of time in the behavioural analytics platform Snowplow on simple requests like how many visitors per week. They knew this wouldn't scale well. When they moved to PostHog, non-engineers could discover insights themselves by accessing and analyzing product data. Among other benefits, this led to cutting onboarding drop-off by 50%.

With PostHog, Product Analytics from a variety of sources, such as in-app usage or external applications can all live in one place. Non-engineers can then analyze the data from all the sources as they like. No need to maintain or fix the connections to these sources. No need to have non-engineers searching for and potentially corrupting this data at its source.

PostHog also helps manage the [long-term storage](https://posthog.com/product#data-warehouse) of that data which saves maintenance over time. PostHog connects and syncs with data warehousing solutions such as S3, Clickhouse, or Snowflake. Less data is lost and less maintenance is needed to maintain the sources flowing into these places.

## Easily customizable dashboards, queries

With analytics all in one place, Posthog provides non-engineers with the tools to create [Dashboards](https://posthog.com/product/collaboration), filter, slice, and [analyze](https://posthog.com/product/trends) data however they like. Without needing an engineer, a non-engineer can customize Dashboards and queries for their specific needs. When they can answer their own questions, they don't need to ping you to help them.

You save time by leaving the building or maintaining these tools to PostHog. Decisions about visualization tools or packages aren't needed. You don't have to worry about creating new queries that auto-update or writing algorithms to calculate [Trends](https://posthog.com/product/trends). If non-engineers want access to data to analyze and showcase it, they can do so themselves.

At [MentionMe](https://posthog.com/customers/mention-me), non-engineers were able to get access to data and build Dashboards that weren't possible with their past solution of Google Analytics. "The first thing I did was create a dashboard and it took just ten minutes to get the information I needed," said their Head of Product, Anca Filip. "I hadn't ever been able to get those insights from Google Analytics"

Non-engineers can share, [collaborate](https://posthog.com/product/collaboration), and subscribe to these Dashboards as well. No more pressure from non-engineers to pull data for an urgent meeting or product decision. Non-engineers become more autonomous when it comes to product data, and that helps keep you focused on the tasks that matter.

## More time to build great products

PostHog's mission is to increase the number of successful products in the world. Critical to that is making sure you are spending your time as effectively as possible. We help free up time for engineers to build great products by:

1.  Empowering non-engineers to analyze and utilize product data

2.  Making it easier to implement and customize the collection and management of product data

Product decisions, implementation, testing, and analysis all take time. Making sure your team has the tools to do it most effectively is critical. Whether it is simple ingestion libraries, customizable Dashboards, or our testing suite, [PostHog](https://posthog.com/) provides tools that allow you to use your time in the best possible way.
<NewsletterForm compact />
