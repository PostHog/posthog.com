---
title: Product OS
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---

PostHog is a platform of many products:

- [Product analytics](/docs/product-analytics) to help you quantitatively understand how users behave
- [Web analytics](/docs/web-analytics) for tracking behavior on your marketing websites
- [Session replay](/docs/session-replay) for diagnosing issues and seeing how users use your product
- [Feature flags](/docs/feature-flags) for testing new features and safely rolling them out
- [A/B testing](/docs/experiments) for scientifically verifying changes to improve conversion
- [Surveys](/docs/surveys) for collecting qualitative feedback running satisfaction surveys
- [Data warehouse](/docs/data-warehouse) for importing data from external sources and querying it alongside your data in PostHog.

PostHog's Product OS is the foundation on which they're built. 

It ties all your user and product data together, so you can focus on improving your product instead of engineering your data.

## Product OS features

Product OS comprises things like:

- Our easy to implement [client and server SDKs](/docs/getting-started/install?tab=sdks) like `posthog-js` client library, which [autocaptures](/docs/product-analytics/autocapture) frontend events, so you don't have to waste time manually instrumenting every button and simple interaction

- Our [APIs](/docs/api), which enable you to capture, evaluate, create, update, and delete nearly all of your information in PostHog, and [pull information into your app](/tutorials/customer-facing-analytics)

- Collaboration features like [notebooks](/docs/notebooks), which enable you to analyze data from all PostHog products in a single document you can share and collaborate on with teammates

- Built-in [data management tools](/docs/data), where you can define and organize events, person properties, data tables, and audit changes made by colleagues

- [Data pipelines](/docs/cdp), which enable you to transform your PostHog data and send it to other tools for monitoring, marketing automation, sales, and support

- [HogQL](/docs/hogql), which grants you unrestricted access to your data via custom SQL queries for advanced, custom analysis

- [Our infrastructure](/docs/how-posthog-works), which is built upon [ClickHouse](/handbook/engineering/clickhouse), an ultra-fast open-source database system built specifically for real-time data analysis

- The [toolbar](/docs/toolbar), which lets you easily toggle feature flags, access [heatmaps](/docs/toolbar/heatmaps), inspect elements, create [actions](/docs/data/actions), and see where users click