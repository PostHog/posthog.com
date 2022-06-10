---
date: 2022-06-01
title: How do I even calculate my event count anyway?
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/hog-in-a-room-generic.jpg
featuredImageType: full
categories: ["Inside PostHog"]
author: ["simon-fisher"]
---

When talking through our editions and pricing options with potential customers I'm often asked "How can I estimate my event count?"

If you aren't already using an analytics tool, or it doesn't readily give you a count of tracked events it can be quite tricky to figure out how much adopting an event-based platform like PostHog is going to cost you.

## Why we price based on events

Pricing software is hard.  It's a delicate balance between being affordable for your ideal customer profile, competitive in the marketplace
whilst still allowing you to grow and fund further development in the product so that more people want to use and pay for it.

We settled on event-based pricing for two main reasons:

1. Events are the main thing we store in our Clickhouse database in PostHog Cloud.  The more events we store, the higher our own infrastructure costs.  It's only fair that we incorporate those running costs into our pricing.
2. Analytics is all about visualizing data about events which your users trigger.  The more events available to you for analysis, the richer that analysis will be.

Although point 1 is mainly focused on our own Cloud, we wanted pricing parity between our Cloud and Self-hosted editions so that it was easy to migrate between the two.  Hence event-based pricing for all editions.

## Ok that makes sense, but how do I figure out how many events I'll be tracking?

The most accurate way to figure out your event count is to take advantage of our 1m monthly event free tier on PostHog Cloud.

Use one of our [libraries](/docs/integrate#libraries) to send your event data to PostHog ([autocapture](/docs/integrate/ingest-live-data#autocapture) is easiest) and check out your event usage on the [Billing](https://app.posthog.com/organization/billing) page in the app.
Once you've sent a typical week's worth of data then you can do some multiplication to project your monthly event count.  If you get close to the 1m event
limit then you can stop sending events and project out based on how many days worth of data has already been captured.

## But I just want a very rough estimate to understand the cost!

Most people who come to us not knowing their event count will have a handle on their monthly active user (MAU) number.  

User interaction patterns vary by type of product, industry and target persona:

* For a banking app I might log in, check my balance, look at a few offers and then log out, generating a few events
* For a social media app I might log in, check what my friends had for dinner, watch endless videos of cats jumping off things, find an appropriate GIF to send to my cousin for her birthday, all generating hundreds of events
* For an infrastructure monitoring product I could be checking it in the morning and then only visiting the app if I'm alerted to a problem, generating events sporadically

Event counts also vary based upon whether you are using [autocapture](/docs/integrate/ingest-live-data#autocapture), [custom capture](/docs/integrate/ingest-live-data#capture-user-events) or a combination of both.  As autocapture 
generates events for every pageview and click it can start to get quite noisy, however there are things that can be done to limit that.

## Some analysis from our user base

We took a look PostHog Cloud to get a better understanding of mapping event counts to MAUs and across all of our customer base, 
most fell within the range of 50-100 tracked events per MAU per month.  We then did a deeper analysis of the different types of customers
and then came up with the following list of product types and expected events/MAU/month.

| Product             | B2B/B2C | Events/MAU | Autocapture | Platforms |
|---------------------|---------|------------| ----------- | --------- |
| PostHog             | B2B     | 87         | Yes | Web |
| Financial Reporting | B2B     | 44         | No | Web |
| Cloud Monitoring    | B2B     | 22         | No | Web |
| Document Management | B2B     | 54         | Yes | Web |
| Speech to Text API | B2B     | 583        | No | API |
| Crypto Wallet | B2C     | 162        | No | Browser Extension |
| Meditation App | B2C     | 118        | No | Android, iOS |
| Banking | B2C     | 61         | Yes | Web |
| Fashion Retail | B2C | 31         | Yes | Web |
| Event Booking | B2C | 8 | No | React Native |
| Restaurant Booking | B2B2C | 54 | Yes | Web, Mobile |

As you can see, event count varies wildly across different types of products, but this should help you get closer to an estimated event count
based on your product and MAU count.  Once you've got this figure you can visit the [pricing](/pricing) page and calculate
your estimated costs for adopting PostHog.  Don't forget, PostHog Cloud and Scale are free for up to 1m tracked events per month.

_Did you enjoy this article? Get more like it in your inbox every two weeks_
 <NewsletterForm
compact
/>