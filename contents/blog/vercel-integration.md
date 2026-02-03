---
date: 2026-02-02
title: PostHog × Vercel: feature flags, minus the plumbing
author:
  - sara-miteva
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/this_is_fine_6336efb0ae.jpg
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: PostHog news
tags:
  - Product
---

If you’re building on Vercel and using PostHog for [feature flags](/feature-flags) and [experiments](/experiments), you’ve probably had some version of this setup:

- flags defined in one place
- app logic living somewhere else
- a bit of glue code
- a bit of env var juggling
- a bit of “wait, where does this get evaluated again?”

Today, that gets simpler.

## Introducing the PostHog × Vercel integration

The new PostHog × Vercel integration lets you use PostHog feature flags and experiments directly in Vercel, without custom wiring or creative workarounds.

Here’s how it works:

1. You define feature flags and experiments in PostHog
2. They’re synced into Vercel’s native Flags system
3. Your Vercel apps consume them using the Vercel Flags SDK

Alongside flag syncing, the integration also takes care of credentials. Your PostHog Project ID and API key are automatically synced into Vercel environment variables.

This means no copying values between dashboards and no wondering if prod and staging are using the same project. It’s the boring kind of automation – the best kind.

## Get started

Feature flags help teams ship more confidently and experiment more easily. This integration keeps that experience simple – letting PostHog handle flags and experiments, and Vercel focus on running your app, without you having to stitch the two together.

If you’re already using PostHog and Vercel, you can enable the integration from the Vercel Marketplace and start syncing flags right away.
