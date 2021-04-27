---
title: Sentry Integration
sidebar: Docs
showTitle: true
---

## Why Does This Exist?

Our Sentry integration is a two-way integration. Once installed, it will:
- Add a direct link in Sentry to the profile of the person affected in PostHog
- Send an `$exception` event to PostHog with a direct link to Sentry

This way, debugging issues becomes a lot easier, and you can also correlate error data with your product metrics.

## Installation

Make sure you're using both PostHog and Sentry as JS modules. You'll need to replace `'your organization'` and `project-id` with the organization and project-id from Sentry.

- `'your organization'` will be in the URL when you go to your Sentry instance, like so: `https://sentry.io/organizations/your-organization/projects/`
- `project-id` will be the last few digits in your Sentry DSN, such as `https://adf90sdc09asfd3@9ads0fue.ingest.sentry.io/project-id`

```js
import posthog from 'posthog-js'
import * as Sentry from '@sentry/browser'

posthog.init('<ph_project_api_key>')

Sentry.init({
    dsn: '<your Sentry DSN>',
    integrations: [new posthog.SentryIntegration(posthog, 'your organization', project-id)],
})
```

## Usage

In PostHog, you'll now have `$exception` events, which have a "Sentry URL" link to take you to the exception:

![Sentry exception event in PostHog](../../images/sentry_posthog_exception.png)

From Sentry you will now be able to go directly to the affected person in PostHog and watch the session recording for when the exception happened, see what else the user has done, and find their details. Don't forget to click the little icon to the side of the URL, not the URL itself.


![PostHog user profile URL in Sentry](../../images/sentry_exception.png)
