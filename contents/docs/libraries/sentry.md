---
title: Sentry
icon: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/sentry.svg
---

## Why does this exist?

Our Sentry integration is a two-way integration which works on Javascript & Python. Once installed, it will:
- Add a direct link in Sentry to the profile of the person affected in PostHog.
- Send an `$exception` event to PostHog with a direct link to Sentry.

This way, debugging issues becomes a lot easier, and you can also correlate error data with your product metrics.

> If you're looking for the PostHog + Sentry integration for Python, please check out the [Python docs](/docs/integrate/server/python#sentry).

## Installation

Make sure you're using both PostHog and Sentry as JS modules. You'll need to replace `'your organization'` and `project-id` with the organization and project-id from Sentry.

- `'your organization'`: will be in the URL when you go to your Sentry instance, like so: `https://sentry.io/organizations/your-organization/projects/`
- `project-id`: will be the last few digits in your Sentry DSN, such as `https://adf90sdc09asfd3@9ads0fue.ingest.sentry.io/project-id`
- `prefix`: Optional: Url of a self-hosted sentry instance (default: https://sentry.io/organizations/)
- `severityAllowList`: Optional: by default this is `['error']`, you can provide more Sentry severity levels (e.g. `['error', 'info']`) or '*' to capture any severity. Only available from posthog-js version 1.118.0 forward

```js-web
import posthog from 'posthog-js'
import * as Sentry from '@sentry/browser'

posthog.init('<ph_project_api_key>')

Sentry.init({
    dsn: '<your Sentry DSN>',
    integrations: [posthog.sentryIntegration({
        organization: 'your organization',
        projectId: 'project-id',
        severityAllowList: ['error', 'info'] // optional: here is set to handle captureMessage (info) and captureException (error)
    )],
})
```

### Usage

In PostHog, you'll now have `$exception` events, which have a "Sentry URL" link to take you to the exception:

![Sentry exception event in PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/sentry_posthog_exception.png)

From Sentry you will now be able to go directly to the affected person in PostHog and watch the session recording for when the exception happened, see what else the user has done, and find their details. Don't forget to click the little icon to the side of the URL, not the URL itself.

![PostHog user profile URL in Sentry](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/sentry_exception.png)


### Sentry SDK v6 and below

If you are using a lower version of the Sentry SDK you may need to use the "class based" integration as below

```js-web
Sentry.init({
    dsn: '<your Sentry DSN>',
    integrations: [new posthog.SentryIntegration(
        posthog,
        'your organization',
        project-id,
        undefined, // optional: but necessary if you want to set a severity allowlist
        ['error', 'info'] // optional: here is set to handle captureMessage (info) and captureException (error)
    )],
})
```
