---
title: Sentry Integration
sidebar: Docs
showTitle: true
---

## Why Does This Exist?

Our Sentry integration is a two-way integration. Once installed, it will
- add a direct link to the person affected in Sentry
- send an `$exception` event to PostHog with a direct link to Sentry.

This way, debugging issues becomes a lot easier.

## Installation

Make sure you're using both PostHog and Sentry as a JS module.

```js
import posthog from 'posthog-js'
import * as Sentry from '@sentry/browser'

posthog.init('<your api key>')

Sentry.init({
    dsn: '<your Sentry DSN'),
    integrations: [new posthog.SentryIntegration(posthog, 'posthog', 1899813)],
})
```

## Usage

In PostHog, you'll now have `$exception` events, which have a "Sentry URL" link to take you to the exception:

[![](../../src/images/sentry_posthog_exception.png)

On the Sentry side, you'll know be able to go directly to the affected person, and watch the session replay, see what else the user has done and find their details. Don't forget to click the little icon to the side of the URL, not the URL itself.


[![](../../src/images/sentry_exception.png)