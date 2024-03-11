---
date: 2022-07-20
title: Why infrastructure is a competitive advantage for us
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - tim-glaser
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/migrating-hog.png
featuredImageType: full
category: Inside PostHog
---

We're hiring [Site Reliability Engineers](https://apply.workable.com/posthog/j/071DD5C05A/) (SREs). I'm biased of course, but I think it's worth explaining why we think PostHog is the most exciting place to be an SRE right now. 

## Building a product

In most places, with the exception of outages, working in infrastructure means you're working on an invisible part of the company.

Sure, building out fast CI pipelines and continuous deployment, improving system reliability, and empowering other engineers to do more (providing methodologies, tools, etc) makes the rest of the engineering team more productive, but all your competitors do this too.

At PostHog, giving people the option to self-host is one of our biggest advantages compared to our competitors. That means we treat our self-hosted infra like a product. And, like any good product, we've written great public documentation.

To make sure our customers don't experience issues, we do automated testing of our Helm chart on all major cloud providers. We get [Issues](https://github.com/PostHog/charts/issues) raised by real customers, not just internal 'consumers'.

It's not just that building stuff _for_ our customers is fun.

Most of the people we deal with are experienced engineers and SREs themselves, and often folks will scratch their own itch by raising pull requests, like [adding backups](https://github.com/PostHog/charts-clickhouse/pull/383), [making improvements to security context](https://github.com/PostHog/charts-clickhouse/pull/377) and [simplifying deployment commands](https://github.com/PostHog/charts-clickhouse/pull/366).

## How to serve 20bn events for real time analytics

We don't _just_ build infrastructure for other people to run.

We run one of the biggest PostHog instances ourselves, with >20 billion events. And before you ask, yes, our cloud infrastructure runs the same Helm chart that we ship to our customers.

Did you just read a sales pitch? Yes. Should you [immediately apply for the SRE role](https://apply.workable.com/posthog/j/071DD5C05A/) at PostHog? Also yes.

