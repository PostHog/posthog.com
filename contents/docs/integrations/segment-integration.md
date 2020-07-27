---
title: Segment Integration
sidebar: Docs
showTitle: true
---

Segment allows you to easily manage data and integrations with services across your Growth, Product, and Marketing stack. By tracking events and users via Segment’s API and libraries, you can send your product’s data to all of your analytics/marketing platforms, with minimal instrumentation code. They offer support for most platforms, including iOS, Android, JavaScript, Node.js, PHP, and more.

**Note:** All Segment sends to PostHog is events you manually send. PostHog isn't able to do autocapture, show the toolbar or create actions on your own site. Segment is also more easily blocked by ad-blockers. To get around these limitations, you can install the PostHog snippet alongside your Segment integration.

## Getting started with Segment

Make sure you have a [Segment account](https://segment.com/docs/#getting-started) and a PostHog account, either self-hosted or using [PostHog Cloud](https://app.posthog.com/signup).

1. In the Segment workspace, create a new project and enable PostHog as an integration.
1. Grab the PostHog API key from the /setup page in PostHog.
1. Use one of Segment's libraries to send events.
1. See the events come in on PostHog
