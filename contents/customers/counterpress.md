---
title: How CounterPress built a fully custom analytics product without hiring a data team
customer: CounterPress
featuredImage: >-
   https://res.cloudinary.com/dmukukwp6/image/upload/counterpress_cover_a607ccea96.png
date: 2026-03-11
---
[CounterPress](https://counterpress.media/), a publishing platform that helps sports journalists and creators get more value from small but highly engaged audiences, initially powered their customer analytics using PostHog’s Dashboard API. They simply created dashboards in PostHog and embedded them in their React app for users to view. 

But as their analytics offering grew, this setup started to feel limiting.

When Jay Collett and his team at CounterPress decided to launch built-in analytics for their publishing platform, they faced a choice. Either:

- Hire a Python developer to build an internal data service
- Find a way to turn PostHog into a scalable analytics backend

They chose the second option. Today, their React dashboard pulls from 11+ [PostHog endpoints](/endpoints), supports dynamic filtering, and delivers performance metrics that rival much larger competitors without building a separate analytics infrastructure.

## From dashboards to endpoints

CounterPress initially powered their customer analytics using PostHog’s dashboard API. The setup was simple: create a dashboard inside PostHog, fetch it into their React app, and display it to users.

It worked well for getting started. But as their product vision evolved, they needed more flexibility. Each customer domain required its own dashboard, and they wanted dynamic date ranges, richer filtering, and different breakdowns depending on context. The dashboard approach wasn’t wrong – it just wasn’t designed for a fully productized analytics layer.

At one point, they were preparing to hire a Python developer to build an intermediate service that would consume PostHog data and expose custom endpoints to their frontend.

<OSQuote
  customer="counterpress"
  author="jay_collett"
  product="endpoints"
/>

With Endpoints, the architecture became much simpler. CounterPress now creates insights inside PostHog and converts them directly into API endpoints that their React dashboard consumes, with no additional backend services.

## How CounterPress stays flexible

The V1 release presents core web analytics in a way that feels native to their platform rather than embedded from a third party.

Customers can see:

- Unique visitors and page views
- Session duration and average session duration
- Bounce rate
- Device and operating system breakdowns
- Geographic location
- A pages table with path-level metrics

When a user clicks into a specific page, the entire dashboard dynamically filters to that path. This makes the experience feel cohesive rather than a collection of isolated charts.

Flexibility is built into the architecture. For longer date ranges, CounterPress uses endpoints that break data down by day. For shorter ranges, such as the last 48 hours, the frontend switches to endpoints that break data down by hour. The logic is simple: if the selected range is short, fetch from the hourly endpoint instead of the daily one.

![CounterPress dashboard](https://res.cloudinary.com/dmukukwp6/image/upload/counterpress_dash_7a405847b0.png)

This keeps charts readable and relevant without overwhelming users with unnecessary data points. Because everything begins as an insight in PostHog’s UI, Jay can iterate quickly. When a new metric or breakdown is needed, he creates the insight, converts it into an endpoint, and connects it to the dashboard.

## Performance and materialization

Because CounterPress isn't storing analytics data themselves, performance is tightly linked to how quickly PostHog can compute and return results.

Materialized endpoints, which cache computed results on PostHog’s side, are particularly important for them. By using materialization CounterPress sees noticeable improvements in speed and overall user experience.

CounterPress has been one of the earlier teams using Endpoints in this way, and their feedback has helped highlight areas where performance can improve. The PostHog team is actively working on caching and response time improvements so setups like this become faster as the product matures.

They already use Cloudflare caching across other parts of their platform. Avoiding an additional analytics-specific caching layer reduces complexity and keeps their architecture focused.

## Competing in a crowded analytics race

When CounterPress began this project, built-in analytics was still rare in their market. Since then, several competitors have launched similar features, some backed by significant funding.

For CounterPress, Endpoints provided a practical way forward. Instead of investing in custom analytics infrastructure or expanding the team, they were able to build a competitive analytics product using the tools already available in PostHog.

<OSQuote
  customer="counterpress"
  author="jay_collett"
/>

They now offer the same core metrics as larger players and, in some cases, more granular breakdowns. More importantly, they have a clear path to expanding analytics coverage without taking on additional infrastructure burden.

## What this unlocks for CounterPress

Instead of hiring a Python developer to build and maintain a custom analytics layer, CounterPress:

- Built insights in PostHog
- Converted them into endpoints
- Connected them directly to their React dashboard

They launched built-in analytics to their first customers with a system that is flexible, extensible, and deeply integrated into their product. Endpoints allowed CounterPress to treat PostHog as an analytics backend and focus their time on building product experience rather than infrastructure.


