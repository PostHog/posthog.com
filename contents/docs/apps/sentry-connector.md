---
title: Sentry Connector
layout: app
topics:
    - sentry-connector
---

### What does the Sentry Connector do?

Our Sentry Connector integration is a two-way integration which works on Javascript & Python.

Once installed, it will:

-   Add a direct link in Sentry to the profile of the person affected in PostHog.
-   Send an `$exception` event to PostHog with a direct link to Sentry.

This way, debugging issues becomes a lot easier, and you can also correlate error data with your product metrics.

### What are the requirements for this app?

The Sentry Connector requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)!

You'll also need an account with Sentry.

### How do I install the Sentry Connector with Javascript?

Make sure you're using both PostHog and Sentry as JS modules. You'll need to replace `'your organization'` and `project-id` with the organization and project-id from Sentry.

-   `'your organization'` will be in the URL when you go to your Sentry instance, like so: `https://sentry.io/organizations/your-organization/projects/`
-   `project-id` will be the last few digits in your Sentry DSN, such as `https://adf90sdc09asfd3@9ads0fue.ingest.sentry.io/project-id`

```js
import posthog from 'posthog-js'
import * as Sentry from '@sentry/browser'

posthog.init('<ph_project_api_key>')

Sentry.init({
    dsn: '<your Sentry DSN>',
    integrations: [new posthog.SentryIntegration(posthog, 'your organization', project - id)],
})
```

### How do I install the Sentry Connector with Python?

```bash
pip install posthog
```

In your app, import the `posthog` library and set your api key and host **before** making any calls.

```python
import posthog

# Substitutes posthog.api_key which still exists but has been deprecated
posthog.project_api_key = '<ph_project_api_key>'

# Only necessary if you want to use feature flags
posthog.personal_api_key = '<ph_personal_api_key>'

# You can remove this line if you're using app.posthog.com
posthog.host = '<ph_instance_address>'
```

You can read more about the differences between the project and personal API keys in the dedicated [API authentication section](/docs/api/overview#authentication) of the Docs.

> **Note:** As a general rule of thumb, we do not recommend having API keys in plaintext. Setting it as an environment variable would be best.

You can find your keys in the 'Project Settings' page in PostHog.

To debug, you can toggle debug mode on:

```python
posthog.debug = True
```

And to make sure no calls happen during your tests, you can disable them, like so:

```python
if settings.TEST:
    posthog.disabled = True
```

### How do I use the Sentry Connector?

Once installed you'll now have `$exception` events in PostHog, which have a "Sentry URL" link to take you to the exception:

From Sentry you will now be able to go directly to the affected person in PostHog and watch the session recording for when the exception happened, see what else the user has done, and find their details. Don't forget to click the little icon to the side of the URL, not the URL itself.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
