---
title: How Legit Media fixed their broken marketing reports with PostHog Endpoints
customer: Legit Media
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/LEGIT_2b37bf6d2f.png
date: 2026-06-24
---

[Legit Media](https://legitmedia.africa/) runs a network of news websites across Africa reaching 70+ million readers a month. On top of that audience, they sell paid online courses in copywriting and digital marketing, using their news brands as the distribution channel.

Growing those course subscriptions is a performance marketing operation: paid campaigns running across multiple channels, geographies, and individual specialists at once. The marketing team's weekly reports (which include spend, CPA, conversion rates, upsells, broken down by channel and country) are what drives every budget decision. When those reports stopped arriving reliably, their marketing team was making decisions in the dark.

![Legit Marketing Report](https://res.cloudinary.com/dmukukwp6/image/upload/legit_marketing_report_5432bb4be7.png)

The API that cried busy
-----------------------

Legit's weekly marketing reports pull PostHog data alongside Facebook ads data, sliced by advertising channel, geographic market, and individual marketing specialist. The queries aren't light, including week-over-week breakdowns with multiple joins and filters running across a full volume of subscription events.

They were calling the PostHog API directly, but the size of the queries was causing the API to time out, and it kept telling them it was busy.

<OSQuote
  customer="legit-media"
  author="andrey_tovstonog"
  quote={0}
/>

The marketing team was waiting for reports that never arrived, and trying to piece things together manually by jumping between PostHog dashboards.

Found Endpoints, fixed in a few hours
--------------------------------------

![Legit Endpoints Setup](https://res.cloudinary.com/dmukukwp6/image/upload/legit_endpoints_setup_bf7f1203f7.png)

Legit's CTO went back to the PostHog documentation and found [Endpoints](/endpoints). The idea clicked immediately: instead of raw API calls that had to fight for availability each time, Endpoints wrap SQL queries into stable, callable URLs that are purpose-built for this kind of programmatic access.

They tried it. It worked. The first report was live in a few hours. Today Legit runs 7 PostHog Endpoints. They sit inside an n8n automation workflow that pulls data from both PostHog and Facebook Ads, then consolidates everything into a single report table.

The underlying queries filter by UTM campaign, UTM term, GEO, and group results by person. This kind of multi-layered breakdown previously caused the raw API to buckle.

<OSQuote
  customer="legit-media"
  author="andrey_tovstonog"
  quote={1}
/>

No more hunting for numbers
---------------------------

Reliability improvement is one thing. But the bigger change is what the marketing team does with their time now.

Before, pulling the weekly report meant manually navigating across multiple PostHog dashboards, copying numbers, and assembling a picture of performance by hand. Now this time is spent analyzing and optimizing their campaigns and growing revenue more effectively.

<OSQuote
  customer="legit-media"
  author="andrey_tovstonog"
  quote={2}
/>
