---
date: 2020-05-13
title: Array 1.5.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/array/default.png
featuredImageType: standard
category: PostHog news
tags:
  - Product updates
  - Release notes
---

Another week, another PostHog Array. We're steadily working towards parity with other tools. This week's highlights include a new website, multiple dashboards, a sleek new design and breaking down by cohorts.

[Click here for instructions](/docs/runbook/upgrading-posthog) on how to update.

## Release notes

### [Multiple dashboards](https://github.com/PostHog/posthog/pull/740)

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/05/multiple-dashboards.png)

It's now possible to have multiple dashboards. This can help you organize your graphs and let people have their own personal dashboards. You can also pin important dashboards so they're easily accessible to anyone in your organization.

In the next release, you'll even be able to resize, re-order and pick your own color for graphs.

### [New website](https://posthog.com)

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/05/new-website.png)

PostHog has a new home! With improved design and super simple instructions on how to get started with PostHog. Our docs and handbook are also integrated for easy access, and the whole thing is run on Gatsby, because we <3 other open source projects.

This makes it easier for the community to propose changes at the [website repo](https://github.com/posthog/posthog.com).

### [Dark-er mode](https://github.com/PostHog/posthog/pull/740)

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/05/dark-sidebar.png)

PostHog is now a lot prettier, with a sleek dark sidebar.

### [Break down by cohort](https://github.com/PostHog/posthog/pull/690)

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/05/breakdown-cohort.png)

You were already able to create cohorts, but now you can use them in trends to find out exactly what your users are doing and how certain groups compare to others.

## Bug fixes and performance improvements

* [Big refactor of how we do routing in the app](https://github.com/PostHog/posthog/pull/717) which means going backwards and forwards should work a lot smoother
* [Faster loading of paths](https://github.com/PostHog/posthog/pull/729)
* [More accurate DAU/uniques count](https://github.com/PostHog/posthog/pull/734)
* [Fix dotted line appearing on completed days](https://github.com/PostHog/posthog/pull/735). Thanks [Jujhar](https://github.com/Jujhar)!
* Welcomed [another 5 contributors](https://github.com/PostHog/posthog/pull/739) to the README. Thank you [eLRuLL](https://github.com/eLRuLL), [maximmarakov](https://github.com/maximmarakov), [sac0](https://github.com/sac0), [solnsubuga](https://github.com/solnsubuga) and [Jujhar](https://github.com/Jujhar)
 
## Favorite issue

### [Dev toolbar ideas](https://github.com/PostHog/posthog/issues/741)

The PostHog team is busy working out how to present all the information in PostHog while you're developing. Feel free to add your own ideas here!

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


## Weekly round up

* [Amazon Writing Style Tips](https://twitter.com/destraynor/status/1258372157706510336). Writing is crucial for remote teams and we loved these tips from Amazon.
* [Lidl owner launching its own rival to Amazon Web Services](https://www.chargedretail.co.uk/2020/05/11/lidl-owner-launching-its-own-rival-to-amazon-web-services/). I guess if the owners of Whole Foods can do it, why not Lidl?

## PostHog news

We’re growing rapidly, and we’re constantly expanding our team. We’re looking for a [strong devops engineer](https://news.ycombinator.com/item?id=23044768) to join us. If that sounds like you, please email tim@posthog.com.

We are also looking for a really strong [designer / UX person](/careers#designer--ux)! [Email James](mailto:james@posthog.com) if this sounds like it's for you!

<ArrayCTA />
