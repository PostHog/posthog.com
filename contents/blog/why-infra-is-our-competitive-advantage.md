---
date: 2022-05-27
title: Why infrastructure is a competitive advantage for us
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Inside PostHog"]
featuredImage: ../images/blog/migrating-hog.png
featuredImageType: full
---

We're hiring more SREs. I think it's worth explaining why I think PostHog is the most exciting place to be an SRE right now. 

## Building a product

In most places, with the exception of outages, working in infrastructure means you're working on an invisible part of the company.
Sure, building out fast CI pipelines and continuous deployment makes the rest of the engineering team more productive, but all your competitors do this too.

At PostHog, giving people the option to self-host is one of our biggest advantages compared to our competitors.
That means we treat our self hosted infra like a product.
Like any good product, we've written great public documentation.
To make sure our customers don't experience issues, we do automated testing of our Helm chart on all major cloud providers.
And we get issues raised by real customers, not just internal 'consumers'.

It's not just that building stuff _for_ our customers is fun.
Most of the people we deal with are experienced engineers and SREs themselves, and often folks will scratch their own itch by raising pull requests, like [adding backups](https://github.com/PostHog/charts-clickhouse/pull/383), [making improvements to security context](https://github.com/PostHog/charts-clickhouse/pull/377) and [simplifying deployment commands](https://github.com/PostHog/charts-clickhouse/pull/366).

## How to serve 20bn events for real time analytics

We don't _just_ build infrastructure for other people to run.
We run one of the biggest PostHog instances ourselves, with 20bn events.
And before you ask, yes, our cloud infrastructure runs the same helm chart that we ship to our customers.


Did you just read a sales pitch? Yes. Should you immediately apply for the SRE role at PostHog? Also yes.




_Enjoyed this? Subscribe to our [newsletter](/newsletter) to hear more from us twice a month!_

<NewsletterForm
compact
/>
