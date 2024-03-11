---
date: 2020-04-22T00:00:00.000Z
title: Array 1.2.0
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

Big new integration - PostHog now has a library for iOS!

Like what you see and self-hosting? [Update](/docs/runbook/upgrading-posthog) your instance.

## Release notes

### [PostHog iOS Library](/docs/integrate/client/ios)

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/04/ioslibrary1.gif)

You can now capture events in your iOS app and send them to PostHog. It automatically captures screen changes, and you can capture events as per usual

Marius has been working on a lot of our libraries (starting with [Ruby](https://github.com/PostHog/posthog-ruby)) but we knew that our mobile support was a big gap.

See our [iOS docs](/docs/integrate/client/ios) for how to install it on your app.

### [Session Information](https://github.com/PostHog/posthog/pull/586)

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/04/Sessions.gif)

You can now see exactly how much time people are spending on your app using sessions. There’s two modes: “Average session length”, which shows you how long sessions are and how many, and “distribution” which makes it super easy to spot whether sessions are uniformly distributed or whether there are outliers.

So far engagement metrics have focused on repeated actions or the volume of page views – we still think Stickiness, Active users are very valuable but this adds another dimension.

### [Filtering funnels by properties](https://github.com/PostHog/posthog/pull/628)

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/04/funnel-properties.gif)

In addition to the [changes](https://github.com/PostHog/posthog/pull/506) last [week](https://github.com/PostHog/posthog/pull/561) on funnels so that they work like /trends you can also apply properties to your funnels to narrow down conversion metrics by anything you like.

## Performance updates
* [Added indexes](https://github.com/PostHog/posthog/pull/630) so loading /trends is super fast, even with millions of events.
* We have [offloaded storing events](https://github.com/PostHog/posthog/pull/615) to workers, so that calls to our events API are non-blocking, and you can scale insertion of events independently from the rest of PostHog.
* Removed drf-yasg in favor of [our own hosted docs](https://github.com/PostHog/posthog/pull/596).
* As part of our [design push](https://github.com/PostHog/posthog/pull/619) Eric got the next branch out with the Ant design layout tweaking some of those aspects.

## Favorite issue

### [Running locally with docker](https://github.com/PostHog/posthog/issues/636)

We had instructions ready to run PostHog locally but had not prioritized doing local development with Docker.

Thank you [Viperfx](https://github.com/viperfx) for requesting this.

We are very keen to see enhancements that are not part of our parity project, please keep them coming.

## PR of the week

### [Removing drf-yasg in favor of new docs website](https://github.com/PostHog/posthog/pull/596)

Thank you to [SanketDG](https://github.com/sanketdg) for another pr that has helped ensure we fixed an [issue](https://github.com/PostHog/posthog/issues/574) raised by another user [maximmarakov](https://github.com/maximmarakov), it’s great to see the community fix ad hoc issues especially ones that might not directly be related to new features but ensuring our docs and instructions are up to date for other users.

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


## Repo round up

* [98.css](https://github.com/jdan/98.css) (Whilst looking at a new design system, there was one vote to go super old school on the UI) 
* [Avatarify](https://github.com/alievk/avatarify) (More fun to be had with video call being the norm, photorealistic avatars for Skype and Zoom)
* [Teonite T-shirts](https://github.com/teonite/t-shirts) (Aaron has been creating PostHog T-shirts this week and was intrigued by an Open Source T-shirt project – although the PostHog design is very different) 

## PostHog news

PostHog gets bigger every week! Not just in terms of new users and feature updates – we’re also excited to have [Marius](https://twitter.com/mariusandra) join – he was one of the first contributors but has done a stunning amount in a short time.

<ArrayCTA />
